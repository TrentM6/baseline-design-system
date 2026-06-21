#!/usr/bin/env node
/**
 * Baseline Design System — cascade nudge (PostToolUse hook, advisory).
 *
 * When a file in any layer is edited, this reminds the agent which higher
 * layers now need re-verification, and lists the actual importers. It never
 * blocks (always exits 0). It also touches `.ds-dirty` so the Stop gate knows
 * a code change happened this turn and should run the full type-check.
 *
 * Reads the PostToolUse JSON payload on stdin to learn the edited file path.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const filePath = payload?.tool_input?.file_path || "";
if (!filePath) process.exit(0);

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const rel = relative(ROOT, filePath).replace(/\\/g, "/");

// mark the tree dirty for the Stop gate when code/tokens change
if (/\.(ts|tsx|css)$/.test(rel) && (rel.startsWith("src/") || rel.startsWith("tokens/"))) {
  try {
    writeFileSync(join(ROOT, ".ds-dirty"), rel + "\n", { flag: "a" });
  } catch {
    /* best effort */
  }
}

const LAYERS = [
  {
    dir: "tokens/",
    name: "Token (L1/L2)",
    consumers: ["src/components/ui", "src/components/charts", "src/components/composed"],
    note: "Every layer re-renders from the token graph — re-verify contrast and look in BOTH dark and light mode.",
  },
  {
    dir: "src/components/ui/",
    name: "Component (L3)",
    consumers: ["src/components/charts", "src/components/composed"],
    note: "An API change here ripples up — TypeScript will flag consumers; re-verify each still composes and adheres.",
  },
  {
    dir: "src/components/charts/",
    name: "Chart (L4)",
    consumers: ["src/components/composed"],
    note: "",
  },
  {
    dir: "src/components/composed/",
    name: "Component (L4)",
    consumers: [],
    note: "",
  },
];

const layer = LAYERS.find((l) => rel.startsWith(l.dir));
if (!layer) process.exit(0);

const base = rel.split("/").pop().replace(/\.(ts|tsx)$/, "");
function walk(d, out = []) {
  let entries = [];
  try {
    entries = readdirSync(d);
  } catch {
    return out;
  }
  for (const n of entries) {
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const importers = [];
const importRe = new RegExp(`from ['"][^'"]*\\b${base}['"]`);
for (const c of layer.consumers) {
  for (const f of walk(join(ROOT, c))) {
    if (!/\.(ts|tsx)$/.test(f)) continue;
    if (importRe.test(readFileSync(f, "utf8"))) importers.push(relative(ROOT, f).replace(/\\/g, "/"));
  }
}

const out = [`▲ Cascade — you edited a ${layer.name}: ${rel}`];
if (layer.consumers.length) {
  out.push("  Re-verify these still compose correctly and adhere to every applicable rule:");
  if (importers.length) importers.slice(0, 12).forEach((i) => out.push(`    • ${i}`));
  else out.push("    (no direct importers yet)");
}
if (layer.note) out.push("  " + layer.note);
out.push("  Then: `npm run ds:validate`, and `/design-review` for accessibility + hierarchy.");
console.log(out.join("\n"));
process.exit(0);
