# Baseline Design System — Agent Contract

Read **[AGENTS.md](AGENTS.md)** for the full operating rules (shared with all agent tools). This file adds Claude Code–specific enforcement.

@AGENTS.md

## The HQ canvas — drafting new product UI (primary workflow)

This repo is mounted inside Baseline HQ. When you're in a canvas session
(HQ's /design/canvas — chat beside a live preview), your job is usually NOT
to modify the design system itself — it's to **design new product UI with it**:

- **The canvas is `src/drafts/current.tsx`.** Whatever it exports renders live
  in the operator's preview (the `#draft` route). Build the requested design
  there: replace the file's content entirely for a new design, edit in place
  to iterate. Split into sibling files under `src/drafts/` if the design grows.
- **Compose, don't invent**: use `@/components/ui`, `@/components/composed`,
  `@/components/charts`; tokens only, no raw values. Same contract as any
  other work here — run `npm run ds:check` before committing.
- **Iterate with the operator**: they see every save instantly (HMR). Expect
  rounds of feedback; small, quick edits beat big rewrites.
- **Approval is the operator's move**: their Approve button snapshots
  `current.tsx` to `src/drafts/approved/<name>.tsx` and commits. Don't commit
  `current.tsx` yourself mid-iteration unless asked; approved snapshots are the
  record. (Eventually approved designs will flow to a product repo — not yet.)
- Only touch the design system proper (components, tokens, rules, docs
  workspaces) when the ask is explicitly about the system itself.

## Session startup checklist

Before writing any code in this project, verify:

1. You have read AGENTS.md and understand the composition rules
2. You know which workspace tab the change affects (Rules, Tokens, Components, Playground)
3. You have identified which existing base components from `src/components/ui/` to compose from
4. You have identified which tokens from `tokens/bl-tokens.css` apply

## Always-on skills (apply every session)

This project has three skills installed in `.claude/skills/` (sourced to
`.agents/skills/`). They are **not optional** — apply their guidance on every
piece of UI work in this repo, the same way you apply the design rules:

- **`frontend-design`** — aesthetic direction: distinctive, intentional visual
  design; typography, palette, and layout choices that don't read as templated
  defaults. Consult before designing any new surface or component.
- **`interaction-design`** — microinteractions, motion, transitions, feedback,
  loading/empty/error states. Every interactive element must follow its timing
  (100–150ms micro, 200–300ms toggles, 300–500ms page/modal) and easing
  (`--ease-out` enter, `--ease-in` exit) — which map 1:1 to our motion tokens.
- **`vercel-react-best-practices`** — React/Next performance patterns. Apply
  when writing or refactoring components (memoization, correct effect
  dependencies, stable keys, lazy boundaries, avoiding needless re-renders).

When you finish UI work, the validation loop below must confirm the change
honors these skills — especially interaction-design (no abrupt state changes,
consistent easing, tactile feedback) and frontend-design (intentional, on-brand,
not generic).

## Composition enforcement

Every visual element MUST trace back through the system layers:

```
tokens/bl-tokens.css → tailwind.config.ts → src/components/ui/* → { charts/, composed/ } → workspaces/
```

Violations — any of these is a rejection:
- Raw hex/rgb/hsl values in any component (use `--bl-*` tokens)
- Custom styled divs when a shadcn base component exists for that purpose
- Interactive elements not built from `src/components/ui/button`, `input`, `select`, etc.
- Layout/navigation not using shadcn `sidebar`, `tabs`, `accordion`, etc.
- Icons not from `@phosphor-icons/react`
- Missing accessible name on any interactive element
- Missing keyboard support on any interactive element
- Missing both dark and light mode values for any new token

## Icon library

This project uses **Phosphor Icons** (`@phosphor-icons/react`). Import icons by name:

```tsx
import { House, Gear, MagnifyingGlass } from "@phosphor-icons/react";
<House size={20} weight="regular" />
```

Weights: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`. Default to `regular` for UI, `bold` for small sizes (≤16px).

Never use inline SVG for standard UI icons. Never use Lucide, Heroicons, or other icon libraries.

## UX validation loop

After completing any visual change, run this validation before reporting the work as done. This is a mandatory step, not optional.

### Step 1: Composition audit

For every new or modified component, verify:

- [ ] All colors resolve to `--bl-*` semantic tokens (grep for raw hex)
- [ ] All interactive elements use shadcn base components from `src/components/ui/`
- [ ] All icons use `@phosphor-icons/react`
- [ ] All spacing uses token-mapped Tailwind classes (not arbitrary values)
- [ ] All motion uses `--dur-*` / `--ease-*` tokens
- [ ] Component explicitly lists which base components it composes from

### Step 2: Accessibility check

- [ ] Color contrast: text ≥ 4.5:1, UI controls ≥ 3:1 against their background
- [ ] Every interactive element reachable via Tab
- [ ] Every interactive element has a visible `:focus-visible` ring
- [ ] Every control has an accessible name (text content, `aria-label`, or `aria-labelledby`)
- [ ] Status/validity not conveyed by color alone (glyph or label reinforcement)
- [ ] Animations honor `prefers-reduced-motion`

### Step 3: Mode verification

- [ ] Toggle to light mode — verify the change renders correctly
- [ ] Toggle back to dark mode — verify no regression
- [ ] Any new token has both dark and light values in `bl-tokens.css`

### Step 4: UX reviewer persona

Adopt the role of a senior UX designer reviewing this change. Ask yourself:

**Clarity**: Can a new user understand what this element does without instruction?
**Consistency**: Does this match the patterns established elsewhere in the system?
**Density**: Is the information density appropriate — not too sparse, not overwhelming?
**Hierarchy**: Is the visual hierarchy correct — most important elements most prominent?
**Feedback**: Does every action produce visible feedback within 100ms?
**Reversibility**: Can the user undo or escape from any action?
**Edge cases**: What happens with empty state, error state, loading state, overflow text?

If any check fails, fix the issue before reporting completion. Document what you fixed and why.

### Step 5: Report

After validation passes, report:
- What was built/changed
- Which base components it composes from
- Any new tokens added
- Any issues found and fixed during validation
