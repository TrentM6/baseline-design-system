import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ring {
  size: number;
  bg: string;
  fg: string;
  label: string;
}

// outer (deepest) → inner (brightest), monochromatic orange
const RINGS: Ring[] = [
  { size: 200, bg: "var(--bl-orange-900)", fg: "var(--bl-orange-200)", label: "$15K" },
  { size: 150, bg: "var(--bl-orange-700)", fg: "var(--bl-orange-100)", label: "$9.3K" },
  { size: 104, bg: "var(--bl-orange-500)", fg: "var(--bl-orange-50)", label: "$6.8K" },
  { size: 62, bg: "var(--bl-orange-300)", fg: "var(--bl-stone-900)", label: "$4K" },
];

/**
 * ProfitRings — concentric, monochromatic-orange nested circles showing profit
 * bands. Pure tokenized SVG-free composition. Composes Card + Select.
 */
export function ProfitRings() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
        <div>
          <CardTitle className="text-sm">Annual Profit</CardTitle>
          <p className="text-xl font-heading font-bold tabular-nums mt-1" style={{ color: "var(--bl-fg-primary)" }}>
            $78,820.00
          </p>
        </div>
        <Select defaultValue="2024">
          <SelectTrigger className="h-7 w-[84px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative mx-auto" style={{ height: 210, width: 200 }}>
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full flex justify-center"
              style={{ height: ring.size, width: ring.size, backgroundColor: ring.bg }}
            >
              <span
                className="mt-2 text-[11px] font-semibold tabular-nums"
                style={{ color: ring.fg }}
              >
                {ring.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
