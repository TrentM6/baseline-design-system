import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface RadialDatum {
  key: string;
  label: string;
  value: number;
  max: number;
}

export function RadialChart({
  data,
  className,
}: {
  data: RadialDatum[];
  className?: string;
}) {
  const config = Object.fromEntries(
    data.map((d, i) => [
      d.key,
      { label: d.label, color: `var(--bl-chart-${i + 1})` },
    ])
  ) satisfies ChartConfig;

  const chartData = data.map((d) => ({
    name: d.key,
    value: d.value,
    fill: `var(--color-${d.key})`,
  }));

  return (
    <ChartContainer config={config} className={className}>
      <RadialBarChart
        data={chartData}
        innerRadius="30%"
        outerRadius="100%"
        startAngle={180}
        endAngle={0}
        barSize={12}
      >
        <PolarAngleAxis type="number" domain={[0, Math.max(...data.map((d) => d.max))]} tick={false} angleAxisId={0} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <RadialBar
          dataKey="value"
          cornerRadius={6}
          background={{ fill: "var(--bl-bg-elevated)" }}
          isAnimationActive={false}
          label={{
            position: "insideStart",
            fill: "var(--bl-fg-primary)",
            fontSize: 11,
            fontWeight: 600,
            formatter: (v: unknown) => `${v}%`,
          }}
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
