import {
  BookOpenText,
  Palette,
  Stack,
  PaintBrush,
  ArrowRight,
} from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const WORKSPACES = [
  {
    value: "rules",
    label: "Design Rules",
    detail: "30+ principles",
    icon: BookOpenText,
  },
  {
    value: "tokens",
    label: "Tokens",
    detail: "Colors, type, spacing, motion",
    icon: Palette,
  },
  {
    value: "components",
    label: "Components",
    detail: "55 charts, cards, tables, lists",
    icon: Stack,
  },
  {
    value: "playground",
    label: "Playground",
    detail: "Live canvas with code export",
    icon: PaintBrush,
  },
] as const;

function HomeWorkspace({
  onNavigate,
}: {
  onNavigate: (value: string) => void;
}) {
  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-10 sm:px-6 sm:py-16 lg:py-24 max-w-[640px] mx-auto">
        <header className="mb-12 sm:mb-16">
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Baseline
          </p>
          <h1
            className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight mb-4"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Design System
          </h1>
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed"
            style={{ color: "var(--bl-fg-secondary)" }}
          >
            A composable, rule-driven design system built on shared
            tokens.
          </p>
        </header>

        <nav>
          {WORKSPACES.map((ws, i) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.value}
                role="button"
                tabIndex={0}
                onClick={() => onNavigate(ws.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate(ws.value);
                  }
                }}
                className="group flex items-center gap-4 py-4 sm:py-5 cursor-pointer transition-colors duration-quick focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                style={{
                  borderTop: i === 0 ? "1px solid var(--bl-border-divider)" : undefined,
                  borderBottom: "1px solid var(--bl-border-divider)",
                }}
              >
                <Icon
                  size={20}
                  weight="regular"
                  className="shrink-0"
                  style={{ color: "var(--bl-fill-primary)" }}
                />
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[15px] font-heading font-medium"
                    style={{ color: "var(--bl-fg-primary)" }}
                  >
                    {ws.label}
                  </span>
                  <span
                    className="ml-3 text-[13px]"
                    style={{ color: "var(--bl-fg-muted)" }}
                  >
                    {ws.detail}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-quick group-hover:translate-x-0.5"
                  style={{ color: "var(--bl-fg-muted)" }}
                />
              </div>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}

export default HomeWorkspace;
