import {
  MagnifyingGlass,
  CurrencyDollar,
  ChartBar,
  Megaphone,
} from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export interface ChannelAttributionProps {
  className?: string;
}

interface Channel {
  name: string;
  icon: typeof MagnifyingGlass;
  sessions: number;
  conversions: number;
  revenue: number;
  color: string;
}

const CHANNELS: Channel[] = [
  {
    name: "Organic Search",
    icon: MagnifyingGlass,
    sessions: 48420,
    conversions: 2184,
    revenue: 194600,
    color: "var(--bl-chart-1)",
  },
  {
    name: "Paid Search",
    icon: CurrencyDollar,
    sessions: 32150,
    conversions: 1864,
    revenue: 156200,
    color: "var(--bl-chart-2)",
  },
  {
    name: "Social",
    icon: Megaphone,
    sessions: 24800,
    conversions: 892,
    revenue: 72400,
    color: "var(--bl-chart-3)",
  },
  {
    name: "Email",
    icon: ChartBar,
    sessions: 18960,
    conversions: 1420,
    revenue: 118800,
    color: "var(--bl-chart-4)",
  },
  {
    name: "Referral",
    icon: MagnifyingGlass,
    sessions: 12340,
    conversions: 648,
    revenue: 54200,
    color: "var(--bl-chart-5)",
  },
  {
    name: "Direct",
    icon: ChartBar,
    sessions: 9840,
    conversions: 512,
    revenue: 41800,
    color: "var(--bl-chart-1)",
  },
];

const TOTAL_SESSIONS = CHANNELS.reduce((sum, c) => sum + c.sessions, 0);

function formatCompact(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function formatRate(conversions: number, sessions: number): string {
  return `${((conversions / sessions) * 100).toFixed(1)}%`;
}

/**
 * ChannelAttribution - marketing channel attribution breakdown.
 * Shows acquisition channels with sessions, conversions, conversion rate,
 * revenue, and a proportional share bar for each channel.
 *
 * Composes: Card, Badge, Phosphor MagnifyingGlass/CurrencyDollar/ChartBar/Megaphone icons.
 * Tokens: --bl-chart-1..5, --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted,
 *         --bl-bg-elevated, --bl-bg-active, --bl-border-divider, --bl-fill-primary.
 */
export function ChannelAttribution({ className }: ChannelAttributionProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm">Channel Attribution</CardTitle>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
            >
              {CHANNELS.length} channels
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Acquisition performance by source
          </CardDescription>
        </div>
        <ChartBar
          size={16}
          weight="regular"
          style={{ color: "var(--bl-fg-muted)" }}
        />
      </CardHeader>

      <CardContent className="space-y-0.5">
        {/* Column headers */}
        <div className="flex items-center gap-3 px-2 pb-1.5">
          <span
            className="flex-1 text-[11px] font-medium"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            Channel
          </span>
          <span
            className="w-16 text-right text-[11px] font-medium"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            Sessions
          </span>
          <span
            className="w-14 text-right text-[11px] font-medium hidden sm:block"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            Conv.
          </span>
          <span
            className="w-12 text-right text-[11px] font-medium"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            Rate
          </span>
          <span
            className="w-16 text-right text-[11px] font-medium hidden md:block"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            Revenue
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px mx-2"
          style={{ backgroundColor: "var(--bl-border-divider)" }}
        />

        {/* Channel rows */}
        {CHANNELS.map((channel) => {
          const ChannelIcon = channel.icon;
          const sharePercent = (channel.sessions / TOTAL_SESSIONS) * 100;
          const rate = formatRate(channel.conversions, channel.sessions);

          return (
            <div
              key={channel.name}
              className="flex flex-col gap-1.5 rounded-lg px-2 py-2.5 transition-colors"
              style={{
                transitionDuration: "var(--dur-instant)",
                transitionTimingFunction: "var(--ease-out)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Channel icon + name */}
                <div className="flex flex-1 items-center gap-2 min-w-0">
                  <ChannelIcon
                    size={14}
                    weight="regular"
                    className="shrink-0"
                    style={{ color: channel.color }}
                  />
                  <span
                    className="text-[13px] font-medium truncate"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {channel.name}
                  </span>
                </div>

                {/* Sessions */}
                <span
                  className="w-16 text-right text-[13px] tabular-nums font-medium shrink-0"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {formatCompact(channel.sessions)}
                </span>

                {/* Conversions */}
                <span
                  className="w-14 text-right text-[13px] tabular-nums shrink-0 hidden sm:block"
                  style={{ color: "var(--bl-fg-secondary)" }}
                >
                  {formatCompact(channel.conversions)}
                </span>

                {/* Rate */}
                <span
                  className="w-12 text-right text-[13px] tabular-nums font-medium shrink-0"
                  style={{ color: "var(--bl-fg-secondary)" }}
                >
                  {rate}
                </span>

                {/* Revenue */}
                <span
                  className="w-16 text-right text-[13px] tabular-nums font-medium shrink-0 hidden md:block"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {formatCurrency(channel.revenue)}
                </span>
              </div>

              {/* Share bar */}
              <div className="flex items-center gap-2 pl-6">
                <div
                  className="h-1.5 flex-1 rounded-full"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${sharePercent}%`,
                      backgroundColor: channel.color,
                    }}
                  />
                </div>
                <span
                  className="text-[11px] tabular-nums shrink-0"
                  style={{ color: "var(--bl-fg-muted)" }}
                >
                  {sharePercent.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
