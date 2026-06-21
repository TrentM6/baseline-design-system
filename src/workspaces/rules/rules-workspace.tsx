import { useState, Suspense } from "react";
import { RulesNav } from "./rules-nav";
import { loadChapter, allChapters } from "./chapter-registry";

function RulesWorkspace() {
  const [activeId, setActiveId] = useState("design-philosophy");
  const chapters = allChapters();
  const active = chapters.find((c) => c.id === activeId);
  const Chapter = loadChapter(activeId);

  return (
    <div className="flex h-full">
      <RulesNav activeId={activeId} onSelect={setActiveId} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
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
