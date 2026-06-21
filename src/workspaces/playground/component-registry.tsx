import { Lightning, Tray, TrendUp, TrendDown } from "@phosphor-icons/react";
import type { SlotSize } from "@/lib/slots";
import { SLOT_SPAN } from "@/lib/slots";
import {
  StatCard,
  KpiTile,
  MetricChartCard,
  PriceChartCard,
  BalanceCard,
  MarketsTable,
  ProfitRings,
  TransactionList,
  DataTable,
  ActivityFeed,
  CalendarWidget,
  InvoiceTable,
  NotificationPanel,
  ProgressSteps,
  SparklineCard,
  EmptyStateCard,
  MetricRow,
  BudgetCard,
  Timeline,
  UserTable,
  CustomerTable,
  ConversionFunnel,
  TopProductsTable,
  SalesPipeline,
  CampaignPerformance,
  EngagementChart,
  RetentionGrid,
  RevenueBreakdown,
  UptimeMonitor,
  ErrorRateChart,
  Leaderboard,
  SprintBurndown,
  ResourceAllocation,
  DeploymentHistory,
  IncidentTimeline,
  ChannelAttribution,
  HiringPipeline,
} from "@/components/composed";
import {
  AreaTrendChart,
  ComparisonBarChart,
  MultiLineChart,
  DistributionDonutChart,
  StackedAreaChart,
  RadialChart,
  ScatterPlotChart,
  RadarWebChart,
  HorizontalBarChart,
  PieChartComponent,
  ComboChart,
  WaterfallChart,
  StackedBarChart,
  StepLineChart,
  NegativeBarChart,
  TreemapChart,
  FunnelChartComponent,
  SunburstChartComponent,
  SankeyChart,
} from "@/components/charts";

export interface ComponentDef {
  key: string;
  label: string;
  category: string;
  size: SlotSize;
  node: React.ReactNode;
  imports: Record<string, string[]>;
  code: string;
}

// shared sample data
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
  { key: "a", label: "Category A", value: 4200 },
  { key: "b", label: "Category B", value: 3100 },
  { key: "c", label: "Category C", value: 2200 },
];
const PIE = [
  { key: "a", label: "Direct", value: 3400 },
  { key: "b", label: "Organic", value: 2800 },
  { key: "c", label: "Referral", value: 1900 },
  { key: "d", label: "Social", value: 1200 },
];
const SCATTER_SERIES = [
  {
    key: "cohort-a",
    label: "Group A",
    data: [
      { x: 10, y: 30 }, { x: 20, y: 50 }, { x: 35, y: 45 },
      { x: 45, y: 70 }, { x: 55, y: 60 }, { x: 70, y: 85 },
      { x: 80, y: 78 }, { x: 90, y: 95 },
    ],
  },
  {
    key: "cohort-b",
    label: "Group B",
    data: [
      { x: 15, y: 20 }, { x: 25, y: 35 }, { x: 40, y: 55 },
      { x: 50, y: 40 }, { x: 60, y: 65 }, { x: 75, y: 50 },
      { x: 85, y: 70 }, { x: 95, y: 80 },
    ],
  },
];
const RADAR_DATA = [
  { subject: "Speed", current: 85, previous: 70 },
  { subject: "Quality", current: 90, previous: 80 },
  { subject: "Support", current: 75, previous: 85 },
  { subject: "UX", current: 95, previous: 60 },
  { subject: "Price", current: 60, previous: 90 },
  { subject: "Features", current: 80, previous: 75 },
];
const HBAR_DATA = [
  { label: "Engineering", value: 42 },
  { label: "Design", value: 28 },
  { label: "Marketing", value: 35 },
  { label: "Sales", value: 50 },
  { label: "Support", value: 18 },
];
const COMBO_DATA = [
  { label: "Jan", revenue: 4200, cost: 2800, margin: 33 },
  { label: "Feb", revenue: 4800, cost: 3100, margin: 35 },
  { label: "Mar", revenue: 5100, cost: 3000, margin: 41 },
  { label: "Apr", revenue: 4600, cost: 2900, margin: 37 },
  { label: "May", revenue: 5500, cost: 3200, margin: 42 },
  { label: "Jun", revenue: 6200, cost: 3400, margin: 45 },
];
const WATERFALL_DATA = [
  { label: "Start", value: 5000 },
  { label: "Increase", value: -1800 },
  { label: "Subtotal", value: 3200 },
  { label: "Decrease", value: -1200 },
  { label: "Adjustment", value: -400 },
  { label: "Total", value: 1600 },
];

const STACKED_BARS = [
  { label: "Jan", series1: 40, series2: 30, series3: 20 },
  { label: "Feb", series1: 35, series2: 45, series3: 25 },
  { label: "Mar", series1: 50, series2: 35, series3: 30 },
  { label: "Apr", series1: 45, series2: 50, series3: 28 },
  { label: "May", series1: 55, series2: 40, series3: 35 },
  { label: "Jun", series1: 60, series2: 55, series3: 40 },
];
const STEP_LINE = [
  { label: "W1", tier1: 10, tier2: 25 },
  { label: "W2", tier1: 10, tier2: 25 },
  { label: "W3", tier1: 15, tier2: 30 },
  { label: "W4", tier1: 15, tier2: 30 },
  { label: "W5", tier1: 20, tier2: 35 },
  { label: "W6", tier1: 20, tier2: 40 },
  { label: "W7", tier1: 25, tier2: 40 },
  { label: "W8", tier1: 25, tier2: 45 },
];
const NEGATIVE_BARS = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 28 },
  { label: "Mar", value: -15 },
  { label: "Apr", value: 35 },
  { label: "May", value: -22 },
  { label: "Jun", value: 50 },
  { label: "Jul", value: -8 },
  { label: "Aug", value: 38 },
];
const TREEMAP_DATA = [
  { name: "Group A", children: [
    { name: "A1", value: 120 }, { name: "A2", value: 85 }, { name: "A3", value: 45 },
  ]},
  { name: "Group B", children: [
    { name: "B1", value: 95 }, { name: "B2", value: 70 },
  ]},
  { name: "Group C", children: [
    { name: "C1", value: 110 }, { name: "C2", value: 60 }, { name: "C3", value: 35 }, { name: "C4", value: 25 },
  ]},
];
const FUNNEL_DATA = [
  { name: "Visitors", value: 5400 },
  { name: "Sessions", value: 3800 },
  { name: "Leads", value: 2200 },
  { name: "Conversions", value: 1100 },
  { name: "Closed", value: 540 },
];
const SUNBURST_DATA = {
  name: "root",
  children: [
    { name: "Category A", children: [
      { name: "A-1", value: 120 }, { name: "A-2", value: 85 }, { name: "A-3", value: 45 },
    ]},
    { name: "Category B", children: [
      { name: "B-1", value: 95 }, { name: "B-2", value: 60 },
    ]},
    { name: "Category C", children: [
      { name: "C-1", value: 80 }, { name: "C-2", value: 55 }, { name: "C-3", value: 30 },
    ]},
  ],
};
const SANKEY_DATA = {
  nodes: [
    { name: "Source A" }, { name: "Source B" }, { name: "Source C" },
    { name: "Channel X" }, { name: "Channel Y" },
    { name: "Outcome 1" }, { name: "Outcome 2" },
  ],
  links: [
    { source: 0, target: 3, value: 40 },
    { source: 0, target: 4, value: 20 },
    { source: 1, target: 3, value: 30 },
    { source: 1, target: 4, value: 25 },
    { source: 2, target: 4, value: 35 },
    { source: 3, target: 5, value: 50 },
    { source: 3, target: 6, value: 20 },
    { source: 4, target: 5, value: 30 },
    { source: 4, target: 6, value: 50 },
  ],
};

export const CATEGORIES = [
  "Charts",
  "Cards",
  "Tables",
  "Lists",
] as const;

export const COMPONENTS: ComponentDef[] = [
  // ── Charts ──
  { key: "area", label: "Area Trend", category: "Charts", size: "half",
    node: <MetricChartCard title="Area Chart" description="Single series over time" footer={<>Trending up by 15.2% this period <TrendUp size={14} weight="bold" /></>} footerDetail="Showing values for the selected range"><AreaTrendChart data={TREND} seriesLabel="Value" className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["AreaTrendChart"] },
    code: '<MetricChartCard title="Area Chart" description="Single series over time">\n          <AreaTrendChart data={data} seriesLabel="Value" className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "bar", label: "Comparison Bars", category: "Charts", size: "half",
    node: <MetricChartCard title="Grouped Bar Chart" description="Side-by-side comparison" footer={<>Series A outperforming by 28% <TrendUp size={14} weight="bold" /></>} footerDetail="Comparing two series across categories"><ComparisonBarChart data={BARS} series={[{ key: "desktop", label: "Series A" }, { key: "mobile", label: "Series B" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["ComparisonBarChart"] },
    code: '<MetricChartCard title="Grouped Bar Chart" description="Side-by-side comparison">\n          <ComparisonBarChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "line", label: "Multi-Line", category: "Charts", size: "half",
    node: <MetricChartCard title="Multi-Line Chart" description="Multiple series over time" footer={<>Series A averages 12% below Series B <TrendDown size={14} weight="bold" /></>} footerDetail="Comparing multiple series across time"><MultiLineChart data={LINES} series={[{ key: "p50", label: "Series A" }, { key: "p95", label: "Series B" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["MultiLineChart"] },
    code: '<MetricChartCard title="Multi-Line Chart" description="Multiple series over time">\n          <MultiLineChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "donut", label: "Distribution Donut", category: "Charts", size: "third",
    node: <MetricChartCard title="Donut Chart" description="Proportional segments" footer="Segment A holds the largest share" footerDetail="Proportional breakdown across segments"><DistributionDonutChart data={DONUT} centerLabel="Total" className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["DistributionDonutChart"] },
    code: '<MetricChartCard title="Donut Chart" description="Proportional segments">\n          <DistributionDonutChart data={data} centerLabel="Total" className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "stacked", label: "Stacked Area", category: "Charts", size: "half",
    node: <MetricChartCard title="Stacked Area Chart" description="Cumulative series over time" footer={<>Total volume up 42% over period <TrendUp size={14} weight="bold" /></>} footerDetail="Stacked breakdown across series over time"><StackedAreaChart
      data={[
        { label: "Jan", organic: 120, paid: 80, referral: 40 },
        { label: "Feb", organic: 140, paid: 95, referral: 52 },
        { label: "Mar", organic: 155, paid: 110, referral: 48 },
        { label: "Apr", organic: 170, paid: 90, referral: 65 },
        { label: "May", organic: 195, paid: 125, referral: 58 },
        { label: "Jun", organic: 210, paid: 140, referral: 72 },
      ]}
      series={[{ key: "organic", label: "Channel A" }, { key: "paid", label: "Channel B" }, { key: "referral", label: "Channel C" }]}
      className="h-[200px] w-full"
    /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["StackedAreaChart"] },
    code: '<MetricChartCard title="Stacked Area Chart" description="Cumulative series over time">\n          <StackedAreaChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "radial", label: "Radial Progress", category: "Charts", size: "third",
    node: <MetricChartCard title="Radial Bar Chart" description="Concentric progress arcs" footer="2 of 3 values above 75%" footerDetail="Each arc represents a separate value"><RadialChart
      data={[
        { key: "a", label: "Metric A", value: 78, max: 100 },
        { key: "b", label: "Metric B", value: 62, max: 100 },
        { key: "c", label: "Metric C", value: 91, max: 100 },
      ]}
      className="h-[200px] w-full"
    /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["RadialChart"] },
    code: '<MetricChartCard title="Radial Bar Chart" description="Concentric progress arcs">\n          <RadialChart data={data} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "scatter", label: "Scatter Plot", category: "Charts", size: "half",
    node: <MetricChartCard title="Scatter Plot" description="XY point distribution" footer="Positive correlation between axes" footerDetail="Plotting two groups across X and Y dimensions"><ScatterPlotChart series={SCATTER_SERIES} xLabel="X axis" yLabel="Y axis" className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["ScatterPlotChart"] },
    code: '<MetricChartCard title="Scatter Plot" description="XY point distribution">\n          <ScatterPlotChart series={series} xLabel="X axis" yLabel="Y axis" className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "radar", label: "Radar Web", category: "Charts", size: "third",
    node: <MetricChartCard title="Radar Chart" description="Multi-dimensional comparison" footer="Series A leads on 4 of 6 axes" footerDetail="Comparing series across multiple dimensions"><RadarWebChart data={RADAR_DATA} series={[{ key: "current", label: "Series A" }, { key: "previous", label: "Series B" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["RadarWebChart"] },
    code: '<MetricChartCard title="Radar Chart" description="Multi-dimensional comparison">\n          <RadarWebChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "hbar", label: "Horizontal Bar", category: "Charts", size: "half",
    node: <MetricChartCard title="Horizontal Bar Chart" description="Ranked categories" footer="Top category leads across all groups" footerDetail="Values ranked from highest to lowest"><HorizontalBarChart data={HBAR_DATA} seriesLabel="Count" className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["HorizontalBarChart"] },
    code: '<MetricChartCard title="Horizontal Bar Chart" description="Ranked categories">\n          <HorizontalBarChart data={data} seriesLabel="Count" className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "pie", label: "Pie Chart", category: "Charts", size: "third",
    node: <MetricChartCard title="Pie Chart" description="Proportional slices" footer="Largest segment holds 36%" footerDetail="Proportional breakdown across segments"><PieChartComponent data={PIE} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["PieChartComponent"] },
    code: '<MetricChartCard title="Pie Chart" description="Proportional slices">\n          <PieChartComponent data={data} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "combo", label: "Combo Chart", category: "Charts", size: "half",
    node: <MetricChartCard title="Combo Chart" description="Bars with line overlay" footer={<>Rate trending upward over period <TrendUp size={14} weight="bold" /></>} footerDetail="Two bar series overlaid with a line series"><ComboChart data={COMBO_DATA} barSeries={[{ key: "revenue", label: "Series A" }, { key: "cost", label: "Series B" }]} lineSeries={[{ key: "margin", label: "Rate %" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["ComboChart"] },
    code: '<MetricChartCard title="Combo Chart" description="Bars with line overlay">\n          <ComboChart data={data} barSeries={barSeries} lineSeries={lineSeries} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "waterfall", label: "Waterfall Chart", category: "Charts", size: "half",
    node: <MetricChartCard title="Waterfall Chart" description="Running total changes" footer={<>Net result: 1,600 <TrendDown size={14} weight="bold" /></>} footerDetail="Cumulative additions and subtractions"><WaterfallChart data={WATERFALL_DATA} valueFormatter={(v) => `${v.toLocaleString()}`} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["WaterfallChart"] },
    code: '<MetricChartCard title="Waterfall Chart" description="Running total changes">\n          <WaterfallChart data={data} valueFormatter={valueFormatter} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "stacked-bar", label: "Stacked Bar", category: "Charts", size: "half",
    node: <MetricChartCard title="Stacked Bar Chart" description="Part-to-whole columns" footer={<>Total volume increased 55% over period <TrendUp size={14} weight="bold" /></>} footerDetail="Stacked segments showing composition per category"><StackedBarChart data={STACKED_BARS} series={[{ key: "series1", label: "Series A" }, { key: "series2", label: "Series B" }, { key: "series3", label: "Series C" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["StackedBarChart"] },
    code: '<MetricChartCard title="Stacked Bar Chart" description="Part-to-whole columns">\n          <StackedBarChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "step-line", label: "Step Line", category: "Charts", size: "half",
    node: <MetricChartCard title="Step Line Chart" description="Discrete value changes" footer={<>Series A increased 150% over 8 periods <TrendUp size={14} weight="bold" /></>} footerDetail="Showing values as discrete steps over time"><StepLineChart data={STEP_LINE} series={[{ key: "tier1", label: "Series A" }, { key: "tier2", label: "Series B" }]} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["StepLineChart"] },
    code: '<MetricChartCard title="Step Line Chart" description="Discrete value changes">\n          <StepLineChart data={data} series={series} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "negative-bar", label: "Negative Bar", category: "Charts", size: "half",
    node: <MetricChartCard title="Diverging Bar Chart" description="Above and below baseline" footer={<>Net positive in 5 of 8 periods <TrendUp size={14} weight="bold" /></>} footerDetail="Values above and below zero baseline"><NegativeBarChart data={NEGATIVE_BARS} seriesLabel="Change" className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["NegativeBarChart"] },
    code: '<MetricChartCard title="Diverging Bar Chart" description="Above and below baseline">\n          <NegativeBarChart data={data} seriesLabel="Change" className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "treemap", label: "Treemap", category: "Charts", size: "half",
    node: <MetricChartCard title="Treemap" description="Nested proportional areas" footer="Group A holds the largest total share" footerDetail="Area-encoded hierarchical data"><TreemapChart data={TREEMAP_DATA} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["TreemapChart"] },
    code: '<MetricChartCard title="Treemap" description="Nested proportional areas">\n          <TreemapChart data={data} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "funnel", label: "Funnel Chart", category: "Charts", size: "half",
    node: <MetricChartCard title="Funnel Chart" description="Sequential stage reduction" footer={<>10% overall pass-through rate <TrendDown size={14} weight="bold" /></>} footerDetail="Stage-by-stage volume reduction"><FunnelChartComponent data={FUNNEL_DATA} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["FunnelChartComponent"] },
    code: '<MetricChartCard title="Funnel Chart" description="Sequential stage reduction">\n          <FunnelChartComponent data={data} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "sunburst", label: "Sunburst", category: "Charts", size: "third",
    node: <MetricChartCard title="Sunburst Chart" description="Multi-level ring segments" footer="Group A is the largest top-level segment" footerDetail="Hierarchical proportional breakdown"><SunburstChartComponent data={SUNBURST_DATA} className="h-[200px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["SunburstChartComponent"] },
    code: '<MetricChartCard title="Sunburst Chart" description="Multi-level ring segments">\n          <SunburstChartComponent data={data} className="h-[200px] w-full" />\n        </MetricChartCard>' },
  { key: "sankey", label: "Sankey Diagram", category: "Charts", size: "full",
    node: <MetricChartCard title="Sankey Diagram" description="Flow between nodes" footer="Node X receives the most inbound flow" footerDetail="Tracing value flow from sources through intermediaries to outcomes"><SankeyChart data={SANKEY_DATA} className="h-[250px] w-full" /></MetricChartCard>,
    imports: { "@/components/composed": ["MetricChartCard"], "@/components/charts": ["SankeyChart"] },
    code: '<MetricChartCard title="Sankey Diagram" description="Flow between nodes">\n          <SankeyChart data={data} className="h-[250px] w-full" />\n        </MetricChartCard>' },
  { key: "price-chart", label: "Live Ticker", category: "Charts", size: "two-thirds",
    node: <PriceChartCard />, imports: { "@/components/composed": ["PriceChartCard"] }, code: "<PriceChartCard />" },
  { key: "conversion-funnel", label: "Funnel", category: "Charts", size: "half",
    node: <ConversionFunnel />, imports: { "@/components/composed": ["ConversionFunnel"] }, code: "<ConversionFunnel />" },
  { key: "sales-pipeline", label: "Pipeline", category: "Charts", size: "half",
    node: <SalesPipeline />, imports: { "@/components/composed": ["SalesPipeline"] }, code: "<SalesPipeline />" },
  { key: "revenue-breakdown", label: "Breakdown Bars", category: "Charts", size: "half",
    node: <RevenueBreakdown />, imports: { "@/components/composed": ["RevenueBreakdown"] }, code: "<RevenueBreakdown />" },
  { key: "sprint-burndown", label: "Burndown", category: "Charts", size: "half",
    node: <SprintBurndown />, imports: { "@/components/composed": ["SprintBurndown"] }, code: "<SprintBurndown />" },
  { key: "resource-alloc", label: "Allocation Chart", category: "Charts", size: "half",
    node: <ResourceAllocation />, imports: { "@/components/composed": ["ResourceAllocation"] }, code: "<ResourceAllocation />" },
  { key: "uptime-monitor", label: "Status Monitor", category: "Charts", size: "half",
    node: <UptimeMonitor />, imports: { "@/components/composed": ["UptimeMonitor"] }, code: "<UptimeMonitor />" },
  { key: "error-rate", label: "Rate Monitor", category: "Charts", size: "half",
    node: <ErrorRateChart />, imports: { "@/components/composed": ["ErrorRateChart"] }, code: "<ErrorRateChart />" },
  { key: "campaign-perf", label: "Performance Table", category: "Charts", size: "full",
    node: <CampaignPerformance />, imports: { "@/components/composed": ["CampaignPerformance"] }, code: "<CampaignPerformance />" },
  { key: "engagement", label: "Trend Comparison", category: "Charts", size: "half",
    node: <EngagementChart />, imports: { "@/components/composed": ["EngagementChart"] }, code: "<EngagementChart />" },
  { key: "channel-attr", label: "Attribution", category: "Charts", size: "full",
    node: <ChannelAttribution />, imports: { "@/components/composed": ["ChannelAttribution"] }, code: "<ChannelAttribution />" },
  { key: "hiring-pipeline", label: "Stage Pipeline", category: "Charts", size: "half",
    node: <HiringPipeline />, imports: { "@/components/composed": ["HiringPipeline"] }, code: "<HiringPipeline />" },

  // ── Cards ──
  { key: "stat", label: "Stat Card", category: "Cards", size: "third",
    node: <StatCard label="Total" value="42,580" change="+12.5%" positive icon={Lightning} />,
    imports: { "@/components/composed": ["StatCard"], "@phosphor-icons/react": ["Lightning"] },
    code: '<StatCard label="Total" value="42,580" change="+12.5%" positive icon={Lightning} />' },
  { key: "kpi", label: "KPI Tile", category: "Cards", size: "third",
    node: <KpiTile label="Progress" value="38.4k" target="50k" progress={76} />,
    imports: { "@/components/composed": ["KpiTile"] },
    code: '<KpiTile label="Progress" value="38.4k" target="50k" progress={76} />' },
  { key: "sparkline-card", label: "Sparkline Card", category: "Cards", size: "third",
    node: <SparklineCard label="Monthly total" value="48,250" change="+12.3%" positive data={[4, 7, 5, 9, 6, 8, 11, 9, 13, 10, 14, 12, 15, 13, 17, 15, 19, 18, 20, 22]} />,
    imports: { "@/components/composed": ["SparklineCard"] },
    code: '<SparklineCard label="Monthly total" value="48,250" change="+12.3%" positive data={sparklineData} />' },
  { key: "profit", label: "Concentric Rings", category: "Cards", size: "third",
    node: <ProfitRings />, imports: { "@/components/composed": ["ProfitRings"] }, code: "<ProfitRings />" },
  { key: "balance", label: "Balance Card", category: "Cards", size: "third",
    node: <BalanceCard />, imports: { "@/components/composed": ["BalanceCard"] }, code: "<BalanceCard />" },
  { key: "budget", label: "Budget Overview", category: "Cards", size: "third",
    node: <BudgetCard />, imports: { "@/components/composed": ["BudgetCard"] }, code: "<BudgetCard />" },
  { key: "empty-state", label: "Empty State", category: "Cards", size: "third",
    node: <EmptyStateCard icon={Tray} title="No data yet" description="There are no records to display. Create your first entry to get started." />,
    imports: { "@/components/composed": ["EmptyStateCard"], "@phosphor-icons/react": ["Tray"] },
    code: '<EmptyStateCard icon={Tray} title="No data yet" description="There are no records to display." />' },
  { key: "steps", label: "Progress Steps", category: "Cards", size: "third",
    node: <ProgressSteps />, imports: { "@/components/composed": ["ProgressSteps"] }, code: "<ProgressSteps />" },
  { key: "calendar", label: "Calendar", category: "Cards", size: "third",
    node: <CalendarWidget />, imports: { "@/components/composed": ["CalendarWidget"] }, code: "<CalendarWidget />" },
  { key: "metric-row", label: "Metric Row", category: "Cards", size: "full",
    node: <MetricRow className="!grid-cols-2" />, imports: { "@/components/composed": ["MetricRow"] }, code: "<MetricRow />" },

  // ── Tables ──
  { key: "table", label: "Data Table", category: "Tables", size: "full",
    node: <DataTable />, imports: { "@/components/composed": ["DataTable"] }, code: "<DataTable />" },
  { key: "markets", label: "Sortable Table", category: "Tables", size: "full",
    node: <MarketsTable />, imports: { "@/components/composed": ["MarketsTable"] }, code: "<MarketsTable />" },
  { key: "user-table", label: "User Table", category: "Tables", size: "full",
    node: <UserTable />, imports: { "@/components/composed": ["UserTable"] }, code: "<UserTable />" },
  { key: "customer-table", label: "Customer Table", category: "Tables", size: "full",
    node: <CustomerTable />, imports: { "@/components/composed": ["CustomerTable"] }, code: "<CustomerTable />" },
  { key: "invoice", label: "Invoice Table", category: "Tables", size: "half",
    node: <InvoiceTable />, imports: { "@/components/composed": ["InvoiceTable"] }, code: "<InvoiceTable />" },
  { key: "top-products", label: "Ranked Table", category: "Tables", size: "full",
    node: <TopProductsTable />, imports: { "@/components/composed": ["TopProductsTable"] }, code: "<TopProductsTable />" },
  { key: "leaderboard", label: "Leaderboard", category: "Tables", size: "half",
    node: <Leaderboard />, imports: { "@/components/composed": ["Leaderboard"] }, code: "<Leaderboard />" },
  { key: "retention", label: "Cohort Grid", category: "Tables", size: "full",
    node: <RetentionGrid />, imports: { "@/components/composed": ["RetentionGrid"] }, code: "<RetentionGrid />" },

  // ── Lists ──
  { key: "activity", label: "Activity Feed", category: "Lists", size: "half",
    node: <ActivityFeed />, imports: { "@/components/composed": ["ActivityFeed"] }, code: "<ActivityFeed />" },
  { key: "txns", label: "Item List", category: "Lists", size: "third",
    node: <TransactionList />, imports: { "@/components/composed": ["TransactionList"] }, code: "<TransactionList />" },
  { key: "notifications", label: "Notification Panel", category: "Lists", size: "half",
    node: <NotificationPanel />, imports: { "@/components/composed": ["NotificationPanel"] }, code: "<NotificationPanel />" },
  { key: "timeline", label: "Timeline", category: "Lists", size: "half",
    node: <Timeline />, imports: { "@/components/composed": ["Timeline"] }, code: "<Timeline />" },
  { key: "deploy-history", label: "Event Log", category: "Lists", size: "full",
    node: <DeploymentHistory />, imports: { "@/components/composed": ["DeploymentHistory"] }, code: "<DeploymentHistory />" },
  { key: "incident-timeline", label: "Incident Timeline", category: "Lists", size: "half",
    node: <IncidentTimeline />, imports: { "@/components/composed": ["IncidentTimeline"] }, code: "<IncidentTimeline />" },

];

export const COMPONENT_MAP: Record<string, ComponentDef> = Object.fromEntries(
  COMPONENTS.map((c) => [c.key, c])
);

export interface PlacedItem {
  key: string;
  size: SlotSize;
}

export function exportComposition(items: PlacedItem[]): string {
  const defs = items.map((it) => COMPONENT_MAP[it.key]).filter(Boolean);
  const bySource: Record<string, Set<string>> = {};
  for (const d of defs) {
    for (const [src, syms] of Object.entries(d.imports)) {
      bySource[src] ??= new Set();
      syms.forEach((s) => bySource[src].add(s));
    }
  }

  bySource["@/components/composed"] ??= new Set();
  bySource["@/components/composed"].add("SurfaceShell");
  bySource["@phosphor-icons/react"] ??= new Set();
  bySource["@phosphor-icons/react"].add("House");
  bySource["@phosphor-icons/react"].add("ChartLine");
  bySource["@phosphor-icons/react"].add("Gear");

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

  const grid = `    <div className="grid grid-cols-12 gap-4 p-4">
${body || "      {/* add components to the canvas */}"}
    </div>`;

  return `${importLines}

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "analytics", label: "Analytics", icon: ChartLine },
  { id: "settings", label: "Settings", icon: Gear },
];

export function Composition() {
  return (
    <SurfaceShell items={NAV} activeId="dashboard" onSelect={() => {}} brand="Baseline" title="Dashboard">
${grid}
    </SurfaceShell>
  );
}
`;
}
