import type { Icon } from "@phosphor-icons/react";
import { Tray } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyStateCardProps {
  /** Phosphor icon component to display. */
  icon?: Icon;
  /** Heading text. */
  title?: string;
  /** Description text. */
  description?: string;
  /** CTA button label. */
  actionLabel?: string;
  /** Callback when the CTA is clicked. */
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyStateCard — illustrated empty state for dashboard sections.
 * Composes: Card, Button, Phosphor icon.
 * Tokens: --bl-fg-muted, --bl-fg-secondary, --bl-fg-primary.
 */
export function EmptyStateCard({
  icon: IconCmp = Tray,
  title = "No data yet",
  description = "There are no records to display. Create your first entry to get started.",
  actionLabel = "Get started",
  onAction,
  className,
}: EmptyStateCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--bl-bg-active)" }}
        >
          <IconCmp size={28} weight="duotone" style={{ color: "var(--bl-fg-muted)" }} />
        </div>
        <h3
          className="text-base font-heading font-semibold mb-1"
          style={{ color: "var(--bl-fg-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm max-w-xs mb-5"
          style={{ color: "var(--bl-fg-muted)" }}
        >
          {description}
        </p>
        {actionLabel && (
          <Button
            size="sm"
            onClick={onAction}
            className="transition-colors duration-instant"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
