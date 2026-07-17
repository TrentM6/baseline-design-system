import { Package } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface LineItem {
  name: string;
  quantity: number;
  price: string;
}

const ITEMS: LineItem[] = [
  { name: "Design System Pro License", quantity: 1, price: "$299.00" },
  { name: "Additional Team Seats", quantity: 5, price: "$145.00" },
  { name: "Priority Support Add-on", quantity: 1, price: "$49.00" },
];

const SUBTOTAL = "$493.00";
const TAX = "$44.37";
const SHIPPING = "$0.00";
const TOTAL = "$537.37";

/**
 * OrderSummary - checkout/order summary card with line items, totals, and a
 * place-order CTA. Composes: Card, Separator, Button, Phosphor Package icon.
 */
export function OrderSummary({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
        <Package size={18} weight="bold" style={{ color: "var(--bl-fill-primary)" }} />
        <CardTitle className="text-sm">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Line items */}
        <div className="space-y-3">
          {ITEMS.map((item) => (
            <div key={item.name} className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>
                  {item.name}
                </p>
                <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-[13px] font-medium tabular-nums shrink-0" style={{ color: "var(--bl-fg-primary)" }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Subtotals */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>Subtotal</span>
            <span className="text-xs tabular-nums" style={{ color: "var(--bl-fg-secondary)" }}>{SUBTOTAL}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>Tax (9%)</span>
            <span className="text-xs tabular-nums" style={{ color: "var(--bl-fg-secondary)" }}>{TAX}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>Shipping</span>
            <span className="text-xs tabular-nums" style={{ color: "var(--bl-fg-secondary)" }}>{SHIPPING}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-heading font-semibold" style={{ color: "var(--bl-fg-primary)" }}>Total</span>
          <span className="text-lg font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>{TOTAL}</span>
        </div>

        {/* CTA */}
        <Button className="w-full">Place Order</Button>
      </CardContent>
    </Card>
  );
}
