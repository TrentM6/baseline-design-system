import {
  FolderPlus,
  PaperPlaneTilt,
  UserPlus,
  ChartBar,
  CloudArrowUp,
  CalendarPlus,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Icon } from "@phosphor-icons/react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: Icon;
}

export interface QuickActionsProps {
  className?: string;
}

const ACTIONS: QuickAction[] = [
  { id: "1", label: "New Project", description: "Start from scratch", icon: FolderPlus },
  { id: "2", label: "Send Invoice", description: "Bill a client", icon: PaperPlaneTilt },
  { id: "3", label: "Add Member", description: "Invite to team", icon: UserPlus },
  { id: "4", label: "View Reports", description: "Analytics dashboard", icon: ChartBar },
  { id: "5", label: "Upload Files", description: "Add attachments", icon: CloudArrowUp },
  { id: "6", label: "Schedule Meeting", description: "Book a time slot", icon: CalendarPlus },
];

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {ACTIONS.map((action) => {
            const ActionIcon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="flex h-auto flex-col items-center gap-1.5 rounded-lg px-3 py-4 transition-all duration-quick ease-out hover:bg-[var(--bl-bg-elevated)] hover:shadow-sm"
                aria-label={action.label}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                >
                  <ActionIcon size={18} weight="duotone" style={{ color: "var(--bl-fg-secondary)" }} />
                </span>
                <span className="text-[12px] font-medium" style={{ color: "var(--bl-fg-primary)" }}>
                  {action.label}
                </span>
                <span className="text-[10px]" style={{ color: "var(--bl-fg-muted)" }}>
                  {action.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
