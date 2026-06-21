import { Timer } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface SprintBurndownProps {
  className?: string;
}

const BURNDOWN_DATA = [
  { day: "Day 1", ideal: 80, actual: 80 },
  { day: "Day 2", ideal: 74.3, actual: 78 },
  { day: "Day 3", ideal: 68.6, actual: 72 },
  { day: "Day 4", ideal: 62.9, actual: 66 },
  { day: "Day 5", ideal: 57.1, actual: 60 },
  { day: "Day 6", ideal: 51.4, actual: 54 },
  { day: "Day 7", ideal: 45.7, actual: 48 },
  { day: "Day 8", ideal: 40, actual: 40 },
  { day: "Day 9", ideal: 34.3, actual: 33 },
  { day: "Day 10", ideal: 28.6, actual: 26 },
  { day: "Day 11", ideal: 22.9, actual: 20 },
  { day: "Day 12", ideal: 17.1, actual: 12 },
  { day: "Day 13", ideal: 11.4, actual: 10 },
  { day: "Day 14", ideal: 5.7, actual: 8 },
];

const chartConfig = {
  ideal: {
    label: "Ideal",
    color: "var(--bl-chart-1)",
  },
  actual: {
    label: "Actual",
    color: "var(--bl-chart-2)",
  },
} satisfies ChartConfig;

/**
 * SprintBurndown — agile sprint burndown chart showing ideal vs actual progress.
 * Composes: Card, CardHeader, CardTitle, CardDescription, CardContent, Badge,
 * ChartContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
 * ChartTooltip, ChartLegend, Phosphor Timer icon.
 * Tokens: --bl-chart-1, --bl-chart-2, --bl-chart-grid, --bl-fg-muted.
 */
export function SprintBurndown({ className }: SprintBurndownProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Sprint Burndown</CardTitle>
          <CardDescription className="text-xs">
            Sprint 24 &middot; Jun 9 – Jun 20, 2025
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
          >
            Sprint 24
          </Badge>
          <Timer size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <LineChart
            data={BURNDOWN_DATA}
            margin={{ left: 4, right: 4, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value: string) => value.replace("Day ", "D")}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tickMargin={8}
              domain={[0, 80]}
            />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="ideal"
              type="linear"
              stroke="var(--color-ideal)"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={false}
            />
            <Line
              dataKey="actual"
              type="natural"
              stroke="var(--color-actual)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
