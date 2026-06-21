import type { Icon } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";

export interface Feature {
  icon: Icon;
  title: string;
  desc: string;
}

/**
 * FeatureGrid - grid of icon + title + description cards.
 * Composes: Card, Phosphor icons.
 */
export function FeatureGrid({
  features,
  columns = 2,
}: {
  features: Feature[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={
        columns === 3
          ? "grid grid-cols-2 sm:grid-cols-3 gap-3"
          : "grid grid-cols-2 gap-3"
      }
    >
      {features.map((f) => (
        <Card key={f.title} className="p-4 transition-colors duration-instant hover:border-[var(--bl-border-active)]">
          <f.icon
            size={20}
            weight="regular"
            className="mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          />
          <p className="text-sm font-medium">{f.title}</p>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </Card>
      ))}
    </div>
  );
}
