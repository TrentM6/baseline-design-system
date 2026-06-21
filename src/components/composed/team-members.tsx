import { Envelope, DotsThree } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = "Admin" | "Editor" | "Viewer";

interface Member {
  name: string;
  initials: string;
  email: string;
  role: Role;
  status: "online" | "away" | "offline";
}

const ROLE_VARIANT: Record<Role, string> = {
  Admin: "var(--bl-fill-primary)",
  Editor: "var(--bl-teal-500)",
  Viewer: "var(--bl-fg-muted)",
};

const STATUS_COLOR: Record<Member["status"], string> = {
  online: "var(--bl-fill-success)",
  away: "var(--bl-fill-warning)",
  offline: "var(--bl-fg-muted)",
};

const MEMBERS: Member[] = [
  { name: "Sarah Chen", initials: "SC", email: "sarah@baseline.dev", role: "Admin", status: "online" },
  { name: "James Wilson", initials: "JW", email: "james@baseline.dev", role: "Editor", status: "online" },
  { name: "Mia Torres", initials: "MT", email: "mia@baseline.dev", role: "Editor", status: "away" },
  { name: "Liam Park", initials: "LP", email: "liam@baseline.dev", role: "Viewer", status: "offline" },
  { name: "Aisha Patel", initials: "AP", email: "aisha@baseline.dev", role: "Admin", status: "online" },
];

export function TeamMembers() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Team</CardTitle>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {MEMBERS.length} members
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1 px-3">
        {MEMBERS.map((m) => (
          <div
            key={m.email}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
          >
            <div className="relative shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-[10px] font-semibold">{m.initials}</AvatarFallback>
              </Avatar>
              <span
                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
                style={{ backgroundColor: STATUS_COLOR[m.status], borderColor: "var(--bl-bg-surface)" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>{m.name}</p>
              <p className="text-[11px] truncate" style={{ color: "var(--bl-fg-muted)" }}>{m.email}</p>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-5 shrink-0"
              style={{ color: ROLE_VARIANT[m.role], borderColor: ROLE_VARIANT[m.role] }}
            >
              {m.role}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label={`${m.name} actions`}>
                  <DotsThree size={16} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Envelope size={14} className="mr-2" /> Send message
                </DropdownMenuItem>
                <DropdownMenuItem>Change role</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--bl-fill-danger)]">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
