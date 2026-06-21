import { DotsThree, TrendUp, TrendDown } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface MarketRow {
  name: string;
  symbol: string;
  tint: string;
  price: string;
  volume: string;
  marketCap: string;
  holders: string;
  change: number;
}

const ROWS: MarketRow[] = [
  { name: "Payoneer", symbol: "PYO", tint: "var(--bl-orange-500)", price: "$0.00000231", volume: "$9,152,921", marketCap: "$432,624,043", holders: "18,212", change: 4.2 },
  { name: "Tap Tap", symbol: "TAP", tint: "var(--bl-gold-500)", price: "$0.00000531", volume: "$532,152", marketCap: "$15,428,853", holders: "15,271", change: -1.8 },
  { name: "Wise", symbol: "WSE", tint: "var(--bl-clay-400)", price: "$0.00003231", volume: "$10,527,511", marketCap: "$573,116,043", holders: "12,221", change: 2.9 },
  { name: "Cedar", symbol: "CDR", tint: "var(--bl-teal-500)", price: "$0.00012088", volume: "$3,981,004", marketCap: "$88,402,910", holders: "9,887", change: 7.1 },
];

function CoinBadge({ symbol, tint }: { symbol: string; tint: string }) {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
      style={{ backgroundColor: `color-mix(in srgb, ${tint} 22%, transparent)`, color: tint }}
    >
      {symbol.slice(0, 2)}
    </span>
  );
}

/**
 * MarketsTable — dense asset table: coin, price, volume, market cap, holders,
 * 24h change, and a per-row action menu. Composes Card, Table, DropdownMenu,
 * Button, Phosphor icons. Numbers are tabular for clean alignment.
 */
export function MarketsTable() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Markets</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right hidden md:table-cell">Trading Volume</TableHead>
              <TableHead className="text-right hidden lg:table-cell">Market Cap</TableHead>
              <TableHead className="text-right hidden md:table-cell">Holders</TableHead>
              <TableHead className="text-right">24h</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => {
              const up = r.change >= 0;
              const Trend = up ? TrendUp : TrendDown;
              return (
                <TableRow key={r.symbol}>
                  <TableCell className="pl-3">
                    <div className="flex items-center gap-2.5">
                      <CoinBadge symbol={r.symbol} tint={r.tint} />
                      <div className="leading-tight">
                        <p className="font-medium" style={{ color: "var(--bl-fg-primary)" }}>{r.name}</p>
                        <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{r.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{r.price}</TableCell>
                  <TableCell className="text-right tabular-nums hidden md:table-cell" style={{ color: "var(--bl-fg-secondary)" }}>{r.volume}</TableCell>
                  <TableCell className="text-right tabular-nums hidden lg:table-cell" style={{ color: "var(--bl-fg-secondary)" }}>{r.marketCap}</TableCell>
                  <TableCell className="text-right tabular-nums hidden md:table-cell" style={{ color: "var(--bl-fg-secondary)" }}>{r.holders}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className="inline-flex items-center gap-0.5 text-xs font-medium tabular-nums"
                      style={{ color: up ? "var(--bl-fill-success)" : "var(--bl-fill-danger)" }}
                    >
                      <Trend size={11} weight="bold" />
                      {Math.abs(r.change).toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`${r.name} actions`}>
                          <DotsThree size={18} weight="bold" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Trade</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add to watchlist</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
