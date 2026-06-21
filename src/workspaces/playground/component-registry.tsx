import { Lightning, ShieldCheck, Cube } from "@phosphor-icons/react";
import type { SlotSize } from "@/lib/slots";
import { SLOT_SPAN } from "@/lib/slots";
import {
  StatCard,
  KpiTile,
  PriceChartCard,
  BalanceCard,
  MarketsTable,
  ProfitRings,
  TransactionList,
  RewardsCard,
  DataTable,
  LoginForm,
  ContactForm,
  SettingsPanel,
  FeatureGrid,
  FaqAccordion,
  PricingTable,
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

/**
 * A placeable component: a live node + the metadata to export it as code.
 * These are our real design-system COMPONENTS (not "blocks" — see note in the
 * Playground). `size` is the default slot it occupies on the 12-col grid.
 */
export interface ComponentDef {
  key: string;
  label: string;
  category: "Data" | "Charts" | "Forms" | "Content" | "Finance" | "Enterprise";
  size: SlotSize;
  node: React.ReactNode;
  /** import source path → symbols used */
  imports: Record<string, string[]>;
  /** JSX snippet emitted on export */
  code: string;
}

// shared sample data (kept in one place so node + code stay in sync)
const FEATURES: Feature[] = [
  { icon: Lightning, title: "Fast", desc: "Sub-100ms responses" },
  { icon: ShieldCheck, title: "Secure", desc: "SOC 2 compliant" },
  { icon: Cube, title: "Composable", desc: "Build anything" },
];
const FAQ: FaqItem[] = [
  { q: "What's included?", a: "All primitives, components, and tokens." },
  { q: "Is it accessible?", a: "Every component meets WCAG 2.2 AA." },
];
const TIERS: PricingTier[] = [
  { name: "Starter", description: "For small teams", price: "$29", period: "mo", features: ["5 seats", "10GB", "Email support"] },
  { name: "Pro", description: "For growing teams", price: "$79", period: "mo", features: ["Unlimited", "100GB", "Priority"], featured: true },
];
const TREND = [
  { label: "Jan", value: 28 }, { label: "Feb", value: 31 }, { label: "Mar", value: 29 },
  { label: "Apr", value: 35 }, { label: "May", value: 39 }, { label: "Jun", value: 43 },
];
const BARS = [
  { label: "Q1", desktop: 120, mobile: 80 }, { label: "Q2", desktop: 150, mobile: 110 },
  { label: "Q3", desktop: 170, mobile: 140 }, { label: "Q4", desktop: 210, mobile: 180 },
];
const LINES = [
  { label: "Mon", p50: 42, p95: 120 }, { label: "Tue", p50: 38, p95: 98 },
  { label: "Wed", p50: 45, p95: 130 }, { label: "Thu", p50: 40, p95: 110 }, { label: "Fri", p50: 36, p95: 92 },
];
const DONUT = [
  { key: "a", label: "Widget Pro", value: 4200 },
  { key: "b", label: "Gadget Lite", value: 3100 },
  { key: "c", label: "Module X", value: 2200 },
];

export const COMPONENTS: ComponentDef[] = [
  // Finance
  { key: "price-chart", label: "Price Chart", category: "Finance", size: "two-thirds",
    node: <PriceChartCard />, imports: { "@/components/composed": ["PriceChartCard"] }, code: "<PriceChartCard />" },
  { key: "balance", label: "Balance + Exchange", category: "Finance", size: "third",
    node: <BalanceCard />, imports: { "@/components/composed": ["BalanceCard"] }, code: "<BalanceCard />" },
  { key: "markets", label: "Markets Table", category: "Finance", size: "full",
    node: <MarketsTable />, imports: { "@/components/composed": ["MarketsTable"] }, code: "<MarketsTable />" },
  { key: "profit", label: "Profit Rings", category: "Finance", size: "third",
    node: <ProfitRings />, imports: { "@/components/composed": ["ProfitRings"] }, code: "<ProfitRings />" },
  { key: "txns", label: "Transactions", category: "Finance", size: "third",
    node: <TransactionList />, imports: { "@/components/composed": ["TransactionList"] }, code: "<TransactionList />" },
  { key: "rewards", label: "Rewards", category: "Finance", size: "third",
    node: <RewardsCard />, imports: { "@/components/composed": ["RewardsCard"] }, code: "<RewardsCard />" },

  // Data
  { key: "stat", label: "Stat Card", category: "Data", size: "third",
    node: <StatCard label="Revenue" value="$42,580" change="+12.5%" positive icon={Lightning} />,
    imports: { "@/components/composed": ["StatCard"], "@phosphor-icons/react": ["Lightning"] },
    code: '<StatCard label="Revenue" value="$42,580" change="+12.5%" positive icon={Lightning} />' },
  { key: "kpi", label: "KPI Tile", category: "Data", size: "third",
    node: <KpiTile label="MRR" value="$38.4k" target="$50k" progress={76} />,
    imports: { "@/components/composed": ["KpiTile"] },
    code: '<KpiTile label="MRR" value="$38.4k" target="$50k" progress={76} />' },
  { key: "table", label: "Data Table", category: "Data", size: "full",
    node: <DataTable />, imports: { "@/components/composed": ["DataTable"] },
    code: "<DataTable />" },

  // Charts
  { key: "area", label: "Area Trend", category: "Charts", size: "half",
    node: <AreaTrendChart data={TREND} seriesLabel="Revenue" className="h-[200px] w-full" />,
    imports: { "@/components/charts": ["AreaTrendChart"] },
    code: '<AreaTrendChart data={data} seriesLabel="Revenue" className="h-[200px] w-full" />' },
  { key: "bar", label: "Comparison Bars", category: "Charts", size: "half",
    node: <ComparisonBarChart data={BARS} series={[{ key: "desktop", label: "Desktop" }, { key: "mobile", label: "Mobile" }]} className="h-[200px] w-full" />,
    imports: { "@/components/charts": ["ComparisonBarChart"] },
    code: '<ComparisonBarChart data={data} series={series} className="h-[200px] w-full" />' },
  { key: "line", label: "Multi-Line", category: "Charts", size: "half",
    node: <MultiLineChart data={LINES} series={[{ key: "p50", label: "p50" }, { key: "p95", label: "p95" }]} className="h-[200px] w-full" />,
    imports: { "@/components/charts": ["MultiLineChart"] },
    code: '<MultiLineChart data={data} series={series} className="h-[200px] w-full" />' },
  { key: "donut", label: "Distribution Donut", category: "Charts", size: "third",
    node: <DistributionDonutChart data={DONUT} centerLabel="Revenue" className="h-[200px] w-full" />,
    imports: { "@/components/charts": ["DistributionDonutChart"] },
    code: '<DistributionDonutChart data={data} centerLabel="Revenue" className="h-[200px] w-full" />' },
  { key: "stacked", label: "Stacked Area", category: "Charts", size: "half",
    node: <StackedAreaChart
      data={[
        { label: "Jan", organic: 120, paid: 80, referral: 40 },
        { label: "Feb", organic: 140, paid: 95, referral: 52 },
        { label: "Mar", organic: 155, paid: 110, referral: 48 },
        { label: "Apr", organic: 170, paid: 90, referral: 65 },
        { label: "May", organic: 195, paid: 125, referral: 58 },
        { label: "Jun", organic: 210, paid: 140, referral: 72 },
      ]}
      series={[{ key: "organic", label: "Organic" }, { key: "paid", label: "Paid" }, { key: "referral", label: "Referral" }]}
      className="h-[200px] w-full"
    />,
    imports: { "@/components/charts": ["StackedAreaChart"] },
    code: '<StackedAreaChart data={data} series={series} className="h-[200px] w-full" />' },
  { key: "radial", label: "Radial Progress", category: "Charts", size: "third",
    node: <RadialChart
      data={[
        { key: "revenue", label: "Revenue", value: 78, max: 100 },
        { key: "users", label: "Users", value: 62, max: 100 },
        { key: "retention", label: "Retention", value: 91, max: 100 },
      ]}
      className="h-[200px] w-full"
    />,
    imports: { "@/components/charts": ["RadialChart"] },
    code: '<RadialChart data={data} className="h-[200px] w-full" />' },

  // Forms
  { key: "login", label: "Login Form", category: "Forms", size: "half",
    node: <LoginForm />, imports: { "@/components/composed": ["LoginForm"] }, code: "<LoginForm />" },
  { key: "contact", label: "Contact Form", category: "Forms", size: "half",
    node: <ContactForm />, imports: { "@/components/composed": ["ContactForm"] }, code: "<ContactForm />" },
  { key: "settings", label: "Settings Panel", category: "Forms", size: "half",
    node: <SettingsPanel />, imports: { "@/components/composed": ["SettingsPanel"] }, code: "<SettingsPanel />" },

  // Content
  { key: "features", label: "Feature Grid", category: "Content", size: "two-thirds",
    node: <FeatureGrid features={FEATURES} columns={3} />,
    imports: { "@/components/composed": ["FeatureGrid"] }, code: "<FeatureGrid features={features} columns={3} />" },
  { key: "faq", label: "FAQ Accordion", category: "Content", size: "half",
    node: <FaqAccordion items={FAQ} />, imports: { "@/components/composed": ["FaqAccordion"] }, code: "<FaqAccordion items={items} />" },
  { key: "pricing", label: "Pricing Table", category: "Content", size: "two-thirds",
    node: <PricingTable tiers={TIERS} />, imports: { "@/components/composed": ["PricingTable"] }, code: "<PricingTable tiers={tiers} />" },

  // Enterprise
  { key: "activity", label: "Activity Feed", category: "Enterprise", size: "half",
    node: <ActivityFeed />, imports: { "@/components/composed": ["ActivityFeed"] }, code: "<ActivityFeed />" },
  { key: "notifications", label: "Notification Panel", category: "Enterprise", size: "half",
    node: <NotificationPanel />, imports: { "@/components/composed": ["NotificationPanel"] }, code: "<NotificationPanel />" },
  { key: "team", label: "Team Members", category: "Enterprise", size: "half",
    node: <TeamMembers />, imports: { "@/components/composed": ["TeamMembers"] }, code: "<TeamMembers />" },
  { key: "invoice", label: "Invoice Table", category: "Enterprise", size: "half",
    node: <InvoiceTable />, imports: { "@/components/composed": ["InvoiceTable"] }, code: "<InvoiceTable />" },
  { key: "steps", label: "Progress Steps", category: "Enterprise", size: "third",
    node: <ProgressSteps />, imports: { "@/components/composed": ["ProgressSteps"] }, code: "<ProgressSteps />" },
  { key: "profile", label: "User Profile", category: "Enterprise", size: "third",
    node: <UserProfileCard />, imports: { "@/components/composed": ["UserProfileCard"] }, code: "<UserProfileCard />" },
  { key: "chat", label: "Chat Message", category: "Enterprise", size: "half",
    node: <ChatMessage />, imports: { "@/components/composed": ["ChatMessage"] }, code: "<ChatMessage />" },
  { key: "calendar", label: "Calendar Widget", category: "Enterprise", size: "third",
    node: <CalendarWidget />, imports: { "@/components/composed": ["CalendarWidget"] }, code: "<CalendarWidget />" },
];

export const COMPONENT_MAP: Record<string, ComponentDef> = Object.fromEntries(
  COMPONENTS.map((c) => [c.key, c])
);

export const CATEGORIES = ["Finance", "Data", "Charts", "Forms", "Content", "Enterprise"] as const;

export interface PlacedItem {
  key: string;
  size: SlotSize;
}

/** Build a full, copy-pasteable component module from the placed components. */
export function exportComposition(items: PlacedItem[]): string {
  const defs = items.map((it) => COMPONENT_MAP[it.key]).filter(Boolean);
  const bySource: Record<string, Set<string>> = {};
  for (const d of defs) {
    for (const [src, syms] of Object.entries(d.imports)) {
      bySource[src] ??= new Set();
      syms.forEach((s) => bySource[src].add(s));
    }
  }
  const importLines = Object.entries(bySource)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([src, syms]) => `import { ${[...syms].sort().join(", ")} } from "${src}";`)
    .join("\n");

  const body = items
    .map((it) => {
      const def = COMPONENT_MAP[it.key];
      if (!def) return "";
      return `      <div className="${SLOT_SPAN[it.size]}">\n        ${def.code}\n      </div>`;
    })
    .filter(Boolean)
    .join("\n");

  return `${importLines || "// add components to generate imports"}

export function Composition() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
${body || "      {/* add components to the canvas */}"}
    </div>
  );
}
`;
}
