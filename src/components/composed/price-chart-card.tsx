import * as React from "react";
import { CaretUp, ChartLine, ChartBar } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AreaTrendChart, ComparisonBarChart } from "@/components/charts";

const RANGES = ["24H", "1W", "1M", "1Y", "All"] as const;
type Range = (typeof RANGES)[number];

function generateSeries(
  labels: string[],
  count: number,
  base: number,
  amplitude: number,
  trend: number,
): { label: string; value: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const noise =
      Math.sin(i * 0.7 + 1.2) * amplitude * 0.6 +
      Math.sin(i * 1.9 + 0.5) * amplitude * 0.3 +
      Math.cos(i * 3.1) * amplitude * 0.15;
    return {
      label: labels[i] ?? "",
      value: Math.round(base + noise + t * trend),
    };
  });
}

const hours24 = Array.from({ length: 24 }, (_, i) => {
  const h = (i + 10) % 24;
  return h === 0 ? "12AM" : h < 12 ? `${h}AM` : h === 12 ? "12PM" : `${h - 12}PM`;
});

const SERIES: Record<Range, { label: string; value: number }[]> = {
  "24H": generateSeries(hours24, 24, 16200, 520, 230),
  "1W": generateSeries(
    ["Mon", "", "Tue", "", "Wed", "", "Thu", "", "Fri", "", "Sat", "", "Sun"],
    28,
    15700,
    980,
    730,
  ),
  "1M": generateSeries(
    Array.from({ length: 30 }, (_, i) => ((i + 1) % 5 === 0 ? `${i + 1}` : "")),
    30,
    14600,
    760,
    1500,
  ),
  "1Y": generateSeries(
    ["Jan", "", "", "Apr", "", "", "Jul", "", "", "Oct", "", "Dec"],
    36,
    11800,
    1100,
    4920,
  ),
  All: generateSeries(
    ["'20", "", "'21", "", "'22", "", "'23", "", "'24", ""],
    30,
    6500,
    900,
    10400,
  ),
};

const usd = (v: number) => `$${(v / 1000).toFixed(1)}k`;

/**
 * PriceChartCard - the hero market chart. Big price + signed delta, a range
 * switcher and a line/bar type switcher, with a tokenized, monochromatic-orange
 * chart underneath (axes + hover guide baked in). Composes Card, ToggleGroup,
 * and the chart primitives.
 */
export function PriceChartCard() {
  const [range, setRange] = React.useState<Range>("1W");
  const [type, setType] = React.useState<"line" | "bar">("line");
  const data = SERIES[range];

  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium" style={{ color: "var(--bl-fg-secondary)" }}>BTC / USD</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[28px] leading-none font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
                $16,430.00
              </p>
              <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--bl-fill-success)" }}>
                <CaretUp size={11} weight="bold" />
                +$241.43 (1.02%)
              </span>
            </div>
          </div>
          <ToggleGroup
            type="single"
            value={type}
            onValueChange={(v) => v && setType(v as "line" | "bar")}
            size="sm"
          >
            <ToggleGroupItem value="line" aria-label="Line chart" className="h-7 w-8 p-0">
              <ChartLine size={15} weight={type === "line" ? "bold" : "regular"} />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Bar chart" className="h-7 w-8 p-0">
              <ChartBar size={15} weight={type === "bar" ? "bold" : "regular"} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-3">
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(v) => v && setRange(v as Range)}
            size="sm"
            className="justify-start"
          >
            {RANGES.map((r) => (
              <ToggleGroupItem key={r} value={r} aria-label={r} className="h-7 px-3 text-[11px] font-medium">
                {r}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="mt-3 h-[180px]">
          {type === "line" ? (
            <AreaTrendChart
              data={data}
              seriesLabel="Price"
              color="var(--bl-chart-mono-1)"

              valueFormatter={usd}
              className="h-full w-full"
            />
          ) : (
            <ComparisonBarChart
              data={data.map((d) => ({ label: d.label, price: d.value }))}
              series={[{ key: "price", label: "Price" }]}
              className="h-full w-full"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
