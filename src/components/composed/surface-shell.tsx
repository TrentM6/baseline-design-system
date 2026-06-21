import * as React from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export interface SurfaceNavItem {
  id: string;
  label: string;
  icon: Icon;
}

function BaselineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M176 176H24V161.52H175.994V143.96H24V24H176V176Z" fill="currentColor" />
    </svg>
  );
}

/**
 * SurfaceShell — the canonical app chrome for product surfaces.
 *
 * Composes the SAME shadcn Sidebar primitive the design system's own app shell
 * is built on, in full app mode: a fixed sidebar on desktop, an offcanvas Sheet
 * on mobile (opened by the trigger), and a sticky chrome header. Rendered inside
 * a live-preview iframe, the breakpoint follows the iframe's own width — so the
 * web/mobile toggle produces real responsive behavior, not a fake resize.
 */
export function SurfaceShell({
  items,
  activeId,
  onSelect,
  brand = "Baseline",
  title,
  headerRight,
  footerItem,
  children,
}: {
  items: SurfaceNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  brand?: string;
  title?: string;
  headerRight?: React.ReactNode;
  footerItem?: SurfaceNavItem;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <BaselineMark className="h-5 w-5 text-[var(--bl-fill-primary)]" />
            <span className="text-sm font-heading font-semibold">{brand}</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => {
                const active = item.id === activeId;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => onSelect(item.id)}
                    >
                      <item.icon size={16} weight={active ? "fill" : "regular"} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {footerItem && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onSelect(footerItem.id)}>
                  <footerItem.icon size={16} />
                  <span>{footerItem.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header
          className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b px-4"
          style={{
            borderColor: "var(--bl-border-divider)",
            backgroundColor: "var(--bl-bg-chrome)",
          }}
        >
          <SidebarTrigger className="-ml-1 h-7 w-7" />
          <Separator orientation="vertical" className="mr-1 !h-4" />
          <span
            className="text-sm font-heading font-medium"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {title ?? brand}
          </span>
          {headerRight && <div className="ml-auto flex items-center gap-2">{headerRight}</div>}
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
