# Baseline Design System — Living Spec

> **What this is.** The product spec for the Baseline design system project. It is the single living source of truth for the system's mission, scope, architecture, current state, and what's next. **What this is not.** This is not the operating contract — that's [AGENTS.md](AGENTS.md), which tells agents and humans how to work in the project. The spec tells you what the project *is*; AGENTS.md tells you how to *behave* inside it.

---

## 1. Mission

The Baseline Design System exists to be the visual and behavioral foundation underneath every Baseline product surface. One token graph, one set of primitives, one accessibility floor, one motion grammar — composed into every website, app, dashboard, and tool that carries the Baseline brand.

The mission has three concrete deliverables:

1. **A ratified token graph** — every color, type size, spacing step, radius, motion duration, easing curve, shadow, and surface tier exists as a documented semantic token with both dark and light values. Components consume semantic tokens; the base palette is for token authoring only.
2. **A composable primitive layer** — a set of shadcn/ui primitives that every higher-level component must compose from. New components do not author tokens or styles inline; they assemble primitives.
3. **Living documentation** — the source of truth for every standard. Every primitive has a spec; every standard has a chapter; every approved component has documentation.

## 2. Non-goals

- **Be a general-purpose UI library.** The audience is Baseline products, not the open-source community.
- **Track parity with upstream shadcn.** We borrow patterns where they fit; our token graph and primitive contract are ours.
- **Support every device.** Desktop is the primary target. Responsive consideration applies where it lands cleanly.
- **Generate component code from Figma.** Designs land as decisions; code lands by hand against those decisions.

## 3. Principles

1. **Tokens, never literals.** No raw hex / rgb / hsl in JSX or CSS. Every color resolves to a semantic token with both modes.
2. **Compose from primitives.** Higher-level components route every interactive control, status indicator, and surface through a documented primitive.
3. **Add at the right level.** When the system is missing something, mint the new piece at the atomic level — never inline at the component level.
4. **WCAG 2.2 AA is non-negotiable.** Contrast, focus, keyboard, accessible names, no info-by-color-alone.
5. **Dark mode is ground truth.** Color decisions are made in dark first; light values are derived expressions of the same semantic intent.
6. **Decisions update the docs in the same turn.** New token, new pattern, status change — the chapter and the code move together.

## 4. Brand identity

### Color philosophy

The palette is **monochromatic orange** — all colors derive from the brand orange `#fe4506`. This creates a warm, premium feel and visual cohesion across all elements. The brand is dark-first by design.

### Typography

- **Headings:** Geist (sans-serif)
- **Body:** Satoshi (sans-serif)
- **Mono:** System monospace stack

### Visual identity markers

- **Pill-shaped buttons** (border-radius: 9999px) — signature Baseline shape
- **Monochromatic orange palette** — warm, premium, intentional
- **Dark backgrounds with warm undertones** — never cold/blue-gray
- **Surface elevation via warm neutrals** — `#1a0d06` > `#261208` > `#33180a` > `#4d240f`
- **Section numbering** in content (01 // SECTION NAME)

## 5. System architecture

### Five layers

```
┌──────────────────────────────────────────────────────────┐
│ L5  Surfaces         Full interactive pages               │  ← src/components/surfaces/
├──────────────────────────────────────────────────────────┤
│ L4  Components       Cards, forms, tables, chart cards     │  ← src/components/composed/
│     Charts           Recharts data-viz (area/bar/line/pie) │  ← src/components/charts/
├──────────────────────────────────────────────────────────┤
│ L3  Primitives       shadcn/ui atoms + ChartContainer     │  ← src/components/ui/
├──────────────────────────────────────────────────────────┤
│ L2  Semantic tokens  Role-named: --bl-bg-body, --bl-fg-… │  ← bl-tokens.css (semantic)
├──────────────────────────────────────────────────────────┤
│ L1  Base palette     --bl-orange-500, --bl-stone-950, …  │  ← bl-tokens.css (palette)
│                      Authoring only — components don't    │
└──────────────────────────────────────────────────────────┘
```

The composition rule: **L5 composes from L4 + L3 only**. **L4 composes from L3 only**. **L3 composes from L2 only**. **L2 references L1 only**. **L1 stands alone** (literal hex).

**Playground (the design canvas)** sits on top of the whole stack as the primary
authoring surface: `src/workspaces/playground/` lets you place blocks (any L4
component or chart) onto a device-framed canvas, reorder/duplicate/remove them,
and **export a self-contained `Composition` component** (merged imports + JSX) —
to reuse in external projects or to save back under `surfaces/` as a new Surface.
Blocks are registered in `block-registry.tsx`; everything it offers is a real
system component, so the canvas can only ever produce on-system output.

This is **enforced by the import graph**, not just convention: `surfaces/*` import from `composed/*` and `charts/*`; `composed/*` and `charts/*` import from `ui/*`; `ui/*` consume `--bl-*` tokens via the Tailwind mapping. Each workspace tab (Primitives, Components, Surfaces) renders the real modules from these directories — the docs and the product are the same code. The neutral ramp is **warm stone** (`--bl-stone-*`, brown-grey), not cold zinc.

## 6. Foundations inventory

Status legend: ✅ ratified · 🔄 in progress · ⬜ planned

| Axis | Status | Notes |
|---|---|---|
| Color (palette + semantic) | ✅ | Monochromatic orange. `--bl-*` tokens with dark + light values. |
| Typography | ✅ | Geist (headings) + Satoshi (body). Type scale ratified. |
| Spacing | ✅ | `--bl-space-*` and shorthand `--sp-1…8`. 4px base. |
| Radii | ✅ | `--bl-radius-*` and shorthand `--r-sm/-md/-lg/-xl/-pill`. |
| Motion | ✅ | `--dur-instant/-quick/-medium/-slow`, `--ease-out/-in/-in-out/-spring`. |
| Shadow | ✅ | `--bl-shadow-sm/-md/-lg/-tooltip/-overlay` with both modes. |
| Z-index | ✅ | Four-tier scale: popover (50), tooltip (100), overlay (100), toast (9999). |

## 7. Primitives (shadcn/ui base)

Status: ✅ installed. **Full shadcn catalog** (~50 primitives) branded with `--bl-*` tokens, plus a tokenized Recharts `ChartContainer`. All icons are Phosphor (`@phosphor-icons/react`) — lucide is swapped out across every primitive (enforced by the `icon-lib` gate rule); `sonner` reads `data-mode` rather than next-themes. Newly added: calendar, command, combobox, date-picker, carousel, menubar, navigation-menu, pagination, hover-card, input-otp, input-group, button-group, resizable, aspect-ratio, kbd, spinner, empty, item, field, form. The **DataTable** is built on `@tanstack/react-table` (global search, column sort, status filter, column visibility, row selection, pagination).

Installed primitive set (from shadcn catalog):
- Button, IconButton
- Card
- Dialog, Alert Dialog, Sheet, Drawer
- Dropdown Menu, Context Menu
- Tabs
- Tooltip, Popover
- Input, Textarea, Select, Checkbox, Switch, Radio Group, Slider
- Avatar, Badge/Pill
- Progress, Skeleton
- Accordion, Collapsible
- Separator/Divider
- Scroll Area
- Toggle, Toggle Group
- Label, Form
- Sonner (toast)
- Chart (Recharts wrapper: ChartContainer, ChartTooltip, ChartLegend)

## 8. Build history

### 2026-06-20 — Project scaffold

Initial project creation. Extracted structure from the CodeTogether Design System (an existing agentic design system) and replaced all brand identity with Baseline's:

- Vite + React 19 + TypeScript + Tailwind 3 + shadcn/ui scaffold
- Complete `--bl-*` token system in `tokens/bl-tokens.css` (palette + semantic tokens, dark + light)
- Baseline brand colors (monochromatic orange from `#fe4506`), typography (Geist + Satoshi), surface elevation
- Agentic operating contract (`AGENTS.md`) with accessibility rules, composition rules, token discipline
- Living spec (`DESIGN-SYSTEM-SPEC.md`) with five-layer architecture
- Starter `App.tsx` with color palette, typography, button, card, and spacing showcases

### 2026-06-20 — Composable chain + Recharts + warm palette

Made the five-layer architecture real and enforced by imports, end to end:

- **App shell** switched from a top-bar tab strip to the shadcn `Sidebar` (`SidebarProvider`/`SidebarInset`), real Baseline logo, Phosphor nav icons.
- **Neutral palette** rebuilt from cold zinc to warm **stone** (`--bl-stone-*`, brown-grey) — body `#100e0c`, surface `#1c1816`, elevated `#2c2825`. Borders moved to low-opacity (`rgba(255,255,255,0.08)`) and forced onto Tailwind's default border via an `@layer base` rule (the harsh gray-200 default was the real cause of the "hard white outline" bug).
- **Charts (L3+L4)**: tokenized `ui/chart.tsx` Recharts wrapper + four primitives in `charts/` (area, bar, line, donut) with baked-in hover tooltips, active dots, legends, and center labels. New `--bl-chart-1…5` + `--bl-chart-grid/axis` tokens (both modes).
- **Components (L4)**: extracted 11 real reusable components into `composed/` (StatCard, KpiTile, MetricChartCard, DataTable, LoginForm, ContactForm, SettingsPanel, FeatureGrid, FaqAccordion, PricingTable, SurfaceNav) — no longer inline in the workspace.
- **Surfaces (L5)**: 4 genuinely interactive pages in `surfaces/` composed from `composed/` + `charts/` — dashboard nav switching + chart range toggle + sortable/searchable table; settings nav + live toggles + save confirmation; auth form validation + password toggle; landing hover cards + accordion.
- **Adherence**: swapped lucide → Phosphor across all 9 primitives that shipped with it; `sonner` now reads `data-mode`; updated Brand Identity + Token Discipline rule chapters to document the stone palette. `tsc` clean, production build green.

### 2026-06-20 — Skills, consistency, motion & the Playground

- **Best-practice skills installed** (`.claude/skills/` → `.agents/skills/`) and made always-on via `CLAUDE.md` + `AGENTS.md`: **frontend-design**, **interaction-design**, **vercel-react-best-practices**. The validation loop must confirm UI work honors them.
- **Consistent page width**: single source of truth in `src/lib/layout.ts` (`PAGE`), applied to every single-column workspace — no more per-page margin drift.
- **Interaction polish** (per interaction-design): buttons get `active:scale` press feedback + `--ease-out`/`--dur-instant`; cards transition border/shadow; workspace changes fade-in; the surface device toggle morphs smoothly. All honor `prefers-reduced-motion` via the motion tokens.
- **Playground** added as the top-of-stack design canvas (see §5).

## 9. Active workstreams

### 9.1 shadcn/ui component installation

✅ Done. 33 primitives + Chart installed and branded. See §7.

### 9.2 Documentation site

✅ Done. Five-tab workspace (Design Rules, Tokens, Primitives, Components, Surfaces) renders the real modules.

### 9.3 Component showcases

🔄 Primitives, Components, and Surfaces tabs each show live, interactive examples. Per-primitive variant/state matrices could still be expanded.

## 10. Open questions

| # | Question | Options |
|---|----------|---------|
| 1 | Font hosting strategy — self-host Geist + Satoshi, or use CDN/variable fonts? | Self-host for reliability vs. CDN for simplicity |
| 2 | Light mode priority — how much effort to invest in light mode polish for v0.1? | Functional parity vs. dark-only for now |
| ~~3~~ | ~~Chart/data-viz primitives — needed?~~ | **Resolved 2026-06-20: built on Recharts.** `charts/` primitives with tokenized `ChartContainer` and baked-in interaction. |

## 11. Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-06-20 | Token prefix is `--bl-*` | Short, distinctive, no collision with `--ct-*` (CodeTogether) or `--shad-*` (shadcn) |
| 2026-06-20 | Dark mode is primary/ground truth | Baseline brand identity is designed dark-first; the website, all marketing, and brand guide are dark |
| 2026-06-20 | Pill-shaped buttons (9999px radius) are the default | Signature Baseline visual element from the brand guide |
| 2026-06-20 | shadcn/ui as component base | Radix primitives provide accessibility out of the box; shadcn patterns are well-documented and composable |
| 2026-06-20 | Neutral ramp is warm **stone** (brown-grey), not zinc | Cold zinc read as "awful" against the orange brand; stone keeps a brown hue without going full black. Body `#100e0c`, not pure black. |
| 2026-06-20 | Borders are low-opacity white/black, set via `@layer base` | Tailwind's default `border` utility was emitting gray-200, producing harsh outlines. Forcing `border-color: var(--bl-border-divider)` on `*` fixes it system-wide. |
| 2026-06-20 | Phosphor is the only icon library; lucide removed | One icon system across primitives and app code; rule-compliant. Swapped lucide out of all 9 shadcn primitives that shipped with it. |
| 2026-06-20 | Composability enforced by imports, not convention | `surfaces → composed/charts → ui → tokens`. Workspaces render the real modules so docs and product can't drift. |
| 2026-06-20 | Recharts for data-viz, wrapped in tokenized ChartContainer | Series colors flow from `--bl-chart-*` via `--color-<key>` vars; components never pass raw hex to Recharts. |
| 2026-06-20 | Surfaces are live-preview iframes (one persistent iframe, postMessage theme) | A real viewport gives true responsive web/mobile; a single iframe resized (not remounted) makes the toggle instant. |
| 2026-06-20 | Dashboard rebuilt monochromatic-orange at reference fidelity | One dominant hue (orange) across charts/rings/buttons; green/red reserved for +/- deltas only. |
| 2026-06-20 | Three best-practice skills are part of the contract | frontend-design / interaction-design / vercel-react-best-practices, auto-loaded via CLAUDE.md so every session applies them. |
| 2026-06-20 | One shared `PAGE` width constant | Enforces identical page margins across workspaces — consistency in one place, not repeated literals. |
| 2026-06-20 | Playground is the top-of-stack authoring canvas | Compose from real blocks → export a Composition; can only emit on-system output, and feeds back as Surfaces. |
| 2026-06-20 | Pull in the full shadcn catalog | Enterprise/consumer apps need the whole toolbox; ~18 primitives added in one pass, all tokenized + Phosphor. |
| 2026-06-20 | DataTable built on @tanstack/react-table | Product-grade tables need real search/filter/sort/pagination/column-visibility/selection, not a hand-rolled `<table>`. |
| 2026-06-20 | `react-resizable-panels` pinned to v2 | v4 is a breaking rewrite (`Group`/`Separator`); shadcn's resizable targets the v2/v3 API. |
| 2026-06-20 | Slot sizing system (`src/lib/slots.ts`) | One 12-col grid vocabulary — full · two-thirds · half · third — for the Components gallery, Playground canvas, and dashboards. Plug-and-play. |
| 2026-06-20 | Components gallery uses sized slots, never full-width | A component gallery should read as a grid of slotted cards, not stacked full-width banners. |
| 2026-06-20 | Playground items are "components", not "blocks" | They ARE our components. Reserve "block/template" for larger pre-assembled page sections (the shadcn sense) if/when we add them. |
