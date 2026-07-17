import { CurrencyDollar } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface RevenueSegment {
  name: string;
  amount: number;
  change: number;
  color: string;
}

const SEGMENTS: RevenueSegment[] = [
  { name: "Subscriptions", amount: 284000, change: 12.4, color: "var(--bl-chart-1)" },
  { name: "One-time", amount: 128000, change: -3.1, color: "var(--bl-chart-2)" },
  { name: "Services", amount: 96400, change: 8.7, color: "var(--bl-chart-3)" },
  { name: "Marketplace", amount: 72000, change: 24.2, color: "var(--bl-chart-4)" },
  { name: "Enterprise", amount: 196000, change: 5.9, color: "var(--bl-chart-5)" },
];

const TOTAL_REVENUE = SEGMENTS.reduce((sum, s) => sum + s.amount, 0);

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  return `$${(n / 1000).toFixed(0)}K`;
}

/**
 * RevenueBreakdown - revenue breakdown by segment with percentage bars.
 * Composes: Card, Badge, Phosphor CurrencyDollar icon.
 * Tokens: --bl-chart-1..5, --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted,
 *         --bl-bg-active, --bl-bg-elevated, --bl-border-divider, --bl-fill-success,
 *         --bl-fill-danger.
 */
export function RevenueBreakdown({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Revenue Breakdown</CardTitle>
          <CardDescription className="text-xs">By source this quarter</CardDescription>
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--bl-bg-active)" }}
        >
          <CurrencyDollar size={16} weight="bold" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p
            className="text-2xl font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {formatCurrency(TOTAL_REVENUE)}
          </p>
          <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
            Total revenue across {SEGMENTS.length} sources
          </p>
        </div>

        <div className="space-y-3">
          {SEGMENTS.map((seg) => {
            const pct = (seg.amount / TOTAL_REVENUE) * 100;
            const isPositive = seg.change >= 0;

            return (
              <div key={seg.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {seg.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className="text-[10px] px-1.5 py-0 h-5 border-0 tabular-nums"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${isPositive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)"} 14%, transparent)`,
                        color: isPositive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)",
                      }}
                    >
                      {isPositive ? "+" : ""}{seg.change}%
                    </Badge>
                    <span
                      className="text-[13px] tabular-nums font-medium shrink-0"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {formatCurrency(seg.amount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="relative h-1.5 flex-1 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--bl-bg-active)" }}
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${seg.name}: ${pct.toFixed(1)}% of total revenue`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-medium"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: seg.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] tabular-nums shrink-0 w-10 text-right"
                    style={{ color: "var(--bl-fg-muted)" }}
                  >
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>
            Q2 2026 total
          </span>
          <span
            className="text-base font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {formatCurrency(TOTAL_REVENUE)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
