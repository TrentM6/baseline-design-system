# Baseline Design System — Living Spec

> **What this is.** The product spec for the Baseline design system project. It is the single living source of truth for the system's mission, scope, architecture, current state, and what's next. **What this is not.** This is not the operating contract — that's [AGENTS.md](AGENTS.md), which tells agents and humans how to work in the project. The spec tells you what the project *is*; AGENTS.md tells you how to *behave* inside it.

---

## 1. Mission

The Baseline Design System exists to be the visual and behavioral foundation underneath every Baseline product surface. One token graph, one set of base components, one accessibility floor, one motion grammar — composed into every website, app, dashboard, and tool that carries the Baseline brand.

The mission has three concrete deliverables:

1. **A ratified token graph** — every color, type size, spacing step, radius, motion duration, easing curve, shadow, and surface tier exists as a documented semantic token with both dark and light values. Components consume semantic tokens; the base palette is for token authoring only.
2. **A composable component layer** — a set of shadcn/ui base components that every higher-level component must compose from. New components do not author tokens or styles inline; they assemble base components.
3. **Living documentation** — the source of truth for every standard. Every component has a spec; every standard has a chapter; every approved component has documentation.

## 2. Non-goals

- **Be a general-purpose UI library.** The audience is Baseline products, not the open-source community.
- **Track parity with upstream shadcn.** We borrow patterns where they fit; our token graph and component contract are ours.
- **Support every device.** Desktop is the primary target. Responsive consideration applies where it lands cleanly.
- **Generate component code from Figma.** Designs land as decisions; code lands by hand against those decisions.

## 3. Principles

1. **Tokens, never literals.** No raw hex / rgb / hsl in JSX or CSS. Every color resolves to a semantic token with both modes.
2. **Compose from base components.** Higher-level components route every interactive control, status indicator, and surface through a documented base component.
3. **Add at the right level.** When the system is missing something, mint the new piece at the atomic level — never inline at the component level.
4. **WCAG 2.2 AA is non-negotiable.** Contrast, focus, keyboard, accessible names, no info-by-color-alone.
5. **Dark mode is ground truth.** Color decisions are made in dark first; light values are derived expressions of the same semantic intent.
6. **Decisions update the docs in the same turn.** New token, new pattern, status change — the chapter and the code move together.

## 4. Brand identity

### Color philosophy

The palette is **orange/slate** — warm brand-orange accents (`--bl-orange-*`, brand hex `#fe4506`, OKLCH hue ~34°) over cool blue-gray neutrals (`--bl-slate-*`), defined in OKLCH color space. This creates a refined, cohesive feel across both modes. The brand is dark-first by design.

### Typography

- **Headings:** Geist (sans-serif)
- **Body:** Satoshi (sans-serif)
- **Mono:** System monospace stack

### Visual identity markers

- **Tight, small border radius** (2–8px scale) — compact corners on every component
- **Orange/slate palette** — warm brand-orange accents over cool blue-gray neutrals, OKLCH-defined
- **Dark backgrounds with cool slate undertones** — body `oklch(0.148 0.004 228.8)`, surface `oklch(0.218 0.008 223.9)`
- **Surface elevation via slate layering** — body → surface → elevated → chrome, each step lighter in the slate ramp
- **Section numbering** in content (01 // SECTION NAME)

## 5. System architecture

### Five layers

```
┌──────────────────────────────────────────────────────────┐
│ L4  Components       Cards, forms, tables, chart cards     │  ← src/components/composed/
│     Charts           Recharts data-viz (area/bar/line/pie) │  ← src/components/charts/
├──────────────────────────────────────────────────────────┤
│ L3  Components       shadcn/ui base + ChartContainer       │  ← src/components/ui/
├──────────────────────────────────────────────────────────┤
│ L2  Semantic tokens  Role-named: --bl-bg-body, --bl-fg-… │  ← bl-tokens.css (semantic)
├──────────────────────────────────────────────────────────┤
│ L1  Base palette     --bl-orange-500, --bl-slate-950, …   │  ← bl-tokens.css (palette)
│                      Authoring only — components don't    │
└──────────────────────────────────────────────────────────┘
```

The composition rule: **L4 composes from L3 only**. **L3 composes from L2 only**. **L2 references L1 only**. **L1 stands alone** (literal hex).

**Playground (the design canvas)** sits on top of the whole stack as the primary
authoring tool: `src/workspaces/playground/` lets you place components (any L4
component or chart) onto a device-framed canvas, optionally wrapped in an app
shell (SurfaceShell), reorder/duplicate/remove them, and **export a
self-contained `Composition` component** (merged imports + JSX) to reuse in
external projects. Components are registered in `component-registry.tsx`;
everything it offers is a real system component, so the canvas can only ever
produce on-system output. In **App Shell** mode, the canvas wraps placed
components in a SurfaceShell with sidebar navigation, header chrome, and a
content area — producing a realistic page layout, not floating components.

This is **enforced by the import graph**, not just convention: `composed/*` and `charts/*` import from `ui/*`; `ui/*` consume `--bl-*` tokens via the Tailwind mapping. Each workspace tab (Design Rules, Tokens, Components, Playground) renders the real modules from these directories — the docs and the product are the same code. The neutral ramp is **cool slate** (`--bl-slate-*`, blue-gray), defined in OKLCH.

## 6. Foundations inventory

Status legend: ✅ ratified · 🔄 in progress · ⬜ planned

| Axis | Status | Notes |
|---|---|---|
| Color (palette + semantic) | ✅ | Orange/slate in OKLCH. `--bl-*` tokens with dark + light values. |
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
- Baseline brand colors (amber/slate palette in OKLCH), typography (Geist + Satoshi), surface elevation
- Agentic operating contract (`AGENTS.md`) with accessibility rules, composition rules, token discipline
- Living spec (`DESIGN-SYSTEM-SPEC.md`) with five-layer architecture
- Starter `App.tsx` with color palette, typography, button, card, and spacing showcases

### 2026-06-20 — Composable chain + Recharts + warm palette

Made the five-layer architecture real and enforced by imports, end to end:

- **App shell** switched from a top-bar tab strip to the shadcn `Sidebar` (`SidebarProvider`/`SidebarInset`), real Baseline logo, Phosphor nav icons.
- **Neutral palette** rebuilt to cool **slate** (`--bl-slate-*`, blue-gray in OKLCH) — body `oklch(0.148 0.004 228.8)`, surface `oklch(0.218 0.008 223.9)`. Borders use low-opacity patterns and are forced onto Tailwind's default border via an `@layer base` rule.
- **Charts (L3+L4)**: tokenized `ui/chart.tsx` Recharts wrapper + four primitives in `charts/` (area, bar, line, donut) with baked-in hover tooltips, active dots, legends, and center labels. New `--bl-chart-1…5` + `--bl-chart-grid/axis` tokens (both modes).
- **Components (L4)**: extracted 11 real reusable components into `composed/` (StatCard, KpiTile, MetricChartCard, DataTable, LoginForm, ContactForm, SettingsPanel, FeatureGrid, FaqAccordion, PricingTable, SurfaceNav) — no longer inline in the workspace.
- **Surfaces removed as a pre-made layer**: page compositions are now built in the Playground via the app shell canvas mode and exported as self-contained code.
- **Adherence**: swapped lucide → Phosphor across all 9 primitives that shipped with it; `sonner` now reads `data-mode`; updated Brand Identity + Token Discipline rule chapters. `tsc` clean, production build green.

### 2026-06-20 — Skills, consistency, motion & the Playground

- **Best-practice skills installed** (`.claude/skills/` → `.agents/skills/`) and made always-on via `CLAUDE.md` + `AGENTS.md`: **frontend-design**, **interaction-design**, **vercel-react-best-practices**. The validation loop must confirm UI work honors them.
- **Consistent page width**: single source of truth in `src/lib/layout.ts` (`PAGE`), applied to every single-column workspace — no more per-page margin drift.
- **Interaction polish** (per interaction-design): buttons get `active:scale` press feedback + `--ease-out`/`--dur-instant`; cards transition border/shadow; workspace changes fade-in; the surface device toggle morphs smoothly. All honor `prefers-reduced-motion` via the motion tokens.
- **Playground** added as the top-of-stack design canvas (see §5).

## 9. Active workstreams

### 9.1 shadcn/ui component installation

✅ Done. 33 primitives + Chart installed and branded. See §7.

### 9.2 Documentation site

✅ Done. Four-tab workspace (Design Rules, Tokens, Components, Playground) renders the real modules. Primitives are a sub-view within Components.

### 9.3 Component showcases

🔄 Components tab shows both composed components (Gallery) and primitives (sub-view). Per-primitive variant/state matrices could still be expanded.

## 10. Open questions

| # | Question | Options |
|---|----------|---------|
| 1 | Font hosting strategy — self-host Geist + Satoshi, or use CDN/variable fonts? | Self-host for reliability vs. CDN for simplicity |
| 2 | Light mode priority — how much effort to invest in light mode polish for v0.1? | Functional parity vs. dark-only for now |
| ~~3~~ | ~~Chart/data-viz primitives — needed?~~ | **Resolved 2026-06-20: built on Recharts.** `charts/` primitives with tokenized `ChartContainer` and baked-in interaction. |

## 11. Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-07-18 | Light mode mirrors dark's surface ladder | Dark (ground truth) separates well→chrome→page→panel in clear ΔL steps (0.10→0.21→…); light had collapsed to near-identical whites (well = chrome = zinc-100), so surfaces blended. Light now: well zinc-300 < chrome zinc-100 < page zinc-50 < panel white — same hierarchy, L reversed per the OKLCH derive-by-reversing-L rule. `--bl-sidebar-border` became alpha black 8% (mirror of dark's white 6%) so one hairline reads on chrome and well alike. |
| 2026-07-17 | Craft layer ratified from Jakub Krehel's better-ui / better-typography / better-colors (jakub.kr) | Shadows-over-borders (`--bl-shadow-raised`/`-hover`), concentric radius, scale-on-press (`--press-scale`), image outlines (`--bl-outline-image`), split/stagger enter motion (`--dur-enter`/`--ease-enter`/`--stagger`), and OKLCH ramp/gamut/gradient rules. New **Surface Details** chapter; Transitions/Motion/Typography/Color-Contrast/Color-Psychology chapters enriched; AGENTS.md product conventions extended. Baseline HQ is adopting jakub.kr's craft bar — encoding the rules + tokens here (design law) so every Baseline product inherits them. |
| 2026-06-20 | Token prefix is `--bl-*` | Short, distinctive, no collision with `--ct-*` (CodeTogether) or `--shad-*` (shadcn) |
| 2026-06-20 | Dark mode is primary/ground truth | Baseline brand identity is designed dark-first; the website, all marketing, and brand guide are dark |
| 2026-06-21 | Small border radius (2–8px) across all components | Tight corners give a sharp, modern look. Replaces the earlier pill-shaped button decision. |
| 2026-06-20 | shadcn/ui as component base | Radix primitives provide accessibility out of the box; shadcn patterns are well-documented and composable |
| 2026-06-20 | Neutral ramp is **zinc** (subtle cool gray in OKLCH) | Cool undertone creates temperature contrast with the warm orange brand. Body `oklch(0.141 0.004 285.8)`. |
| 2026-06-20 | Borders are low-opacity white/black, set via `@layer base` | Tailwind's default `border` utility was emitting gray-200, producing harsh outlines. Forcing `border-color: var(--bl-border-divider)` on `*` fixes it system-wide. |
| 2026-06-20 | Phosphor is the only icon library; lucide removed | One icon system across primitives and app code; rule-compliant. Swapped lucide out of all 9 shadcn primitives that shipped with it. |
| 2026-06-20 | Composability enforced by imports, not convention | `composed/charts → ui → tokens`. Workspaces render the real modules so docs and product can't drift. |
| 2026-06-20 | Recharts for data-viz, wrapped in tokenized ChartContainer | Series colors flow from `--bl-chart-*` via `--color-<key>` vars; components never pass raw hex to Recharts. |
| 2026-06-20 | Surfaces layer removed — Playground is the builder | Page compositions are created in the Playground with optional app shell wrapping, not pre-made as a separate layer. |
| 2026-06-21 | Palette settled: orange #fe4506 + zinc neutrals | Brand orange at 400 stop with exact hex-to-OKLCH conversions. Zinc (Tailwind) for neutrals — subtle cool undertone makes the warm orange pop without competing. |
| 2026-06-20 | Three best-practice skills are part of the contract | frontend-design / interaction-design / vercel-react-best-practices, auto-loaded via CLAUDE.md so every session applies them. |
| 2026-06-20 | One shared `PAGE` width constant | Enforces identical page margins across workspaces — consistency in one place, not repeated literals. |
| 2026-06-20 | Playground is the top-of-stack authoring canvas | Compose from real components → export a Composition; can only emit on-system output. App Shell mode wraps compositions in SurfaceShell for realistic page layouts. |
| 2026-06-20 | Pull in the full shadcn catalog | Enterprise/consumer apps need the whole toolbox; ~18 primitives added in one pass, all tokenized + Phosphor. |
| 2026-06-20 | DataTable built on @tanstack/react-table | Product-grade tables need real search/filter/sort/pagination/column-visibility/selection, not a hand-rolled `<table>`. |
| 2026-06-20 | `react-resizable-panels` pinned to v2 | v4 is a breaking rewrite (`Group`/`Separator`); shadcn's resizable targets the v2/v3 API. |
| 2026-06-20 | Slot sizing system (`src/lib/slots.ts`) | One 12-col grid vocabulary — full · two-thirds · half · third — for the Components gallery, Playground canvas, and dashboards. Plug-and-play. |
| 2026-06-20 | Components gallery uses sized slots, never full-width | A component gallery should read as a grid of slotted cards, not stacked full-width banners. |
| 2026-06-20 | Playground items are "components", not "blocks" | They ARE our components. Reserve "block/template" for larger pre-assembled page sections (the shadcn sense) if/when we add them. |
