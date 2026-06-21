import { CrownSimple } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UsageMeter {
  label: string;
  current: number;
  limit: number;
  unit: string;
}

const PLAN_NAME = "Pro";
const NEXT_BILLING = "Jul 15, 2024";
const BILLING_AMOUNT = "$89.00";

const USAGE: UsageMeter[] = [
  { label: "API Calls", current: 8420, limit: 10000, unit: "calls" },
  { label: "Storage", current: 3.2, limit: 5, unit: "GB" },
  { label: "Team Members", current: 4, limit: 10, unit: "seats" },
];

function formatUsage(current: number, limit: number, unit: string): string {
  if (unit === "GB") {
    return `${current} / ${limit} ${unit}`;
  }
  return `${current.toLocaleString()} / ${limit.toLocaleString()} ${unit}`;
}

/**
 * SubscriptionCard — current plan overview with usage meters, billing info,
 * and management actions. Composes: Card, Badge, Button, Progress, Phosphor
 * CrownSimple icon.
 */
export function SubscriptionCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CrownSimple size={18} weight="bold" style={{ color: "var(--bl-fill-warning)" }} />
          <CardTitle className="text-sm">Subscription</CardTitle>
        </div>
        <Badge className="text-[10px] px-2 py-0.5">{PLAN_NAME}</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Usage meters */}
        <div className="space-y-4">
          {USAGE.map((meter) => {
            const pct = Math.round((meter.current / meter.limit) * 100);
            const high = pct >= 80;
            return (
              <div key={meter.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--bl-fg-primary)" }}>
                    {meter.label}
                  </span>
                  <span
                    className="text-[11px] tabular-nums"
                    style={{ color: high ? "var(--bl-fill-warning)" : "var(--bl-fg-muted)" }}
                  >
                    {formatUsage(meter.current, meter.limit, meter.unit)}
                  </span>
                </div>
                <Progress value={pct} className="h-1.5" />
              </div>
            );
          })}
        </div>

        {/* Billing info */}
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2.5"
          style={{ backgroundColor: "var(--bl-bg-elevated)" }}
        >
          <div>
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>Next billing date</p>
            <p className="text-xs font-medium" style={{ color: "var(--bl-fg-primary)" }}>{NEXT_BILLING}</p>
          </div>
          <p className="text-sm font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
            {BILLING_AMOUNT}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Upgrade Plan
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Manage Billing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
