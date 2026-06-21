# Health & Wellness Dashboard — Full Application Spec

Production-level health analytics application inspired by Oura, WHOOP, Apple Health, and Fitbit. Multi-page with daily summaries, detailed metric views, goal tracking, and trend analysis.

## Reference Products

- **Oura Ring** — readiness/sleep/activity scores, elegant data presentation, daily insights
- **WHOOP** — strain/recovery/sleep model, coaching recommendations, journal correlations
- **Apple Health** — comprehensive category browser, trend detection, sharing
- **Fitbit** — activity zones, sleep stages, food logging, social challenges
- **Garmin Connect** — deep athletic metrics, training load, body battery

## Navigation (Sidebar)

| Route | Label | Icon | Description |
|-------|-------|------|-------------|
| `/` | Today | House | Daily health score, rings, key metrics |
| `/activity` | Activity | PersonSimpleRun | Steps, workouts, calories, heart rate zones |
| `/sleep` | Sleep | Moon | Sleep score, stages, consistency, trends |
| `/nutrition` | Nutrition | ForkKnife | Calories, macros, meals, water |
| `/vitals` | Vitals | Heartbeat | Heart rate, HRV, SpO2, weight, blood pressure |
| `/goals` | Goals | Target | Active goals, streaks, achievements |
| `/insights` | Insights | Lightbulb | Weekly/monthly reports, correlations |
| `/settings` | Settings | Gear | Profile, units, notifications, devices |

---

## Page 1: Today (Dashboard)

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Good morning, Trent" | Date: Fri, Jun 20 | Score: 87/100  │
├───────────────────────────────┬─────────────────────────────┤
│ Health Rings (1/3)            │ Today's Metrics (2/3)       │
│ ┌─────────────────────────┐   │ ┌─────────┬────────┬──────┐ │
│ │  Three concentric rings │   │ │ Steps   │ Cal    │ HRV  │ │
│ │  Move: 420/500 cal      │   │ │ 7,842   │ 1,847  │ 45ms │ │
│ │  Exercise: 28/30 min    │   │ │ ━━━━━░░ │ ━━━━░░ │ ▲ 3  │ │
│ │  Stand: 8/12 hrs        │   │ ├─────────┼────────┼──────┤ │
│ │                         │   │ │ Sleep   │ Resting│Weight│ │
│ │  [animated SVG rings]   │   │ │ 7h 23m  │ 62 bpm │ 175  │ │
│ │                         │   │ │ Score:82│ ▼ 1    │ ▼ 0.4│ │
│ └─────────────────────────┘   │ └─────────┴────────┴──────┘ │
├───────────────────────────────┼─────────────────────────────┤
│ Heart Rate Today (1/2)        │ Activity Timeline (1/2)     │
│ Line chart: continuous HR     │ Vertical day timeline       │
│ - Resting zone (shaded)      │ - 6:30 AM Wake up           │
│ - Peak zones highlighted     │ - 7:15 AM Morning walk      │
│ - Current: 72 bpm            │ - 12:30 PM Lunch logged     │
│ - Min/Max/Avg labels         │ - 5:00 PM HIIT workout      │
├───────────────────────────────┼─────────────────────────────┤
│ Sleep Last Night (1/2)        │ Daily Insight Card (1/2)    │
│ Horizontal stage bar          │ "Your HRV has improved 12%  │
│ [Awake|REM|Light|Deep]       │  over the last 2 weeks.     │
│ Total: 7h 23m | Score: 82    │  Keep up the consistent     │
│ Bedtime: 11:15 PM            │  bedtime routine."          │
│ Wake: 6:38 AM                │                             │
└───────────────────────────────┴─────────────────────────────┘
```

### Health Rings
- Three concentric SVG rings (like Apple Watch)
- **Move** (outer, orange): active calories burned vs goal
- **Exercise** (middle, green): exercise minutes vs goal
- **Stand** (inner, blue): active hours vs goal
- Animated fill on page load
- Click ring to navigate to relevant detail page

### Metric Tiles (6-grid)
Each tile: metric name, current value, unit, sparkline or trend arrow, comparison to 7-day avg.

| Metric | Value | Unit | Trend |
|--------|-------|------|-------|
| Steps | 7,842 | steps | vs 7-day avg |
| Calories Burned | 1,847 | kcal | vs goal |
| HRV | 45 | ms | vs 7-day avg |
| Sleep | 7h 23m | duration | vs goal |
| Resting HR | 62 | bpm | vs 7-day avg |
| Weight | 175.2 | lbs | vs last week |

---

## Page 2: Activity

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Activity" | Date: [◀ Jun 20, 2026 ▶] | [Day|Week|Month]   │
├─────────────────────────────────────────────────────────────┤
│ [4 Stat Cards: Steps | Distance | Calories | Active Min]    │
├───────────────────────────────┬─────────────────────────────┤
│ Steps Chart (1/2)             │ Heart Rate Zones (1/2)      │
│ Bar chart: hourly steps       │ Stacked bar: time in zones  │
│ - Goal line overlay           │ - Zone 1: Warm Up (gray)    │
│ - Color by intensity          │ - Zone 2: Fat Burn (blue)   │
│                               │ - Zone 3: Cardio (green)    │
│                               │ - Zone 4: Peak (orange)     │
│                               │ - Zone 5: Max (red)         │
├───────────────────────────────┴─────────────────────────────┤
│ Workout Log (full width)                                    │
│ ┌───────────────────────────────────────────────────────────┐│
│ │ Today                                                     ││
│ │ 🏃 HIIT Workout | 32 min | 380 cal | Avg HR: 142 bpm    ││
│ │ 🚶 Morning Walk | 45 min | 210 cal | Avg HR: 98 bpm     ││
│ │                                                           ││
│ │ Yesterday                                                 ││
│ │ 🏋️ Strength Training | 55 min | 290 cal | Avg HR: 118    ││
│ └───────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Stat Cards
| Metric | Today | Goal | Progress |
|--------|-------|------|----------|
| Steps | 7,842 | 10,000 | 78% ring |
| Distance | 3.6 mi | 5 mi | 72% ring |
| Calories | 1,847 | 2,200 | 84% ring |
| Active Minutes | 28 | 30 | 93% ring |

### Workout Entry
- Activity type icon + name
- Duration, calories, avg heart rate
- Click to expand: HR chart during workout, splits, notes
- Date-grouped (Today, Yesterday, This Week)

---

## Page 3: Sleep

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Sleep" | [◀ Last Night ▶] | Score: 82/100 ⬤               │
├─────────────────────────────────────────────────────────────┤
│ Sleep Stages (full width)                                   │
│ Horizontal hypnogram: time on X, stage on Y                │
│ [Awake ····  REM ████  Light ████████  Deep ██████]         │
│ 11:15 PM ──────────────────────────────────── 6:38 AM       │
├───────────────────────────────┬─────────────────────────────┤
│ Stage Breakdown (1/3)         │ Sleep Metrics (1/3)         │
│ Donut chart:                  │ Total Sleep: 7h 23m         │
│ - Deep: 1h 42m (23%)         │ Time in Bed: 7h 23m         │
│ - Light: 3h 18m (45%)        │ Efficiency: 92%             │
│ - REM: 1h 48m (24%)          │ Latency: 8 min              │
│ - Awake: 35m (8%)            │ Awakenings: 2               │
│                               │ Restfulness: Good           │
├───────────────────────────────┤                             │
│ Consistency (1/3)             │                             │
│ Bedtime: 11:15 PM (±22m)     │                             │
│ Wake: 6:38 AM (±18m)         │                             │
│ 7-day bedtime chart           │                             │
├───────────────────────────────┴─────────────────────────────┤
│ Sleep Trends (full width) | [1W | 1M | 3M | 6M | 1Y]       │
│ Area chart: total sleep duration per night                  │
│ Overlay: sleep score line                                   │
│ Goal line at 8h                                             │
└─────────────────────────────────────────────────────────────┘
```

### Hypnogram
- Custom horizontal chart showing sleep stage transitions over time
- Color bands: Deep (dark blue), Light (light blue), REM (purple), Awake (red/orange)
- X-axis: time from bedtime to wake
- Tooltip on hover showing stage + duration at that point

### Sleep Score
- Circular gauge (0-100) with color: red (<60), yellow (60-79), green (80-100)
- Factors contributing: duration, efficiency, restfulness, latency, timing

---

## Page 4: Nutrition

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Nutrition" | [◀ Jun 20 ▶] | [+ Log Meal]                  │
├───────────────────────────────┬─────────────────────────────┤
│ Calorie Budget (1/3)          │ Macros (1/3)        | Water │
│ Radial: 1,420 / 2,200 eaten  │ Donut: P/C/F split  │(1/3) │
│ Remaining: 780 cal            │ Protein: 82g (30%)  │ 6/8  │
│ Net = Eaten - Exercise        │ Carbs: 168g (52%)   │ cups │
│                               │ Fat: 48g (18%)      │ ████ │
├───────────────────────────────┴─────────────────────────────┤
│ Meals Today (full width)                                    │
│ ┌───────────────────────────────────────────────────────────┐│
│ │ Breakfast — 8:15 AM — 420 cal                             ││
│ │ · Oatmeal (1 cup) .............. 154 cal | 27g C | 5g P  ││
│ │ · Banana (1 medium) ........... 105 cal | 27g C | 1g P   ││
│ │ · Almond milk (1 cup) ......... 30 cal  | 1g C  | 1g P   ││
│ │ · Honey (1 tbsp) .............. 64 cal  | 17g C | 0g P   ││
│ ├───────────────────────────────────────────────────────────┤│
│ │ Lunch — 12:30 PM — 580 cal                               ││
│ │ · Grilled chicken salad ....... 380 cal | 12g C | 42g P  ││
│ │ · Whole wheat bread (2 sl) .... 200 cal | 36g C | 8g P   ││
│ ├───────────────────────────────────────────────────────────┤│
│ │ Snack — 3:00 PM — 200 cal                                ││
│ │ · Greek yogurt ................ 120 cal | 8g C  | 15g P  ││
│ │ · Mixed nuts (1/4 cup) ........ 80 cal  | 3g C  | 3g P   ││
│ └───────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ Calorie Trend (full) | [1W | 1M]                            │
│ Bar chart: daily intake vs goal line                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Page 5: Vitals

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Vitals" | Range: [1W | 1M | 3M | 6M | 1Y]                 │
├───────────────────────────────┬─────────────────────────────┤
│ Resting Heart Rate (1/2)      │ Heart Rate Variability (1/2)│
│ Line chart: daily resting HR  │ Line chart: daily HRV (ms)  │
│ Current: 62 bpm               │ Current: 45 ms              │
│ 30-day avg: 64 bpm            │ 30-day avg: 42 ms           │
│ Normal range shaded           │ Normal range shaded          │
├───────────────────────────────┼─────────────────────────────┤
│ Weight Trend (1/2)            │ Blood Pressure (1/2)        │
│ Line chart with goal line     │ Dual line: systolic/diastolic│
│ Current: 175.2 lbs            │ Last: 118/76 mmHg           │
│ Goal: 170 lbs                 │ Category: Normal            │
│ Change: -2.4 lbs (30d)        │ Normal range shaded          │
├───────────────────────────────┼─────────────────────────────┤
│ Blood Oxygen (1/2)            │ Body Temperature (1/2)      │
│ Line chart: nightly SpO2      │ Line chart: deviation from  │
│ Current: 97%                  │ baseline (+0.2°F)           │
│ Range: 95-99%                 │ Baseline: 97.8°F            │
└───────────────────────────────┴─────────────────────────────┘
```

Each vital chart:
- Line chart with `type="natural"` smooth interpolation
- Shaded "normal range" band
- Current value callout
- Period average
- Trend direction and magnitude

---

## Page 6: Goals & Progress

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ "Goals" | [+ New Goal]                                      │
├─────────────────────────────────────────────────────────────┤
│ Active Goals (cards grid)                                   │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ 🔥 10k Steps │ │ 💤 8h Sleep  │ │ ⚖️ Lose 5 lbs │         │
│ │ 78% today    │ │ 91% (7d avg) │ │ 48% (2.4/5)  │         │
│ │ 🔥 14 day    │ │ 🔥 7 day     │ │ 3 months left │         │
│ │ streak       │ │ streak       │ │              │         │
│ │ ━━━━━━━░░░   │ │ ━━━━━━━━━░   │ │ ━━━━━░░░░░   │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
├─────────────────────────────────────────────────────────────┤
│ Achievements (horizontal scroll)                            │
│ [🏅 First 10k] [🏅 30-day streak] [🏅 Early Bird] [🔒 ...]   │
├─────────────────────────────────────────────────────────────┤
│ Weekly Completion (full width)                              │
│ Calendar heatmap: 7 columns x 52 rows (GitHub-style)        │
│ Green intensity = % of daily goals met                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Page 7: Insights

### Layout
- Weekly/monthly summary cards
- Correlation insights: "You sleep 23 minutes longer on days you exercise before 6 PM"
- Trend alerts: "Your resting heart rate has decreased 4 bpm over the last 3 months"
- Personalized recommendations
- Downloadable PDF reports

---

## Data Schema

### User Profile
```typescript
interface HealthProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  height: number; // cm
  units: { weight: "lbs" | "kg"; distance: "mi" | "km"; temperature: "F" | "C" };
  goals: {
    steps: number;
    activeCalories: number;
    exerciseMinutes: number;
    sleepHours: number;
    waterCups: number;
    targetWeight?: number;
  };
}
```

### Activity
```typescript
interface ActivityEntry {
  id: string;
  date: string; // YYYY-MM-DD
  steps: number;
  distance: number; // meters
  activeCalories: number;
  totalCalories: number;
  activeMinutes: number;
  standHours: number;
  floors?: number;
}
```

### Workout
```typescript
interface Workout {
  id: string;
  type: "run" | "walk" | "cycle" | "swim" | "strength" | "hiit" | "yoga" | "other";
  startTime: string; // ISO 8601
  duration: number; // seconds
  calories: number;
  distance?: number; // meters
  avgHeartRate?: number;
  maxHeartRate?: number;
  heartRateZones?: { zone: number; minutes: number }[];
  notes?: string;
}
```

### Sleep Session
```typescript
interface SleepSession {
  id: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // ISO 8601
  wakeTime: string;
  totalSleep: number; // minutes
  score: number; // 0-100
  stages: {
    deep: number; // minutes
    light: number;
    rem: number;
    awake: number;
  };
  efficiency: number; // percentage
  latency: number; // minutes to fall asleep
  awakenings: number;
  restfulness: "poor" | "fair" | "good" | "excellent";
}
```

### Vital Reading
```typescript
interface VitalReading {
  id: string;
  type: "heart_rate" | "hrv" | "spo2" | "blood_pressure" | "weight" | "body_temp";
  value: number;
  secondaryValue?: number; // diastolic for BP
  unit: string;
  timestamp: string;
  source: "manual" | "device";
}
```

### Meal
```typescript
interface Meal {
  id: string;
  date: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time: string;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface MealItem {
  name: string;
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}
```

### Goal
```typescript
interface Goal {
  id: string;
  metric: "steps" | "sleep" | "weight" | "exercise" | "water" | "calories";
  target: number;
  current: number;
  period: "daily" | "weekly" | "monthly" | "custom";
  streak: number; // consecutive days met
  startDate: string;
  endDate?: string;
  status: "active" | "completed" | "paused";
}
```

---

## Component Mapping

| Health Pattern | shadcn Components |
|---------------|-------------------|
| Activity Rings | Custom SVG with radial progress (3 concentric) |
| Metric Tile | Card + text + Sparkline (mini area chart) |
| Hypnogram | Custom Recharts area chart with categorical Y-axis |
| Sleep Score Gauge | Custom SVG circular gauge |
| Macro Donut | DistributionDonutChart |
| Meal Log | Card + Accordion + table rows |
| Vital Trend | AreaTrendChart with range band |
| Heart Rate Timeline | MultiLineChart with zone shading |
| Goal Card | Card + Progress + Badge (streak) |
| Calendar Heatmap | Custom grid of colored cells |
| Workout Entry | Card + expandable with Collapsible |
| Water Tracker | Custom ring or vertical fill indicator |

---

## New Components Needed

1. **ActivityRings** — three concentric SVG progress rings with labels
2. **Hypnogram** — sleep stage timeline visualization
3. **ScoreGauge** — circular score indicator (0-100)
4. **MetricTileGrid** — responsive grid of small stat tiles with sparklines
5. **MealLogger** — meal entry with food search + portion sizing
6. **CalendarHeatmap** — GitHub-style contribution grid for goal tracking
7. **VitalChart** — line chart with normal-range band overlay
8. **WorkoutCard** — expandable workout entry with HR zones
9. **WaterTracker** — visual glass/ring fill indicator
10. **InsightCard** — AI-generated insight with metric reference
