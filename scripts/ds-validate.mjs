#!/usr/bin/env node
/**
 * Baseline Design System — deterministic composability + adherence gate.
 *
 * Zero dependencies. Scans the source tree and enforces the rules that can be
 * checked mechanically. Exits 1 (with a grouped report) on any violation,
 * 0 when clean. This is the unbypassable floor; judgment-level rules
 * (accessibility, hierarchy, extraction discipline) are handled by the
 * ux-reviewer subagent via /design-review.
 *
 * Checks:
 *   raw-color        no hex / rgb() / hsl() literals in component code
 *   icon-lib         no lucide-react (Phosphor is the only icon library)
 *   next-themes      no next-themes import (theme comes from data-mode)
 *   layer-direction  the import DAG: ui → composed/charts → surfaces → workspaces
 *   token-pairing    every semantic --bl-* token has BOTH dark and light values
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT =
  process.env.CLAUDE_PROJECT_DIR ||
  join(fileURLToPath(import.meta.url), "..", "..");
const SRC = join(ROOT, "src");

const violations = [];
const add = (file, line, rule, msg) =>
  violations.push({ file: relative(ROOT, file).replace(/\\/g, "/"), line, rule, msg });

function walk(dir, out = []) {
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const tsFiles = walk(SRC).filter((f) => /\.(ts|tsx)$/.test(f));

// Hex inside a CSS attribute selector (e.g. [stroke='#ccc']) is allowed —
// chart.tsx targets Recharts' hardcoded default strokes to override them.
const ATTR_SELECTOR_HEX = /\[[^\]]*=['"]#[0-9a-fA-F]{3,8}['"]\]/g;
const COLOR_LITERAL = /(#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\()/;
const isRuleDoc = (f) => f.replace(/\\/g, "/").includes("/workspaces/rules/");

// Layer DAG — a directory MUST NOT import any of the listed (higher) layers.
const FORBIDDEN = {
  "src/components/ui/": [
    "@/components/composed",
    "@/components/charts",
    "@/components/surfaces",
    "@/workspaces",
  ],
  "src/components/charts/": [
    "@/components/composed",
    "@/components/surfaces",
    "@/workspaces",
  ],
  "src/components/composed/": ["@/components/surfaces", "@/workspaces"],
  "src/components/surfaces/": ["@/workspaces"],
};

for (const file of tsFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((raw, i) => {
    const ln = i + 1;
    const stripped = raw.replace(ATTR_SELECTOR_HEX, "");

    if (!isRuleDoc(file) && COLOR_LITERAL.test(stripped)) {
      add(file, ln, "raw-color", `use a --bl-* token, not "${raw.trim().slice(0, 72)}"`);
    }
    if (/from\s+['"]lucide-react['"]/.test(raw)) {
      add(file, ln, "icon-lib", "imports lucide-react — use @phosphor-icons/react");
    }
    if (/import[^;]*from\s+['"]next-themes['"]/.test(raw)) {
      add(file, ln, "next-themes", "imports next-themes — read the data-mode attribute instead");
    }
    const m = raw.match(/from\s+['"]([^'"]+)['"]/);
    if (m) {
      const spec = m[1];
      for (const [layer, forbidden] of Object.entries(FORBIDDEN)) {
        if (!rel.startsWith(layer)) continue;
        for (const bad of forbidden) {
          if (spec === bad || spec.startsWith(bad + "/")) {
            add(file, ln, "layer-direction", `${layer} must not import "${spec}" (breaks the layer DAG)`);
          }
        }
      }
    }
  });
}

// token-pairing: dark and light semantic blocks must define the same --bl-* names
const tokensFile = join(ROOT, "tokens", "bl-tokens.css");
try {
  const css = readFileSync(tokensFile, "utf8");
  const block = (selector) => {
    const re = new RegExp(`\\[data-mode="${selector}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`);
    const match = css.match(re);
    const names = new Set();
    if (match) for (const m of match[1].matchAll(/(--bl-[a-z0-9-]+)\s*:/g)) names.add(m[1]);
    return names;
  };
  const dark = block("dark");
  const light = block("light");
  for (const n of dark)
    if (!light.has(n)) add(tokensFile, 0, "token-pairing", `${n} is set for dark but missing in [data-mode="light"]`);
  for (const n of light)
    if (!dark.has(n)) add(tokensFile, 0, "token-pairing", `${n} is set for light but missing in dark`);
} catch {
  /* tokens file optional */
}

// registry-coverage: every composed/chart component used in a SURFACE must also
// be shown in the Components tab. If it's good enough to ship in a surface, it's
// part of the registry and must be documented. (The cardinal rule.)
try {
  const exportsOf = (rel) => {
    const names = new Set();
    let txt = "";
    try {
      txt = readFileSync(join(ROOT, rel), "utf8");
    } catch {
      return names;
    }
    for (const m of txt.matchAll(/export\s*\{([^}]*)\}/g)) {
      for (const part of m[1].split(",")) {
        const t = part.trim();
        if (!t || t.startsWith("type ")) continue;
        const name = t.replace(/\s+as\s+\w+/, "").trim();
        if (/^[A-Z]/.test(name)) names.add(name);
      }
    }
    return names;
  };

  const registry = new Set([
    ...exportsOf("src/components/composed/index.ts"),
    ...exportsOf("src/components/charts/index.ts"),
  ]);
  // Layout/shell components are demonstrated in the Surfaces tab itself (they
  // render full-bleed app chrome and can't sit inline in a gallery card).
  const SHELL_ALLOW = new Set(["SurfaceShell"]);

  const tabText = readFileSync(
    join(ROOT, "src/workspaces/components/components-workspace.tsx"),
    "utf8"
  );
  const surfaceFiles = walk(join(ROOT, "src/components/surfaces")).filter((f) => /\.tsx$/.test(f));
  const usedInSurfaces = new Map(); // name -> first surface file

  for (const f of surfaceFiles) {
    const txt = readFileSync(f, "utf8");
    for (const m of txt.matchAll(/import\s*\{([\s\S]*?)\}\s*from\s*["']@\/components\/(?:composed|charts)["']/g)) {
      for (const part of m[1].split(",")) {
        const t = part.trim();
        if (!t || t.startsWith("type ")) continue;
        const name = t.replace(/\s+as\s+\w+/, "").trim();
        if (registry.has(name) && !usedInSurfaces.has(name)) {
          usedInSurfaces.set(name, relative(ROOT, f).replace(/\\/g, "/"));
        }
      }
    }
  }

  for (const [name, surfaceFile] of usedInSurfaces) {
    if (SHELL_ALLOW.has(name)) continue;
    if (!new RegExp(`\\b${name}\\b`).test(tabText)) {
      add(
        join(ROOT, "src/workspaces/components/components-workspace.tsx"),
        0,
        "registry-coverage",
        `${name} ships in ${surfaceFile} but isn't shown in the Components tab — add it to components-workspace.tsx`
      );
    }
  }
} catch {
  /* best effort */
}

if (violations.length === 0) {
  console.log("✓ Design system valid — composability + adherence checks pass.");
  process.exit(0);
}

const byRule = {};
for (const x of violations) (byRule[x.rule] ||= []).push(x);
console.error(`✗ ${violations.length} design-system violation(s):\n`);
for (const [rule, items] of Object.entries(byRule)) {
  console.error(`  [${rule}] (${items.length})`);
  for (const it of items) console.error(`    ${it.file}${it.line ? ":" + it.line : ""}  ${it.msg}`);
  console.error("");
}
console.error("Fix at the right layer: mint tokens in bl-tokens.css, extend primitives in ui/,");
console.error("compose in composed/, and keep imports flowing one direction only.");
process.exit(1);
