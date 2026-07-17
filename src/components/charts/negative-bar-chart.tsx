import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

export interface NegativeBarDatum {
  label: string;
  value: number;
}

export function NegativeBarChart({
  data,
  seriesLabel = "Value",
  positiveColor = "var(--bl-chart-1)",
  negativeColor = "var(--bl-chart-4)",
  className,
}: {
  data: NegativeBarDatum[];
  seriesLabel?: string;
  positiveColor?: string;
  negativeColor?: string;
  className?: string;
}) {
  const config = {
    value: { label: seriesLabel, color: positiveColor },
  } satisfies ChartConfig;

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
        <ReferenceLine y={0} stroke="var(--bl-border-divider)" />
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        <Bar dataKey="value" maxBarSize={48} isAnimationActive={false}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={d.value >= 0 ? positiveColor : negativeColor}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
