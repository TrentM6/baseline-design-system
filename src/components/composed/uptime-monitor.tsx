import {
  Heartbeat,
  Globe,
  Database,
  CloudArrowUp,
  Queue,
  Lightning,
} from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DayStatus = "up" | "degraded" | "down";

interface UptimeDay {
  date: string;
  status: DayStatus;
  uptime: number;
}

interface Service {
  name: string;
  icon: typeof Globe;
  status: DayStatus;
  uptimePercent: number;
  days: UptimeDay[];
}

/* ------------------------------------------------------------------ */
/*  Token-based colour maps                                            */
/* ------------------------------------------------------------------ */

const STATUS_COLOR: Record<DayStatus, string> = {
  up: "var(--bl-fill-success)",
  degraded: "var(--bl-fill-warning)",
  down: "var(--bl-fill-destructive)",
};

const STATUS_LABEL: Record<DayStatus, string> = {
  up: "Operational",
  degraded: "Degraded",
  down: "Outage",
};

/* ------------------------------------------------------------------ */
/*  Sample data generator                                              */
/* ------------------------------------------------------------------ */

function generateDays(
  degradedSet: Set<number>,
  outageSet: Set<number>,
): UptimeDay[] {
  const days: UptimeDay[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    let status: DayStatus = "up";
    let uptime = 99.95 + Math.random() * 0.05;

    if (outageSet.has(i)) {
      status = "down";
      uptime = 94 + Math.random() * 4;
    } else if (degradedSet.has(i)) {
      status = "degraded";
      uptime = 97 + Math.random() * 2;
    }

    days.push({ date: dateStr, status, uptime: Math.round(uptime * 100) / 100 });
  }
  return days;
}

function computeOverall(days: UptimeDay[]): number {
  const avg = days.reduce((s, d) => s + d.uptime, 0) / days.length;
  return Math.round(avg * 100) / 100;
}

function currentStatus(days: UptimeDay[]): DayStatus {
  return days[days.length - 1].status;
}

/* ---- Services ---- */

const apiDays = generateDays(new Set([7, 18]), new Set([18]));
const webDays = generateDays(new Set([22]), new Set([]));
const dbDays = generateDays(new Set([5, 14]), new Set([14]));
const cdnDays = generateDays(new Set([]), new Set([]));
const workerDays = generateDays(new Set([3, 10, 26]), new Set([10]));

const SERVICES: Service[] = [
  {
    name: "API Gateway",
    icon: Lightning,
    status: currentStatus(apiDays),
    uptimePercent: computeOverall(apiDays),
    days: apiDays,
  },
  {
    name: "Web App",
    icon: Globe,
    status: currentStatus(webDays),
    uptimePercent: computeOverall(webDays),
    days: webDays,
  },
  {
    name: "Database",
    icon: Database,
    status: currentStatus(dbDays),
    uptimePercent: computeOverall(dbDays),
    days: dbDays,
  },
  {
    name: "CDN",
    icon: CloudArrowUp,
    status: currentStatus(cdnDays),
    uptimePercent: computeOverall(cdnDays),
    days: cdnDays,
  },
  {
    name: "Worker Queue",
    icon: Queue,
    status: currentStatus(workerDays),
    uptimePercent: computeOverall(workerDays),
    days: workerDays,
  },
];

const allOperational = SERVICES.every((s) => s.status === "up");
const overallUptime = (
  SERVICES.reduce((s, svc) => s + svc.uptimePercent, 0) / SERVICES.length
).toFixed(2);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * UptimeMonitor -multi-service status page card.
 *
 * Shows 4–5 services with per-service status dot, uptime percentage,
 * and a mini 30-day bar chart. Overall system status displayed in header.
 *
 * Composes: Card, CardHeader, CardTitle, CardDescription, CardContent,
 *           Badge, Tooltip, Phosphor icons (Heartbeat, Globe, Database,
 *           CloudArrowUp, Queue, Lightning).
 *
 * Tokens: --bl-fill-success, --bl-fill-warning, --bl-fill-destructive,
 *         --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted,
 *         --bl-bg-elevated, --bl-border-divider, --bl-border-muted.
 */
export function UptimeMonitor({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Uptime Monitor</CardTitle>
          <CardDescription className="text-xs">
            Last 30 days service availability
          </CardDescription>
        </div>
        <Heartbeat
          size={16}
          weight="regular"
          style={{ color: "var(--bl-fg-muted)" }}
          aria-hidden="true"
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall status banner */}
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2"
          style={{ backgroundColor: "var(--bl-bg-elevated)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{
                backgroundColor: allOperational
                  ? "var(--bl-fill-success)"
                  : "var(--bl-fill-warning)",
              }}
              aria-hidden="true"
            />
            <span
              className="text-[13px] font-medium"
              style={{
                color: allOperational
                  ? "var(--bl-fill-success)"
                  : "var(--bl-fill-warning)",
              }}
            >
              {allOperational ? "All Systems Operational" : "Partial Degradation"}
            </span>
          </div>
          <span
            className="text-lg font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {overallUptime}%
          </span>
        </div>

        {/* Service rows */}
        <TooltipProvider delayDuration={100}>
          <div className="space-y-0">
            {SERVICES.map((svc, si) => {
              const SvcIcon = svc.icon;
              const isLast = si === SERVICES.length - 1;

              return (
                <div
                  key={svc.name}
                  className="py-3"
                  style={{
                    borderBottom: !isLast
                      ? "1px solid var(--bl-border-divider)"
                      : undefined,
                  }}
                >
                  {/* Service info row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <SvcIcon
                        size={14}
                        weight="regular"
                        className="shrink-0"
                        style={{ color: "var(--bl-fg-muted)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-[13px] font-medium truncate"
                        style={{ color: "var(--bl-fg-primary)" }}
                      >
                        {svc.name}
                      </span>
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: STATUS_COLOR[svc.status] }}
                        role="img"
                        aria-label={`${svc.name}: ${STATUS_LABEL[svc.status]}`}
                      />
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-5 shrink-0"
                        style={{
                          color: STATUS_COLOR[svc.status],
                          borderColor: STATUS_COLOR[svc.status],
                        }}
                      >
                        {STATUS_LABEL[svc.status]}
                      </Badge>
                    </div>
                    <span
                      className="text-[13px] font-semibold tabular-nums shrink-0 ml-3"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {svc.uptimePercent.toFixed(2)}%
                    </span>
                  </div>

                  {/* Mini 30-day bar chart */}
                  <div
                    className="flex gap-[2px]"
                    role="img"
                    aria-label={`${svc.name} 30-day uptime: ${svc.uptimePercent.toFixed(2)}%`}
                  >
                    {svc.days.map((day, di) => (
                      <Tooltip key={di}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="h-5 flex-1 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-1"
                            style={{
                              backgroundColor: STATUS_COLOR[day.status],
                              outlineColor: "var(--bl-border-primary)",
                              minWidth: "3px",
                            }}
                            aria-label={`${day.date}: ${day.uptime}% -${STATUS_LABEL[day.status]}`}
                            tabIndex={0}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <div className="space-y-0.5">
                            <p className="font-medium">{day.date}</p>
                            <p className="tabular-nums">{day.uptime}% uptime</p>
                            <p style={{ color: STATUS_COLOR[day.status] }}>
                              {STATUS_LABEL[day.status]}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Legend */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          <div className="flex items-center gap-3">
            {(["up", "degraded", "down"] as DayStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-sm shrink-0"
                  style={{ backgroundColor: STATUS_COLOR[status] }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px]"
                  style={{ color: "var(--bl-fg-muted)" }}
                >
                  {STATUS_LABEL[status]}
                </span>
              </div>
            ))}
          </div>
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
          >
            {SERVICES.length} services
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
