import type { Icon } from "@phosphor-icons/react";
import { TrendUp, TrendDown } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";

export interface StatCardProps {
  label: string;
  value: string;
  /** signed delta string, e.g. "+12.5%" */
  change: string;
  positive: boolean;
  icon?: Icon;
}

/**
 * StatCard -single metric with a directional delta.
 * Composes: Card, Phosphor icon. Tokens for trend color.
 */
export function StatCard({ label, value, change, positive, icon: IconCmp }: StatCardProps) {
  const Trend = positive ? TrendUp : TrendDown;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs">{label}</CardDescription>
          {IconCmp ? (
            <IconCmp size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-heading font-bold">{value}</p>
        <p
          className="text-xs mt-1 flex items-center gap-1"
          style={{ color: positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)" }}
        >
          <Trend size={12} weight="bold" />
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
