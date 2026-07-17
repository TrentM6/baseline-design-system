import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface Txn {
  name: string;
  kind: string;
  amount: string;
  time: string;
}

const TXNS: Txn[] = [
  { name: "Netflix", kind: "Subscription", amount: "+5.00 ETH", time: "01:45 PM" },
  { name: "Dribbble", kind: "Membership", amount: "+6.00 ETH", time: "03:15 PM" },
  { name: "Spotify", kind: "Subscription", amount: "+3.00 ETH", time: "02:05 PM" },
  { name: "Figma", kind: "Seat", amount: "+2.50 ETH", time: "11:30 AM" },
];

function Glyph({ name }: { name: string }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bl-fill-primary) 16%, transparent)",
        color: "var(--bl-fill-primary)",
      }}
    >
      {name.slice(0, 2)}
    </span>
  );
}

/**
 * TransactionList -recent transactions with glyph, label, amount and time.
 * Composes Card, Button, tokens. Amounts use the success token (semantic, not
 * decorative) so the surface stays monochromatic orange otherwise.
 */
export function TransactionList() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Transactions</CardTitle>
        <Button variant="link" className="h-auto p-0 text-xs">View all</Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {TXNS.map((t) => (
          <div key={t.name} className="flex items-center gap-3 rounded-lg px-1 py-2">
            <Glyph name={t.name} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>{t.name}</p>
              <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{t.kind}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium tabular-nums" style={{ color: "var(--bl-fill-success)" }}>{t.amount}</p>
              <p className="text-[11px] tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>{t.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
