import { Cell, Pie, PieChart as RechartsPieChart, Sector } from "recharts";
import type { PieSectorDataItem, PieLabelRenderProps } from "recharts/types/polar/Pie";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

export interface PieDatum {
  key: string;
  label: string;
  value: number;
}

export interface PieChartProps {
  data: PieDatum[];
  showLabels?: boolean;
  className?: string;
}

export function PieChartComponent({
  data,
  showLabels = false,
  className,
}: PieChartProps) {
  const config = Object.fromEntries(
    data.map((d, i) => [
      d.key,
      { label: d.label, color: `var(--bl-chart-${(i % 5) + 1})` },
    ])
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPieChart>
        <ChartTooltip
          cursor
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          outerRadius="82%"
          strokeWidth={2}
          stroke="var(--bl-bg-surface)"
          paddingAngle={1}
          activeShape={({
            outerRadius = 0,
            ...props
          }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius + 8} />
          )}
          label={
            showLabels
              ? (props: PieLabelRenderProps) => {
                  const cx = (props.cx as number) ?? 0;
                  const cy = (props.cy as number) ?? 0;
                  const midAngle = (props.midAngle as number) ?? 0;
                  const innerRadius = (props.innerRadius as number) ?? 0;
                  const outerRadius = (props.outerRadius as number) ?? 0;
                  const percent = (props.percent as number) ?? 0;
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="var(--bl-fg-primary)"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={11}
                      fontWeight={600}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }
              : false
          }
          isAnimationActive={false}
        >
          {data.map((d) => (
            <Cell key={d.key} fill={`var(--color-${d.key})`} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}
