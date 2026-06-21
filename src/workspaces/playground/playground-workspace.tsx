import { useState, useRef } from "react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  CopySimple,
  Trash,
  Code,
  Check,
  Monitor,
  DeviceMobile,
  Sparkle,
  Broom,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { type SlotSize, SLOT_SPAN, SLOT_SIZES, SLOT_LABEL } from "@/lib/slots";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  COMPONENTS,
  COMPONENT_MAP,
  CATEGORIES,
  exportComposition,
} from "./component-registry";

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

  const code = exportComposition(placed.map(({ key, size }) => ({ key, size })));
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
      {/* Palette */}
      <aside
        className="w-60 shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-chrome)" }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--bl-border-divider)" }}>
          <p className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "var(--bl-fill-primary)" }}>
            Playground
          </p>
          <p className="text-[13px] font-heading font-medium" style={{ color: "var(--bl-fg-primary)" }}>
            Components
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <p className="px-1 mb-1.5 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--bl-fg-muted)" }}>
                  {cat}
                </p>
                <div className="space-y-1">
                  {COMPONENTS.filter((c) => c.category === cat).map((c) => (
                    <button
                      key={c.key}
                      onClick={() => add(c.key)}
                      className="group flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[13px] text-left transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bl-border-active)]"
                      style={{ color: "var(--bl-fg-secondary)" }}
                    >
                      <span className="truncate">{c.label}</span>
                      <Plus
                        size={14}
                        className="opacity-0 shrink-0 transition-opacity duration-instant group-hover:opacity-100"
                        style={{ color: "var(--bl-fill-primary)" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Canvas */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex h-12 shrink-0 items-center gap-3 border-b px-4"
          style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-chrome)" }}
        >
          <span className="text-[13px] font-heading font-medium" style={{ color: "var(--bl-fg-primary)" }}>
            Canvas
          </span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
            {placed.length} {placed.length === 1 ? "component" : "components"}
          </Badge>

          <div className="ml-auto flex items-center gap-2">
            <ToggleGroup type="single" value={device} onValueChange={(v) => v && setDevice(v as "web" | "mobile")} size="sm">
              <ToggleGroupItem value="web" aria-label="Web canvas" className="h-7 w-8 p-0">
                <Monitor size={14} weight={isWeb ? "fill" : "regular"} />
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label="Mobile canvas" className="h-7 w-8 p-0">
                <DeviceMobile size={14} weight={!isWeb ? "fill" : "regular"} />
              </ToggleGroupItem>
            </ToggleGroup>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-xs"
              onClick={() => {
                setPlaced([]);
                setSelected(null);
              }}
              disabled={!placed.length}
            >
              <Broom size={14} />
              Clear
            </Button>

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
                    A self-contained component laid out on the 12-column slot grid.
                    Drop it into an external project, or save it under{" "}
                    <code className="text-[11px]">src/components/surfaces/</code> to add it back as a Surface.
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

        {/* Canvas scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto" style={{ backgroundColor: "var(--bl-bg-body)" }} onClick={() => setSelected(null)}>
          <div className="py-8 px-4 flex justify-center">
            <div className={cn("transition-all duration-medium ease-out", isWeb ? "w-full max-w-[1100px]" : "w-[402px]")}>
              {placed.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-12 gap-4">
                  {placed.map((b) => {
                    const def = COMPONENT_MAP[b.key];
                    if (!def) return null;
                    const isSel = selected === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(b.id);
                        }}
                        className={cn(
                          "relative group rounded-xl transition-shadow duration-instant",
                          isWeb ? SLOT_SPAN[b.size] : "col-span-12",
                          isSel && "ring-2 ring-offset-2 ring-[var(--bl-border-active)] ring-offset-[var(--bl-bg-body)]"
                        )}
                      >
                        {/* controls */}
                        <div
                          className={cn(
                            "absolute -top-3 right-2 z-20 flex items-center gap-1 rounded-md border p-0.5 shadow-[var(--bl-shadow-md)] transition-opacity duration-instant",
                            isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                          style={{ backgroundColor: "var(--bl-bg-elevated)", borderColor: "var(--bl-border-divider)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* size / slot picker */}
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
      </div>
    </div>
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

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center"
      style={{ borderColor: "var(--bl-border-divider)" }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full mb-3"
        style={{ backgroundColor: "var(--bl-accent-subtle)" }}
      >
        <Sparkle size={22} weight="fill" style={{ color: "var(--bl-fill-primary)" }} />
      </div>
      <p className="text-sm font-heading font-medium" style={{ color: "var(--bl-fg-primary)" }}>
        Design anything
      </p>
      <p className="text-[13px] mt-1 max-w-xs" style={{ color: "var(--bl-fg-muted)" }}>
        Add components from the left, then size each into a slot (1/3 · 1/2 · 2/3 ·
        Full). Reorder, duplicate, then export the code or save it as a Surface.
      </p>
    </div>
  );
}

export default PlaygroundWorkspace;
