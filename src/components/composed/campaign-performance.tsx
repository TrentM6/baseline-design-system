import { Megaphone, TrendUp, TrendDown } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type CampaignStatus = "Active" | "Paused" | "Complete";

interface Campaign {
  name: string;
  status: CampaignStatus;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
}

const STATUS_TINT: Record<CampaignStatus, string> = {
  Active: "var(--bl-fill-success)",
  Paused: "var(--bl-fill-warning)",
  Complete: "var(--bl-fg-muted)",
};

const CAMPAIGNS: Campaign[] = [
  { name: "Summer Sale 2024", status: "Active", impressions: 1240000, clicks: 48200, conversions: 2840, cost: 12400, revenue: 89200 },
  { name: "Product Launch", status: "Active", impressions: 890000, clicks: 31600, conversions: 1560, cost: 18600, revenue: 62400 },
  { name: "Brand Awareness", status: "Paused", impressions: 2100000, clicks: 42000, conversions: 980, cost: 24500, revenue: 18200 },
  { name: "Retargeting Q3", status: "Complete", impressions: 560000, clicks: 28400, conversions: 3200, cost: 8900, revenue: 54800 },
  { name: "Newsletter Promo", status: "Active", impressions: 340000, clicks: 18900, conversions: 1120, cost: 4200, revenue: 31600 },
];

function formatCompact(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

/**
 * CampaignPerformance - marketing campaign performance table.
 * Composes: Card, Table, Badge, Progress, Phosphor Megaphone/Trend icons.
 * Tokens: --bl-fill-success/warning/danger, --bl-fg-*, --bl-border-divider.
 */
export function CampaignPerformance({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Campaign Performance</CardTitle>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
            {CAMPAIGNS.filter((c) => c.status === "Active").length} active
          </Badge>
        </div>
        <Megaphone size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right hidden md:table-cell">Impressions</TableHead>
              <TableHead className="text-right hidden md:table-cell">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right hidden lg:table-cell">Conv.</TableHead>
              <TableHead className="text-right hidden lg:table-cell">Cost</TableHead>
              <TableHead className="text-right">ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CAMPAIGNS.map((c) => {
              const ctr = ((c.clicks / c.impressions) * 100).toFixed(2);
              const roi = (((c.revenue - c.cost) / c.cost) * 100).toFixed(0);
              const roiPositive = Number(roi) >= 0;
              const RoiIcon = roiPositive ? TrendUp : TrendDown;

              return (
                <TableRow key={c.name}>
                  <TableCell className="pl-3">
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {c.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-5"
                      style={{
                        color: STATUS_TINT[c.status],
                        borderColor: STATUS_TINT[c.status],
                      }}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px] hidden md:table-cell"
                    style={{ color: "var(--bl-fg-secondary)" }}
                  >
                    {formatCompact(c.impressions)}
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px] hidden md:table-cell"
                    style={{ color: "var(--bl-fg-secondary)" }}
                  >
                    {formatCompact(c.clicks)}
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px]"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {ctr}%
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px] hidden lg:table-cell"
                    style={{ color: "var(--bl-fg-secondary)" }}
                  >
                    {formatCompact(c.conversions)}
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px] hidden lg:table-cell"
                    style={{ color: "var(--bl-fg-secondary)" }}
                  >
                    {formatCurrency(c.cost)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className="inline-flex items-center gap-0.5 text-[13px] tabular-nums font-medium"
                      style={{
                        color: roiPositive
                          ? "var(--bl-fill-success)"
                          : "var(--bl-fill-danger)",
                      }}
                    >
                      <RoiIcon size={12} weight="bold" />
                      {roiPositive ? "+" : ""}
                      {roi}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
