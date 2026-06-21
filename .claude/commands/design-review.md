---
description: Review the current design-system changes for composability + rule adherence
argument-hint: "[optional: files or layer to focus on]"
allowed-tools: Bash, Read, Grep, Glob, Task
---

Run the full Baseline design-system review on the current changes$ARGUMENTS.

Do this in order:

1. **Deterministic gate.** Run `npm run ds:validate` and `npx tsc --noEmit`.
   Report any failures verbatim — these are unbypassable. If either fails, fix
   at the correct layer (mint tokens in `tokens/bl-tokens.css`, extend a
   primitive in `src/components/ui/`, compose in `src/components/composed/`)
   before continuing.

2. **Judgment review.** Dispatch the **ux-reviewer** subagent (via the Task tool)
   on the changed files. It checks what the script cannot: accessibility,
   visual hierarchy, interaction completeness, and extraction discipline
   (surfaces must compose, not inline reusable blocks). If files were passed in
   `$ARGUMENTS`, scope the reviewer to those and their importers.

3. **Cascade check.** Confirm the change is reconciled across layers:
   - A token/primitive change → every consumer still reads correctly in BOTH
     dark and light mode (not just compiles).
   - A surface change → nothing reusable was inlined that should live in
     `src/components/composed/`.

4. **Report.** Summarize: gate result, the reviewer's VERDICT + findings, and
   the cascade status. If anything is a blocker, fix it and re-run this review
   rather than reporting done.
