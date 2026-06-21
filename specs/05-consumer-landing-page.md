# Consumer / Lifestyle Landing Page — Full Spec

Agency-quality marketing site for a consumer wellness/fintech product. Inspired by Mercury, Robinhood, Calm, Headspace, and Oura Ring. Warmer, more visual, lifestyle-oriented photography feel vs the SaaS page.

## Reference Products

- **Mercury** — banking for startups, clean dark aesthetic, trust signals everywhere
- **Oura Ring** — health wearable, lifestyle photography, score-based messaging
- **Calm** — meditation app, soothing gradients, nature imagery, emotional copy
- **Cash App** — bold colors, playful typography, youth-oriented
- **Whoop** — performance brand, data-forward, athletic lifestyle

## Product Concept

**"Pulse"** — A premium health and wellness platform that aggregates data from wearables, provides AI-powered insights, and coaches you toward better habits. Consumer-facing, subscription model.

---

## Section Architecture (top to bottom)

### 1. Navigation Bar (sticky, transparent → solid on scroll)
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Pulse     How it works  Features  Pricing    [Download App →]  │
└─────────────────────────────────────────────────────────────┘
```
- Transparent over hero, transitions to solid dark bg on scroll
- Minimal links (4-5 max)
- Single CTA: "Download App" or "Start free trial"
- Logo is a stylized pulse/heartbeat icon

### 2. Hero Section (full viewport height)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│           Your health,                                      │
│           understood.                                       │
│                                                             │
│     AI-powered health insights from every device you        │
│     already own. Sleep better. Train smarter.               │
│     Live longer.                                            │
│                                                             │
│     [Start free trial]    [Watch the video ▶]               │
│                                                             │
│                                                             │
│     ┌─────────────────────────────────────┐                 │
│     │                                     │                 │
│     │   [Phone mockup showing app UI:     │                 │
│     │    health score, rings, metrics]    │                 │
│     │                                     │                 │
│     └─────────────────────────────────────┘                 │
│                                                             │
│  "Join 250,000+ people optimizing their health"             │
│  ★★★★★ 4.9 on App Store | ★★★★★ 4.8 on Google Play        │
└─────────────────────────────────────────────────────────────┘
```

**Headline**: 56-72px, warm, personal. "Your health, understood." Not "Our platform enables..."
**Subhead**: 20px, emotional benefit-driven. Three short outcomes.
**CTAs**: Primary "Start free trial" + ghost "Watch the video" (with play icon)
**Visual**: Phone mockup (not screenshot) showing the app in action — floating, subtle shadow, maybe slight tilt. Behind: gradient glow in brand color (warm orange/amber).
**Social proof**: App store ratings + user count. Stars rendered as actual star icons.

### 3. Stats / Social Proof Bar
```
┌─────────────────────────────────────────────────────────────┐
│   250K+          4.9★         92%            12M+           │
│   Active users   App Store    Report better  Health data    │
│                  rating       sleep in 30d   points/day     │
└─────────────────────────────────────────────────────────────┘
```

Four large stats in a row. Animated count-up on scroll into view. Each: large number + label below.

### 4. Feature Showcase (alternating left/right)
```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌──────────────────────────────┐ │
│  │                     │  │  Sleep Score                  │ │
│  │   [Phone showing    │  │                              │ │
│  │    sleep tracking   │  │  Wake up knowing exactly     │ │
│  │    with hypnogram   │  │  how well you slept. Our AI  │ │
│  │    and score]       │  │  analyzes your sleep stages, │ │
│  │                     │  │  consistency, and            │ │
│  │                     │  │  environment to give you     │ │
│  │                     │  │  a personalized score.       │ │
│  │                     │  │                              │ │
│  │                     │  │  ✓ Sleep stage breakdown     │ │
│  │                     │  │  ✓ Smart alarm              │ │
│  │                     │  │  ✓ Bedtime reminders        │ │
│  └─────────────────────┘  └──────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────┐  ┌─────────────────────┐ │
│  │  Activity Rings              │  │                     │ │
│  │                              │  │  [Phone showing     │ │
│  │  Close your rings every day. │  │   activity rings    │ │
│  │  Track steps, workouts,     │  │   with workout      │ │
│  │  and active calories with   │  │   history]          │ │
│  │  data from any wearable.    │  │                     │ │
│  │                              │  │                     │ │
│  │  ✓ Apple Watch, Oura, WHOOP │  │                     │ │
│  │  ✓ Workout auto-detection   │  │                     │ │
│  │  ✓ Heart rate zones         │  │                     │ │
│  └──────────────────────────────┘  └─────────────────────┘ │
│                                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐ │
│  │                     │  │  AI Insights                  │ │
│  │   [Phone showing    │  │                              │ │
│  │    insight cards     │  │  "You sleep 23 min longer    │ │
│  │    with correlations│  │   on days you exercise        │ │
│  │    and tips]        │  │   before 6 PM."              │ │
│  │                     │  │                              │ │
│  │                     │  │  Personalized, data-backed   │ │
│  │                     │  │  recommendations that        │ │
│  │                     │  │  actually make a difference. │ │
│  └─────────────────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Three feature blocks, alternating image side (left/right/left). Each:
- Phone mockup or product screenshot
- Feature title (24px, bold)
- Description paragraph (16px, fg-secondary)
- 3 bullet points with check icons
- Subtle entrance animation (fade up on scroll)

### 5. How It Works
```
┌─────────────────────────────────────────────────────────────┐
│  "Get started in 3 minutes"                                 │
│                                                             │
│  ┌──────────────────┐                                       │
│  │ ① Download       │──→ Download Pulse from the App Store  │
│  │    [app icon]     │    or Google Play. Free to start.     │
│  ├──────────────────┤                                       │
│  │ ② Connect        │──→ Link your Apple Watch, Oura Ring,  │
│  │    [device icons] │    Fitbit, or any wearable.           │
│  ├──────────────────┤                                       │
│  │ ③ Discover       │──→ Within 24 hours, get your first    │
│  │    [insight card] │    personalized health insights.      │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

Vertical stepped timeline or horizontal 3-column. Each step:
- Numbered circle (orange)
- Title
- Visual (icon or mini screenshot)
- Short description
- Connector line/arrow between steps

### 6. Integrations / Device Compatibility
```
┌─────────────────────────────────────────────────────────────┐
│  "Works with everything you wear"                           │
│                                                             │
│  [Apple Watch] [Oura] [WHOOP] [Fitbit] [Garmin] [Samsung]  │
│  [Apple Health] [Google Fit] [Strava] [MyFitnessPal]        │
│                                                             │
│  "50+ integrations and growing"                             │
└─────────────────────────────────────────────────────────────┘
```

Grid of device/app logos. Grayscale by default, color on hover. Count of total integrations.

### 7. Testimonials (cards + photos)
```
┌─────────────────────────────────────────────────────────────┐
│  "What our members say"                                     │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ [Photo]       │ │ [Photo]       │ │ [Photo]       │     │
│  │               │ │               │ │               │     │
│  │ "Pulse helped │ │ "I've tried   │ │ "The sleep    │     │
│  │  me understand│ │  every health │ │  insights     │     │
│  │  why my       │ │  app. This is │ │  alone are    │     │
│  │  energy dips  │ │  the first one│ │  worth it."   │     │
│  │  at 2 PM."    │ │  I've kept    │ │               │     │
│  │               │ │  past a week."│ │ David K.      │     │
│  │ Maria S.      │ │               │ │ Triathlete    │     │
│  │ Working mom   │ │ James T.      │ │               │     │
│  │               │ │ Software eng  │ │               │     │
│  │ ★★★★★         │ │ ★★★★★         │ │ ★★★★★         │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

Consumer testimonials are more personal than SaaS:
- Larger avatar/photo (circular, lifestyle photo not headshot)
- Name + descriptor (role/lifestyle, not company)
- Star rating
- Shorter, more emotional quotes

### 8. Pricing
```
┌─────────────────────────────────────────────────────────────┐
│  "Choose your plan"                                         │
│  [Monthly ○──● Annual (2 months free)]                      │
│                                                             │
│  ┌────────────────────┐  ┌──────────────────────────┐       │
│  │  Free               │  │  Premium                 │       │
│  │                     │  │  [Most Popular]          │       │
│  │  $0                 │  │                          │       │
│  │                     │  │  $9.99/mo                │       │
│  │  ✓ Basic tracking   │  │  (or $7.99/mo annual)    │       │
│  │  ✓ 1 device         │  │                          │       │
│  │  ✓ 7-day history    │  │  ✓ Everything in Free    │       │
│  │                     │  │  ✓ Unlimited devices     │       │
│  │  [Get started]      │  │  ✓ Full history          │       │
│  │                     │  │  ✓ AI insights           │       │
│  │                     │  │  ✓ Custom goals          │       │
│  │                     │  │  ✓ Export data            │       │
│  │                     │  │  ✓ Priority support       │       │
│  │                     │  │                          │       │
│  │                     │  │  [Start free trial →]     │       │
│  └────────────────────┘  └──────────────────────────┘       │
│                                                             │
│  "7-day free trial on Premium. Cancel anytime."             │
└─────────────────────────────────────────────────────────────┘
```

Consumer pricing is simpler — 2 tiers max (Free + Premium), not 3. Annual toggle with "2 months free" language. Trial reassurance copy below.

### 9. App Download CTA
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         Start your health journey today                     │
│                                                             │
│     Download free on iOS and Android.                       │
│                                                             │
│     [App Store badge]    [Google Play badge]                │
│                                                             │
│     [QR code to download]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Full-width with warm gradient background. App store badges (not buttons). Optional QR code for desktop visitors.

### 10. Footer
```
┌─────────────────────────────────────────────────────────────┐
│  Pulse                   Product      Support      Legal    │
│  Your health,            Features     Help Center  Privacy  │
│  understood.             Pricing      Contact      Terms    │
│                          Integrations Community    HIPAA    │
│  © 2026 Pulse Health                               Cookie   │
│                                                    Settings │
│  [Instagram] [Twitter] [TikTok]                            │
└─────────────────────────────────────────────────────────────┘
```

Consumer footer: simpler than SaaS. Privacy/HIPAA compliance links for health product. Social channels: Instagram and TikTok (not GitHub/Discord like SaaS).

---

## Key Design Differences: Consumer vs SaaS

| Aspect | SaaS (Spec 04) | Consumer (This Spec) |
|--------|----------------|---------------------|
| **Tone** | Technical, capability-focused | Emotional, outcome-focused |
| **Headlines** | "Build better products, faster" | "Your health, understood" |
| **Proof** | Company logos, team sizes | User count, app ratings, reviews |
| **Visuals** | Product screenshots, code | Phone mockups, lifestyle photography |
| **CTAs** | "Get started" / "View docs" | "Download app" / "Start trial" |
| **Pricing** | 3 tiers, feature matrix | 2 tiers (Free/Premium), simple list |
| **Social** | GitHub, Discord, Twitter | Instagram, TikTok, Twitter |
| **Testimonials** | Title + company | Name + lifestyle role |
| **Footer** | Docs, Blog, API | Help Center, Privacy, HIPAA |
| **Motion** | Subtle, professional | Warmer, more playful entrance |
| **Typography** | Mono accents, sharp | Rounded, warm, more whitespace |

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| `>= 1280px` | Full layout, alternating feature blocks side by side |
| `1024-1279px` | Feature blocks stack (image above text) |
| `768-1023px` | Pricing side by side, stats 2x2 grid |
| `< 768px` | Everything single column, nav → hamburger, stats vertical |

---

## Component Mapping

| Section | shadcn Components |
|---------|-------------------|
| Nav | custom transparent→solid header + Button |
| Hero | heading + Button pair + floating phone mockup |
| Stats Bar | Card (borderless) + animated counter |
| Feature Block | two-column layout + check list + image |
| How It Works | vertical timeline or step cards |
| Integrations | logo grid (custom) |
| Testimonials | Card + Avatar + star rating |
| Pricing | Card + Switch (toggle) + Badge + Button |
| App CTA | section with gradient + app store badges |
| Footer | grid columns + social links |

---

## New Components Needed

1. **PhoneMockup** — phone frame wrapper for app screenshots
2. **AnimatedCounter** — scroll-triggered number count-up
3. **FeatureShowcase** — alternating image/text block with check list
4. **StepTimeline** — vertical numbered steps with connectors
5. **AppStoreBadges** — iOS + Android download buttons
6. **StarRating** — 5-star display component
7. **IntegrationGrid** — logo grid with grayscale→color hover
8. **TransparentNav** — nav that transitions from transparent to solid on scroll
