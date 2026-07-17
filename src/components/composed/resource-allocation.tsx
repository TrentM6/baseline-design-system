import { Users } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  allocation: number;
  hoursUsed: number;
  hoursTotal: number;
}

export interface ResourceAllocationProps {
  className?: string;
}

const MEMBERS: TeamMember[] = [
  { name: "Sarah Chen", initials: "SC", role: "Lead Engineer", allocation: 95, hoursUsed: 38, hoursTotal: 40 },
  { name: "Marcus Rivera", initials: "MR", role: "Designer", allocation: 85, hoursUsed: 34, hoursTotal: 40 },
  { name: "Aisha Patel", initials: "AP", role: "PM", allocation: 70, hoursUsed: 28, hoursTotal: 40 },
  { name: "James Wilson", initials: "JW", role: "Backend Dev", allocation: 100, hoursUsed: 40, hoursTotal: 40 },
  { name: "Yuki Tanaka", initials: "YT", role: "Data Analyst", allocation: 60, hoursUsed: 24, hoursTotal: 40 },
  { name: "Priya Sharma", initials: "PS", role: "Frontend Dev", allocation: 90, hoursUsed: 36, hoursTotal: 40 },
];

function getAllocationColor(percent: number): string {
  if (percent > 95) return "var(--bl-fill-danger)";
  if (percent >= 80) return "var(--bl-fill-warning)";
  return "var(--bl-fill-success)";
}

function getUtilizationBadge(percent: number): { label: string; color: string } {
  if (percent > 95) return { label: "Over Capacity", color: "var(--bl-fill-danger)" };
  if (percent >= 80) return { label: "Near Capacity", color: "var(--bl-fill-warning)" };
  return { label: "On Track", color: "var(--bl-fill-success)" };
}

/**
 * ResourceAllocation - team resource/capacity allocation view.
 * Composes: Card, Avatar, AvatarFallback, Badge, Phosphor Users icon.
 * Tokens: --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted, --bl-bg-surface,
 *         --bl-bg-active, --bl-bg-elevated, --bl-fill-success, --bl-fill-warning,
 *         --bl-fill-danger.
 */
export function ResourceAllocation({ className }: ResourceAllocationProps) {
  const overallUtilization = Math.round(
    MEMBERS.reduce((sum, m) => sum + m.allocation, 0) / MEMBERS.length
  );
  const badge = getUtilizationBadge(overallUtilization);

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--bl-bg-active)" }}
          >
            <Users size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
          </div>
          <div className="space-y-0.5">
            <CardTitle className="text-sm">Resource Allocation</CardTitle>
            <CardDescription className="text-xs">Current Sprint</CardDescription>
          </div>
        </div>
        <Badge
          className="text-[10px] px-1.5 py-0 h-5 border-0"
          style={{
            backgroundColor: `color-mix(in srgb, ${badge.color} 14%, transparent)`,
            color: badge.color,
          }}
        >
          {badge.label}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall utilization */}
        <div className="space-y-1">
          <p
            className="text-2xl font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {overallUtilization}%
          </p>
          <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
            Overall team utilization
          </p>
        </div>

        {/* Member list */}
        <div className="space-y-1">
          {MEMBERS.map((m) => {
            const barColor = getAllocationColor(m.allocation);

            return (
              <div
                key={m.initials}
                className="rounded-lg px-2 py-2 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-[10px] font-semibold">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13px] font-medium truncate"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {m.name}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {m.role}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className="text-[13px] font-medium tabular-nums"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {m.allocation}%
                    </p>
                    <p
                      className="text-[11px] tabular-nums"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {m.hoursUsed}/{m.hoursTotal}h
                    </p>
                  </div>
                </div>

                {/* Allocation bar */}
                <div
                  className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                  role="progressbar"
                  aria-valuenow={m.allocation}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${m.name} allocation: ${m.allocation}%`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-medium"
                    style={{
                      width: `${Math.min(m.allocation, 100)}%`,
                      backgroundColor: barColor,
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
