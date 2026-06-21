import { useId } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface StackedAreaDatum {
  label: string;
  [series: string]: string | number;
}

export function StackedAreaChart({
  data,
  series,
  className,
}: {
  data: StackedAreaDatum[];
  series: { key: string; label: string }[];
  className?: string;
}) {
  const baseId = useId().replace(/:/g, "");

  const config = Object.fromEntries(
    series.map((s, i) => [
      s.key,
      { label: s.label, color: `var(--bl-chart-${i + 1})` },
    ])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className={className}>
      <AreaChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`${baseId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`var(--color-${s.key})`} stopOpacity={0.3} />
              <stop offset="100%" stopColor={`var(--color-${s.key})`} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
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
          <Area
            key={s.key}
            dataKey={s.key}
            type="natural"
            fill={`url(#${baseId}-${s.key})`}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            stackId="1"
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
