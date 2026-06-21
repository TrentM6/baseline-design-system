# SaaS Product Landing Page — Full Spec

Agency-quality marketing site for a developer-tools SaaS product. Inspired by Linear, Vercel, Resend, Clerk, and Cal.com. Dark-first, technical but accessible, with considered motion and typography.

## Reference Products

- **Linear** — minimal, dark, animated product shots, speed-focused copy
- **Vercel** — gradient hero, globe/grid visuals, DX-focused messaging
- **Resend** — clean dark design, code examples inline, developer-first
- **Clerk** — auth product, component previews inline, trust signals
- **Cal.com** — open-source messaging, comparison tables, community proof

## Product Concept

**"Baseline"** — A composable design system platform. The landing page markets Baseline itself.

---

## Section Architecture (top to bottom)

### 1. Navigation Bar (sticky)
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Baseline    Features  Pricing  Docs  Blog    [Sign in] [Get Started →] │
└─────────────────────────────────────────────────────────────┘
```
- Sticky on scroll, backdrop blur + subtle border on scroll
- Logo + wordmark left
- Nav links center (desktop) / hamburger (mobile)
- CTA buttons right: ghost "Sign in" + primary "Get Started"
- Active section indicator (dot or underline) via IntersectionObserver

### 2. Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                    [Badge: "Now in Beta"]                    │
│                                                             │
│           Build better products, faster                     │
│                                                             │
│     The composable design system that scales from            │
│     prototype to production. Every token, primitive,        │
│     and component — connected.                              │
│                                                             │
│        [Get started — free →]    [View docs]                │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │     [Product screenshot / animated preview]             ││
│  │     showing the design system app with                  ││
│  │     token inspector, component gallery,                 ││
│  │     and live surface preview                            ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  "Trusted by teams at"                                      │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                 │
└─────────────────────────────────────────────────────────────┘
```

**Headline**: 48-64px, font-heading, bold. One clear benefit statement.
**Subhead**: 18-20px, fg-secondary, max 2 lines. Explain what + why.
**CTAs**: Primary (filled orange) + Secondary (ghost/outline). Both large.
**Visual**: Full-width product screenshot with subtle perspective transform, floating in a gradient glow. OR animated component assembly showing primitives composing into a surface.
**Social proof**: Logo row of 5-6 recognizable companies (grayscale, subtle).

### 3. Feature Bento Grid
```
┌─────────────────────────────────────────────────────────────┐
│  "Everything you need"                                      │
│  [Subhead explaining the composable architecture]           │
│                                                             │
│  ┌───────────────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │                       │ │              │ │            │ │
│  │  Token System         │ │  40+ Prims   │ │ Composable │ │
│  │                       │ │              │ │            │ │
│  │  Semantic tokens with │ │  shadcn/ui   │ │ Build any  │ │
│  │  dark/light support.  │ │  primitives  │ │ surface    │ │
│  │  One source of truth. │ │  branded     │ │ from parts │ │
│  │                       │ │  with your   │ │            │ │
│  │  [token swatch grid]  │ │  tokens.     │ │ [diagram]  │ │
│  │                       │ │              │ │            │ │
│  └───────────────────────┘ └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌───────────────────────────────────────┐ │
│  │              │ │                                       │ │
│  │  WCAG 2.2 AA │ │  Real-Time Preview                    │ │
│  │              │ │                                       │ │
│  │  Every comp  │ │  See changes instantly. Toggle dark/  │ │
│  │  meets a11y  │ │  light. Switch web/mobile. Every      │ │
│  │  standards.  │ │  surface renders live.                │ │
│  │              │ │                                       │ │
│  │  [checklist] │ │  [browser preview mockup]             │ │
│  └──────────────┘ └───────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Bento grid**: asymmetric card layout (NOT a uniform grid). Mix of tall, wide, and square cards. Each card:
- Icon (Phosphor, 24px, orange)
- Title (18px, bold)
- Description (14px, fg-secondary, 2-3 lines)
- Visual element (code snippet, screenshot, diagram, swatch grid, or icon grid)
- Subtle border, elevated bg on hover

### 4. How It Works
```
┌─────────────────────────────────────────────────────────────┐
│  "How it works"                                             │
│                                                             │
│  ① Define tokens        ② Install primitives   ③ Compose   │
│  Set your color palette  Add shadcn/ui atoms    Build full  │
│  type scale, spacing,    branded with your      surfaces    │
│  and motion in one       token system. Every    from your   │
│  CSS file.               variant, every state.  library.    │
│                                                             │
│  [bl-tokens.css code]    [component preview]    [surface]   │
└─────────────────────────────────────────────────────────────┘
```

Three numbered steps, each with:
- Step number (large, orange, bold)
- Title + description
- Visual (code snippet, component render, or full page preview)
- Connected by a subtle line or arrow

### 5. Product Demo / Code Example
```
┌─────────────────────────────────────────────────────────────┐
│  "Ship production UI in minutes"                            │
│                                                             │
│  ┌────────────────────┐  ┌────────────────────────────────┐ │
│  │ // Code editor      │  │ Live preview                   │ │
│  │                     │  │                                │ │
│  │ import { Card,     │  │ ┌──────────────────────────┐   │ │
│  │   Button } from    │  │ │  Rendered component      │   │ │
│  │   "@baseline/ui"   │  │ │  exactly as coded        │   │ │
│  │                     │  │ │                          │   │ │
│  │ <Card>             │  │ └──────────────────────────┘   │ │
│  │   <CardHeader>     │  │                                │ │
│  │   ...              │  │                                │ │
│  └────────────────────┘  └────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Split view: code on left, live render on right. Syntax-highlighted code block. Shows how simple the API is.

### 6. Testimonials
```
┌─────────────────────────────────────────────────────────────┐
│  "Loved by builders"                                        │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ "Baseline cut  │ │ "Finally a    │ │ "The token    │     │
│  │  our design    │ │  design system│ │  system is    │     │
│  │  handoff time  │ │  that doesn't │ │  exactly what │     │
│  │  by 60%."      │ │  fight you."  │ │  we needed."  │     │
│  │                │ │               │ │               │     │
│  │ ○ Sarah Chen   │ │ ○ Mike Torres │ │ ○ Aisha Patel │     │
│  │ VP Design,     │ │ Staff Eng,    │ │ Design Lead,  │     │
│  │ Acme Corp      │ │ Widget Inc    │ │ Startup X     │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

Three testimonial cards in a row:
- Pull quote (16px, fg-primary, italic)
- Avatar + Name + Title + Company
- Optional company logo
- Cards: subtle border, bg-elevated

### 7. Pricing
```
┌─────────────────────────────────────────────────────────────┐
│  "Simple pricing"                                           │
│  [Monthly ○──● Annual (save 20%)]                           │
│                                                             │
│  ┌───────────────┐ ┌───────────────────┐ ┌───────────────┐ │
│  │ Starter        │ │ Pro (Popular)     │ │ Enterprise     │ │
│  │ For small teams│ │ For growing teams │ │ For orgs      │ │
│  │                │ │                   │ │               │ │
│  │ $0             │ │ $49              │ │ Custom        │ │
│  │ /month         │ │ /month            │ │               │ │
│  │                │ │                   │ │               │ │
│  │ ✓ 5 components │ │ ✓ Unlimited       │ │ ✓ Everything  │ │
│  │ ✓ 2 surfaces   │ │ ✓ Unlimited       │ │ ✓ SSO/SAML   │ │
│  │ ✓ Community    │ │ ✓ Priority support│ │ ✓ SLA         │ │
│  │ ✓ Dark mode    │ │ ✓ Custom tokens   │ │ ✓ Dedicated   │ │
│  │                │ │ ✓ Export code     │ │   success     │ │
│  │ [Get started]  │ │ [Get started →]   │ │ [Contact us]  │ │
│  └───────────────┘ └───────────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- Three tiers in columns
- Middle tier highlighted (orange border, "Popular" badge)
- Monthly/Annual toggle (annual shows strikethrough original price)
- Feature list with checkmarks
- CTA button per tier

### 8. FAQ
```
┌─────────────────────────────────────────────────────────────┐
│  "Frequently asked questions"                               │
│                                                             │
│  ▸ What technologies does Baseline use?                     │
│  ▸ Can I use Baseline with Next.js?                         │
│  ▸ Is Baseline accessible?                                  │
│  ▸ How do I customize the token system?                     │
│  ▸ Do you offer team plans?                                 │
│  ▸ Can I export production-ready code?                      │
└─────────────────────────────────────────────────────────────┘
```

Accordion component. 6-8 questions. Smooth expand/collapse animation.

### 9. CTA Banner
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         Ready to build better products?                     │
│                                                             │
│  Start for free — no credit card required.                  │
│                                                             │
│              [Get started — free →]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Full-width section with gradient background (subtle orange glow). Centered headline + CTA.

### 10. Footer
```
┌─────────────────────────────────────────────────────────────┐
│  Baseline                Product     Resources    Company   │
│  The composable          Features    Docs         About     │
│  design system.          Pricing     Blog         Careers   │
│                          Changelog   Community    Contact   │
│  © 2026 Baseline                     GitHub       Legal     │
│                                                             │
│  [Twitter] [GitHub] [Discord]                               │
└─────────────────────────────────────────────────────────────┘
```

Four-column footer: brand + 3 link columns. Social icons. Legal links. Dark bg.

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| `>= 1280px` | Full layout as shown above |
| `1024-1279px` | Bento grid reflows to 2-col |
| `768-1023px` | Pricing stacks to 1-col, hero image below text |
| `< 768px` | Nav → hamburger, everything single-col, testimonials carousel |

---

## Component Mapping

| Section | shadcn Components |
|---------|-------------------|
| Nav | custom sticky header + NavigationMenu + Button |
| Hero | Badge + heading + Button pair |
| Bento Grid | Card grid (asymmetric) + Icon |
| How It Works | numbered steps + code block + Card |
| Code Demo | custom split pane + syntax highlighter |
| Testimonials | Card + Avatar + quote text |
| Pricing | Card + Badge + Switch (toggle) + Button |
| FAQ | Accordion + AccordionItem |
| CTA Banner | section with gradient bg + Button |
| Footer | grid columns + social icon links |

---

## New Components Needed

1. **StickyNav** — scroll-aware navbar with backdrop blur + active section tracking
2. **BentoGrid** — asymmetric card layout with mixed sizes
3. **CodePreview** — split code editor + live render panel
4. **PricingToggle** — monthly/annual switch with price animation
5. **TestimonialCard** — quote + avatar + attribution
6. **CTABanner** — full-width gradient section with centered content
7. **LogoCloud** — responsive row of grayscale partner logos
8. **FooterColumns** — multi-column footer with link groups
