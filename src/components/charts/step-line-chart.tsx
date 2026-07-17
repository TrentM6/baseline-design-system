import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface StepLineDatum {
  label: string;
  [series: string]: string | number;
}

export function StepLineChart({
  data,
  series,
  className,
}: {
  data: StepLineDatum[];
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
      <LineChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
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
          <Line
            key={s.key}
            dataKey={s.key}
            type="stepAfter"
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
