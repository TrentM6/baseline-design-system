import { DotsThreeVertical } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface User {
  name: string;
  initials: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer" | "Owner" | "Member";
  status: "Active" | "Inactive";
  lastActive: string;
}

const ROLE_TINT: Record<User["role"], string> = {
  Owner: "var(--bl-fill-warning)",
  Admin: "var(--bl-fill-primary)",
  Editor: "var(--bl-fill-info)",
  Member: "var(--bl-fg-secondary)",
  Viewer: "var(--bl-fg-muted)",
};

const USERS: User[] = [
  { name: "Sarah Chen", initials: "SC", email: "sarah@baseline.dev", role: "Owner", status: "Active", lastActive: "Just now" },
  { name: "James Wilson", initials: "JW", email: "james@baseline.dev", role: "Admin", status: "Active", lastActive: "2 hours ago" },
  { name: "Mia Torres", initials: "MT", email: "mia@baseline.dev", role: "Editor", status: "Active", lastActive: "1 day ago" },
  { name: "Liam Park", initials: "LP", email: "liam@baseline.dev", role: "Viewer", status: "Inactive", lastActive: "2 weeks ago" },
  { name: "Aisha Patel", initials: "AP", email: "aisha@baseline.dev", role: "Member", status: "Active", lastActive: "5 min ago" },
];

/**
 * UserTable -user management table with avatars, role badges, status, and
 * per-row action menus. Composes: Card, Table, Avatar, Badge, Button,
 * DropdownMenu, Phosphor icons.
 */
export function UserTable({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Users</CardTitle>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {USERS.length} users
        </Badge>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Active</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.email}>
                <TableCell className="pl-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-[10px] font-semibold">{u.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 leading-tight">
                      <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>{u.name}</p>
                      <p className="text-[11px] truncate" style={{ color: "var(--bl-fg-muted)" }}>{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5"
                    style={{ color: ROLE_TINT[u.role], borderColor: ROLE_TINT[u.role] }}
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: u.status === "Active" ? "var(--bl-fill-success)" : "var(--bl-fg-muted)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: u.status === "Active" ? "var(--bl-fg-primary)" : "var(--bl-fg-muted)" }}
                    >
                      {u.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell
                  className="hidden md:table-cell text-xs tabular-nums"
                  style={{ color: "var(--bl-fg-secondary)" }}
                >
                  {u.lastActive}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`${u.name} actions`}>
                        <DotsThreeVertical size={16} weight="bold" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-[var(--bl-fill-danger)]">Remove user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
