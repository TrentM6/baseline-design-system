import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Lightning, ShieldCheck, Cube, Plus } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  StatCard,
  KpiTile,
  MetricChartCard,
  DataTable,
  LoginForm,
  ContactForm,
  SettingsPanel,
  FeatureGrid,
  FaqAccordion,
  PricingTable,
  PriceChartCard,
  BalanceCard,
  MarketsTable,
  ProfitRings,
  TransactionList,
  RewardsCard,
  ActivityFeed,
  UserProfileCard,
  CalendarWidget,
  InvoiceTable,
  NotificationPanel,
  TeamMembers,
  ProgressSteps,
  ChatMessage,
  type Feature,
  type FaqItem,
  type PricingTier,
} from "@/components/composed";
import {
  AreaTrendChart,
  ComparisonBarChart,
  MultiLineChart,
  DistributionDonutChart,
  StackedAreaChart,
  RadialChart,
} from "@/components/charts";
import { PAGE } from "@/lib/layout";

function CompositionLabel({ primitives }: { primitives: string[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span
        className="text-[10px] font-mono uppercase tracking-wider"
        style={{ color: "var(--bl-fg-muted)" }}
      >
        Composes
      </span>
      {primitives.map((p) => (
        <Badge key={p} variant="outline" className="text-[10px] px-1.5 py-0 h-5">
          {p}
        </Badge>
      ))}
    </div>
  );
}

function ComponentShowcase({
  title,
  primitives,
  children,
}: {
  title: string;
  primitives: string[];
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-0 flex-row items-center justify-between space-y-0 gap-2">
        <CardTitle className="text-[14px]">{title}</CardTitle>
        <CompositionLabel primitives={primitives} />
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

/* ── Masonry: each card packs into the shortest column by measured height —
   no stretched voids, no ragged gaps. ── */
const MASONRY_GAP = 16;

function MasonryItem({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    const content = el?.firstElementChild as HTMLElement | null;
    if (!el || !content) return;
    const measure = () => setSpan(Math.ceil(content.getBoundingClientRect().height) + MASONRY_GAP);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(content);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ gridRowEnd: `span ${span}` }}>
      {children}
    </div>
  );
}

function Masonry({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
      style={{ gridAutoRows: "1px" }}
    >
      {Children.map(children, (child, i) => (
        <MasonryItem key={i}>{child}</MasonryItem>
      ))}
    </div>
  );
}

const FEATURES: Feature[] = [
  { icon: Lightning, title: "Fast", desc: "Sub-100ms responses" },
  { icon: ShieldCheck, title: "Secure", desc: "SOC 2 compliant" },
  { icon: Cube, title: "Composable", desc: "Build anything" },
  { icon: Plus, title: "Extensible", desc: "Plugin system" },
];

const FAQ: FaqItem[] = [
  { q: "What's included?", a: "All primitives, components, and design tokens, plus the full design rules documentation." },
  { q: "Can I customize the tokens?", a: "Yes. Edit bl-tokens.css to change any value — both dark and light update globally." },
  { q: "Is it accessible?", a: "Every component meets WCAG 2.2 AA: contrast, keyboard, focus, labels, and ARIA." },
];

const TIERS: PricingTier[] = [
  { name: "Starter", description: "For small teams", price: "$29", period: "mo", features: ["5 team members", "10GB storage", "Email support"] },
  { name: "Pro", description: "For growing teams", price: "$79", period: "mo", features: ["Unlimited members", "100GB storage", "Priority support"], featured: true },
];

const TREND = [
  { label: "Jan", value: 28000 },
  { label: "Feb", value: 31000 },
  { label: "Mar", value: 29500 },
  { label: "Apr", value: 35200 },
  { label: "May", value: 38900 },
  { label: "Jun", value: 42500 },
];

const COMPARE = [
  { label: "Q1", new: 120, returning: 80 },
  { label: "Q2", new: 150, returning: 110 },
  { label: "Q3", new: 170, returning: 140 },
  { label: "Q4", new: 210, returning: 180 },
];

const LATENCY = [
  { label: "Mon", p50: 42, p95: 120 },
  { label: "Tue", p50: 38, p95: 98 },
  { label: "Wed", p50: 45, p95: 130 },
  { label: "Thu", p50: 40, p95: 110 },
  { label: "Fri", p50: 36, p95: 92 },
];

const DONUT = [
  { key: "widget", label: "Widget Pro", value: 4200 },
  { key: "gadget", label: "Gadget Lite", value: 3100 },
  { key: "module", label: "Module X", value: 2200 },
];

const STACKED = [
  { label: "Jan", organic: 120, paid: 80, referral: 40 },
  { label: "Feb", organic: 140, paid: 95, referral: 52 },
  { label: "Mar", organic: 155, paid: 110, referral: 48 },
  { label: "Apr", organic: 170, paid: 90, referral: 65 },
  { label: "May", organic: 195, paid: 125, referral: 58 },
  { label: "Jun", organic: 210, paid: 140, referral: 72 },
];

const RADIAL = [
  { key: "revenue", label: "Revenue", value: 78, max: 100 },
  { key: "users", label: "Users", value: 62, max: 100 },
  { key: "retention", label: "Retention", value: 91, max: 100 },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xl font-heading font-medium mb-4"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        {title}
      </h2>
      <Masonry>{children}</Masonry>
    </section>
  );
}

function ComponentsWorkspace() {
  return (
    <div className="overflow-y-auto">
      <div className={PAGE}>
        <header className="mb-8">
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Components
          </p>
          <h1
            className="text-3xl font-heading font-medium mb-2"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Composed Components
          </h1>
          <p className="text-[14px]" style={{ color: "var(--bl-fg-secondary)" }}>
            Real, reusable components imported from{" "}
            <code
              className="text-[12px] px-1 py-0.5 rounded"
              style={{ backgroundColor: "var(--bl-bg-elevated)" }}
            >
              src/components/composed
            </code>{" "}
            and{" "}
            <code
              className="text-[12px] px-1 py-0.5 rounded"
              style={{ backgroundColor: "var(--bl-bg-elevated)" }}
            >
              src/components/charts
            </code>
            . Each composes from primitives — the dependency tree is enforced by
            imports, and these same components build the Surfaces.
          </p>
        </header>

        <div className="space-y-12">
          <Section title="Dashboard Widgets">
            <ComponentShowcase title="Price Chart Card" primitives={["Card", "ToggleGroup", "AreaChart"]}>
              <PriceChartCard />
            </ComponentShowcase>
            <ComponentShowcase title="Balance + Exchange" primitives={["Card", "Button", "Separator"]}>
              <BalanceCard />
            </ComponentShowcase>
            <ComponentShowcase title="Markets Table" primitives={["Card", "Table", "DropdownMenu", "Button"]}>
              <MarketsTable />
            </ComponentShowcase>
            <ComponentShowcase title="Profit Rings" primitives={["Card", "Select"]}>
              <ProfitRings />
            </ComponentShowcase>
            <ComponentShowcase title="Data Table" primitives={["Table", "Input", "Select", "Checkbox", "DropdownMenu", "TanStack"]}>
              <DataTable />
            </ComponentShowcase>
            <ComponentShowcase title="Transactions" primitives={["Card", "Button"]}>
              <TransactionList />
            </ComponentShowcase>
          </Section>

          <Section title="Enterprise">
            <ComponentShowcase title="Activity Feed" primitives={["Card", "Avatar", "Badge", "ScrollArea"]}>
              <ActivityFeed />
            </ComponentShowcase>
            <ComponentShowcase title="Notification Panel" primitives={["Card", "Badge", "Button", "ScrollArea", "Separator"]}>
              <NotificationPanel />
            </ComponentShowcase>
            <ComponentShowcase title="Team Members" primitives={["Card", "Avatar", "Badge", "DropdownMenu"]}>
              <TeamMembers />
            </ComponentShowcase>
            <ComponentShowcase title="Invoice Table" primitives={["Card", "Table", "Badge", "Separator"]}>
              <InvoiceTable />
            </ComponentShowcase>
            <ComponentShowcase title="Progress Steps" primitives={["Card", "Badge", "Icon"]}>
              <ProgressSteps />
            </ComponentShowcase>
          </Section>

          <Section title="Communication">
            <ComponentShowcase title="User Profile Card" primitives={["Card", "Avatar", "Badge", "Button", "Separator"]}>
              <UserProfileCard />
            </ComponentShowcase>
            <ComponentShowcase title="Chat Message" primitives={["Card", "Avatar", "Input", "Button", "ScrollArea"]}>
              <ChatMessage />
            </ComponentShowcase>
            <ComponentShowcase title="Calendar Widget" primitives={["Card", "Calendar", "Badge", "Separator"]}>
              <CalendarWidget />
            </ComponentShowcase>
          </Section>

          <Section title="Metrics">
            <ComponentShowcase title="Stat Card" primitives={["Card", "Icon"]}>
              <StatCard label="Revenue" value="$42,580" change="+12.5%" positive icon={Lightning} />
            </ComponentShowcase>
            <ComponentShowcase title="KPI Tile" primitives={["Card", "Badge", "Progress"]}>
              <KpiTile label="MRR" value="$38.4k" target="$50k" progress={76} />
            </ComponentShowcase>
            <ComponentShowcase title="Rewards" primitives={["Card", "Button", "Icon"]}>
              <RewardsCard />
            </ComponentShowcase>
          </Section>

          <Section title="Charts">
            <ComponentShowcase title="Area Trend" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="Revenue" description="Smooth natural curve">
                <AreaTrendChart data={TREND} seriesLabel="Revenue" className="h-[200px] w-full" />
              </MetricChartCard>
            </ComponentShowcase>
            <ComponentShowcase title="Stacked Area" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="Traffic Sources" description="Organic · Paid · Referral">
                <StackedAreaChart
                  data={STACKED}
                  series={[
                    { key: "organic", label: "Organic" },
                    { key: "paid", label: "Paid" },
                    { key: "referral", label: "Referral" },
                  ]}
                  className="h-[200px] w-full"
                />
              </MetricChartCard>
            </ComponentShowcase>
            <ComponentShowcase title="Comparison Bars" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="Signups" description="New vs returning">
                <ComparisonBarChart
                  data={COMPARE}
                  series={[{ key: "new", label: "New" }, { key: "returning", label: "Returning" }]}

                  className="h-[200px] w-full"
                />
              </MetricChartCard>
            </ComponentShowcase>
            <ComponentShowcase title="Multi-Line" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="Latency" description="p50 vs p95 (ms)">
                <MultiLineChart
                  data={LATENCY}
                  series={[{ key: "p50", label: "p50" }, { key: "p95", label: "p95" }]}
                  className="h-[200px] w-full"
                />
              </MetricChartCard>
            </ComponentShowcase>
            <ComponentShowcase title="Distribution Donut" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="By Product" description="Share of total">
                <DistributionDonutChart data={DONUT} centerLabel="Revenue" className="h-[200px] w-full" />
              </MetricChartCard>
            </ComponentShowcase>
            <ComponentShowcase title="Radial Progress" primitives={["ChartContainer", "recharts"]}>
              <MetricChartCard title="KPI Goals" description="Revenue · Users · Retention">
                <RadialChart data={RADIAL} className="h-[200px] w-full" />
              </MetricChartCard>
            </ComponentShowcase>
          </Section>

          <Section title="Forms & Content">
            <ComponentShowcase title="Login Form — validated" primitives={["Card", "Input", "Button", "Checkbox"]}>
              <LoginForm />
            </ComponentShowcase>
            <ComponentShowcase title="Contact Form" primitives={["Card", "Input", "Textarea", "Select", "Button"]}>
              <ContactForm />
            </ComponentShowcase>
            <ComponentShowcase title="Settings Panel — live toggles" primitives={["Card", "Switch", "Select", "Separator"]}>
              <SettingsPanel />
            </ComponentShowcase>
            <ComponentShowcase title="FAQ Accordion" primitives={["Card", "Accordion"]}>
              <FaqAccordion items={FAQ} />
            </ComponentShowcase>
            <ComponentShowcase title="Feature Grid" primitives={["Card", "Icon"]}>
              <FeatureGrid features={FEATURES} />
            </ComponentShowcase>
            <ComponentShowcase title="Pricing Table" primitives={["Card", "Button", "Badge", "Separator"]}>
              <PricingTable tiers={TIERS} />
            </ComponentShowcase>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default ComponentsWorkspace;
