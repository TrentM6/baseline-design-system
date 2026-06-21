import { SunburstChart as RechartsSunburstChart, ResponsiveContainer, Tooltip } from "recharts";

export interface SunburstNode {
  name: string;
  value?: number;
  fill?: string;
  children?: SunburstNode[];
}

const DEFAULT_COLORS = [
  "var(--bl-chart-1)",
  "var(--bl-chart-2)",
  "var(--bl-chart-3)",
  "var(--bl-chart-4)",
  "var(--bl-chart-5)",
];

function assignColors(nodes: SunburstNode[], depth = 0, parentIdx = 0): SunburstNode[] {
  return nodes.map((node, i) => ({
    ...node,
    fill: node.fill ?? DEFAULT_COLORS[(depth === 0 ? i : parentIdx) % DEFAULT_COLORS.length],
    children: node.children ? assignColors(node.children, depth + 1, depth === 0 ? i : parentIdx) : undefined,
  }));
}

export function SunburstChartComponent({
  data,
  className,
}: {
  data: SunburstNode;
  className?: string;
}) {
  const colored = {
    ...data,
    children: data.children ? assignColors(data.children) : [],
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsSunburstChart data={colored} dataKey="value" nameKey="name">
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bl-bg-elevated)",
              border: "1px solid var(--bl-border-divider)",
              borderRadius: "var(--bl-radius-md)",
              fontSize: 12,
              color: "var(--bl-fg-primary)",
            }}
          />
        </RechartsSunburstChart>
      </ResponsiveContainer>
    </div>
  );
}
