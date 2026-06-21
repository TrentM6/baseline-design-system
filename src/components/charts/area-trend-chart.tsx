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

export interface AreaTrendDatum {
  label: string;
  value: number;
}

export function AreaTrendChart({
  data,
  seriesLabel = "Value",
  color = "var(--bl-chart-1)",
  valueFormatter,
  className,
}: {
  data: AreaTrendDatum[];
  seriesLabel?: string;
  color?: string;
  valueFormatter?: (v: number) => string;
  className?: string;
}) {
  const gradientId = useId().replace(/:/g, "");
  const config = {
    value: { label: seriesLabel, color },
  } satisfies ChartConfig;

  const fmt = (v: number) => (valueFormatter ? valueFormatter(v) : v.toLocaleString());

  return (
    <ChartContainer config={config} className={className}>
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.38} />
            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={24}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={56}
          tickMargin={8}
          tickFormatter={(v) => fmt(v as number)}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--color-value)", strokeWidth: 1, strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value) => (
                <span className="font-mono font-medium tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
                  {fmt(value as number)}
                </span>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="value"
          type="natural"
          fill={`url(#${gradientId})`}
          stroke="var(--color-value)"
          strokeWidth={2}
          activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--bl-bg-surface)" }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
