# SaaS Analytics Dashboard — Full Application Spec

Production-level product analytics application inspired by PostHog, Mixpanel, Amplitude, and Stripe Dashboard. Multi-page with real-time metrics, funnels, retention analysis, and revenue tracking.

## Reference Products

- **PostHog** — open-source, event-based, funnels/retention/paths, session replay
- **Mixpanel** — event analytics, funnels, flows, cohorts, flexible query builder
- **Amplitude** — behavioral analytics, experimentation, audiences, notebooks
- **Stripe Dashboard** — revenue metrics, MRR/churn/ARPU, clean data tables
- **Plausible** — simple web analytics, privacy-first, essential metrics only

## Navigation (Sidebar)

| Route | Label | Icon | Description |
|-------|-------|------|-------------|
| `/` | Home | House | Key metrics overview, recent activity, alerts |
| `/events` | Events | Lightning | Event stream, event definitions, volume chart |
| `/funnels` | Funnels | Funnel | Conversion funnels with step-by-step drop-off |
| `/retention` | Retention | ArrowsClockwise | Cohort retention tables, retention curves |
| `/users` | Users | Users | User list, profiles, segments, cohorts |
| `/revenue` | Revenue | CurrencyDollar | MRR, churn, ARPU, LTV, subscription analytics |
| `/dashboards` | Dashboards | SquaresFour | Saved dashboards, custom report builder |
| `/settings` | Settings | Gear | Project, team, data governance, integrations |

---

## Page 1: Home / Overview

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Overview" | Period: [Last 7 days ▼] | Compare: [Previous ▼]│
├─────────────────────────────────────────────────────────────┤
│ [4 KPI Cards: Users | Sessions | Events | Conversion]       │
├───────────────────────────────┬─────────────────────────────┤
│ Active Users Trend (2/3)      │ Top Events (1/3)            │
│ Area chart: DAU/WAU/MAU       │ Ranked list:                │
│ - Toggle between DAU/WAU/MAU  │ 1. page_view — 142k        │
│ - Previous period overlay     │ 2. button_click — 38k       │
│ - Annotations for releases    │ 3. signup — 2.4k            │
│                               │ 4. purchase — 890           │
│                               │ 5. share — 650              │
├───────────────────────────────┼─────────────────────────────┤
│ Key Funnel Summary (1/2)      │ Alerts & Anomalies (1/2)    │
│ Mini funnel bars:             │ • Signup rate dropped 15%    │
│ Visit → Signup → Activate     │   compared to last week     │
│ 100% → 12% → 8.4%            │ • Event volume spike: 3.2x  │
│                               │   on "export_report" today  │
│ [View full funnel →]          │ • DAU hit all-time high     │
└───────────────────────────────┴─────────────────────────────┘
```

### KPI Cards
| Metric | Value | Change | Sparkline |
|--------|-------|--------|-----------|
| Active Users | 12,847 | +8.3% vs prev period | 7-day mini area |
| Sessions | 48,210 | +5.1% | 7-day mini area |
| Total Events | 1.2M | +12.7% | 7-day mini area |
| Conversion Rate | 3.4% | -0.2pp | 7-day mini line |

Each card: large number, delta badge (green up / red down), sparkline of the period.

### Active Users Chart
- Stacked area chart
- Three toggleable series: DAU, WAU, MAU
- Dotted overlay of previous period for comparison
- Release markers as vertical annotations
- Tooltip with exact values + delta

---

## Page 2: Events

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Events" | [+ Define Event] | Search events...              │
├─────────────────────────────────────────────────────────────┤
│ Event Volume Chart (full width)                             │
│ Stacked area: event volume by top 5 events over time        │
│ - Toggle between stacked/individual                         │
│ - Date range selector                                       │
├─────────────────────────────────────────────────────────────┤
│ Event Definitions Table (full width)                        │
│ Name | Volume (7d) | Trend | First Seen | Last Seen | Props │
│────────────────────────────────────────────────────────────│
│ page_view     | 142,380 | ━━━━━ | Jan 1  | Today | 8      │
│ button_click  | 38,210  | ━━━━  | Jan 1  | Today | 12     │
│ signup        | 2,412   | ━━━   | Jan 1  | Today | 5      │
│ purchase      | 890     | ━━    | Jan 15 | Today | 14     │
│ file_upload   | 3,847   | ━━━   | Feb 2  | Today | 3      │
├─────────────────────────────────────────────────────────────┤
│ Live Event Stream (full width, collapsible)                 │
│ Real-time scrolling feed of events with properties          │
│ timestamp | event | user | properties (expandable JSON)     │
└─────────────────────────────────────────────────────────────┘
```

### Event Table
- Sortable by name, volume, trend
- Inline sparkline showing 7-day volume trend
- Click event name → detail view with property breakdown, user distribution
- Property count indicates number of distinct properties tracked

### Live Stream
- Auto-scrolling feed of most recent events
- Each row: timestamp, event name (color-coded), anonymous user ID, property preview
- Pause/resume button
- Filter by event type

---

## Page 3: Funnels

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Funnels" | Saved: [Signup Funnel ▼] | [+ New Funnel]       │
├─────────────────────────────────────────────────────────────┤
│ Funnel Builder                                              │
│ Step 1: [page_view ▼] where [page = "/pricing" ▼]           │
│ Step 2: [signup_start ▼]                                    │
│ Step 3: [signup_complete ▼]                                  │
│ Step 4: [first_action ▼]                                    │
│ [+ Add Step] | Within: [7 days ▼] | [Run Query]             │
├─────────────────────────────────────────────────────────────┤
│ Funnel Visualization (full width)                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Step 1          Step 2          Step 3         Step 4   │ │
│ │ ████████████    ████████        ████████       █████    │ │
│ │ 10,000 (100%)   4,200 (42%)    2,800 (28%)    1,400    │ │
│ │                 ↓ 58% drop      ↓ 33% drop    (14%)    │ │
│ │                                                ↓ 50%    │ │
│ └─────────────────────────────────────────────────────────┘ │
├───────────────────────────────┬─────────────────────────────┤
│ Conversion Over Time (1/2)    │ Breakdown (1/2)             │
│ Line chart: overall conversion│ Bars by property:           │
│ rate trend (daily)            │ - By country                │
│                               │ - By device                 │
│                               │ - By UTM source             │
└───────────────────────────────┴─────────────────────────────┘
```

### Funnel Visualization
- Horizontal bar chart with decreasing width per step
- Each bar labeled with count and percentage
- Drop-off percentage between bars
- Color gradient from brand to muted as conversion decreases
- Hover bar → show median time between steps

### Breakdown
- Split funnel by any event property
- Horizontal grouped bars showing conversion by segment
- Top 5 values + "Other" bucket

---

## Page 4: Retention

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Retention" | Cohort: [signup_complete ▼] | Return: [any ▼] │
│ Period: [Weekly ▼] | Range: [Last 12 weeks ▼]               │
├─────────────────────────────────────────────────────────────┤
│ Retention Curve (full width)                                │
│ Multi-line chart: each line = one cohort's retention over   │
│ time. X = weeks since signup, Y = % retained               │
│ - Highlight current cohort                                  │
│ - Benchmark line (all-time average)                         │
├─────────────────────────────────────────────────────────────┤
│ Cohort Table (full width)                                   │
│           │ Week 0 │ Week 1 │ Week 2 │ Week 3 │ ...        │
│ Jun 9-15  │ 450    │ 68%    │ 52%    │ 41%    │ ...        │
│ Jun 2-8   │ 512    │ 71%    │ 55%    │ 44%    │ 38%        │
│ May 26-1  │ 488    │ 65%    │ 48%    │ 39%    │ 34%        │
│ May 19-25 │ 520    │ 70%    │ 54%    │ 43%    │ 37%        │
│                                                             │
│ (cells color-coded: green = high retention, red = low)      │
└─────────────────────────────────────────────────────────────┘
```

### Cohort Table
- Rows = cohorts (grouped by signup week/month)
- Columns = periods since signup (Week 0, 1, 2, ...)
- Cell values = retention percentage
- Cell color = heat map (dark green → light green → yellow → red)
- Week 0 column shows cohort size (absolute number)
- Hover cell → tooltip with absolute count

### Retention Curve
- Each cohort is a line
- Hover to highlight one cohort
- Average/benchmark line is dashed

---

## Page 5: Users

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Users" | [+ Create Segment] | Search users...              │
├─────────────────────────────────────────────────────────────┤
│ Segments (horizontal tabs)                                  │
│ [All Users (12,847)] [Active (8,420)] [New (2,100)]          │
│ [At Risk (1,200)] [Power Users (890)]                       │
├─────────────────────────────────────────────────────────────┤
│ User Table (full width)                                     │
│ User | Email | Plan | Events (7d) | Last Seen | Signed Up   │
│──────────────────────────────────────────────────────────── │
│ ○ Jane C. | jane@... | Pro     | 142  | 2h ago   | Jan 15  │
│ ○ Mike T. | mike@... | Free    | 23   | 1d ago   | Mar 2   │
│ ○ Sarah L.| sarah@...| Enterprise| 380 | Just now | Nov 8  │
├─────────────────────────────────────────────────────────────┤
│ Click row → User Detail Panel (Sheet from right)            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Jane Cooper                                             │ │
│ │ jane@acme.com | Pro Plan | Signed up Jan 15, 2026       │ │
│ │ ─────────────────────────────────────────────────────── │ │
│ │ Properties: { company: "Acme", role: "PM", ... }       │ │
│ │ ─────────────────────────────────────────────────────── │ │
│ │ Event Timeline (scrollable)                             │ │
│ │ 2:15 PM  page_view /dashboard                          │ │
│ │ 2:14 PM  button_click "Export CSV"                      │ │
│ │ 2:10 PM  page_view /reports                             │ │
│ │ 2:08 PM  login                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Page 6: Revenue

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Revenue" | Period: [Last 12 months ▼]                      │
├─────────────────────────────────────────────────────────────┤
│ [4 KPI Cards: MRR | ARR | Churn | ARPU]                    │
├───────────────────────────────┬─────────────────────────────┤
│ MRR Trend (1/2)               │ MRR Breakdown (1/2)         │
│ Area chart: monthly MRR       │ Stacked bar:                │
│ - Total MRR line              │ - New MRR                   │
│ - Goal line overlay           │ - Expansion MRR             │
│ - Annotations: plan launches  │ - Contraction MRR           │
│                               │ - Churned MRR               │
├───────────────────────────────┼─────────────────────────────┤
│ Churn Analysis (1/2)          │ Plan Distribution (1/2)     │
│ Line chart: monthly churn %   │ Donut: revenue by plan      │
│ - Logo churn (count)          │ - Enterprise: $42k (52%)    │
│ - Revenue churn (dollars)     │ - Pro: $28k (35%)           │
│ - Industry benchmark line     │ - Free: $0 (0 rev, 4k usr)  │
│                               │ - Starter: $10k (13%)       │
├───────────────────────────────┴─────────────────────────────┤
│ Subscription Table (full width)                             │
│ Customer | Plan | MRR | Status | Started | Next Billing     │
│──────────────────────────────────────────────────────────── │
│ Acme Corp | Enterprise | $4,200 | Active | Jan 1 | Jul 1    │
│ Widgets Inc | Pro | $79 | Active | Mar 15 | Jul 15          │
│ Beta LLC | Pro | $79 | Churned | Feb 1 | — (cancelled)      │
└─────────────────────────────────────────────────────────────┘
```

### Revenue KPIs
| Metric | Value | Format |
|--------|-------|--------|
| MRR | $82,400 | Currency, delta % |
| ARR | $988,800 | Currency, delta % |
| Churn Rate | 2.1% | Percentage, delta pp |
| ARPU | $48.20 | Currency, delta % |

### MRR Movement
Stacked bar showing:
- **New MRR**: revenue from new customers (green)
- **Expansion**: upgrades + add-ons (blue)
- **Contraction**: downgrades (yellow)
- **Churned**: cancelled revenue (red)
- Net change = sum of all four

---

## Page 7: Custom Dashboards

### Layout
- Grid of saved report cards
- Each card: chart type, title, last updated, pin/favorite
- Click card → full interactive chart
- Drag to rearrange
- "+ New Dashboard" with chart type picker
- Chart types available: line, area, bar, donut, table, number, funnel

---

## Data Schema

### Event
```typescript
interface AnalyticsEvent {
  id: string;
  name: string; // "page_view", "signup", "purchase"
  userId?: string;
  anonymousId?: string;
  timestamp: string;
  properties: Record<string, string | number | boolean>;
  context: {
    page?: { url: string; path: string; title: string; referrer?: string };
    device?: { type: "desktop" | "mobile" | "tablet" };
    browser?: string;
    os?: string;
    ip?: string;
    country?: string;
    city?: string;
    utm?: { source?: string; medium?: string; campaign?: string };
  };
}
```

### User Profile
```typescript
interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  properties: Record<string, string | number | boolean>;
  firstSeen: string;
  lastSeen: string;
  eventCount: number;
  sessionCount: number;
  signedUpAt?: string;
}
```

### Subscription
```typescript
interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: "active" | "past_due" | "cancelled" | "trialing";
  mrr: number;
  currency: string;
  startDate: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
  trialEnd?: string;
}
```

### Funnel Definition
```typescript
interface FunnelDefinition {
  id: string;
  name: string;
  steps: {
    eventName: string;
    filters?: { property: string; operator: "equals" | "contains" | "gt" | "lt"; value: string }[];
  }[];
  conversionWindow: number; // hours
  createdAt: string;
}
```

### Cohort
```typescript
interface Cohort {
  id: string;
  name: string;
  type: "static" | "dynamic";
  criteria: {
    event?: string;
    property?: string;
    operator: string;
    value: string;
  }[];
  userCount: number;
  createdAt: string;
}
```

### Saved Dashboard
```typescript
interface Dashboard {
  id: string;
  name: string;
  widgets: {
    id: string;
    type: "line" | "area" | "bar" | "donut" | "number" | "table" | "funnel";
    title: string;
    query: {
      events: string[];
      filters?: Record<string, string>[];
      groupBy?: string;
      dateRange: string;
    };
    position: { x: number; y: number; w: number; h: number };
  }[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Component Mapping

| Analytics Pattern | shadcn Components |
|------------------|-------------------|
| KPI Card + Sparkline | Card + text + mini AreaTrendChart |
| Funnel Bars | Custom horizontal bars with drop-off labels |
| Cohort Heatmap | Table with color-coded cells (custom) |
| Event Stream | ScrollArea + monospace rows + Badge |
| Query Builder | Select + Input + Button in composable rows |
| Date Range Picker | Popover + Calendar + preset buttons |
| User Profile Sheet | Sheet + Tabs + ScrollArea + JSON viewer |
| MRR Movement Chart | Stacked bar with positive/negative values |
| Retention Curve | MultiLineChart with highlight interaction |
| Segment Tabs | Tabs + Badge (count) |
| Dashboard Grid | Draggable Card grid with resize handles |
| Alert Card | Card + Badge (severity) + description |

---

## New Components Needed

1. **FunnelChart** — horizontal funnel with step bars, drop-off labels, percentages
2. **CohortTable** — heat-mapped retention grid with hover tooltips
3. **EventStream** — real-time scrolling event feed with expandable properties
4. **QueryBuilder** — composable filter/event/property selector rows
5. **DateRangePicker** — calendar popover with presets (7d, 30d, 90d, custom)
6. **SparklineCard** — KPI card with embedded mini chart
7. **MRRWaterfallChart** — stacked bar showing new/expansion/contraction/churn
8. **DashboardGrid** — drag-and-resize widget layout
9. **PropertyBreakdown** — horizontal bars showing top property values
10. **AnnotationMarker** — vertical line overlay on time-series charts for releases/events
