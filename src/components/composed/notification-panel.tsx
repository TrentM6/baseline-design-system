import * as React from "react";
import {
  Warning,
  CheckCircle,
  Info,
  XCircle,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Icon } from "@phosphor-icons/react";

type Severity = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  severity: Severity;
  read: boolean;
}

const SEVERITY_MAP: Record<Severity, { icon: Icon; fg: string; bg: string }> = {
  info:    { icon: Info,        fg: "var(--bl-fill-primary)", bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)" },
  success: { icon: CheckCircle, fg: "var(--bl-fill-success)", bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)" },
  warning: { icon: Warning,     fg: "var(--bl-fill-warning)", bg: "color-mix(in srgb, var(--bl-fill-warning) 14%, transparent)" },
  error:   { icon: XCircle,     fg: "var(--bl-fill-danger)",  bg: "color-mix(in srgb, var(--bl-fill-danger) 14%, transparent)" },
};

const NOTIFICATIONS: Notification[] = [
  { id: "1", title: "Deployment successful", body: "v2.4.1 is live in production. All health checks pass.", time: "2m ago", severity: "success", read: false },
  { id: "2", title: "API rate limit warning", body: "Workspace is at 82% of the hourly rate limit.", time: "15m ago", severity: "warning", read: false },
  { id: "3", title: "New team member joined", body: "alex@company.com accepted the workspace invite.", time: "1h ago", severity: "info", read: false },
  { id: "4", title: "Build failed", body: "Pipeline 4821 failed at the type-check step.", time: "2h ago", severity: "error", read: true },
  { id: "5", title: "SSL certificate renewed", body: "api.baseline.dev cert renewed - expires Dec 2025.", time: "5h ago", severity: "success", read: true },
];

export function NotificationPanel() {
  const [items, setItems] = React.useState(NOTIFICATIONS);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Notifications</CardTitle>
          {unread > 0 && (
            <Badge className="text-[10px] px-1.5 py-0 h-5 tabular-nums">{unread} new</Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllRead}>
          Mark all read
        </Button>
      </CardHeader>
      <CardContent className="px-3">
        <ScrollArea className="h-[340px] pr-3">
          <div className="space-y-1">
            {items.map((n, i) => {
              const sev = SEVERITY_MAP[n.severity];
              const SevIcon = sev.icon;
              return (
                <React.Fragment key={n.id}>
                  <div
                    className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
                    style={{ opacity: n.read ? 0.6 : 1 }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ backgroundColor: sev.bg }}
                    >
                      <SevIcon size={16} weight="fill" style={{ color: sev.fg }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>
                          {n.title}
                        </p>
                        <span className="text-[10px] tabular-nums shrink-0" style={{ color: "var(--bl-fg-muted)" }}>
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: "var(--bl-fg-muted)" }}>
                        {n.body}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "var(--bl-fill-primary)" }} />
                    )}
                  </div>
                  {i < items.length - 1 && <Separator className="mx-2" />}
                </React.Fragment>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
