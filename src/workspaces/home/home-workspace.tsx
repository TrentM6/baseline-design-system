import {
  BookOpenText,
  Palette,
  Stack,
  PaintBrush,
  ArrowRight,
} from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const WORKSPACE_CARDS = [
  {
    value: "rules",
    label: "Design Rules",
    description:
      "The principles, heuristics, and constraints that guide every design decision in the system.",
    icon: BookOpenText,
    stat: "30+ rules",
  },
  {
    value: "tokens",
    label: "Tokens",
    description:
      "The single source of truth for every visual value — colors, type, spacing, motion, shadows.",
    icon: Palette,
    stat: "100+ tokens",
  },
  {
    value: "components",
    label: "Components",
    description:
      "A catalog of production-ready charts, cards, tables, and lists — all composable and themeable.",
    icon: Stack,
    stat: "55 components",
  },
  {
    value: "playground",
    label: "Playground",
    description:
      "Compose components on a live canvas. Drag, resize, and export full page layouts as code.",
    icon: PaintBrush,
    stat: "Live editor",
  },
] as const;

function BaselineMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 sm:w-14 sm:h-14"
      style={{ color: "var(--bl-fill-primary)" }}
    >
      <path
        d="M176 176H24V161.52H175.994V143.96H24V24H176V176Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WorkspaceCard({
  label,
  description,
  icon: Icon,
  stat,
  onClick,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
  stat: string;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative rounded-md p-5 sm:p-6 text-left cursor-pointer transition-all duration-quick ease-out shadow-sm hover:shadow-card-hover hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        backgroundColor: "var(--bl-bg-surface)",
        border: "1px solid var(--bl-border-card)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-md"
          style={{
            backgroundColor: "var(--bl-accent-subtle)",
          }}
        >
          <Icon
            size={20}
            weight="regular"
            style={{ color: "var(--bl-fill-primary)" }}
          />
        </div>
        <span
          className="text-[11px] font-mono"
          style={{ color: "var(--bl-fg-muted)" }}
        >
          {stat}
        </span>
      </div>
      <h3
        className="text-[15px] font-heading font-medium mb-1.5"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        {label}
      </h3>
      <p
        className="text-[13px] leading-relaxed"
        style={{ color: "var(--bl-fg-secondary)" }}
      >
        {description}
      </p>
      <div
        className="mt-4 flex items-center gap-1.5 text-[12px] font-heading font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-quick"
        style={{ color: "var(--bl-fill-primary)" }}
      >
        <span>Explore</span>
        <ArrowRight
          size={12}
          weight="bold"
          className="transition-transform duration-quick group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
}

function HomeWorkspace({
  onNavigate,
}: {
  onNavigate: (value: string) => void;
}) {
  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8 sm:px-6 sm:py-16 lg:py-24 max-w-[960px] mx-auto">
        <header className="mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <BaselineMark />
            <div>
              <h1
                className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight"
                style={{ color: "var(--bl-fg-primary)" }}
              >
                Baseline
              </h1>
              <p
                className="text-sm font-heading"
                style={{ color: "var(--bl-fg-secondary)" }}
              >
                Design System
              </p>
            </div>
          </div>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-[540px]"
            style={{ color: "var(--bl-fg-secondary)" }}
          >
            A token-driven component system built for composition. Every color,
            spacing value, and interaction traces back to a single source of
            truth.
          </p>

          <div
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-mono"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            <span>
              <span style={{ color: "var(--bl-fill-primary)" }}>v0.1.0</span>
              {" "}
              current
            </span>
            <span>Dark-first</span>
            <span>WCAG 2.2 AA</span>
            <span>55 components</span>
          </div>
        </header>

        <section>
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-4"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Workspaces
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORKSPACE_CARDS.map((card) => (
              <WorkspaceCard
                key={card.value}
                label={card.label}
                description={card.description}
                icon={card.icon}
                stat={card.stat}
                onClick={() => onNavigate(card.value)}
              />
            ))}
          </div>
        </section>

        <footer
          className="mt-12 sm:mt-16 pt-6 text-[11px] font-mono"
          style={{
            color: "var(--bl-fg-muted)",
            borderTop: "1px solid var(--bl-border-divider)",
          }}
        >
          Built with React, Tailwind, shadcn/ui, and Recharts.
        </footer>
      </div>
    </ScrollArea>
  );
}

export default HomeWorkspace;
