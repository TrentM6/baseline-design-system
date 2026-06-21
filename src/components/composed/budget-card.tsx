import { Wallet } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  /** Optional override color — must be a --bl-* token value. */
  color?: string;
}

export interface BudgetCardProps {
  /** Card title. */
  title?: string;
  /** Total budget amount. */
  total?: number;
  /** Total spent amount. */
  spent?: number;
  /** Per-category breakdown. */
  categories?: BudgetCategory[];
  className?: string;
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { name: "Engineering", budgeted: 45000, spent: 38200, color: "var(--bl-chart-1)" },
  { name: "Marketing", budgeted: 28000, spent: 22400, color: "var(--bl-chart-2)" },
  { name: "Design", budgeted: 18000, spent: 16500, color: "var(--bl-chart-3)" },
  { name: "Operations", budgeted: 15000, spent: 8900, color: "var(--bl-chart-4)" },
  { name: "Infrastructure", budgeted: 12000, spent: 11800, color: "var(--bl-chart-5)" },
];

const DEFAULT_TOTAL = 118000;
const DEFAULT_SPENT = 97800;

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * BudgetCard — budget tracking card with per-category progress bars.
 * Composes: Card, Progress, Phosphor Wallet icon.
 * Tokens: --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted, --bl-chart-1..5,
 *         --bl-fill-success, --bl-fill-warning, --bl-fill-danger.
 */
export function BudgetCard({
  title = "Budget Overview",
  total = DEFAULT_TOTAL,
  spent = DEFAULT_SPENT,
  categories = DEFAULT_CATEGORIES,
  className,
}: BudgetCardProps) {
  const overallPercent = Math.min(Math.round((spent / total) * 100), 100);
  const remaining = total - spent;

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-sm">{title}</CardTitle>
          <CardDescription className="text-xs">
            {formatCurrency(remaining)} remaining
          </CardDescription>
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--bl-bg-active)" }}
        >
          <Wallet size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall progress */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <p
              className="text-xl font-heading font-bold tabular-nums"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {formatCurrency(spent)}
            </p>
            <p className="text-xs tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
              of {formatCurrency(total)}
            </p>
          </div>
          <Progress value={overallPercent} className="h-2" />
          <p className="text-[11px] tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
            {overallPercent}% utilized
          </p>
        </div>

        {/* Per-category breakdown */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const catPercent = Math.min(Math.round((cat.spent / cat.budgeted) * 100), 100);
            const statusColor =
              catPercent >= 95
                ? "var(--bl-fill-danger)"
                : catPercent >= 80
                  ? "var(--bl-fill-warning)"
                  : "var(--bl-fill-success)";

            return (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color ?? statusColor }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--bl-fg-secondary)" }}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[11px] tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
                    {formatCurrency(cat.spent)} / {formatCurrency(cat.budgeted)}
                  </span>
                </div>
                <div
                  className="relative h-1.5 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                  role="progressbar"
                  aria-valuenow={catPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.name} budget: ${catPercent}% used`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-medium"
                    style={{
                      width: `${catPercent}%`,
                      backgroundColor: cat.color ?? statusColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
