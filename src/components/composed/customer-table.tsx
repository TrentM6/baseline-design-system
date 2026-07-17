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

interface Customer {
  name: string;
  initials: string;
  company: string;
  plan: "Free" | "Starter" | "Pro" | "Enterprise";
  mrr: string;
  ltv: string;
  status: "Active" | "Churned" | "Trial";
}

const PLAN_TINT: Record<Customer["plan"], string> = {
  Free: "var(--bl-fg-muted)",
  Starter: "var(--bl-fill-info)",
  Pro: "var(--bl-fill-primary)",
  Enterprise: "var(--bl-fill-warning)",
};

const STATUS_TINT: Record<Customer["status"], string> = {
  Active: "var(--bl-fill-success)",
  Trial: "var(--bl-fill-primary)",
  Churned: "var(--bl-fill-danger)",
};

const CUSTOMERS: Customer[] = [
  { name: "Olivia Martin", initials: "OM", company: "Acme Corp", plan: "Enterprise", mrr: "$2,400", ltv: "$86,400", status: "Active" },
  { name: "David Kim", initials: "DK", company: "Globex Inc", plan: "Pro", mrr: "$890", ltv: "$32,040", status: "Active" },
  { name: "Priya Sharma", initials: "PS", company: "Initech", plan: "Starter", mrr: "$290", ltv: "$10,440", status: "Active" },
  { name: "Marcus Johnson", initials: "MJ", company: "Umbrella LLC", plan: "Pro", mrr: "$890", ltv: "$21,360", status: "Trial" },
  { name: "Elena Voss", initials: "EV", company: "Soylent Co", plan: "Free", mrr: "$0", ltv: "$1,200", status: "Churned" },
];

/**
 * CustomerTable - CRM-style customer list with plan tiers, MRR, lifetime value,
 * and status. Composes: Card, Table, Avatar, Badge, Button, DropdownMenu,
 * Phosphor icons.
 */
export function CustomerTable({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Customers</CardTitle>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {CUSTOMERS.length} accounts
        </Badge>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">MRR</TableHead>
              <TableHead className="text-right hidden md:table-cell">Lifetime Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOMERS.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="pl-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-[10px] font-semibold">{c.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 leading-tight">
                      <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>{c.name}</p>
                      <p className="text-[11px] truncate" style={{ color: "var(--bl-fg-muted)" }}>{c.company}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5"
                    style={{ color: PLAN_TINT[c.plan], borderColor: PLAN_TINT[c.plan] }}
                  >
                    {c.plan}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium" style={{ color: "var(--bl-fg-primary)" }}>
                  {c.mrr}
                </TableCell>
                <TableCell className="text-right tabular-nums hidden md:table-cell" style={{ color: "var(--bl-fg-secondary)" }}>
                  {c.ltv}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: STATUS_TINT[c.status] }}
                    />
                    <span className="text-xs" style={{ color: STATUS_TINT[c.status] }}>
                      {c.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`${c.name} actions`}>
                        <DotsThreeVertical size={16} weight="bold" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Send message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Change plan</DropdownMenuItem>
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
