import * as React from "react";
import {
  House,
  ChartLine,
  Wallet,
  ArrowsLeftRight,
  Bell,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SLOT_GRID, SLOT_SPAN } from "@/lib/slots";
import {
  SurfaceShell,
  PriceChartCard,
  BalanceCard,
  MarketsTable,
  ProfitRings,
  TransactionList,
  RewardsCard,
  type SurfaceNavItem,
} from "@/components/composed";

const NAV: SurfaceNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "wallets", label: "Wallets", icon: Wallet },
  { id: "trade", label: "Trade", icon: ChartLine },
  { id: "exchange", label: "Exchange", icon: ArrowsLeftRight },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function DashboardSurface() {
  const [active, setActive] = React.useState("dashboard");

  return (
    <SurfaceShell
      items={NAV}
      activeId={active}
      onSelect={setActive}
      title={active.charAt(0).toUpperCase() + active.slice(1)}
      headerRight={
        <>
          <div className="relative hidden sm:block">
            <MagnifyingGlass
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--bl-fg-muted)" }}
            />
            <Input placeholder="Search markets..." className="h-8 w-48 text-xs pl-8" aria-label="Search" />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
            <Bell size={16} />
          </Button>
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-[10px]">T</AvatarFallback>
          </Avatar>
        </>
      }
    >
      <div className={`p-4 md:p-5 ${SLOT_GRID}`}>
        <div className={SLOT_SPAN["two-thirds"]}><PriceChartCard /></div>
        <div className={SLOT_SPAN["third"]}><BalanceCard /></div>
        <div className={SLOT_SPAN["full"]}><MarketsTable /></div>
        <div className={SLOT_SPAN["third"]}><ProfitRings /></div>
        <div className={SLOT_SPAN["third"]}><TransactionList /></div>
        <div className={SLOT_SPAN["third"]}><RewardsCard /></div>
      </div>
    </SurfaceShell>
  );
}
