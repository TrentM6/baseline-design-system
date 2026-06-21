import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
  label?: string;
}

export interface ScatterSeries {
  key: string;
  label: string;
  data: ScatterPoint[];
}

export interface ScatterPlotChartProps {
  series: ScatterSeries[];
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

export function ScatterPlotChart({
  series,
  xLabel = "X",
  yLabel = "Y",
  className,
}: ScatterPlotChartProps) {
  const config = Object.fromEntries(
    series.map((s, i) => [
      s.key,
      { label: s.label, color: `var(--bl-chart-${(i % 5) + 1})` },
    ])
  ) satisfies ChartConfig;

  const hasZ = series.some((s) => s.data.some((p) => p.z !== undefined));

  return (
    <ChartContainer config={config} className={className}>
      <ScatterChart margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          type="number"
          name={xLabel}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          dataKey="y"
          type="number"
          name={yLabel}
          tickLine={false}
          axisLine={false}
          width={48}
          tickMargin={8}
        />
        {hasZ && (
          <ZAxis dataKey="z" type="number" range={[40, 400]} />
        )}
        <ChartTooltip
          cursor={{ strokeDasharray: "4 4", stroke: "var(--bl-border-muted)" }}
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((s) => (
          <Scatter
            key={s.key}
            name={s.key}
            data={s.data}
            fill={`var(--color-${s.key})`}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </ChartContainer>
  );
}
