import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DotsThree } from "@phosphor-icons/react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items?: BreadcrumbNavItem[];
  maxVisible?: number;
  className?: string;
}

const DEFAULT_ITEMS: BreadcrumbNavItem[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Baseline Studio", href: "#" },
  { label: "Design System", href: "#" },
  { label: "Components", href: "#" },
  { label: "Breadcrumb Nav" },
];

export function BreadcrumbNav({
  items = DEFAULT_ITEMS,
  maxVisible = 4,
  className,
}: BreadcrumbNavProps) {
  const shouldCollapse = items.length > maxVisible;

  /* When collapsing: show first item, ellipsis dropdown for middle items, then last (maxVisible - 2) items */
  const firstItem = items[0];
  const lastItems = shouldCollapse ? items.slice(-(maxVisible - 2)) : items.slice(1);
  const hiddenItems = shouldCollapse ? items.slice(1, -(maxVisible - 2)) : [];

  return (
    <Card className={cn("w-fit", className)}>
      <CardContent className="px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {/* First item always visible */}
            <BreadcrumbItem>
              {firstItem.href && items.length > 1 ? (
                <BreadcrumbLink
                  href={firstItem.href}
                  className="text-[13px] transition-colors duration-instant"
                  style={{ color: "var(--bl-fg-muted)" }}
                >
                  {firstItem.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-[13px]" style={{ color: "var(--bl-fg-primary)" }}>
                  {firstItem.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {/* Ellipsis dropdown for collapsed middle items */}
            {shouldCollapse && hiddenItems.length > 0 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label="Show more breadcrumbs"
                    >
                      <DotsThree size={16} weight="bold" style={{ color: "var(--bl-fg-muted)" }} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {hiddenItems.map((item) => (
                        <DropdownMenuItem key={item.label} asChild>
                          <a
                            href={item.href || "#"}
                            className="text-[13px]"
                            style={{ color: "var(--bl-fg-secondary)" }}
                          >
                            {item.label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            )}

            {/* Visible tail items */}
            {lastItems.map((item, i) => {
              const isLast = i === lastItems.length - 1;
              return (
                <span key={item.label} className="contents">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className="text-[13px] font-medium"
                        style={{ color: "var(--bl-fg-primary)" }}
                      >
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.href || "#"}
                        className="text-[13px] transition-colors duration-instant"
                        style={{ color: "var(--bl-fg-muted)" }}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>
  );
}
