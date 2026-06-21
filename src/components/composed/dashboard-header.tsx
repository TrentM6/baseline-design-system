import * as React from "react";
import { Bell } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface DashboardHeaderProps {
  /** Page title. */
  title: string;
  /** Optional subtitle / description. */
  subtitle?: string;
  /** Breadcrumb trail - array of labels. Last item is the current page. */
  breadcrumbs?: string[];
  /** Actions rendered on the right side (e.g. Button elements). */
  actions?: React.ReactNode;
  /** Show notification bell with unread count. */
  notificationCount?: number;
  className?: string;
}

const DEFAULT_BREADCRUMBS = ["Home", "Dashboard", "Analytics"];

/**
 * DashboardHeader - page header with breadcrumbs, title, and actions.
 * Composes: Button, Badge, Breadcrumb, Phosphor Bell icon.
 * Tokens: --bl-fg-primary, --bl-fg-secondary, --bl-fg-muted.
 */
export function DashboardHeader({
  title = "Analytics Overview",
  subtitle = "Track performance metrics and trends across your workspace.",
  breadcrumbs = DEFAULT_BREADCRUMBS,
  actions,
  notificationCount = 3,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h1
            className="text-2xl font-heading font-bold tracking-tight"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm" style={{ color: "var(--bl-fg-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          {notificationCount != null && notificationCount > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="relative h-9 w-9"
              aria-label={`Notifications: ${notificationCount} unread`}
            >
              <Bell size={16} />
              <Badge
                className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px] tabular-nums flex items-center justify-center"
              >
                {notificationCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
