import type { Icon } from "@phosphor-icons/react";
import { TrendUp, TrendDown, Users, CurrencyDollar, ShoppingCart, Eye } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricItem {
  label: string;
  value: string;
  /** Change string (e.g. "+5.2%"). */
  change?: string;
  /** Whether the change is positive. */
  positive?: boolean;
  /** Optional Phosphor icon. */
  icon?: Icon;
}

export interface MetricRowProps {
  /** Array of metric items to display. */
  metrics?: MetricItem[];
  className?: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "Total Revenue", value: "$128,430", change: "+14.2%", positive: true, icon: CurrencyDollar },
  { label: "Active Users", value: "8,642", change: "+7.1%", positive: true, icon: Users },
  { label: "Orders", value: "1,243", change: "-3.4%", positive: false, icon: ShoppingCart },
  { label: "Page Views", value: "54,120", change: "+22.5%", positive: true, icon: Eye },
];

/**
 * MetricRow — responsive grid of key metrics for dashboard headers.
 * Composes: Card, Phosphor icons.
 * Tokens: --bl-fg-primary, --bl-fg-muted, --bl-fill-success, --bl-fill-danger, --bl-bg-active.
 */
export function MetricRow({ metrics = DEFAULT_METRICS, className }: MetricRowProps) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-3", className)}>
      {metrics.map((metric) => {
        const Trend = metric.positive ? TrendUp : TrendDown;
        const IconCmp = metric.icon;
        return (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>
                  {metric.label}
                </p>
                {IconCmp && (
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-md"
                    style={{ backgroundColor: "var(--bl-bg-active)" }}
                  >
                    <IconCmp size={14} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
                  </div>
                )}
              </div>
              <p
                className="text-xl font-heading font-bold tabular-nums"
                style={{ color: "var(--bl-fg-primary)" }}
              >
                {metric.value}
              </p>
              {metric.change && (
                <p
                  className="text-xs mt-1 flex items-center gap-1"
                  style={{
                    color: metric.positive
                      ? "var(--bl-fill-success)"
                      : "var(--bl-fill-danger)",
                  }}
                >
                  <Trend size={12} weight="bold" />
                  {metric.change}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
