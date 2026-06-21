import {
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  UserPlus,
  Gear,
  Bell,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Icon } from "@phosphor-icons/react";

interface Activity {
  id: string;
  user: { name: string; initials: string };
  action: string;
  target: string;
  time: string;
  icon: Icon;
  variant: "default" | "success" | "warning" | "info";
}

const VARIANT_STYLES: Record<Activity["variant"], { bg: string; fg: string }> = {
  default: { bg: "var(--bl-bg-active)", fg: "var(--bl-fg-secondary)" },
  success: { bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)", fg: "var(--bl-fill-success)" },
  warning: { bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)", fg: "var(--bl-fill-warning)" },
  info: { bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)", fg: "var(--bl-fill-primary)" },
};

const ACTIVITIES: Activity[] = [
  { id: "1", user: { name: "Sarah Chen", initials: "SC" }, action: "deployed", target: "v2.4.1 to production", time: "2m ago", icon: ArrowUp, variant: "success" },
  { id: "2", user: { name: "James Wilson", initials: "JW" }, action: "approved", target: "PR 847 - Auth refactor", time: "18m ago", icon: ShieldCheck, variant: "info" },
  { id: "3", user: { name: "Mia Torres", initials: "MT" }, action: "invited", target: "alex@company.com", time: "1h ago", icon: UserPlus, variant: "default" },
  { id: "4", user: { name: "Liam Park", initials: "LP" }, action: "updated", target: "billing settings", time: "2h ago", icon: Gear, variant: "warning" },
  { id: "5", user: { name: "Aisha Patel", initials: "AP" }, action: "rolled back", target: "v2.4.0 from staging", time: "3h ago", icon: ArrowDown, variant: "default" },
  { id: "6", user: { name: "Devon Brooks", initials: "DB" }, action: "enabled", target: "2FA for workspace", time: "5h ago", icon: ShieldCheck, variant: "success" },
];

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Activity</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
            {ACTIVITIES.length} events
          </Badge>
          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Notifications">
            <Bell size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        <ScrollArea className="h-[320px] pr-3">
          <div className="space-y-1">
            {ACTIVITIES.map((a) => {
              const Icon = a.icon;
              const style = VARIANT_STYLES[a.variant];
              return (
                <div
                  key={a.id}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-[10px] font-semibold">{a.user.initials}</AvatarFallback>
                    </Avatar>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full"
                      style={{ backgroundColor: style.bg }}
                    >
                      <Icon size={10} weight="bold" style={{ color: style.fg }} />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug">
                      <span className="font-medium" style={{ color: "var(--bl-fg-primary)" }}>{a.user.name}</span>
                      <span style={{ color: "var(--bl-fg-muted)" }}> {a.action} </span>
                      <span className="font-medium" style={{ color: "var(--bl-fg-secondary)" }}>{a.target}</span>
                    </p>
                    <p className="text-[11px] mt-0.5 tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
