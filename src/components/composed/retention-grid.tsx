import { UsersThree } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
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

interface CohortRow {
  cohort: string;
  users: number;
  retention: number[]; // percentages for week 0..4
}

const COHORTS: CohortRow[] = [
  { cohort: "Week 1", users: 1240, retention: [100, 68, 52, 41, 34] },
  { cohort: "Week 2", users: 1180, retention: [100, 72, 55, 43, 36] },
  { cohort: "Week 3", users: 1320, retention: [100, 65, 48, 38, 31] },
  { cohort: "Week 4", users: 1090, retention: [100, 70, 53, 42, 35] },
  { cohort: "Week 5", users: 1410, retention: [100, 74, 58, 45] },
  { cohort: "Week 6", users: 1260, retention: [100, 71, 54] },
];

/**
 * Map a retention percentage (0–100) to an opacity value for the fill.
 * 100% → full intensity; lower → progressively more transparent.
 */
function retentionOpacity(pct: number): number {
  // Minimum 0.08 so cells are never invisible
  return Math.max(0.08, pct / 100);
}

/**
 * RetentionGrid - cohort retention matrix / heatmap.
 * Composes: Card, Table, Badge, Phosphor UsersThree icon.
 * Tokens: --bl-fill-primary (with opacity), --bl-fg-*, --bl-bg-elevated, --bl-border-divider.
 */
export function RetentionGrid({ className }: { className?: string }) {
  const weeks = ["W0", "W1", "W2", "W3", "W4"];

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Cohort Retention</CardTitle>
          <CardDescription className="text-xs">Weekly retention by signup cohort</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
            {COHORTS.length} cohorts
          </Badge>
          <UsersThree size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Cohort</TableHead>
              <TableHead className="text-right">Users</TableHead>
              {weeks.map((w) => (
                <TableHead key={w} className="text-center whitespace-nowrap">
                  {w}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {COHORTS.map((row) => (
              <TableRow key={row.cohort}>
                <TableCell
                  className="pl-3 text-[13px] font-medium"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {row.cohort}
                </TableCell>
                <TableCell
                  className="text-right tabular-nums text-[13px]"
                  style={{ color: "var(--bl-fg-secondary)" }}
                >
                  {row.users.toLocaleString()}
                </TableCell>
                {weeks.map((w, i) => {
                  const value = row.retention[i];
                  const hasData = value !== undefined;

                  return (
                    <TableCell key={w} className="text-center p-1.5">
                      {hasData ? (
                        <div
                          className="rounded px-1 py-1.5 text-[12px] tabular-nums font-medium mx-auto"
                          style={{
                            backgroundColor: `color-mix(in srgb, var(--bl-fill-primary) ${Math.round(retentionOpacity(value) * 100)}%, transparent)`,
                            color:
                              value >= 60
                                ? "var(--bl-fg-on-primary)"
                                : "var(--bl-fg-primary)",
                          }}
                        >
                          {value}%
                        </div>
                      ) : (
                        <span
                          className="text-[12px]"
                          style={{ color: "var(--bl-fg-muted)" }}
                        >
                          -
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Legend */}
        <div
          className="flex items-center justify-end gap-1.5 pt-3 border-t mt-2"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          <span className="text-[10px]" style={{ color: "var(--bl-fg-muted)" }}>
            Low
          </span>
          {[10, 30, 50, 70, 90].map((pct) => (
            <div
              key={pct}
              className="h-3 w-5 rounded-sm"
              style={{
                backgroundColor: `color-mix(in srgb, var(--bl-fill-primary) ${pct}%, transparent)`,
              }}
            />
          ))}
          <span className="text-[10px]" style={{ color: "var(--bl-fg-muted)" }}>
            High
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
