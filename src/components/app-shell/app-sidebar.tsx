import { useState, useEffect } from "react";
import {
  BookOpenText,
  Palette,
  Cube,
  Stack,
  Layout,
  PaintBrush,
  Sun,
  Moon,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { value: "rules", label: "Design Rules", icon: BookOpenText },
  { value: "tokens", label: "Tokens", icon: Palette },
  { value: "primitives", label: "Primitives", icon: Cube },
  { value: "components", label: "Components", icon: Stack },
  { value: "surfaces", label: "Surfaces", icon: Layout },
  { value: "playground", label: "Playground", icon: PaintBrush },
] as const;

function BaselineLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M176 176H24V161.52H175.994V143.96H24V24H176V176Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AppSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    (document.documentElement.getAttribute("data-mode") as "dark" | "light") ??
    "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-1">
          <BaselineLogo className="h-7 w-7 text-[var(--bl-fill-primary)]" />
          <div className="flex flex-col">
            <span
              className="text-[13px] font-heading font-semibold tracking-tight leading-none"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              Baseline
            </span>
            <span
              className="text-[10px] font-medium leading-tight"
              style={{ color: "var(--bl-fg-muted)" }}
            >
              Design System
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.value;
              return (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => onTabChange(item.value)}
                    tooltip={item.label}
                  >
                    <Icon size={18} weight={isActive ? "fill" : "regular"} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2">
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            v0.1.0
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            {mode === "dark" ? (
              <Sun size={14} weight="bold" />
            ) : (
              <Moon size={14} weight="bold" />
            )}
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
