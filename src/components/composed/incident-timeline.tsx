import {
  Warning,
  ShieldCheck,
  Lightning,
  Fire,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Severity = "P1" | "P2" | "P3";
type IncidentStatus = "Resolved" | "Investigating" | "Monitoring";

interface Incident {
  id: string;
  severity: Severity;
  title: string;
  status: IncidentStatus;
  assignee: string;
  duration: string;
  timestamp: string;
}

const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; icon: Icon; fg: string; bg: string }
> = {
  P1: {
    label: "Critical",
    icon: Fire,
    fg: "var(--bl-fill-danger)",
    bg: "color-mix(in srgb, var(--bl-fill-danger) 14%, transparent)",
  },
  P2: {
    label: "Major",
    icon: Lightning,
    fg: "var(--bl-fill-warning)",
    bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)",
  },
  P3: {
    label: "Minor",
    icon: Warning,
    fg: "var(--bl-fill-primary)",
    bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)",
  },
};

const STATUS_CONFIG: Record<
  IncidentStatus,
  { icon: Icon; fg: string; bg: string }
> = {
  Resolved: {
    icon: ShieldCheck,
    fg: "var(--bl-fill-success)",
    bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)",
  },
  Investigating: {
    icon: Fire,
    fg: "var(--bl-fill-danger)",
    bg: "color-mix(in srgb, var(--bl-fill-danger) 14%, transparent)",
  },
  Monitoring: {
    icon: Warning,
    fg: "var(--bl-fill-warning)",
    bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)",
  },
};

const INCIDENTS: Incident[] = [
  {
    id: "INC-4012",
    severity: "P1",
    title: "Payment Service Outage",
    status: "Resolved",
    assignee: "Sarah Chen",
    duration: "1h 23m",
    timestamp: "Jun 21, 2:14 PM",
  },
  {
    id: "INC-4009",
    severity: "P2",
    title: "API Gateway Latency Spike",
    status: "Monitoring",
    assignee: "Marcus Rivera",
    duration: "45m",
    timestamp: "Jun 21, 11:30 AM",
  },
  {
    id: "INC-4005",
    severity: "P1",
    title: "Database Connection Pool Exhaustion",
    status: "Investigating",
    assignee: "James Wilson",
    duration: "32m",
    timestamp: "Jun 20, 4:45 PM",
  },
  {
    id: "INC-3998",
    severity: "P3",
    title: "CDN Cache Invalidation Delay",
    status: "Resolved",
    assignee: "Aisha Patel",
    duration: "2h 10m",
    timestamp: "Jun 19, 9:15 AM",
  },
  {
    id: "INC-3991",
    severity: "P2",
    title: "Auth Token Refresh Failures",
    status: "Resolved",
    assignee: "Yuki Tanaka",
    duration: "58m",
    timestamp: "Jun 18, 6:00 PM",
  },
];

/**
 * IncidentTimeline - PagerDuty-style incident log for ops dashboards.
 *
 * Displays recent incidents as a vertical timeline with severity, status,
 * assignee, and timestamps. Each node uses a severity-coded icon and a
 * connecting line to the next event.
 *
 * Composes: Card, CardContent, CardHeader, CardTitle, CardDescription, Badge.
 * Icons: Warning, ShieldCheck, Lightning, Fire (Phosphor).
 * Tokens: --bl-fill-success/warning/danger/primary, --bl-fg-*, --bl-bg-*, --bl-border-divider.
 */
export function IncidentTimeline({ className }: { className?: string }) {
  const activeCount = INCIDENTS.filter((i) => i.status !== "Resolved").length;

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Warning
              size={16}
              weight="bold"
              style={{ color: "var(--bl-fg-muted)" }}
              aria-hidden="true"
            />
            <CardTitle className="text-sm">Incident Timeline</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Recent incidents and service disruptions
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 h-5 tabular-nums shrink-0"
        >
          {activeCount} active
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-0">
          {INCIDENTS.map((incident, i) => {
            const severity = SEVERITY_CONFIG[incident.severity];
            const status = STATUS_CONFIG[incident.status];
            const SeverityIcon = severity.icon;
            const isLast = i === INCIDENTS.length - 1;

            return (
              <div key={incident.id} className="flex gap-3">
                {/* Left rail: severity icon node + connector line */}
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: severity.bg }}
                    aria-hidden="true"
                  >
                    <SeverityIcon
                      size={16}
                      weight="bold"
                      style={{ color: severity.fg }}
                    />
                  </span>
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 my-1 rounded-full"
                      style={{ backgroundColor: "var(--bl-border-divider)" }}
                    />
                  )}
                </div>

                {/* Right content */}
                <div className={cn("min-w-0", !isLast && "pb-5")}>
                  {/* Row 1: severity badge + title */}
                  <div className="flex items-center gap-2 min-h-8">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-5 font-semibold shrink-0"
                      style={{
                        color: severity.fg,
                        borderColor: severity.fg,
                      }}
                    >
                      {incident.severity} {severity.label}
                    </Badge>
                    <p
                      className="text-[13px] font-medium leading-snug truncate"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {incident.title}
                    </p>
                  </div>

                  {/* Row 2: status + assignee + duration */}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge
                      className="text-[10px] px-1.5 py-0 h-5 border-0 shrink-0"
                      style={{
                        backgroundColor: status.bg,
                        color: status.fg,
                      }}
                    >
                      {incident.status}
                    </Badge>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--bl-fg-secondary)" }}
                    >
                      {incident.assignee}
                    </span>
                    <span
                      className="text-[11px] tabular-nums"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {incident.duration}
                    </span>
                  </div>

                  {/* Row 3: incident ID + timestamp */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {incident.id}
                    </span>
                    <span
                      className="text-[11px] tabular-nums"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {incident.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
