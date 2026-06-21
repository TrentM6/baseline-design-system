import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

interface FlatSegment {
  name: string;
  value: number;
  fill: string;
}

function flatten(
  nodes: SunburstNode[],
): { inner: FlatSegment[]; outer: FlatSegment[] } {
  const inner: FlatSegment[] = [];
  const outer: FlatSegment[] = [];

  nodes.forEach((node, i) => {
    const color = node.fill ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
    const childTotal = node.children?.reduce((s, c) => s + (c.value ?? 0), 0) ?? 0;
    const nodeValue = node.value ?? childTotal;

    inner.push({ name: node.name, value: nodeValue, fill: color });

    if (node.children) {
      node.children.forEach((child) => {
        outer.push({
          name: child.name,
          value: child.value ?? 0,
          fill: color,
        });
      });
    }
  });

  return { inner, outer };
}

export function SunburstChartComponent({
  data,
  className,
}: {
  data: SunburstNode;
  className?: string;
}) {
  const { inner, outer } = flatten(data.children ?? []);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={inner}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="55%"
            innerRadius="30%"
            stroke="none"
            strokeWidth={1}
          >
            {inner.map((s, i) => (
              <Cell key={i} fill={s.fill} />
            ))}
          </Pie>
          <Pie
            data={outer}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="60%"
            stroke="none"
            strokeWidth={1}
          >
            {outer.map((s, i) => (
              <Cell key={i} fill={s.fill} opacity={0.7} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bl-bg-elevated)",
              border: "1px solid var(--bl-border-divider)",
              borderRadius: "var(--r-md)",
              fontSize: 12,
              color: "var(--bl-fg-primary)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
