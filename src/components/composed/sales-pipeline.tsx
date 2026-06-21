import { Briefcase } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PipelineStage {
  label: string;
  deals: number;
  value: number;
  topDeals: Array<{ initials: string; name: string }>;
}

const STAGES: PipelineStage[] = [
  {
    label: "Discovery",
    deals: 14,
    value: 420000,
    topDeals: [
      { initials: "NK", name: "Nadia Kim" },
      { initials: "RP", name: "Ravi Patel" },
      { initials: "LM", name: "Lena Morales" },
    ],
  },
  {
    label: "Proposal",
    deals: 8,
    value: 310000,
    topDeals: [
      { initials: "SC", name: "Sarah Chen" },
      { initials: "JW", name: "James Wilson" },
    ],
  },
  {
    label: "Negotiation",
    deals: 5,
    value: 185000,
    topDeals: [
      { initials: "MT", name: "Mia Torres" },
      { initials: "DB", name: "Devon Brooks" },
    ],
  },
  {
    label: "Closed Won",
    deals: 3,
    value: 128000,
    topDeals: [
      { initials: "AP", name: "Aisha Patel" },
    ],
  },
];

const STAGE_COLORS = [
  "var(--bl-chart-1)",
  "var(--bl-chart-2)",
  "var(--bl-chart-3)",
  "var(--bl-fill-success)",
];

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  return `$${(n / 1000).toFixed(0)}K`;
}

/**
 * SalesPipeline -CRM sales pipeline / deal stages visualization.
 * Composes: Card, Badge, Avatar, Phosphor Briefcase icon.
 * Tokens: --bl-chart-1..3, --bl-fill-success, --bl-fg-*, --bl-bg-elevated, --bl-border-divider.
 */
export function SalesPipeline({ className }: { className?: string }) {
  const totalValue = STAGES.reduce((sum, s) => sum + s.value, 0);
  const totalDeals = STAGES.reduce((sum, s) => sum + s.deals, 0);
  const maxValue = Math.max(...STAGES.map((s) => s.value));

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Sales Pipeline</CardTitle>
          <CardDescription className="text-xs">
            {totalDeals} deals across {STAGES.length} stages
          </CardDescription>
        </div>
        <Briefcase size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Pipeline stages */}
        <div className="space-y-3">
          {STAGES.map((stage, i) => {
            const barWidth = (stage.value / maxValue) * 100;
            return (
              <div key={stage.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: STAGE_COLORS[i] }}
                    />
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {stage.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4 tabular-nums"
                    >
                      {stage.deals}
                    </Badge>
                  </div>
                  <span
                    className="text-[13px] tabular-nums font-medium"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {formatCurrency(stage.value)}
                  </span>
                </div>

                {/* Bar + avatars row */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 rounded-full flex-1"
                    style={{ backgroundColor: "var(--bl-bg-elevated)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: STAGE_COLORS[i],
                      }}
                    />
                  </div>
                  <div className="flex -space-x-1.5 shrink-0">
                    {stage.topDeals.map((deal) => (
                      <Avatar key={deal.initials} className="h-5 w-5 border border-[var(--bl-bg-surface)]">
                        <AvatarFallback className="text-[7px] font-semibold">
                          {deal.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary row */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>
            Total Pipeline
          </span>
          <span
            className="text-base font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {formatCurrency(totalValue)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
