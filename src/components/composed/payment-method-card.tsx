import { CreditCard } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PaymentMethod {
  brand: "Visa" | "Mastercard";
  lastFour: string;
  expiry: string;
  cardholder: string;
  isDefault: boolean;
}

const CARD_DATA: PaymentMethod = {
  brand: "Visa",
  lastFour: "4242",
  expiry: "09/27",
  cardholder: "Sarah Chen",
  isDefault: true,
};

/**
 * PaymentMethodCard - visual credit card display with brand, masked digits,
 * expiry, and management actions. Composes: Card, Badge, Button, Phosphor
 * CreditCard icon.
 */
export function PaymentMethodCard({ className }: { className?: string }) {
  const data = CARD_DATA;

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CreditCard size={18} weight="bold" style={{ color: "var(--bl-fill-primary)" }} />
          <CardTitle className="text-sm">Payment Method</CardTitle>
        </div>
        {data.isDefault && (
          <Badge className="text-[10px] px-2 py-0.5">Default</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual card */}
        <div
          className="relative rounded-lg p-5 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--bl-warm-800), var(--bl-warm-900))",
          }}
        >
          {/* Brand */}
          <div className="flex items-center justify-between mb-8">
            <span
              className="text-sm font-heading font-bold tracking-wider"
              style={{ color: "var(--bl-warm-200)" }}
            >
              {data.brand}
            </span>
            <CreditCard size={24} weight="fill" style={{ color: "var(--bl-warm-400)" }} />
          </div>

          {/* Card number */}
          <p
            className="text-lg font-mono tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--bl-warm-100)" }}
          >
            &bull;&bull;&bull;&bull;  &bull;&bull;&bull;&bull;  &bull;&bull;&bull;&bull;  {data.lastFour}
          </p>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--bl-warm-400)" }}>
                Cardholder
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--bl-warm-100)" }}>
                {data.cardholder}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--bl-warm-400)" }}>
                Expires
              </p>
              <p className="text-xs font-medium tabular-nums" style={{ color: "var(--bl-warm-100)" }}>
                {data.expiry}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Set as Default
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-[var(--bl-fill-danger)] border-[var(--bl-fill-danger)] hover:bg-[color-mix(in_srgb,var(--bl-fill-danger)_10%,transparent)]">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
