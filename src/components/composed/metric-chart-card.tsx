import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * MetricChartCard — a titled card that frames a chart primitive.
 * Composes: Card + CardHeader + CardContent + CardFooter.
 * Pattern: title → description → chart visual → footer insight.
 */
export function MetricChartCard({
  title,
  description,
  footer,
  footerDetail,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  footerDetail?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-xs">{description}</CardDescription>
          ) : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {(footer || footerDetail) ? (
        <CardFooter className="flex-col items-start gap-1 text-xs">
          {footer ? (
            <div className="flex items-center gap-1.5 font-medium" style={{ color: "var(--bl-fg-primary)" }}>
              {footer}
            </div>
          ) : null}
          {footerDetail ? (
            <div style={{ color: "var(--bl-fg-muted)" }}>
              {footerDetail}
            </div>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
