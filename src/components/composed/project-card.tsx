import { CalendarBlank, DotsThree } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ProjectStatus = "Active" | "Paused" | "Complete";

interface TeamMember {
  name: string;
  initials: string;
}

export interface ProjectCardProps {
  className?: string;
}

const STATUS_STYLE: Record<ProjectStatus, { fg: string; bg: string }> = {
  Active: { fg: "var(--bl-fill-success)", bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)" },
  Paused: { fg: "var(--bl-fill-warning)", bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)" },
  Complete: { fg: "var(--bl-fill-primary)", bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)" },
};

const DEFAULT_PROJECT = {
  name: "Baseline Design System",
  status: "Active" as ProjectStatus,
  description: "Component library and design token infrastructure for Baseline Studio products.",
  progress: 68,
  dueDate: "Aug 15, 2026",
  team: [
    { name: "Sarah Chen", initials: "SC" },
    { name: "James Wilson", initials: "JW" },
    { name: "Mia Torres", initials: "MT" },
    { name: "Liam Park", initials: "LP" },
    { name: "Aisha Patel", initials: "AP" },
    { name: "Devon Brooks", initials: "DB" },
  ] as TeamMember[],
};

const MAX_VISIBLE_AVATARS = 4;

export function ProjectCard({ className }: ProjectCardProps) {
  const p = DEFAULT_PROJECT;
  const style = STATUS_STYLE[p.status];
  const visibleMembers = p.team.slice(0, MAX_VISIBLE_AVATARS);
  const overflow = p.team.length - MAX_VISIBLE_AVATARS;

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm truncate">{p.name}</CardTitle>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-5 shrink-0"
              style={{ color: style.fg, borderColor: style.fg, backgroundColor: style.bg }}
            >
              {p.status}
            </Badge>
          </div>
          <p className="text-[12px] line-clamp-2" style={{ color: "var(--bl-fg-muted)" }}>
            {p.description}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 ml-2" aria-label="Project actions">
          <DotsThree size={16} weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>Progress</p>
            <p className="text-[11px] font-medium tabular-nums" style={{ color: "var(--bl-fg-secondary)" }}>
              {p.progress}%
            </p>
          </div>
          <Progress value={p.progress} className="h-1.5" />
        </div>

        {/* Footer: team + due date */}
        <div className="flex items-center justify-between">
          {/* Stacked avatars */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {visibleMembers.map((m) => (
                <Avatar key={m.initials} className="h-7 w-7 border-2" style={{ borderColor: "var(--bl-bg-surface)" }}>
                  <AvatarFallback className="text-[9px] font-semibold">{m.initials}</AvatarFallback>
                </Avatar>
              ))}
              {overflow > 0 && (
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-semibold"
                  style={{
                    borderColor: "var(--bl-bg-surface)",
                    backgroundColor: "var(--bl-bg-active)",
                    color: "var(--bl-fg-muted)",
                  }}
                >
                  +{overflow}
                </span>
              )}
            </div>
          </div>

          {/* Due date */}
          <div className="flex items-center gap-1.5">
            <CalendarBlank size={14} style={{ color: "var(--bl-fg-muted)" }} />
            <span className="text-[11px] tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
              {p.dueDate}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
