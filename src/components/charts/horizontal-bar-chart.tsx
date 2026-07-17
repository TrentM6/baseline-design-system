import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface HorizontalBarDatum {
  label: string;
  value: number;
}

export interface HorizontalBarChartProps {
  data: HorizontalBarDatum[];
  seriesLabel?: string;
  color?: string;
  valueFormatter?: (v: number) => string;
  className?: string;
}

export function HorizontalBarChart({
  data,
  seriesLabel = "Value",
  color = "var(--bl-chart-1)",
  valueFormatter,
  className,
}: HorizontalBarChartProps) {
  const config = {
    value: { label: seriesLabel, color },
  } satisfies ChartConfig;

  const fmt = (v: number) =>
    valueFormatter ? valueFormatter(v) : v.toLocaleString();

  return (
    <ChartContainer config={config} className={className}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(v) => fmt(v as number)}
        />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          axisLine={false}
          width={80}
          tickMargin={8}
        />
        <ChartTooltip
          cursor
          content={
            <ChartTooltipContent
              formatter={(value) => (
                <span
                  className="font-mono font-medium tabular-nums"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {fmt(value as number)}
                </span>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={[0, 4, 4, 0]}
          maxBarSize={32}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartContainer>
  );
}
