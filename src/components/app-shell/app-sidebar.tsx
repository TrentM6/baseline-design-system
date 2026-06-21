import * as React from "react";
import {
  BookOpenText,
  Palette,
  Stack,
  PaintBrush,
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
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { value: "rules", label: "Design Rules", icon: BookOpenText },
  { value: "tokens", label: "Tokens", icon: Palette },
  { value: "components", label: "Components", icon: Stack },
  { value: "playground", label: "Playground", icon: PaintBrush },
] as const;

function BaselineLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
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
  ...props
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex items-center justify-center">
                <BaselineLogo className="size-9" style={{ color: "var(--bl-fg-secondary)" }} />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-heading font-semibold tracking-tight">Baseline</span>
                <span className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>Design System</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
        <div className="px-2 py-1">
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            v0.1.0
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
