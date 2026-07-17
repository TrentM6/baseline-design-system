import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface WaterfallDatum {
  label: string;
  value: number;
}

export interface WaterfallChartProps {
  data: WaterfallDatum[];
  className?: string;
  valueFormatter?: (v: number) => string;
}

interface WaterfallBar {
  label: string;
  value: number;
  base: number;
  range: [number, number];
  isTotal: boolean;
  isPositive: boolean;
}

export function WaterfallChart({
  data,
  className,
  valueFormatter,
}: WaterfallChartProps) {
  const config = {
    positive: { label: "Increase", color: "var(--bl-fill-success)" },
    negative: { label: "Decrease", color: "var(--bl-fill-danger)" },
    total: { label: "Total", color: "var(--bl-chart-1)" },
  } satisfies ChartConfig;

  const fmt = (v: number) =>
    valueFormatter ? valueFormatter(v) : v.toLocaleString();

  const bars: WaterfallBar[] = React.useMemo(() => {
    let running = 0;
    const result: WaterfallBar[] = [];

    for (const d of data) {
      const prev = running;
      running += d.value;
      result.push({
        label: d.label,
        value: d.value,
        base: d.value >= 0 ? prev : running,
        range: [d.value >= 0 ? prev : running, d.value >= 0 ? running : prev],
        isTotal: false,
        isPositive: d.value >= 0,
      });
    }

    result.push({
      label: "Total",
      value: running,
      base: 0,
      range: [0, running],
      isTotal: true,
      isPositive: running >= 0,
    });

    return result;
  }, [data]);

  return (
    <ChartContainer config={config} className={className}>
      <BarChart
        data={bars}
        margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={56}
          tickMargin={8}
          tickFormatter={(v) => fmt(v as number)}
        />
        <ChartTooltip
          cursor={{ fill: "var(--bl-bg-active)", opacity: 0.4 }}
          content={
            <ChartTooltipContent
              formatter={(value, _name, item) => {
                const payload = (item as Record<string, unknown>)?.payload as WaterfallBar | undefined;
                const displayValue = payload?.value ?? (value as number);
                const sign = displayValue >= 0 ? "+" : "";
                return (
                  <span
                    className="font-mono font-medium tabular-nums"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {payload?.isTotal ? fmt(displayValue) : `${sign}${fmt(displayValue)}`}
                  </span>
                );
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="range"
          isAnimationActive={false}
          radius={[4, 4, 0, 0]}
          maxBarSize={48}
        >
          {bars.map((bar, index) => (
            <Cell
              key={index}
              fill={
                bar.isTotal
                  ? "var(--color-total)"
                  : bar.isPositive
                    ? "var(--color-positive)"
                    : "var(--color-negative)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
