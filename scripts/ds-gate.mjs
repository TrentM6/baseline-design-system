#!/usr/bin/env node
/**
 * Baseline Design System — Stop gate.
 *
 * Runs the deterministic validator always (sub-second) and `tsc --noEmit`
 * only when the tree is dirty (a .ts/.tsx/.css under src or tokens was edited
 * this session — tracked by the .ds-dirty marker the cascade hook writes).
 * On failure it writes the reason to stderr and exits 2, which tells Claude
 * Code to BLOCK the stop and feed the reason back to the agent — the durable,
 * unbypassable version of `/goal`. On success it clears the dirty marker.
 *
 * Conversational turns (no edits) skip tsc, so this adds no friction to chat.
 */
import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const dirtyMarker = join(ROOT, ".ds-dirty");
const dirty = existsSync(dirtyMarker);

const run = (cmd, args) => spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8" });

const validate = run("node", [join(ROOT, "scripts", "ds-validate.mjs")]);
const tsc = dirty ? run("npx", ["tsc", "--noEmit"]) : { status: 0, stdout: "", stderr: "" };

const failed = validate.status !== 0 || tsc.status !== 0;

if (!failed) {
  if (dirty) {
    try {
      rmSync(dirtyMarker);
    } catch {
      /* ignore */
    }
  }
  process.exit(0);
}

let msg = "✗ Design-system gate failed — the change isn't done until composability + adherence hold across all layers.\n\n";
if (validate.status !== 0) msg += (validate.stderr || validate.stdout || "").trimEnd() + "\n\n";
if (tsc.status !== 0)
  msg += "TypeScript (cascade check — a lower-layer change broke a consumer):\n" + (tsc.stdout || tsc.stderr || "").trimEnd() + "\n\n";
msg += "Fix at the correct layer, then re-verify with `npm run ds:validate`. ";
msg += "Run `/design-review` for the accessibility + hierarchy checks a script can't make.";

process.stderr.write(msg);
process.exit(2);
