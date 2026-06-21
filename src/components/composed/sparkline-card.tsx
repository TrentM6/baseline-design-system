import { TrendUp, TrendDown } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export interface SparklineCardProps {
  /** Metric label. */
  label: string;
  /** Formatted metric value (e.g. "$12,450"). */
  value: string;
  /** Change string (e.g. "+12.5%"). */
  change: string;
  /** Whether the change is positive. */
  positive: boolean;
  /** Array of numeric values for the sparkline. */
  data: number[];
  className?: string;
}

const DEFAULT_DATA = [4, 7, 5, 9, 6, 8, 11, 9, 13, 10, 14, 12, 15, 13, 17, 15, 19, 18, 20, 22];

/**
 * SparklineCard -compact metric card with an inline sparkline.
 * Composes: Card, Recharts AreaChart, Phosphor TrendUp/TrendDown.
 * Tokens: --bl-fg-primary, --bl-fg-muted, --bl-fill-success, --bl-fill-danger, --bl-chart-1.
 */
export function SparklineCard({
  label = "Monthly Revenue",
  value = "$48,250",
  change = "+12.3%",
  positive = true,
  data = DEFAULT_DATA,
  className,
}: SparklineCardProps) {
  const Trend = positive ? TrendUp : TrendDown;
  const chartData = data.map((v, i) => ({ idx: i, value: v }));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Metric */}
          <div className="min-w-0 space-y-1">
            <p className="text-xs truncate" style={{ color: "var(--bl-fg-muted)" }}>
              {label}
            </p>
            <p
              className="text-xl font-heading font-bold tabular-nums"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {value}
            </p>
            <p
              className="text-xs flex items-center gap-1"
              style={{ color: positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)" }}
            >
              <Trend size={12} weight="bold" />
              {change}
            </p>
          </div>

          {/* Sparkline */}
          <div className="w-24 h-12 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)"}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="natural"
                  dataKey="value"
                  stroke={positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)"}
                  strokeWidth={1.5}
                  fill="url(#sparkFill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
