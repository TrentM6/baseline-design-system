import { Package, TrendUp, TrendDown } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface Product {
  rank: number;
  name: string;
  revenue: number;
  units: number;
  growth: number;
  share: number;
}

const PRODUCTS: Product[] = [
  { rank: 1, name: "Pro Analytics Suite", revenue: 284500, units: 1420, growth: 24.3, share: 32 },
  { rank: 2, name: "Cloud Storage Plus", revenue: 198200, units: 3640, growth: 12.8, share: 22 },
  { rank: 3, name: "Team Workspace", revenue: 156800, units: 2180, growth: 8.4, share: 18 },
  { rank: 4, name: "API Gateway", revenue: 112400, units: 890, growth: -3.2, share: 13 },
  { rank: 5, name: "Auth Shield", revenue: 78600, units: 1560, growth: 31.5, share: 9 },
  { rank: 6, name: "Dev Toolkit", revenue: 54200, units: 720, growth: -8.1, share: 6 },
];

function formatCurrency(n: number): string {
  return `$${(n / 1000).toFixed(1)}K`;
}

/**
 * TopProductsTable -e-commerce top products table with growth badges and share bars.
 * Composes: Card, Table, Badge, Progress, Phosphor Package/Trend icons.
 * Tokens: --bl-fill-success, --bl-fill-danger, --bl-fg-*, --bl-border-divider.
 */
export function TopProductsTable({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Top Products</CardTitle>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
            {PRODUCTS.length} products
          </Badge>
        </div>
        <Package size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-3">#</TableHead>
              <TableHead className="pl-1">Product</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right hidden md:table-cell">Units</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead className="w-28 hidden lg:table-cell">Share</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCTS.map((p) => {
              const positive = p.growth >= 0;
              const TrendIcon = positive ? TrendUp : TrendDown;
              return (
                <TableRow key={p.rank}>
                  <TableCell
                    className="pl-3 tabular-nums font-medium text-[13px]"
                    style={{ color: "var(--bl-fg-muted)" }}
                  >
                    {p.rank}
                  </TableCell>
                  <TableCell className="pl-1">
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {p.name}
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums font-medium text-[13px]"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {formatCurrency(p.revenue)}
                  </TableCell>
                  <TableCell
                    className="text-right tabular-nums text-[13px] hidden md:table-cell"
                    style={{ color: "var(--bl-fg-secondary)" }}
                  >
                    {p.units.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-5 tabular-nums gap-0.5 inline-flex"
                      style={{
                        color: positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)",
                        borderColor: positive ? "var(--bl-fill-success)" : "var(--bl-fill-danger)",
                      }}
                    >
                      <TrendIcon size={10} weight="bold" />
                      {Math.abs(p.growth).toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={p.share}
                        className="h-1.5"
                        aria-label={`${p.share}% market share`}
                      />
                      <span
                        className="text-[11px] tabular-nums shrink-0"
                        style={{ color: "var(--bl-fg-muted)" }}
                      >
                        {p.share}%
                      </span>
                    </div>
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
