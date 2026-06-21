import { useState, Suspense } from "react";
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { RulesNav, RulesNavMobile } from "./rules-nav";
import { loadChapter, allChapters } from "./chapter-registry";

function RulesWorkspace() {
  const [activeId, setActiveId] = useState("design-philosophy");
  const [mobileNav, setMobileNav] = useState(false);
  const chapters = allChapters();
  const active = chapters.find((c) => c.id === activeId);
  const Chapter = loadChapter(activeId);

  const selectAndClose = (id: string) => {
    setActiveId(id);
    setMobileNav(false);
  };

  return (
    <div className="flex h-full">
      <RulesNav activeId={activeId} onSelect={setActiveId} />

      {/* Mobile nav sheet */}
      <Sheet open={mobileNav} onOpenChange={setMobileNav}>
        <SheetContent side="left" className="w-[280px] p-0 lg:hidden" style={{ backgroundColor: "var(--bl-bg-chrome)" }}>
          <SheetTitle className="sr-only">Design Rules Navigation</SheetTitle>
          <RulesNavMobile activeId={activeId} onSelect={selectAndClose} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-8 sm:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 lg:hidden shrink-0 -ml-1 mr-1"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <List size={16} weight="bold" />
            </Button>
            <span
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: "var(--bl-fg-muted)" }}
            >
              {active?.group}
            </span>
            <span style={{ color: "var(--bl-fg-muted)" }}>/</span>
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--bl-fg-primary)" }}
            >
              {active?.label}
            </span>
          </div>

          <Suspense
            fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-8 w-64 rounded-md" style={{ backgroundColor: "var(--bl-bg-elevated)" }} />
                <div className="h-4 w-full rounded-md" style={{ backgroundColor: "var(--bl-bg-elevated)" }} />
                <div className="h-4 w-3/4 rounded-md" style={{ backgroundColor: "var(--bl-bg-elevated)" }} />
              </div>
            }
          >
            <Chapter />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default RulesWorkspace;
