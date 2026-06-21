import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface DonutDatum {
  key: string;
  label: string;
  value: number;
}

export function DistributionDonutChart({
  data,
  centerLabel = "Total",
  className,
}: {
  data: DonutDatum[];
  centerLabel?: string;
  className?: string;
}) {
  const config = Object.fromEntries(
    data.map((d, i) => [
      d.key,
      { label: d.label, color: `var(--bl-chart-${(i % 5) + 1})` },
    ])
  ) satisfies ChartConfig;

  const total = React.useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data]
  );

  return (
    <ChartContainer config={config} className={className}>
      <PieChart>
        <ChartTooltip cursor content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          innerRadius="58%"
          outerRadius="82%"
          strokeWidth={2}
          stroke="var(--bl-bg-surface)"
          paddingAngle={2}
        >
          {data.map((d) => (
            <Cell key={d.key} fill={`var(--color-${d.key})`} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 6}
                      style={{ fill: "var(--bl-fg-primary)", fontSize: 22, fontFamily: "var(--bl-font-mono)", fontWeight: 700 }}
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 14}
                      style={{ fill: "var(--bl-fg-muted)", fontSize: 11 }}
                    >
                      {centerLabel}
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
