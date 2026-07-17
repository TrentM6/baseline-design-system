import { useId } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface RadarWebDatum {
  subject: string;
  [series: string]: string | number;
}

export interface RadarWebChartProps {
  data: RadarWebDatum[];
  series: { key: string; label: string }[];
  className?: string;
}

export function RadarWebChart({
  data,
  series,
  className,
}: RadarWebChartProps) {
  const baseId = useId().replace(/:/g, "");

  const config = Object.fromEntries(
    series.map((s, i) => [
      s.key,
      { label: s.label, color: `var(--bl-chart-${(i % 5) + 1})` },
    ])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className={className}>
      <RadarChart data={data} outerRadius="80%">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`${baseId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`var(--color-${s.key})`} stopOpacity={0.3} />
              <stop offset="100%" stopColor={`var(--color-${s.key})`} stopOpacity={0.08} />
            </linearGradient>
          ))}
        </defs>
        <PolarGrid stroke="var(--bl-chart-grid)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "var(--bl-fg-muted)", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          tick={{ fill: "var(--bl-fg-muted)", fontSize: 10 }}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((s) => (
          <Radar
            key={s.key}
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            fill={`url(#${baseId}-${s.key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        ))}
      </RadarChart>
    </ChartContainer>
  );
}
