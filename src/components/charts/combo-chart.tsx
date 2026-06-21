import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface ComboDatum {
  label: string;
  [series: string]: string | number;
}

export interface ComboChartProps {
  data: ComboDatum[];
  barSeries: { key: string; label: string }[];
  lineSeries: { key: string; label: string }[];
  className?: string;
}

export function ComboChart({
  data,
  barSeries,
  lineSeries,
  className,
}: ComboChartProps) {
  const allSeries = [...barSeries, ...lineSeries];

  const config = Object.fromEntries(
    allSeries.map((s, i) => [
      s.key,
      { label: s.label, color: `var(--bl-chart-${(i % 5) + 1})` },
    ])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className={className}>
      <ComposedChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          width={48}
          tickMargin={8}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          width={48}
          tickMargin={8}
        />
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {barSeries.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            yAxisId="left"
            fill={`var(--color-${s.key})`}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
            isAnimationActive={false}
          />
        ))}
        {lineSeries.map((s) => (
          <Line
            key={s.key}
            dataKey={s.key}
            yAxisId="right"
            type="natural"
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        ))}
      </ComposedChart>
    </ChartContainer>
  );
}
