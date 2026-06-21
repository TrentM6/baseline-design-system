import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { COMPONENTS, CATEGORIES, type ComponentDef } from "@/workspaces/playground/component-registry";

function ComponentCard({
  label,
  category,
  node,
  onClick,
}: {
  label: string;
  category: string;
  node: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className="group rounded-md overflow-hidden text-left cursor-pointer transition-all duration-quick ease-out shadow-sm hover:shadow-card-hover hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        backgroundColor: "var(--bl-bg-surface)",
        border: "1px solid var(--bl-border-card)",
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden transition-[border-color] duration-quick group-hover:border-[var(--bl-border-muted)]"
        style={{ backgroundColor: "var(--bl-bg-body)" }}
      >
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center p-4">
          <div
            className="rounded-md shadow-md"
            style={{
              transform: "scale(0.30)",
              transformOrigin: "center center",
              width: 800,
              backgroundColor: "var(--bl-bg-surface)",
              padding: "4px",
            }}
          >
            {node}
          </div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, var(--bl-bg-body) 0%, transparent 15%, transparent 85%, var(--bl-bg-body) 100%),
              linear-gradient(to right, var(--bl-bg-body) 0%, transparent 10%, transparent 90%, var(--bl-bg-body) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-quick"
          style={{ backgroundColor: "oklch(1 0 0 / 3%)" }}
        />
      </div>
      <div
        className="px-3 py-2.5 flex items-center justify-between gap-2"
        style={{ borderTop: "1px solid var(--bl-border-card)" }}
      >
        <span
          className="text-[13px] font-heading font-medium truncate"
          style={{ color: "var(--bl-fg-primary)" }}
        >
          {label}
        </span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 shrink-0">
          {category}
        </Badge>
      </div>
    </div>
  );
}

function ComponentDetail({ comp }: { comp: ComponentDef }) {
  return (
    <DialogContent
      className="max-w-3xl p-0 overflow-hidden"
      style={{
        backgroundColor: "var(--bl-bg-surface)",
        border: "1px solid var(--bl-border-card)",
      }}
    >
      <DialogHeader className="px-6 pt-5 pb-0">
        <div className="flex items-center gap-3">
          <DialogTitle
            className="text-base font-heading font-medium"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {comp.label}
          </DialogTitle>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
            {comp.category}
          </Badge>
        </div>
        <DialogDescription className="sr-only">
          Interactive preview of the {comp.label} component
        </DialogDescription>
      </DialogHeader>
      <div
        className="px-6 pb-6 pt-4"
        style={{ backgroundColor: "var(--bl-bg-body)" }}
      >
        <div className="mx-auto max-w-2xl">{comp.node}</div>
      </div>
    </DialogContent>
  );
}

function ComponentsWorkspace() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ComponentDef | null>(null);

  const filtered = useMemo(() => {
    let items = COMPONENTS;
    if (filter !== "All") {
      items = items.filter((c) => c.category === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [filter, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: COMPONENTS.length };
    for (const cat of CATEGORIES) {
      counts[cat] = COMPONENTS.filter((c) => c.category === cat).length;
    }
    return counts;
  }, []);

  return (
    <>
      <ScrollArea className="h-full">
        <div className="px-4 py-4 sm:px-6 sm:py-6 max-w-[1400px] mx-auto">
          <header className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <p
                  className="text-[11px] font-mono uppercase tracking-widest mb-1"
                  style={{ color: "var(--bl-fill-primary)" }}
                >
                  Component Catalog
                </p>
                <h1
                  className="text-2xl font-heading font-medium"
                  style={{ color: "var(--bl-fg-primary)" }}
                >
                  {filtered.length} Components
                </h1>
              </div>
              <div className="relative w-full sm:w-64">
                <MagnifyingGlass
                  size={14}
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--bl-fg-muted)" }}
                />
                <Input
                  placeholder="Search components..."
                  className="pl-8 h-9 text-[13px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <ToggleGroup
              type="single"
              value={filter}
              onValueChange={(v) => v && setFilter(v)}
              className="flex flex-wrap gap-1 justify-start"
            >
              {["All", ...CATEGORIES].map((cat) => (
                <ToggleGroupItem
                  key={cat}
                  value={cat}
                  className="text-[12px] h-7 px-3 rounded-sm data-[state=on]:bg-[var(--bl-fill-primary)] data-[state=on]:text-white"
                >
                  <span className="font-heading">{cat}</span>
                  <span className="ml-1 opacity-60 font-mono">{categoryCounts[cat]}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((comp) => (
              <ComponentCard
                key={comp.key}
                label={comp.label}
                category={comp.category}
                node={comp.node}
                onClick={() => setSelected(comp)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[14px]" style={{ color: "var(--bl-fg-muted)" }}>
                No components match your search.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && <ComponentDetail comp={selected} />}
      </Dialog>
    </>
  );
}

export default ComponentsWorkspace;
