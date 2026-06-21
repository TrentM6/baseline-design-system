import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * MetricChartCard — a titled card that frames a chart primitive.
 * Composes: Card + (any chart primitive passed as children).
 * This is the bridge layer: charts (primitive) → card (component).
 */
export function MetricChartCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-xs">{description}</CardDescription>
          ) : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
