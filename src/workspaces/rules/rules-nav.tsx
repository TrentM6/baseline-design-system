import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { CHAPTER_GROUPS } from "./chapter-registry";

interface RulesNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

function NavContent({ activeId, onSelect }: RulesNavProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHAPTER_GROUPS.map((g) => [g.id, true]))
  );

  const toggle = (gid: string) =>
    setOpenGroups((prev) => ({ ...prev, [gid]: !prev[gid] }));

  return (
    <>
      <p
        className="px-2 mb-4 text-[11px] font-mono uppercase tracking-widest"
        style={{ color: "var(--bl-fg-muted)" }}
      >
        Design Rules
      </p>

      {CHAPTER_GROUPS.map((group) => (
        <div key={group.id} className="mb-1">
          <button
            onClick={() => toggle(group.id)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] font-medium uppercase tracking-wider rounded-md transition-colors duration-instant hover:bg-[var(--bl-bg-elevated)]"
            style={{ color: "var(--bl-fg-muted)" }}
          >
            <CaretRight
              size={12}
              weight="bold"
              className="transition-transform duration-instant"
              style={{
                transform: openGroups[group.id] ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
            {group.label}
          </button>

          {openGroups[group.id] && (
            <div className="ml-2 mt-0.5 space-y-0.5">
              {group.chapters.map((ch) => {
                const isActive = ch.id === activeId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onSelect(ch.id)}
                    className="w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-colors duration-instant"
                    style={{
                      color: isActive ? "var(--bl-fg-primary)" : "var(--bl-fg-secondary)",
                      backgroundColor: isActive ? "var(--bl-bg-elevated)" : undefined,
                    }}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export function RulesNav({ activeId, onSelect }: RulesNavProps) {
  return (
    <nav
      className="hidden lg:block w-[240px] shrink-0 border-r overflow-y-auto py-4 px-3"
      style={{
        borderColor: "var(--bl-border-divider)",
        backgroundColor: "var(--bl-bg-chrome)",
      }}
    >
      <NavContent activeId={activeId} onSelect={onSelect} />
    </nav>
  );
}

export function RulesNavMobile({ activeId, onSelect }: RulesNavProps) {
  return (
    <div className="h-full overflow-y-auto py-4 px-3">
      <NavContent activeId={activeId} onSelect={onSelect} />
    </div>
  );
}
