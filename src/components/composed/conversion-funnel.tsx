import { Funnel } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FunnelStage {
  label: string;
  count: number;
}

const STAGES: FunnelStage[] = [
  { label: "Visitors", count: 10000 },
  { label: "Leads", count: 3200 },
  { label: "Qualified", count: 1800 },
  { label: "Proposals", count: 640 },
  { label: "Closed", count: 280 },
];

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : n.toLocaleString();
}

/**
 * ConversionFunnel - sales/marketing conversion funnel visualization.
 * Composes: Card, Badge, Phosphor Funnel icon.
 * Tokens: --bl-fill-primary, --bl-bg-elevated, --bl-fg-*, --bl-bg-active.
 */
export function ConversionFunnel({ className }: { className?: string }) {
  const maxCount = STAGES[0].count;

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Conversion Funnel</CardTitle>
          <CardDescription className="text-xs">Visitor to closed deal pipeline</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
            style={{ color: "var(--bl-fill-success)", borderColor: "var(--bl-fill-success)" }}
          >
            {((STAGES[STAGES.length - 1].count / STAGES[0].count) * 100).toFixed(1)}% overall
          </Badge>
          <Funnel size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-1">
        {STAGES.map((stage, i) => {
          const widthPct = (stage.count / maxCount) * 100;
          const conversionRate =
            i === 0
              ? null
              : ((stage.count / STAGES[i - 1].count) * 100).toFixed(1);

          return (
            <div key={stage.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "var(--bl-fg-primary)" }} className="font-medium">
                  {stage.label}
                </span>
                <span className="flex items-center gap-2 tabular-nums">
                  <span style={{ color: "var(--bl-fg-secondary)" }}>
                    {formatNumber(stage.count)}
                  </span>
                  {conversionRate !== null && (
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {conversionRate}%
                    </span>
                  )}
                </span>
              </div>
              <div
                className="h-7 rounded"
                style={{ backgroundColor: "var(--bl-bg-elevated)", width: "100%" }}
              >
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor:
                      i === STAGES.length - 1
                        ? "var(--bl-fill-success)"
                        : "var(--bl-fill-primary)",
                    opacity: 1 - i * 0.12,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Stage-to-stage conversion arrows */}
        <div
          className="flex items-center justify-between pt-2 border-t text-[11px] tabular-nums"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          {STAGES.slice(1).map((stage, i) => {
            const rate = ((stage.count / STAGES[i].count) * 100).toFixed(0);
            return (
              <div key={stage.label} className="flex flex-col items-center gap-0.5">
                <span style={{ color: "var(--bl-fg-muted)" }}>
                  {STAGES[i].label.slice(0, 3)} → {stage.label.slice(0, 3)}
                </span>
                <span className="font-medium" style={{ color: "var(--bl-fg-secondary)" }}>
                  {rate}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
