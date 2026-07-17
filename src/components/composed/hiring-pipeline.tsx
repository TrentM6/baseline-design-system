import { Users, Briefcase, UserPlus } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PIPELINE_STAGES = [
  "Applied",
  "Phone Screen",
  "Technical",
  "Onsite",
  "Offer",
] as const;

type Stage = (typeof PIPELINE_STAGES)[number];

interface OpenRole {
  title: string;
  department: string;
  /** Candidate count at each stage, keyed by stage label. */
  candidates: Record<Stage, number>;
  /** Days since the role was opened. */
  daysOpen: number;
  priority: "high" | "medium" | "low";
}

const STAGE_COLORS: Record<Stage, string> = {
  Applied: "var(--bl-chart-1)",
  "Phone Screen": "var(--bl-chart-2)",
  Technical: "var(--bl-chart-3)",
  Onsite: "var(--bl-chart-4)",
  Offer: "var(--bl-chart-5)",
};

const ROLES: OpenRole[] = [
  {
    title: "Senior Engineer",
    department: "Engineering",
    candidates: { Applied: 84, "Phone Screen": 32, Technical: 14, Onsite: 5, Offer: 2 },
    daysOpen: 22,
    priority: "high",
  },
  {
    title: "Product Designer",
    department: "Design",
    candidates: { Applied: 63, "Phone Screen": 24, Technical: 11, Onsite: 4, Offer: 1 },
    daysOpen: 18,
    priority: "high",
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    candidates: { Applied: 47, "Phone Screen": 19, Technical: 8, Onsite: 3, Offer: 0 },
    daysOpen: 12,
    priority: "medium",
  },
  {
    title: "Engineering Manager",
    department: "Engineering",
    candidates: { Applied: 36, "Phone Screen": 14, Technical: 6, Onsite: 2, Offer: 1 },
    daysOpen: 31,
    priority: "high",
  },
  {
    title: "Marketing Lead",
    department: "Marketing",
    candidates: { Applied: 52, "Phone Screen": 21, Technical: 9, Onsite: 3, Offer: 0 },
    daysOpen: 8,
    priority: "low",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getPriorityStyle(priority: OpenRole["priority"]): {
  label: string;
  color: string;
} {
  switch (priority) {
    case "high":
      return { label: "Urgent", color: "var(--bl-fill-warning)" };
    case "medium":
      return { label: "Active", color: "var(--bl-fill-success)" };
    case "low":
      return { label: "Open", color: "var(--bl-fg-muted)" };
  }
}

function totalCandidates(role: OpenRole): number {
  return PIPELINE_STAGES.reduce((sum, s) => sum + role.candidates[s], 0);
}

/* ------------------------------------------------------------------ */
/*  Stage indicator dots                                               */
/* ------------------------------------------------------------------ */

function StageDots({ role }: { role: OpenRole }) {
  const max = Math.max(...PIPELINE_STAGES.map((s) => role.candidates[s]), 1);

  return (
    <div className="flex items-end gap-1" role="img" aria-label={stageAriaLabel(role)}>
      {PIPELINE_STAGES.map((stage) => {
        const count = role.candidates[stage];
        /* Bar height proportional to candidate count, min 3px so zero‑count
           stages are still visible as a stub. */
        const heightPx = count === 0 ? 3 : Math.max(4, Math.round((count / max) * 20));

        return (
          <div
            key={stage}
            className="w-1.5 rounded-full transition-all"
            style={{
              height: `${heightPx}px`,
              backgroundColor: count > 0 ? STAGE_COLORS[stage] : "var(--bl-border-muted)",
              opacity: count > 0 ? 1 : 0.5,
            }}
            title={`${stage}: ${count}`}
          />
        );
      })}
    </div>
  );
}

function stageAriaLabel(role: OpenRole): string {
  return PIPELINE_STAGES.map((s) => `${s}: ${role.candidates[s]}`).join(", ");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface HiringPipelineProps {
  className?: string;
}

/**
 * HiringPipeline - Greenhouse/Lever-style recruiting pipeline showing open
 * positions with candidate counts at each hiring stage (Applied, Phone Screen,
 * Technical, Onsite, Offer).
 *
 * Composes: Card, CardHeader, CardTitle, CardDescription, CardContent, Badge.
 * Icons: Users, Briefcase, UserPlus from @phosphor-icons/react.
 * Tokens: --bl-chart-1..5, --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted,
 *         --bl-fill-success, --bl-fill-warning, --bl-bg-elevated, --bl-bg-surface,
 *         --bl-border-divider, --bl-border-muted.
 */
export function HiringPipeline({ className }: HiringPipelineProps) {
  const grandTotal = ROLES.reduce((sum, r) => sum + totalCandidates(r), 0);
  const activeOffers = ROLES.reduce((sum, r) => sum + r.candidates.Offer, 0);

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--bl-bg-elevated)" }}
          >
            <Briefcase
              size={16}
              weight="regular"
              style={{ color: "var(--bl-fg-muted)" }}
            />
          </div>
          <div className="space-y-0.5">
            <CardTitle className="text-sm">Hiring Pipeline</CardTitle>
            <CardDescription className="text-xs">
              {ROLES.length} open roles
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
            style={{
              color: "var(--bl-fill-success)",
              borderColor: "var(--bl-fill-success)",
            }}
          >
            {activeOffers} offer{activeOffers !== 1 ? "s" : ""} pending
          </Badge>
          <UserPlus
            size={16}
            weight="regular"
            style={{ color: "var(--bl-fg-muted)" }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stage legend */}
        <div
          className="flex items-center gap-3 pb-3 border-b flex-wrap"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: STAGE_COLORS[stage] }}
              />
              <span
                className="text-[11px]"
                style={{ color: "var(--bl-fg-muted)" }}
              >
                {stage}
              </span>
            </div>
          ))}
        </div>

        {/* Role rows */}
        <div className="space-y-1">
          {ROLES.map((role) => {
            const total = totalCandidates(role);
            const priority = getPriorityStyle(role.priority);

            return (
              <div
                key={role.title}
                className="rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[var(--bl-bg-elevated)]"
                style={{ transitionDuration: "var(--dur-instant)" }}
              >
                {/* Top row: title + meta */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[13px] font-medium truncate"
                        style={{ color: "var(--bl-fg-primary)" }}
                      >
                        {role.title}
                      </span>
                      <Badge
                        className="text-[10px] px-1.5 py-0 h-4 border-0 shrink-0"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${priority.color} 14%, transparent)`,
                          color: priority.color,
                        }}
                      >
                        {priority.label}
                      </Badge>
                    </div>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {role.department} · {role.daysOpen}d open
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Mini funnel bars */}
                    <StageDots role={role} />

                    {/* Total count */}
                    <div className="text-right min-w-[3.5rem]">
                      <p
                        className="text-[13px] font-medium tabular-nums"
                        style={{ color: "var(--bl-fg-primary)" }}
                      >
                        {total}
                      </p>
                      <p
                        className="text-[10px]"
                        style={{ color: "var(--bl-fg-muted)" }}
                      >
                        candidates
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stage counts row */}
                <div className="flex items-center gap-1 mt-2">
                  {PIPELINE_STAGES.map((stage, i) => {
                    const count = role.candidates[stage];
                    const pct = total > 0 ? (count / total) * 100 : 0;

                    return (
                      <div
                        key={stage}
                        className="flex flex-col items-center"
                        style={{ flex: `${Math.max(pct, 8)} 0 0%` }}
                      >
                        <div
                          className="w-full rounded-sm"
                          style={{
                            height: "4px",
                            backgroundColor: STAGE_COLORS[stage],
                            opacity: count > 0 ? 1 : 0.2,
                            borderRadius:
                              i === 0
                                ? "var(--radius) 0 0 var(--radius)"
                                : i === PIPELINE_STAGES.length - 1
                                  ? "0 var(--radius) var(--radius) 0"
                                  : undefined,
                          }}
                        />
                        <span
                          className="text-[10px] tabular-nums mt-1"
                          style={{
                            color:
                              count > 0
                                ? "var(--bl-fg-secondary)"
                                : "var(--bl-fg-muted)",
                          }}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary footer */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--bl-border-divider)" }}
        >
          <div className="flex items-center gap-1.5">
            <Users
              size={14}
              weight="bold"
              style={{ color: "var(--bl-fg-muted)" }}
            />
            <span
              className="text-[11px]"
              style={{ color: "var(--bl-fg-muted)" }}
            >
              Total candidates
            </span>
          </div>
          <span
            className="text-base font-heading font-bold tabular-nums"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {grandTotal}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
