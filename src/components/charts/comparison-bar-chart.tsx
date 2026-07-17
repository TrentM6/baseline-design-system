import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface BarDatum {
  label: string;
  [series: string]: string | number;
}

export function ComparisonBarChart({
  data,
  series,
  className,
}: {
  data: BarDatum[];
  series: { key: string; label: string }[];
  className?: string;
}) {
  const config = Object.fromEntries(
    series.map((s, i) => [
      s.key,
      { label: s.label, color: `var(--bl-chart-${i + 1})` },
    ])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className={className}>
      <BarChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={48}
          tickMargin={8}
        />
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={`var(--color-${s.key})`}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
