import { useId } from "react";
import { ChartLine } from "@phosphor-icons/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/* Generate 30 days of engagement data with a natural-looking curve */
function generateEngagementData() {
  const data: Array<{ day: string; dau: number }> = [];
  const baseDAU = 4200;
  for (let i = 0; i < 30; i++) {
    const dayOfWeek = i % 7;
    // weekends dip, mid-week peaks, plus some noise
    const weekendFactor = dayOfWeek >= 5 ? 0.72 : 1;
    const trendFactor = 1 + i * 0.008; // slight upward trend
    const noise = 0.9 + Math.sin(i * 1.3) * 0.08 + Math.cos(i * 0.7) * 0.05;
    const dau = Math.round(baseDAU * weekendFactor * trendFactor * noise);
    data.push({ day: `Day ${i + 1}`, dau });
  }
  return data;
}

const ENGAGEMENT_DATA = generateEngagementData();
const currentDAU = ENGAGEMENT_DATA[ENGAGEMENT_DATA.length - 1].dau;
const currentWAU = 18400;
const currentMAU = 42600;

const chartConfig = {
  dau: { label: "DAU", color: "var(--bl-chart-1)" },
} satisfies ChartConfig;

/**
 * EngagementChart — user engagement metrics card with mini area chart.
 * Shows DAU, WAU, MAU as big numbers with a 30-day DAU trend below.
 * Composes: Card, ChartContainer (AreaChart), Phosphor ChartLine icon.
 * Tokens: --bl-chart-1, --bl-chart-grid, --bl-fg-*, --bl-fill-primary.
 */
export function EngagementChart({ className }: { className?: string }) {
  const gradientId = useId().replace(/:/g, "");
  const engagementScore = ((currentDAU / currentWAU) * 100).toFixed(0);

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Engagement</CardTitle>
          <CardDescription className="text-xs">30-day active user trend</CardDescription>
        </div>
        <ChartLine size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metric row */}
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>DAU</p>
            <p
              className="text-lg font-heading font-bold tabular-nums leading-tight"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {currentDAU.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>WAU</p>
            <p
              className="text-lg font-heading font-bold tabular-nums leading-tight"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {currentWAU.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>MAU</p>
            <p
              className="text-lg font-heading font-bold tabular-nums leading-tight"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {currentMAU.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>DAU/WAU</p>
            <p
              className="text-lg font-heading font-bold tabular-nums leading-tight"
              style={{ color: "var(--bl-fill-primary)" }}
            >
              {engagementScore}%
            </p>
          </div>
        </div>

        {/* Area chart */}
        <div className="h-[180px]">
          <ChartContainer config={chartConfig}>
            <AreaChart data={ENGAGEMENT_DATA} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-dau)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--color-dau)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--bl-chart-grid)" strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={40}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={44}
                tickMargin={8}
                tickFormatter={(v) => `${((v as number) / 1000).toFixed(1)}K`}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--color-dau)", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value) => (
                      <span
                        className="font-mono font-medium tabular-nums"
                        style={{ color: "var(--bl-fg-primary)" }}
                      >
                        {(value as number).toLocaleString()} users
                      </span>
                    )}
                  />
                }
              />
              <Area
                dataKey="dau"
                type="natural"
                fill={`url(#${gradientId})`}
                stroke="var(--color-dau)"
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--bl-bg-surface)" }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
