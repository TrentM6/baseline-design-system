import {
  BookOpenText,
  Palette,
  Stack,
  PaintBrush,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const WORKSPACE_CARDS = [
  {
    value: "rules",
    label: "Design Rules",
    description:
      "Principles, heuristics, and constraints that guide every design decision.",
    icon: BookOpenText,
  },
  {
    value: "tokens",
    label: "Tokens",
    description:
      "Colors, type, spacing, motion, and shadows. The single source of truth.",
    icon: Palette,
  },
  {
    value: "components",
    label: "Components",
    description:
      "55 production-ready charts, cards, tables, and lists. All composable.",
    icon: Stack,
  },
  {
    value: "playground",
    label: "Playground",
    description:
      "Compose components on a live canvas. Export full page layouts as code.",
    icon: PaintBrush,
  },
] as const;

const PRINCIPLES = [
  "Tokens, never literals",
  "Compose from base components",
  "Add at the right level",
  "Accessibility is non-negotiable",
  "Dark mode is ground truth",
  "Docs and code move together",
  "Serve the user's task",
];

function WorkspaceCard({
  label,
  description,
  icon: Icon,
  onClick,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
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
      className="group relative rounded-md p-5 text-left cursor-pointer transition-all duration-quick ease-out shadow-sm hover:shadow-card-hover hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        backgroundColor: "var(--bl-bg-surface)",
        border: "1px solid var(--bl-border-card)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-md"
          style={{ backgroundColor: "var(--bl-accent-subtle)" }}
        >
          <Icon
            size={16}
            weight="regular"
            style={{ color: "var(--bl-fill-primary)" }}
          />
        </div>
        <h3
          className="text-[14px] font-heading font-medium"
          style={{ color: "var(--bl-fg-primary)" }}
        >
          {label}
        </h3>
      </div>
      <p
        className="text-[13px] leading-relaxed"
        style={{ color: "var(--bl-fg-secondary)" }}
      >
        {description}
      </p>
      <div
        className="mt-3 flex items-center gap-1.5 text-[12px] font-heading font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-quick"
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
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:py-16 max-w-[960px] mx-auto">
        <header className="mb-10 sm:mb-12">
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Baseline
          </p>
          <h1
            className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight mb-3"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Design System
          </h1>
          <p
            className="text-[15px] sm:text-base leading-relaxed max-w-[520px]"
            style={{ color: "var(--bl-fg-secondary)" }}
          >
            A token-driven component system built for composition. Every color,
            spacing value, and interaction traces back to a single source of
            truth.
          </p>
        </header>

        <section className="mb-10 sm:mb-12">
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
                onClick={() => onNavigate(card.value)}
              />
            ))}
          </div>
        </section>

        <section>
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-4"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Core Principles
          </p>
          <div
            className="rounded-md p-4 sm:p-5 space-y-2.5"
            style={{
              backgroundColor: "var(--bl-bg-surface)",
              border: "1px solid var(--bl-border-card)",
            }}
          >
            {PRINCIPLES.map((p) => (
              <div key={p} className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--bl-fill-primary)" }}
                />
                <span
                  className="text-[13px] font-heading"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
}

export default HomeWorkspace;
