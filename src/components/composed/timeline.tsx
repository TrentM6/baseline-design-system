import {
  Rocket,
  GitBranch,
  CheckCircle,
  Warning,
  Users,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import type { Icon } from "@phosphor-icons/react";

type EventVariant = "default" | "success" | "warning" | "info";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  user?: { name: string; initials: string };
  icon: Icon;
  variant: EventVariant;
}

export interface TimelineProps {
  events?: TimelineEvent[];
  className?: string;
}

const VARIANT_STYLES: Record<EventVariant, { bg: string; fg: string }> = {
  default: { bg: "var(--bl-bg-active)", fg: "var(--bl-fg-secondary)" },
  success: { bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)", fg: "var(--bl-fill-success)" },
  warning: { bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)", fg: "var(--bl-fill-warning)" },
  info: { bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)", fg: "var(--bl-fill-primary)" },
};

const DEFAULT_EVENTS: TimelineEvent[] = [
  { id: "1", title: "Project launched", description: "v1.0 deployed to production successfully", time: "Just now", icon: Rocket, variant: "success", user: { name: "Sarah Chen", initials: "SC" } },
  { id: "2", title: "Code review approved", description: "Auth module refactor PR approved and merged", time: "2h ago", icon: CheckCircle, variant: "info", user: { name: "James Wilson", initials: "JW" } },
  { id: "3", title: "Branch created", description: "feature/user-dashboard branched from main", time: "5h ago", icon: GitBranch, variant: "default", user: { name: "Mia Torres", initials: "MT" } },
  { id: "4", title: "Build warning", description: "Staging build has 3 deprecation warnings", time: "1d ago", icon: Warning, variant: "warning", user: { name: "Liam Park", initials: "LP" } },
  { id: "5", title: "Team expanded", description: "2 new engineers added to the workspace", time: "3d ago", icon: Users, variant: "info", user: { name: "Aisha Patel", initials: "AP" } },
];

export function Timeline({ events = DEFAULT_EVENTS, className }: TimelineProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Timeline</CardTitle>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {events.length} events
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {events.map((event, i) => {
            const EventIcon = event.icon;
            const style = VARIANT_STYLES[event.variant];
            return (
              <div key={event.id} className="flex gap-3">
                {/* Left rail: icon node + connector line */}
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: style.bg }}
                  >
                    <EventIcon size={16} weight="bold" style={{ color: style.fg }} />
                  </span>
                  {i < events.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1 rounded-full"
                      style={{ backgroundColor: "var(--bl-border-divider)" }}
                    />
                  )}
                </div>

                {/* Right content */}
                <div className={i < events.length - 1 ? "pb-5" : ""}>
                  <div className="flex items-center gap-2 min-h-8">
                    <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--bl-fg-primary)" }}>
                      {event.title}
                    </p>
                    <span className="text-[10px] tabular-nums shrink-0" style={{ color: "var(--bl-fg-muted)" }}>
                      {event.time}
                    </span>
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
                    {event.description}
                  </p>
                  {event.user && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[8px] font-semibold">{event.user.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[11px]" style={{ color: "var(--bl-fg-secondary)" }}>
                        {event.user.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
