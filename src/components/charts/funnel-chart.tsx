import { Funnel, FunnelChart as RechartsFunnelChart, LabelList, Tooltip, ResponsiveContainer } from "recharts";

export interface FunnelDatum {
  name: string;
  value: number;
  fill: string;
}

const DEFAULT_COLORS = [
  "var(--bl-chart-1)",
  "var(--bl-chart-2)",
  "var(--bl-chart-3)",
  "var(--bl-chart-4)",
  "var(--bl-chart-5)",
];

export function FunnelChartComponent({
  data,
  className,
}: {
  data: Omit<FunnelDatum, "fill">[];
  className?: string;
}) {
  const colored = data.map((d, i) => ({
    ...d,
    fill: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bl-bg-elevated)",
              border: "1px solid var(--bl-border-divider)",
              borderRadius: "var(--bl-radius-md)",
              fontSize: 12,
              color: "var(--bl-fg-primary)",
            }}
          />
          <Funnel
            dataKey="value"
            data={colored}
            isAnimationActive={false}
          >
            <LabelList
              position="right"
              dataKey="name"
              fill="var(--bl-fg-secondary)"
              fontSize={11}
              fontFamily="var(--bl-font-body)"
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
