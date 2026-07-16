# Baseline Design System — Agent Guide

This file is the operating contract for any AI agent working in this project — Claude, Cursor, Continue, custom MCP agents, or anything else. The filename `AGENTS.md` is the universal convention; a thin `CLAUDE.md` at the project root imports this file so Claude Code's auto-loader still picks it up.

For the project's vision, scope, current state, build history, roadmap, open questions, and decision log, read **[DESIGN-SYSTEM-SPEC.md](DESIGN-SYSTEM-SPEC.md)** — that's the living product spec. AGENTS.md tells you *how* to work in the project; the spec tells you *what* the project is. Both files are living documents and update together when a system-level decision ships.

## Required reading before any component work

Before creating, modifying, or re-styling any component, read the relevant section of the documentation:

- **Design System Instructions** — this file. Operating contract for any agent working in this project.
- **Style Guide** — color tokens, type scale, spacing, radii, motion, dark-mode rules, surface tokens.
- **Components** — composition rules, registration pattern, status conventions.
- **Accessibility** (non-negotiable) — WCAG 2.2 AA conformance rules (contrast, focus, labels, tab semantics, keyboard, live regions). Every component must meet these standards; no exceptions.

If a task touches more than one area, read all the relevant chapters before writing code.

### Installed skills — apply every session

Three skills live in `.claude/skills/` (sourced to `.agents/skills/`) and are part of the operating contract, not optional helpers:

- **`frontend-design`** — distinctive, intentional visual design (palette, type, layout). Consult before designing any new surface/component.
- **`interaction-design`** — motion, microinteractions, feedback, loading/empty/error states. Follow its timing (100–150ms micro · 200–300ms toggles · 300–500ms page/modal) and easing (`--ease-out` enter / `--ease-in` exit), which map to our motion tokens. No abrupt state changes; every interactive element gives tactile feedback.
- **`vercel-react-best-practices`** — React performance patterns when writing/refactoring components.

The Claude Code session auto-loads these via `CLAUDE.md`. Other agent tools must read this section and apply the same guidance.

## Workflow for any change

1. **Read the relevant docs.** Identify which documentation chapter governs what you're about to do.
2. **Match existing patterns.** Find the closest existing component in `src/components/ui/` and follow its conventions (token usage, props, shadcn patterns).
3. **Use tokens, never literals.** No raw hex, no fixed white/black, no off-spec colors. If the docs don't define a token for what you need, mint one in `tokens/bl-tokens.css` with both light and dark values.
4. **Compose from base components.** Every interactive control, status indicator, and surface in a higher-level component must route through a shadcn/ui base component or a documented system component.
5. **Verify accessibility** before marking anything done — WCAG 2.2 AA contrast, visible focus rings, keyboard reachability, accessible names on icon-only controls, no info conveyed by color alone.
6. **Verify in both modes.** Toggle the theme switcher and confirm the change holds in light AND dark before considering it done.
7. **Update the spec in the same change set.** New decision → decision log. New question raised → open questions.

## Enforcement — how the rules are actually held

These rules are not honor-system. Three mechanisms enforce them, tiered by how
deterministic each check is:

1. **Deterministic gate — `npm run ds:validate`** (`scripts/ds-validate.mjs`,
   zero-dependency). Fails the build on: raw color literals, `lucide-react`,
   `next-themes`, broken layer-import direction, or any semantic token missing a
   dark or light value. Runs in CI (`.github/workflows/design-system.yml`) and
   from the Stop hook. **You cannot finish a change while this fails.**

2. **Cascade nudge — `PostToolUse` hook** (`scripts/ds-cascade.mjs`). Every time
   you edit a token, base component, chart, or composed component, it tells you which
   higher layers now need re-verification and lists their importers. Treat its
   output as a checklist, not noise. TypeScript + the token graph propagate the
   change; your job is to **re-verify** each consumer reads correctly in both modes.

3. **Judgment review — `/design-review`** (runs the gate, then the
   `ux-reviewer` subagent). Catches what a script can't: accessibility, visual
   hierarchy, interaction completeness, extraction discipline. Run it after any
   component change before reporting done.

The **Stop gate** (`scripts/ds-gate.mjs`) ties 1 + the type-check together: it
blocks the end of a turn until `ds:validate` and `tsc --noEmit` both pass, so a
half-cascaded change can't be reported as finished. It only runs the type-check
when code actually changed this turn, so it adds no friction to discussion.

The layer DAG it enforces (imports flow one direction only):

```
tokens/bl-tokens.css → tailwind.config.ts → src/components/ui/ → { charts/, composed/ } → workspaces/
```

Page-level compositions (surfaces) are built in the **Playground** workspace by
placing composed components onto the canvas, optionally wrapped in an app shell.
The Playground exports self-contained code that can be dropped into any project.

## Building new components — composition is non-negotiable

Every new component MUST compose from base components and tokens. If the `src/components/ui/` catalog already has a base component for a part of what you're building — you USE the base component. You don't re-implement the visual, you don't restyle it inline, you don't add bespoke CSS that duplicates what the base component already covers.

Same rule for tokens: every color, motion duration, easing curve, spacing step, radius, shadow, font size in your new component must resolve to a documented token defined in `tokens/bl-tokens.css`.

When the system is missing something you need, the rule is **add at the right level, not at the component level.** Specifically:

- **Need a new color?** Mint a semantic token in `bl-tokens.css` with both light and dark values. Never write `#hex` or `rgba(...)` inside a component.
- **Need a new motion duration / easing?** Add it to the foundation scales block in `tokens/bl-tokens.css`. Never write `200ms` or `cubic-bezier(...)` directly inside a component.
- **Need a new variant of an existing base component?** Add it to the base component itself — extend its prop surface, update its CSS. Don't fork the base component inside your component.
- **Need a base component that doesn't exist yet?** Build it as a proper `src/components/ui/*` base component, then compose from it.

## Color and dark mode — the ground rules

Dark mode is Baseline's **primary mode** — the brand palette and visual identity were designed dark-first. Light mode is a derived expression of the same semantic intent.

Operating rules:

- **Every color used anywhere must resolve to a semantic token** defined in `bl-tokens.css`. No raw hex, rgb, hsl, or named colors in JSX or component CSS.
- **Every semantic token must declare both a dark and a light value.** A token without both values is incomplete.
- **Tokens are semantic, not literal.** Name them by role (`--bl-bg-surface`, `--bl-fg-muted`, `--bl-border-divider`) — not by appearance (`--bl-light-orange`).
- **The base palette (`--bl-orange-500`, `--bl-slate-950`, etc.) is for token authoring only.** Components consume semantic tokens that reference the palette, not the palette directly.
- **When you find a color literal in existing code,** treat it as a bug. Replace with a token.

## Accessibility — WCAG 2.2 AA (non-negotiable)

Every component must clear WCAG 2.2 Level AA. This is the conformance bar US federal procurement (Section 508) and most enterprise buyers require.

### The four POUR principles

- **Perceivable.** Information and UI must be presentable in ways users can perceive — text alternatives for non-text, sufficient contrast, content not conveyed by colour alone.
- **Operable.** All interaction must be reachable from keyboard, with visible focus, and without timing traps.
- **Understandable.** Text is readable, behaviour is predictable, and errors are caught with help.
- **Robust.** Markup parses cleanly, name/role/value are exposed for assistive tech, and status messages are announced.

### The five rules every component must pass

These catch ~95% of violations. A component cannot ship to Approved with a known failure on any of them.

| Rule | Standard |
|------|----------|
| **Contrast** | Body text >= 4.5:1. Large text (18pt+ or 14pt+ bold) and UI controls >= 3:1. WCAG SC 1.4.3 / 1.4.11. |
| **Keyboard** | Every interactive element reachable via Tab, activatable via Enter/Space, with visible :focus-visible ring. WCAG SC 2.1.1 / 2.4.7. |
| **Name** | Every control has an accessible name — text content, aria-label, or aria-labelledby. Icon-only buttons must declare one. WCAG SC 4.1.2. |
| **Not by colour** | Status, validity, and required-ness use a glyph or label in addition to colour. Tone is reinforcement, never the sole signal. WCAG SC 1.4.1. |
| **Live regions** | Async updates — toast, async error, autosave — fire through aria-live so screen readers hear them. WCAG SC 4.1.3. |

### Per-component checklist

Every component's promotion requires a green tick on every box:

1. **Contrast.** All foreground/background pairs measured against WCAG SC 1.4.3 / 1.4.11.
2. **Keyboard reach.** Every interactive element reachable via Tab, activatable via Enter/Space, in a sane order.
3. **Focus visible.** Inherits the centralised `:focus-visible` ring; no custom focus suppression.
4. **Accessible name.** Every control has visible text content or `aria-label`. Icon-only buttons declare a label.
5. **Roles + state.** Tablists, listboxes, dialogs, alerts use the correct ARIA role + state attributes; no decorative ARIA.
6. **Not by colour.** Status, validity, and required-ness reinforced by glyph or label, not colour alone.
7. **Live updates.** Async changes (toast, autosave) route through `aria-live`.
8. **Reduced motion.** Animations honour `prefers-reduced-motion` per the motion tokens.

## Iconography minimums (WCAG SC 1.4.11 + SC 2.5.8)

Every icon-as-affordance must be a real SVG at adequate size and stroke. **Never** use Unicode characters as standalone decorative icons.

- **Size:** >= 14x14 px rendered
- **Stroke width:** >= 2 (use 2.25 for chevrons / arrows)
- **Color:** `currentColor` or an explicit token that meets >= 3:1 against its surface
- **Opacity:** never < 1 for resting state on an interactive control

## Data visualization standards

Every chart and data visualization must be **complete and precise by default**. Nothing is optional or off by default.

| Required | Applies to |
|----------|-----------|
| **X axis** with tick labels | All Cartesian charts (area, bar, line) |
| **Y axis** with tick labels | All Cartesian charts (area, bar, line) |
| **Hover tooltips** with data values | Every chart type |
| **Legends / keys** identifying series | Every chart type |
| **Smooth interpolation** (`type="natural"`) | All line/area charts |
| **Dense data points** (20+ for curves) | All line/area charts |

Do not create `show*` props that toggle these off. The chart component must be production-ready out of the box — every consumer gets full interactivity automatically.

## Motion + interaction conformance

Every transition / animation must use the canonical motion tokens, never raw ms values:

- `var(--dur-instant)` (100ms) — hover, focus rings, color shifts
- `var(--dur-quick)` (200ms) — press, toggles, tooltips, popover open/close
- `var(--dur-medium)` (300ms) — drawers, accordions, modals
- `var(--dur-slow)` (500ms) — full-screen transitions

Pair every duration with a documented easing token. Every animation must honor `prefers-reduced-motion: reduce`.

## Don'ts

- Don't bypass the documentation because something seems faster.
- Don't introduce new colors, fonts, spacing values, or interaction patterns at the component level — add them at the atomic level.
- Don't ship a token that only works in one mode.
- Don't ship an icon-as-affordance smaller than 14x14, with stroke < 2, or with opacity < 1 at rest.
- Don't use Unicode characters as standalone decorative icons.
- Don't write transition durations as raw ms values — use motion tokens.

## Product usage conventions — ratified from Baseline HQ

The system above tells you what exists and how to compose legally. These conventions tell you **which choice is correct for a given intent**. They were ratified in production on Baseline HQ (the reference implementation) and apply to every Baseline product built with this system. Violations are design defects even when `ds:validate` passes.

### Action hierarchy
- **Exactly one filled primary (`default` variant) per view** — the thing the screen exists for.
- **Secondary actions use `outline`** — never `ghost`, never the `secondary` variant, for a real action.
- **`ghost` is tertiary/inline only** — icon buttons in rows, dismiss affordances, chip-like toggles.
- **`destructive` is red, confirmed for the irreversible, never the default focus, never adjacent to a frequent action.**
- **One control = one action.** A button never reveals a panel on first click and submits on second. Toggles toggle; submits submit.

### Overlays and layout stability
- Controls that reveal options/config open an **anchored overlay** (positioned below/beside the trigger, elevated, shadowed) — never an in-flow expansion that shifts sibling layout. Nothing moves under the user when a panel opens.
- Async content reserves its space (skeletons); results never jump the page.

### States are part of the component
- Every data surface ships **loading / empty / error / partial** states. Empty states carry one line with a job (what this is + the action that creates the first item) — no filler encouragement copy.
- Stale-but-real beats "not connected": degraded data is marked stale, never replaced with an outage note.
- Failure indicators retire automatically on success — a standing alarm for a fixed problem is a bug.

### Numbers and microcopy
- Numbers are product-formatted: 1M / 88k / 1.2k — never raw internals ("1000k" is the jank that makes a product feel like a demo). Tabular figures in tables.
- Labels are verb-first and specific ("Start terminal", not "Submit"). Sentence case everywhere — headings, buttons, titles.
- A line of UI text must say something the screen doesn't already show; otherwise delete it — don't rewrite it.

### Input affordances
- Picking a resource the OS/platform can browse (folder, file, repo) never happens through a typed text path — use the native picker or the platform's selection flow.

### Surface ladder (candidate tokens)
- Depth ladder proven in HQ: window well → **canvas** (chrome and page share ONE surface tier) → **panel** (one step lighter, subtle inset highlight) → **raised detail** (one more). Chrome never sits above content. Candidate for ratification here as `--bl-bg-canvas` / `--bl-bg-panel` / `--bl-bg-panel-2` (HQ currently carries them as `--hq-*`).
