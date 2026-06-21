# CRM Dashboard — Full Application Spec

Production-level CRM application inspired by Attio, HubSpot, Close, and Folk. Multi-page with full sidebar navigation, detail views, and interactive pipeline management.

## Reference Products

- **Attio** — modern, flexible data model, clean minimal UI, custom objects
- **HubSpot** — comprehensive CRM with marketing/sales/service hubs
- **Close** — sales-focused, built-in calling/email, activity-centric
- **Folk** — lightweight, spreadsheet-like contact management
- **Pipedrive** — pipeline-centric, visual deal management

## Navigation (Sidebar)

| Route | Label | Icon | Description |
|-------|-------|------|-------------|
| `/` | Dashboard | House | KPIs, pipeline summary, activity feed, tasks due |
| `/contacts` | Contacts | Users | People list with search, filters, bulk actions |
| `/contacts/:id` | Contact Detail | — | Full contact record with activity timeline |
| `/companies` | Companies | Buildings | Organization list with enrichment data |
| `/companies/:id` | Company Detail | — | Company record with contacts, deals, activity |
| `/deals` | Deals | Funnel | Pipeline kanban + list view toggle |
| `/deals/:id` | Deal Detail | — | Deal record with stage, contacts, timeline |
| `/activities` | Activities | ClockCounterClockwise | Tasks, calls, emails, meetings log |
| `/emails` | Email | EnvelopeSimple | Inbox with threading, templates, sequences |
| `/reports` | Reports | ChartBar | Saved reports, custom analytics |
| `/settings` | Settings | Gear | Team, pipeline config, integrations |

---

## Page 1: Dashboard

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [4 KPI Cards - full width row]                              │
├───────────────────────────────┬─────────────────────────────┤
│ Pipeline Overview (2/3)       │ Upcoming Tasks (1/3)        │
│ - Stacked bar by stage        │ - Today's tasks checklist   │
│ - Total pipeline value        │ - Overdue count (red badge) │
│ - Deals won this month        │ - Quick-add task            │
├───────────────────────────────┼─────────────────────────────┤
│ Revenue Trend (1/2)           │ Activity Feed (1/2)         │
│ - Area chart: won revenue     │ - Recent activities stream  │
│ - Monthly/quarterly toggle    │ - Avatar + action + entity  │
│ - Period-over-period compare  │ - Relative timestamps       │
└───────────────────────────────┴─────────────────────────────┘
```

### KPI Cards (4 across)
| Metric | Format | Comparison |
|--------|--------|------------|
| Total Pipeline Value | `$1,247,500` | vs last month % |
| Deals Won (This Month) | `23` | vs last month % |
| Conversion Rate | `34.2%` | vs last month pp |
| Avg Deal Size | `$18,420` | vs last month % |

### Pipeline Overview Chart
- Stacked horizontal bar chart showing deal count by stage
- Stages color-coded using chart tokens (`--bl-chart-1` through `--bl-chart-5`)
- Click stage to filter deals view
- Shows total value and deal count per stage

### Revenue Trend Chart
- Area chart with monthly granularity
- Two series: "Won" (filled) and "Lost" (line only)
- Tooltip with exact values
- Toggle: Monthly / Quarterly
- Date range selector

### Activity Feed
- Scrollable list, max 20 items
- Each item: avatar, action text, entity link, timestamp
- Action types: "created deal", "logged call", "sent email", "moved deal to X", "added note"
- Click entity to navigate to detail view

### Upcoming Tasks
- Checklist format with checkbox, title, due date, assignee avatar
- Sections: "Overdue" (red), "Today", "This Week"
- Click to mark complete (optimistic update)
- "+ Add task" inline at bottom

---

## Page 2: Contacts List

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header: "Contacts" + [+ Add Contact] + [Import] + [Export]  │
├─────────────────────────────────────────────────────────────┤
│ Filter Bar: Search | Stage ▼ | Owner ▼ | Tag ▼ | More ▼    │
├─────────────────────────────────────────────────────────────┤
│ DataTable: sortable, paginated, selectable rows             │
│ Columns: ☐ | Name | Email | Company | Stage | Owner | Last  │
│          |       |       |         |       |       | Active │
├─────────────────────────────────────────────────────────────┤
│ Pagination: "1-50 of 2,847" | ◀ 1 2 3 ... 57 ▶             │
└─────────────────────────────────────────────────────────────┘
```

### Table Columns
| Column | Type | Sortable | Format |
|--------|------|----------|--------|
| Select | Checkbox | No | Bulk action trigger |
| Name | Text + Avatar | Yes | First Last, avatar with initials |
| Email | Text | Yes | Mailto link |
| Company | Text + Link | Yes | Links to company detail |
| Stage | Badge | Yes | Lead / Qualified / Customer / Churned |
| Owner | Avatar + Name | Yes | Team member assignment |
| Last Activity | Relative time | Yes | "2h ago", "3d ago" |
| Actions | Dropdown | No | Edit, Delete, Add to sequence |

### Interactions
- Click row → navigate to contact detail
- Select rows → bulk action bar appears (Assign, Tag, Delete, Export)
- Search is instant (debounced 300ms)
- Filters are combinable (AND logic)
- Column resize + reorder (persisted to localStorage)

---

## Page 3: Contact Detail

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Back ← | "Jane Cooper" | Stage: [Customer ▼] | [⋯ More]    │
├───────────────────────────────┬─────────────────────────────┤
│ Contact Info (1/3)            │ Activity Timeline (2/3)     │
│ ┌─────────────────────────┐   │ ┌─────────────────────────┐ │
│ │ Avatar (large)          │   │ │ Tab: All | Notes | Emails│ │
│ │ jane@company.com        │   │ │ | Calls | Tasks          │ │
│ │ +1 (555) 123-4567       │   │ ├─────────────────────────┤ │
│ │ Acme Corp (link)        │   │ │ [Compose: Add a note...] │ │
│ │ San Francisco, CA       │   │ ├─────────────────────────┤ │
│ ├─────────────────────────┤   │ │ • Email sent "Follow up" │ │
│ │ Tags: [VIP] [Enterprise]│   │ │   2 hours ago            │ │
│ ├─────────────────────────┤   │ │ • Call logged (4m 32s)   │ │
│ │ Custom Fields           │   │ │   Yesterday at 3:15 PM   │ │
│ │ Lead Source: Referral   │   │ │ • Deal "Enterprise Plan" │ │
│ │ LinkedIn: url           │   │ │   moved to Negotiation   │ │
│ │ Annual Revenue: $2.4M   │   │ │   2 days ago             │ │
│ ├─────────────────────────┤   │ └─────────────────────────┘ │
│ │ Related Deals           │   │                             │
│ │ • Enterprise Plan $48k  │   │                             │
│ │ • Support Add-on $12k   │   │                             │
│ └─────────────────────────┘   │                             │
└───────────────────────────────┴─────────────────────────────┘
```

### Sidebar Fields
- **Primary**: Avatar, name, email (click to compose), phone (click to call)
- **Company**: linked, click to navigate
- **Location**: city, state, country
- **Tags**: editable inline, autocomplete
- **Custom fields**: key-value pairs, editable inline
- **Related deals**: mini cards with title, value, stage badge

### Activity Timeline
- Infinite scroll, grouped by date
- Each entry: icon (by type), title, body preview, timestamp
- Types: Note (text), Email (subject + preview), Call (duration), Task (status), Deal update (stage change)
- Compose area at top: rich text editor for notes, or switch to email compose

---

## Page 4: Deals Pipeline

### Layout — Kanban Mode (default)
```
┌─────────────────────────────────────────────────────────────┐
│ "Deals" | View: [Kanban] [List] | + Add Deal | Filter ▼    │
├─────────────────────────────────────────────────────────────┤
│ Lead        │ Qualified   │ Proposal    │ Negotiation │ Won │
│ $124k (8)   │ $342k (12)  │ $289k (6)   │ $185k (4)   │ ... │
│ ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │             │     │
│ │ Acme    │ │ │ Widget  │ │ │ Mega    │ │             │     │
│ │ $48,000 │ │ │ $22,000 │ │ │ $95,000 │ │             │     │
│ │ J.Cooper│ │ │ M.Chen  │ │ │ A.Park  │ │             │     │
│ │ 3d ago  │ │ │ 1d ago  │ │ │ Today   │ │             │     │
│ └─────────┘ │ └─────────┘ │ └─────────┘ │             │     │
│ ┌─────────┐ │ ┌─────────┐ │             │             │     │
│ │ Beta    │ │ │ Startup │ │             │             │     │
│ │ ...     │ │ │ ...     │ │             │             │     │
│ └─────────┘ │ └─────────┘ │             │             │     │
└─────────────┴─────────────┴─────────────┴─────────────┴─────┘
```

### Kanban Columns
Each column = a pipeline stage. Header shows stage name, total value, deal count.

### Deal Card
- Company/contact name (bold)
- Deal value (formatted currency)
- Owner avatar
- Days in stage or last activity
- Priority indicator (optional colored dot)
- Drag to move between stages

### List Mode
Same data as kanban but in a DataTable with columns: Deal Name, Company, Value, Stage, Owner, Close Date, Probability, Last Activity.

---

## Page 5: Reports

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Reports" | [+ New Report] | Date Range: [Last 30 days ▼]  │
├───────────────────────────────┬─────────────────────────────┤
│ Pipeline Velocity (1/2)       │ Win Rate by Source (1/2)    │
│ Multi-line chart              │ Horizontal bar chart        │
│ - Avg days per stage          │ - Win % by lead source      │
│ - Trend over months           │ - Referral, Inbound, etc.   │
├───────────────────────────────┼─────────────────────────────┤
│ Revenue by Owner (1/2)        │ Activity Leaderboard (1/2)  │
│ Comparison bar chart          │ Ranked table                │
│ - Bar per team member         │ - Team member, calls, emails│
│ - Won deals value             │ - Score/points              │
├───────────────────────────────┴─────────────────────────────┤
│ Deal Aging Table (full)                                     │
│ - Deals stuck > 30 days in current stage                    │
│ - Sortable by days, value, owner                            │
└─────────────────────────────────────────────────────────────┘
```

### Default Reports
1. **Pipeline Velocity** — multi-line: avg days in each stage over time
2. **Win Rate by Source** — horizontal bars: conversion % by lead source
3. **Revenue by Owner** — comparison bars: total won revenue per rep
4. **Activity Leaderboard** — ranked table: calls, emails, meetings per rep
5. **Deal Aging** — table: deals stale in current stage, sorted by days

---

## Page 6: Settings

### Sidebar Sections
| Section | Contents |
|---------|----------|
| General | Workspace name, timezone, date format |
| Team | Invite members, roles (Admin/Manager/Rep), permissions |
| Pipeline | Stage names, order, probabilities, colors, add/remove |
| Custom Fields | Field name, type, entity, required, default |
| Integrations | Email (Gmail/Outlook), Calendar, Slack, Zapier |
| Import/Export | CSV import mapping, export formats |
| Notifications | Email digest, desktop notifications, assignment alerts |
| API | API keys, webhooks, rate limits |

---

## Data Schema

### Contact
```typescript
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  companyId?: string;
  stage: "lead" | "qualified" | "customer" | "churned";
  ownerId: string;
  tags: string[];
  source?: "referral" | "inbound" | "outbound" | "organic" | "paid" | "event";
  address?: { city?: string; state?: string; country?: string };
  customFields: Record<string, string | number | boolean>;
  lastActivityAt: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}
```

### Company
```typescript
interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  size?: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  annualRevenue?: number;
  logoUrl?: string;
  address?: { city?: string; state?: string; country?: string };
  contactIds: string[];
  dealIds: string[];
  ownerId?: string;
  tags: string[];
  customFields: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}
```

### Deal
```typescript
interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string; // "USD"
  stage: string; // pipeline stage key
  probability: number; // 0-100
  expectedCloseDate?: string;
  contactId?: string;
  companyId?: string;
  ownerId: string;
  priority?: "low" | "medium" | "high";
  lostReason?: string;
  tags: string[];
  customFields: Record<string, string | number | boolean>;
  stageEnteredAt: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}
```

### Activity
```typescript
interface Activity {
  id: string;
  type: "note" | "email" | "call" | "meeting" | "task" | "deal_update";
  subject?: string;
  body?: string;
  contactId?: string;
  companyId?: string;
  dealId?: string;
  userId: string;
  metadata?: {
    duration?: number; // seconds (calls)
    direction?: "inbound" | "outbound"; // calls/emails
    oldStage?: string; // deal updates
    newStage?: string;
    emailStatus?: "sent" | "opened" | "clicked" | "replied" | "bounced";
  };
  dueDate?: string; // tasks
  completed?: boolean; // tasks
  createdAt: string;
}
```

### Pipeline Stage
```typescript
interface PipelineStage {
  id: string;
  name: string;
  order: number;
  probability: number; // default probability when entering stage
  color: string; // maps to chart token
  dealCount: number; // computed
  totalValue: number; // computed
}
```

### User (Team Member)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "manager" | "rep";
}
```

---

## Component Mapping (shadcn → CRM patterns)

| CRM Pattern | shadcn Components |
|------------|-------------------|
| KPI Card | Card + stat text + Badge (change indicator) |
| Pipeline Kanban | Custom DnD columns using Card + ScrollArea |
| Contact Table | DataTable + Checkbox + Avatar + Badge + DropdownMenu |
| Detail Sidebar | Card sections + Separator + Badge + inline edit |
| Activity Timeline | ScrollArea + custom timeline items + Avatar + Badge |
| Filter Bar | Input (search) + Select + Popover (date range) + Button |
| Deal Card | Card + text + Avatar + Badge |
| Settings Form | Tabs + Input + Select + Switch + Button |
| Email Compose | Dialog + Input + Textarea + Button |
| Report Charts | AreaTrendChart, ComparisonBarChart, MultiLineChart |

---

## New Components Needed

1. **KanbanBoard** — drag-and-drop columns with cards, stage headers with totals
2. **ActivityTimeline** — vertical timeline with typed entries, date grouping
3. **ContactDetailPanel** — sidebar info panel with inline editing
4. **FilterBar** — composable filter row with search + dropdowns
5. **EmailComposer** — rich text compose dialog with recipients, subject
6. **InlineEdit** — click-to-edit text/select field
7. **StatCardWithSparkline** — KPI card with embedded mini chart
