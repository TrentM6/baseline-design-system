import { useId } from "react";
import { Warning } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface ErrorRateChartProps {
  className?: string;
}

interface HourlyDatum {
  hour: string;
  errorRate: number;
}

const DEMO_DATA: HourlyDatum[] = [
  { hour: "00:00", errorRate: 0.22 },
  { hour: "01:00", errorRate: 0.18 },
  { hour: "02:00", errorRate: 0.15 },
  { hour: "03:00", errorRate: 0.12 },
  { hour: "04:00", errorRate: 0.10 },
  { hour: "05:00", errorRate: 0.14 },
  { hour: "06:00", errorRate: 0.19 },
  { hour: "07:00", errorRate: 0.28 },
  { hour: "08:00", errorRate: 0.35 },
  { hour: "09:00", errorRate: 0.31 },
  { hour: "10:00", errorRate: 0.27 },
  { hour: "11:00", errorRate: 0.33 },
  { hour: "12:00", errorRate: 0.38 },
  { hour: "13:00", errorRate: 0.45 },
  { hour: "14:00", errorRate: 0.62 },
  { hour: "15:00", errorRate: 0.85 },
  { hour: "16:00", errorRate: 0.74 },
  { hour: "17:00", errorRate: 0.58 },
  { hour: "18:00", errorRate: 0.49 },
  { hour: "19:00", errorRate: 0.41 },
  { hour: "20:00", errorRate: 0.36 },
  { hour: "21:00", errorRate: 0.38 },
  { hour: "22:00", errorRate: 0.44 },
  { hour: "23:00", errorRate: 0.42 },
];

function getStatus(rate: number): {
  label: string;
  bgStyle: string;
  colorToken: string;
} {
  if (rate > 1.0) {
    return {
      label: "Critical",
      bgStyle: "color-mix(in srgb, var(--bl-fill-danger) 14%, transparent)",
      colorToken: "var(--bl-fill-danger)",
    };
  }
  if (rate >= 0.5) {
    return {
      label: "Warning",
      bgStyle: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)",
      colorToken: "var(--bl-fill-warning)",
    };
  }
  return {
    label: "Healthy",
    bgStyle: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)",
    colorToken: "var(--bl-fill-success)",
  };
}

const chartConfig = {
  errorRate: {
    label: "Error Rate",
    color: "var(--bl-fill-danger)",
  },
} satisfies ChartConfig;

/**
 * ErrorRateChart — application error rate monitoring over 24 hours.
 * Composes: Card, Badge, ChartContainer (Recharts AreaChart), Phosphor Warning icon.
 * Tokens: --bl-fill-danger, --bl-fill-success, --bl-fill-warning,
 *         --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted,
 *         --bl-bg-surface, --bl-chart-grid.
 */
export function ErrorRateChart({ className }: ErrorRateChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const currentRate = DEMO_DATA[DEMO_DATA.length - 1].errorRate;
  const status = getStatus(currentRate);

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "color-mix(in srgb, var(--bl-fill-danger) 10%, transparent)",
                color: "var(--bl-fill-danger)",
              }}
            >
              <Warning size={18} weight="regular" />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-sm" style={{ color: "var(--bl-fg-primary)" }}>
                Error Rate
              </CardTitle>
              <CardDescription className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>
                Last 24 hours
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-heading font-bold tabular-nums"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {currentRate.toFixed(2)}%
            </span>
            <Badge
              variant="outline"
              className="border-transparent text-[11px] px-2 py-0.5"
              style={{
                backgroundColor: status.bgStyle,
                color: status.colorToken,
              }}
            >
              {status.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={DEMO_DATA} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-errorRate)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="var(--color-errorRate)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={40}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tickMargin={8}
              tickFormatter={(v) => `${(v as number).toFixed(1)}%`}
            />
            <ReferenceLine
              y={1.0}
              stroke="var(--bl-fill-danger)"
              strokeDasharray="6 4"
              label={{
                value: "1% threshold",
                position: "insideTopRight",
                fill: "var(--bl-fill-danger)",
                fontSize: 11,
              }}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--bl-fg-muted)", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => (
                    <span
                      className="font-mono font-medium tabular-nums"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {(value as number).toFixed(2)}%
                    </span>
                  )}
                />
              }
            />
            <Area
              dataKey="errorRate"
              type="natural"
              fill={`url(#${gradientId})`}
              stroke="var(--color-errorRate)"
              strokeWidth={2}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--bl-bg-surface)" }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
