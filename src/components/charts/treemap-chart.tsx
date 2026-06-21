import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

export interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
  [key: string]: unknown;
}

const COLORS = [
  "var(--bl-chart-1)",
  "var(--bl-chart-2)",
  "var(--bl-chart-3)",
  "var(--bl-chart-4)",
  "var(--bl-chart-5)",
];

function TreemapCell(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  index: number;
  depth: number;
  root?: { children?: { name: string }[] };
}) {
  const { x, y, width, height, name, index, depth, root } = props;
  const parentIndex = root?.children?.findIndex(
    (c: { name: string }) => c.name === name
  );
  const colorIdx = (depth === 1 ? index : parentIndex ?? index) % COLORS.length;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[colorIdx]}
        fillOpacity={depth === 1 ? 0.85 : 0.55}
        stroke="var(--bl-bg-surface)"
        strokeWidth={2}
        rx={3}
      />
      {width > 40 && height > 20 && (
        <text
          x={x + 6}
          y={y + 16}
          fill="var(--bl-fg-on-primary)"
          fontSize={11}
          fontFamily="var(--bl-font-body)"
          fontWeight={500}
        >
          {name}
        </text>
      )}
    </g>
  );
}

export function TreemapChart({
  data,
  className,
}: {
  data: TreemapNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="value"
          nameKey="name"
          aspectRatio={4 / 3}
          content={<TreemapCell x={0} y={0} width={0} height={0} name="" index={0} depth={0} />}
          isAnimationActive={false}
        >
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bl-bg-elevated)",
              border: "1px solid var(--bl-border-divider)",
              borderRadius: "var(--bl-radius-md)",
              fontSize: 12,
              color: "var(--bl-fg-primary)",
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
