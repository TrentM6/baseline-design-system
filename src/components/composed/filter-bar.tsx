import * as React from "react";
import { MagnifyingGlass, Funnel, X } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef {
  label: string;
  key: string;
  options: FilterOption[];
}

export interface FilterBarProps {
  /** Callback fired when the search input changes. */
  onSearch?: (query: string) => void;
  /** Array of dropdown filter definitions. */
  filters?: FilterDef[];
  /** Callback fired when any filter value changes. Receives key-value map. */
  onFilterChange?: (filters: Record<string, string>) => void;
  className?: string;
}

const DEFAULT_FILTERS: FilterDef[] = [
  {
    label: "Status",
    key: "status",
    options: [
      { label: "All statuses", value: "all" },
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    label: "Category",
    key: "category",
    options: [
      { label: "All categories", value: "all" },
      { label: "Engineering", value: "engineering" },
      { label: "Design", value: "design" },
      { label: "Marketing", value: "marketing" },
    ],
  },
  {
    label: "Period",
    key: "period",
    options: [
      { label: "All time", value: "all" },
      { label: "Last 7 days", value: "7d" },
      { label: "Last 30 days", value: "30d" },
      { label: "Last 90 days", value: "90d" },
    ],
  },
];

/**
 * FilterBar - horizontal filter strip for dashboard views.
 * Composes: Input, Select, Button, Badge, Phosphor icons.
 * Tokens: --bl-fg-muted, --bl-fg-primary, --bl-bg-elevated.
 */
export function FilterBar({
  onSearch,
  filters = DEFAULT_FILTERS,
  onFilterChange,
  className,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({});

  const activeCount = Object.values(activeFilters).filter((v) => v && v !== "all").length;

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  }

  function handleFilterChange(key: string, value: string) {
    const next = { ...activeFilters, [key]: value };
    setActiveFilters(next);
    onFilterChange?.(next);
  }

  function clearAll() {
    setSearchQuery("");
    setActiveFilters({});
    onSearch?.("");
    onFilterChange?.({});
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Search */}
      <div className="relative max-w-xs flex-1 min-w-[180px]">
        <MagnifyingGlass
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--bl-fg-muted)" }}
        />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-8"
          aria-label="Search"
        />
      </div>

      {/* Dropdown filters */}
      {filters.map((filter) => (
        <Select
          key={filter.key}
          value={activeFilters[filter.key] ?? "all"}
          onValueChange={(v) => handleFilterChange(filter.key, v)}
        >
          <SelectTrigger className="h-9 w-[140px]">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {/* Active filter indicator */}
      {activeCount > 0 && (
        <Badge variant="secondary" className="gap-1 text-xs">
          <Funnel size={12} weight="bold" />
          {activeCount} active
        </Badge>
      )}

      {/* Clear all */}
      {(activeCount > 0 || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1 transition-colors duration-instant"
          onClick={clearAll}
          aria-label="Clear all filters"
        >
          <X size={14} weight="bold" />
          Clear all
        </Button>
      )}
    </div>
  );
}
