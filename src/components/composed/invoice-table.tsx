import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LineItem {
  description: string;
  qty: number;
  rate: string;
  amount: string;
}

const ITEMS: LineItem[] = [
  { description: "Design System License - Pro", qty: 1, rate: "$299.00", amount: "$299.00" },
  { description: "Additional team seats (×8)", qty: 8, rate: "$29.00", amount: "$232.00" },
  { description: "Priority support - annual", qty: 1, rate: "$149.00", amount: "$149.00" },
  { description: "Custom token workshop (2h)", qty: 2, rate: "$175.00", amount: "$350.00" },
];

const SUBTOTAL = "$1,030.00";
const TAX = "$92.70";
const TOTAL = "$1,122.70";

export function InvoiceTable() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-sm">Invoice #INV-2024-0847</CardTitle>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
            Issued Jun 15, 2024 &middot; Due Jul 15, 2024
          </p>
        </div>
        <Badge className="text-[10px] px-2 py-0.5">Paid</Badge>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Description</TableHead>
              <TableHead className="text-right w-16">Qty</TableHead>
              <TableHead className="text-right w-24">Rate</TableHead>
              <TableHead className="text-right pr-3 w-28">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ITEMS.map((item) => (
              <TableRow key={item.description}>
                <TableCell className="pl-3 font-medium" style={{ color: "var(--bl-fg-primary)" }}>
                  {item.description}
                </TableCell>
                <TableCell className="text-right tabular-nums">{item.qty}</TableCell>
                <TableCell className="text-right tabular-nums">{item.rate}</TableCell>
                <TableCell className="text-right pr-3 tabular-nums font-medium">{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="pl-3 text-right" style={{ color: "var(--bl-fg-muted)" }}>Subtotal</TableCell>
              <TableCell className="text-right pr-3 tabular-nums font-medium">{SUBTOTAL}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="pl-3 text-right" style={{ color: "var(--bl-fg-muted)" }}>Tax (9%)</TableCell>
              <TableCell className="text-right pr-3 tabular-nums">{TAX}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Separator className="my-0" />
        <div className="flex items-center justify-between px-3 pt-3">
          <span className="text-sm font-heading font-semibold" style={{ color: "var(--bl-fg-primary)" }}>Total</span>
          <span className="text-lg font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>{TOTAL}</span>
        </div>
      </CardContent>
    </Card>
  );
}
