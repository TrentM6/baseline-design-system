import { Sankey, Tooltip, ResponsiveContainer, Layer, Rectangle } from "recharts";

export interface SankeyNode {
  name: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

function SankeyNodeShape({
  x,
  y,
  width,
  height,
  index,
  payload,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string };
}) {
  const COLORS = [
    "var(--bl-chart-1)",
    "var(--bl-chart-2)",
    "var(--bl-chart-3)",
    "var(--bl-chart-4)",
    "var(--bl-chart-5)",
  ];

  return (
    <Layer key={`node-${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        fillOpacity={0.85}
        rx={2}
      />
      <text
        x={x + width + 6}
        y={y + height / 2}
        textAnchor="start"
        dominantBaseline="central"
        fill="var(--bl-fg-secondary)"
        fontSize={11}
        fontFamily="var(--bl-font-body)"
      >
        {payload.name}
      </text>
    </Layer>
  );
}

export function SankeyChart({
  data,
  className,
}: {
  data: SankeyData;
  className?: string;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodeWidth={10}
          nodePadding={24}
          linkCurvature={0.5}
          node={<SankeyNodeShape x={0} y={0} width={0} height={0} index={0} payload={{ name: "" }} />}
          link={{ stroke: "var(--bl-chart-1)", strokeOpacity: 0.15 }}
          margin={{ left: 0, right: 100, top: 8, bottom: 8 }}
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
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
