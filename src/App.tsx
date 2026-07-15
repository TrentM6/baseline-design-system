import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const HomeWorkspace = lazy(() => import("@/workspaces/home/home-workspace"));
const CurrentDraft = lazy(() => import("@/drafts/current"));
const RulesWorkspace = lazy(() => import("@/workspaces/rules/rules-workspace"));
const TokensWorkspace = lazy(() => import("@/workspaces/tokens/tokens-workspace"));
const ComponentsWorkspace = lazy(() => import("@/workspaces/components/components-workspace"));
const PlaygroundWorkspace = lazy(() => import("@/workspaces/playground/playground-workspace"));

const VALID_TABS = ["home", "rules", "tokens", "components", "playground"] as const;
type TabValue = (typeof VALID_TABS)[number];

/** Embedded mode (?embed=1): the design system is hosted inside another shell
 * (Baseline HQ). The host provides navigation and theme, so we drop our own
 * sidebar + header and follow postMessage: {type:"hq-tab",tab} / {type:"hq-mode",mode}. */
const EMBED = new URLSearchParams(window.location.search).has("embed");

const LABELS: Record<TabValue, string> = {
  home: "Home",
  rules: "Design Rules",
  tokens: "Tokens",
  components: "Components",
  playground: "Playground",
};

function getHashTab(): TabValue {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return "home";
  return VALID_TABS.includes(hash as TabValue) ? (hash as TabValue) : "home";
}

/** #draft renders the live drafting canvas (src/drafts/current.tsx) full-bleed —
 * the surface Baseline HQ's /design/canvas previews. #draft/<slug> renders an
 * approved snapshot from src/drafts/approved/ (HQ uses these as live thumbnails). */
const APPROVED_MODULES = import.meta.glob("./drafts/approved/*.tsx") as Record<
  string,
  () => Promise<{ default: React.ComponentType }>
>;

function draftHash(): { draft: boolean; slug: string | null } {
  const h = window.location.hash.replace("#", "");
  if (h === "draft") return { draft: true, slug: null };
  const m = h.match(/^draft\/([a-z0-9-]+)$/);
  return m ? { draft: true, slug: m[1] } : { draft: false, slug: null };
}

function Fallback() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div
        className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: "var(--bl-border-divider)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

function useTheme() {
  const [mode, setMode] = useState<"dark" | "light">(() => {
    const param = new URLSearchParams(window.location.search).get("mode");
    if (param === "light" || param === "dark") return param;
    return (document.documentElement.getAttribute("data-mode") as "dark" | "light") ?? "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);
  return [mode, setMode] as const;
}

function App() {
  const [tab, setTab] = useState<TabValue>(getHashTab);
  const [draft, setDraft] = useState<{ draft: boolean; slug: string | null }>(draftHash);
  const [mode, setMode] = useTheme();

  const onHashChange = useCallback(() => {
    setDraft(draftHash());
    setTab(getHashTab());
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [onHashChange]);

  // embedded: the host shell drives tab + theme without reloading the iframe
  useEffect(() => {
    if (!EMBED) return;
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "hq-tab" && VALID_TABS.includes(d.tab)) {
        setTab(d.tab as TabValue);
        window.location.hash = d.tab;
      }
      if (d.type === "hq-mode" && (d.mode === "dark" || d.mode === "light")) {
        setMode(d.mode);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [setMode]);

  const onTabChange = (value: string) => {
    if (value === "canvas") {
      // hosted: ask Baseline HQ to open its canvas; standalone: show the draft
      if (EMBED) window.parent.postMessage({ type: "hq-open-canvas" }, "*");
      else window.location.hash = "draft";
      return;
    }
    const next = value as TabValue;
    setTab(next);
    window.location.hash = next;
  };

  const isHome = tab === "home";

  const WORKSPACES: Record<Exclude<TabValue, "home">, React.LazyExoticComponent<() => React.JSX.Element>> = {
    rules: RulesWorkspace,
    tokens: TokensWorkspace,
    components: ComponentsWorkspace,
    playground: PlaygroundWorkspace,
  };

  const workspace = (
    <div
      key={tab}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ease-out"
    >
      <Suspense fallback={<Fallback />}>
        {isHome ? (
          <HomeWorkspace onNavigate={onTabChange} />
        ) : (
          (() => { const W = WORKSPACES[tab as Exclude<TabValue, "home">]; return <W />; })()
        )}
      </Suspense>
    </div>
  );

  // the drafting canvas: current draft (or an approved snapshot), full-bleed
  if (draft.draft) {
    const loader = draft.slug ? APPROVED_MODULES[`./drafts/approved/${draft.slug}.tsx`] : null;
    const Snapshot = loader ? lazy(loader) : null;
    return (
      <div className="h-svh overflow-y-auto" style={{ background: "var(--bl-bg-body)" }}>
        <Suspense fallback={<Fallback />}>
          {draft.slug ? (
            Snapshot ? (
              <Snapshot />
            ) : (
              <div className="flex h-svh items-center justify-center text-sm" style={{ color: "var(--bl-fg-muted)" }}>
                No approved design named “{draft.slug}”.
              </div>
            )
          ) : (
            <CurrentDraft />
          )}
        </Suspense>
      </div>
    );
  }

  // embedded: no sidebar, no header — the host shell provides both
  if (EMBED) {
    return <div className="flex h-svh min-h-0 flex-col overflow-hidden">{workspace}</div>;
  }

  return (
    <SidebarProvider
      className="h-svh overflow-hidden"
      style={{ "--sidebar-width": "16rem", "--header-height": "3rem" } as React.CSSProperties}
    >
      <AppSidebar activeTab={tab} onTabChange={onTabChange} variant="inset" />
      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b px-4 lg:px-6 transition-[width,height] ease-linear backdrop-blur-md bg-[var(--bl-bg-surface)]/80 shadow-sm z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-1 !h-4" />
          <h1
            className="text-sm font-heading font-medium"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {LABELS[tab]}
          </h1>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            >
              {mode === "dark" ? (
                <Sun size={14} weight="bold" />
              ) : (
                <Moon size={14} weight="bold" />
              )}
            </Button>
          </div>
        </header>
        {workspace}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
