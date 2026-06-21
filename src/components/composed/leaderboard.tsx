import { Trophy, TrendUp, TrendDown, Minus } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "same";

interface LeaderboardEntry {
  rank: number;
  name: string;
  initials: string;
  team: string;
  score: number;
  trend: Trend;
}

export interface LeaderboardProps {
  className?: string;
}

const ENTRIES: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", initials: "SC", team: "Engineering", score: 2840, trend: "up" },
  { rank: 2, name: "Marcus Rivera", initials: "MR", team: "Design", score: 2615, trend: "up" },
  { rank: 3, name: "Aisha Patel", initials: "AP", team: "Product", score: 2490, trend: "down" },
  { rank: 4, name: "James Wilson", initials: "JW", team: "Engineering", score: 2310, trend: "up" },
  { rank: 5, name: "Yuki Tanaka", initials: "YT", team: "Data", score: 2180, trend: "same" },
  { rank: 6, name: "Liam O'Brien", initials: "LO", team: "Marketing", score: 1950, trend: "down" },
  { rank: 7, name: "Priya Sharma", initials: "PS", team: "Engineering", score: 1820, trend: "up" },
  { rank: 8, name: "Noah Kim", initials: "NK", team: "Design", score: 1690, trend: "same" },
];

const TREND_CONFIG: Record<Trend, { icon: typeof TrendUp; color: string; label: string }> = {
  up: { icon: TrendUp, color: "var(--bl-fill-success)", label: "Trending up" },
  down: { icon: TrendDown, color: "var(--bl-fill-danger)", label: "Trending down" },
  same: { icon: Minus, color: "var(--bl-fg-muted)", label: "No change" },
};

function getRankStyle(rank: number): { color: string; fontWeight: string } {
  switch (rank) {
    case 1:
      return { color: "var(--bl-fill-warning)", fontWeight: "700" };
    case 2:
      return { color: "var(--bl-fg-secondary)", fontWeight: "700" };
    case 3:
      return { color: "var(--bl-chart-3)", fontWeight: "700" };
    default:
      return { color: "var(--bl-fg-muted)", fontWeight: "400" };
  }
}

function formatScore(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Leaderboard - ranked user/team leaderboard with scores, trends, and progress bars.
 * Composes: Card, Avatar, Badge, Phosphor Trophy/TrendUp/TrendDown/Minus icons.
 * Tokens: --bl-fill-warning, --bl-chart-1..3, --bl-fill-success, --bl-fill-danger,
 *         --bl-fg-*, --bl-bg-elevated, --bl-bg-active.
 */
export function Leaderboard({ className }: LeaderboardProps) {
  const maxScore = Math.max(...ENTRIES.map((e) => e.score));

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Trophy size={16} weight="regular" style={{ color: "var(--bl-fg-muted)" }} />
          <CardTitle className="text-sm">Leaderboard</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
          This Sprint
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1 px-3">
        {ENTRIES.map((entry) => {
          const rankStyle = getRankStyle(entry.rank);
          const trendCfg = TREND_CONFIG[entry.trend];
          const TrendIcon = trendCfg.icon;
          const barWidth = (entry.score / maxScore) * 100;
          const isTop3 = entry.rank <= 3;

          return (
            <div
              key={entry.initials}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
            >
              {/* Rank */}
              <span
                className="w-5 shrink-0 text-center text-[13px] tabular-nums"
                style={{ color: rankStyle.color, fontWeight: rankStyle.fontWeight }}
              >
                {entry.rank}
              </span>

              {/* Avatar */}
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-[10px] font-semibold">
                  {entry.initials}
                </AvatarFallback>
              </Avatar>

              {/* Name, team, and score bar */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13px] font-medium truncate"
                      style={{ color: "var(--bl-fg-primary)" }}
                    >
                      {entry.name}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {entry.team}
                    </p>
                  </div>

                  {/* Score */}
                  <span
                    className="text-[13px] tabular-nums font-medium shrink-0"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {formatScore(entry.score)}
                  </span>

                  {/* Trend */}
                  <TrendIcon
                    size={14}
                    weight="bold"
                    className="shrink-0"
                    style={{ color: trendCfg.color }}
                    aria-label={trendCfg.label}
                  />
                </div>

                {/* Score bar */}
                <div
                  className="mt-1.5 h-1.5 w-full rounded-full"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: isTop3
                        ? "var(--bl-chart-1)"
                        : "var(--bl-chart-2)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
