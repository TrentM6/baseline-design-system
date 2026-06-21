import * as React from "react";
import {
  CaretUp,
  ArrowsDownUp,
  CurrencyBtc,
  CurrencyDollar,
  DotsThree,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Asset {
  code: string;
  icon: React.ComponentType<{ size?: number; weight?: "regular" | "fill" | "bold"; className?: string }>;
}

const SELL: Asset = { code: "BTC", icon: CurrencyBtc };
const BUY: Asset = { code: "USDT", icon: CurrencyDollar };

function AssetRow({ label, asset }: { label: string; asset: Asset }) {
  const Icon = asset.icon;
  return (
    <div
      className="flex items-center justify-between rounded-lg border px-3 py-2.5"
      style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-elevated)" }}
    >
      <div>
        <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{label}</p>
        <p className="text-sm font-medium tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>0.00</p>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-sm px-2.5 py-1"
        style={{ backgroundColor: "var(--bl-bg-active)" }}
      >
        <Icon size={16} weight="fill" className="text-[var(--bl-fill-primary)]" />
        <span className="text-xs font-semibold" style={{ color: "var(--bl-fg-primary)" }}>{asset.code}</span>
      </div>
    </div>
  );
}

/**
 * BalanceCard - total balance + an inline currency-exchange widget.
 * Composes: Card, Button, Separator, Phosphor icons. Tokens throughout.
 */
export function BalanceCard() {
  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <p className="text-[13px]" style={{ color: "var(--bl-fg-secondary)" }}>Total Balance</p>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1" aria-label="More">
            <DotsThree size={18} weight="bold" />
          </Button>
        </div>

        <div className="flex items-end gap-2 mt-1">
          <p className="text-[28px] leading-none font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
            $78,820.00
          </p>
          <span className="flex items-center gap-0.5 text-xs font-medium mb-1" style={{ color: "var(--bl-fill-success)" }}>
            <CaretUp size={11} weight="bold" />
            $931.12
          </span>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px]" style={{ color: "var(--bl-fg-secondary)" }}>Exchange</span>
          <span className="text-[13px] font-medium tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
            1 BTC = $30,834.00
          </span>
        </div>

        <div className="relative space-y-2">
          <AssetRow label="You sell" asset={SELL} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full border-2"
              style={{ borderColor: "var(--bl-bg-surface)", backgroundColor: "var(--bl-bg-active)" }}
            >
              <ArrowsDownUp size={13} weight="bold" style={{ color: "var(--bl-fg-secondary)" }} />
            </div>
          </div>
          <AssetRow label="You get" asset={BUY} />
        </div>

        <Button className="w-full mt-4">Exchange</Button>
      </CardContent>
    </Card>
  );
}
