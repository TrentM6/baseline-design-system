import { useState, useRef } from "react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  CopySimple,
  Trash,
  Code,
  Check,
  Sparkle,
  Broom,
  House,
  ChartLine,
  Gear,
  Monitor,
  DeviceMobile,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { type SlotSize, SLOT_SPAN, SLOT_SIZES, SLOT_LABEL } from "@/lib/slots";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type SurfaceNavItem } from "@/components/composed";
import {
  COMPONENTS,
  COMPONENT_MAP,
  CATEGORIES,
  exportComposition,
} from "./component-registry";

const SHELL_NAV: SurfaceNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "analytics", label: "Analytics", icon: ChartLine },
  { id: "settings", label: "Settings", icon: Gear },
];

interface Placed {
  id: number;
  key: string;
  size: SlotSize;
}

function PlaygroundWorkspace() {
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [device, setDevice] = useState<"web" | "mobile">("web");
  const [copied, setCopied] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const counter = useRef(0);

  const add = (key: string) => {
    const id = counter.current++;
    setPlaced((p) => [...p, { id, key, size: COMPONENT_MAP[key].size }]);
    setSelected(id);
  };
  const remove = (id: number) => {
    setPlaced((p) => p.filter((b) => b.id !== id));
    setSelected((s) => (s === id ? null : s));
  };
  const duplicate = (id: number) => {
    const idx = placed.findIndex((b) => b.id === id);
    if (idx < 0) return;
    const copy = { id: counter.current++, key: placed[idx].key, size: placed[idx].size };
    setPlaced((p) => [...p.slice(0, idx + 1), copy, ...p.slice(idx + 1)]);
    setSelected(copy.id);
  };
  const move = (id: number, dir: -1 | 1) => {
    setPlaced((p) => {
      const i = p.findIndex((b) => b.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.length) return p;
      const next = [...p];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const setSize = (id: number, size: SlotSize) =>
    setPlaced((p) => p.map((b) => (b.id === id ? { ...b, size } : b)));

  const code = exportComposition(
    placed.map(({ key, size }) => ({ key, size })),
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const isWeb = device === "web";

  return (
    <div className="flex h-full min-h-0">
      {/* ── App shell sidebar ── */}
      <div
        className={cn(
          "shrink-0 border-r flex flex-col transition-all duration-medium ease-out",
          isWeb ? "w-52" : "w-0 overflow-hidden border-r-0",
        )}
        style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-chrome)" }}
      >
        <div className="flex items-center gap-2.5 px-4 py-4">
          <BaselineMark className="h-5 w-5 text-[var(--bl-fill-primary)]" />
          <span
            className="text-[13px] font-heading font-semibold tracking-tight"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Baseline
          </span>
        </div>
        <nav className="px-2 mt-1 space-y-0.5">
          {SHELL_NAV.map((item, i) => {
            const Icon = item.icon;
            const active = i === 0;
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-instant cursor-default",
                  active && "bg-[var(--bl-bg-active)]",
                )}
                style={{ color: active ? "var(--bl-fg-primary)" : "var(--bl-fg-secondary)" }}
              >
                <Icon size={16} weight={active ? "fill" : "regular"} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header / toolbar */}
        <div
          className="h-12 shrink-0 flex items-center gap-3 border-b px-4"
          style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-chrome)" }}
        >
          <span
            className="text-sm font-heading font-medium"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Dashboard
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              className="h-7 gap-1.5 text-xs"
              onClick={() => setBrowsing(true)}
            >
              <Plus size={14} weight="bold" />
              Add
            </Button>

            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
              {placed.length} {placed.length === 1 ? "component" : "components"}
            </Badge>

            <Separator orientation="vertical" className="!h-4" />

            <ToggleGroup
              type="single"
              value={device}
              onValueChange={(v) => v && setDevice(v as "web" | "mobile")}
              size="sm"
            >
              <ToggleGroupItem value="web" aria-label="Desktop layout" className="h-7 w-8 p-0">
                <Monitor size={14} weight={isWeb ? "fill" : "regular"} />
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label="Mobile layout" className="h-7 w-8 p-0">
                <DeviceMobile size={14} weight={!isWeb ? "fill" : "regular"} />
              </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="!h-4" />

            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-xs"
              onClick={() => { setPlaced([]); setSelected(null); }}
              disabled={!placed.length}
            >
              <Broom size={14} />
              Clear
            </Button>

            {/* Export */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="h-7 gap-1.5 text-xs" disabled={!placed.length}>
                  <Code size={14} weight="bold" />
                  Export
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[min(560px,90vw)] sm:max-w-none flex flex-col">
                <SheetHeader>
                  <SheetTitle>Export composition</SheetTitle>
                  <SheetDescription>
                    A self-contained app layout wrapped in SurfaceShell. Drop it into any project.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-3 flex-1 min-h-0 overflow-auto rounded-lg border" style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-well)" }}>
                  <pre className="p-4 text-[12px] font-mono leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
                    {code}
                  </pre>
                </div>
                <Button onClick={copy} className="mt-3 gap-1.5">
                  {copied ? <Check size={15} weight="bold" /> : <CopySimple size={15} />}
                  {copied ? "Copied" : "Copy code"}
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ── Content area ── */}
        <div
          className="flex-1 min-h-0 overflow-y-auto"
          style={{ backgroundColor: "var(--bl-bg-body)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className={cn(
              "p-6 transition-all duration-medium ease-out",
              !isWeb && "mx-auto max-w-[420px]",
            )}
          >
            {placed.length === 0 ? (
              <EmptyState onAdd={() => setBrowsing(true)} />
            ) : (
              <div className={cn("grid gap-4", isWeb ? "grid-cols-12" : "grid-cols-1")}>
                {placed.map((b) => {
                  const def = COMPONENT_MAP[b.key];
                  if (!def) return null;
                  const isSel = selected === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={(e) => { e.stopPropagation(); setSelected(b.id); }}
                      className={cn(
                        "relative group rounded-lg transition-shadow duration-instant",
                        isWeb ? SLOT_SPAN[b.size] : "",
                        isSel && "ring-2 ring-offset-2 ring-[var(--bl-border-active)] ring-offset-[var(--bl-bg-body)]",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute -top-3 right-2 z-20 flex items-center gap-1 rounded-md border p-0.5 shadow-[var(--bl-shadow-md)] transition-opacity duration-instant",
                          isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        )}
                        style={{ backgroundColor: "var(--bl-bg-elevated)", borderColor: "var(--bl-border-divider)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center rounded bg-[var(--bl-bg-well)] p-0.5">
                          {SLOT_SIZES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-label={`Size ${SLOT_LABEL[s]}`}
                              onClick={() => setSize(b.id, s)}
                              className="rounded px-1.5 py-0.5 text-[10px] font-mono transition-colors duration-instant"
                              style={
                                b.size === s
                                  ? { backgroundColor: "var(--bl-bg-active)", color: "var(--bl-fg-primary)" }
                                  : { color: "var(--bl-fg-muted)" }
                              }
                            >
                              {SLOT_LABEL[s]}
                            </button>
                          ))}
                        </div>
                        <span className="mx-0.5 h-4 w-px" style={{ backgroundColor: "var(--bl-border-divider)" }} />
                        <CtrlBtn label="Move up" onClick={() => move(b.id, -1)}><ArrowUp size={13} /></CtrlBtn>
                        <CtrlBtn label="Move down" onClick={() => move(b.id, 1)}><ArrowDown size={13} /></CtrlBtn>
                        <CtrlBtn label="Duplicate" onClick={() => duplicate(b.id)}><CopySimple size={13} /></CtrlBtn>
                        <CtrlBtn label="Remove" onClick={() => remove(b.id)} danger><Trash size={13} /></CtrlBtn>
                      </div>
                      {def.node}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Browse dialog ── */}
      <Dialog open={browsing} onOpenChange={setBrowsing}>
        <DialogContent
          className="max-w-5xl flex flex-col gap-0 p-0 overflow-hidden"
          style={{ height: "min(80vh, 900px)" }}
        >
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle>Components</DialogTitle>
            <DialogDescription>
              Click any component to add it to the canvas.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 min-h-0">
            <div className="px-6 pb-6 space-y-8">
              {CATEGORIES.map((cat) => {
                const items = COMPONENTS.filter((c) => c.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <p
                      className="text-[10px] font-mono uppercase tracking-wider mb-3"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {cat}
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((c) => (
                        <div
                          key={c.key}
                          role="button"
                          tabIndex={0}
                          onClick={() => add(c.key)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); add(c.key); } }}
                          className="group text-left rounded-lg border overflow-hidden transition-all duration-instant ease-out cursor-pointer hover:border-[var(--bl-border-active)] hover:shadow-[var(--bl-shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bl-border-active)]"
                          style={{ borderColor: "var(--bl-border-card)", backgroundColor: "var(--bl-bg-surface)" }}
                        >
                          <div
                            className="h-40 overflow-hidden pointer-events-none"
                            style={{ backgroundColor: "var(--bl-bg-body)" }}
                          >
                            <div className="origin-top-left scale-[0.4]" style={{ width: "250%" }}>
                              {c.node}
                            </div>
                          </div>
                          <div
                            className="flex items-center justify-between px-3 py-2.5 border-t"
                            style={{ borderColor: "var(--bl-border-divider)" }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>
                                {c.label}
                              </span>
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 shrink-0">
                                {SLOT_LABEL[c.size]}
                              </Badge>
                            </div>
                            <Plus
                              size={14}
                              className="opacity-0 shrink-0 transition-opacity duration-instant group-hover:opacity-100"
                              style={{ color: "var(--bl-fill-primary)" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Helpers ── */

function BaselineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M176 176H24V161.52H175.994V143.96H24V24H176V176Z" fill="currentColor" />
    </svg>
  );
}

function CtrlBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bl-border-active)]"
      style={{ color: danger ? "var(--bl-fill-danger)" : "var(--bl-fg-secondary)" }}
    >
      {children}
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed py-24 text-center"
      style={{ borderColor: "var(--bl-border-divider)" }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-lg mb-3"
        style={{ backgroundColor: "var(--bl-accent-subtle)" }}
      >
        <Sparkle size={22} weight="fill" style={{ color: "var(--bl-fill-primary)" }} />
      </div>
      <p className="text-sm font-heading font-medium" style={{ color: "var(--bl-fg-primary)" }}>
        Build your app
      </p>
      <p className="text-[13px] mt-1 max-w-xs" style={{ color: "var(--bl-fg-muted)" }}>
        Add components to compose a real app layout. Resize, reorder, and export the code when you're done.
      </p>
      <Button
        size="sm"
        className="mt-4 gap-1.5 text-xs"
        onClick={onAdd}
      >
        <Plus size={14} weight="bold" />
        Add components
      </Button>
    </div>
  );
}

export default PlaygroundWorkspace;
