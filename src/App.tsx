import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DashboardSurface,
  SettingsSurface,
  AuthSurface,
  LandingSurface,
} from "@/components/surfaces";

const RulesWorkspace = lazy(() => import("@/workspaces/rules/rules-workspace"));
const TokensWorkspace = lazy(() => import("@/workspaces/tokens/tokens-workspace"));
const PrimitivesWorkspace = lazy(() => import("@/workspaces/primitives/primitives-workspace"));
const ComponentsWorkspace = lazy(() => import("@/workspaces/components/components-workspace"));
const SurfacesWorkspace = lazy(() => import("@/workspaces/surfaces/surfaces-workspace"));
const PlaygroundWorkspace = lazy(() => import("@/workspaces/playground/playground-workspace"));

const VALID_TABS = ["rules", "tokens", "primitives", "components", "surfaces", "playground"] as const;
type TabValue = (typeof VALID_TABS)[number];

const WORKSPACES: Record<TabValue, React.LazyExoticComponent<() => React.JSX.Element>> = {
  rules: RulesWorkspace,
  tokens: TokensWorkspace,
  primitives: PrimitivesWorkspace,
  components: ComponentsWorkspace,
  surfaces: SurfacesWorkspace,
  playground: PlaygroundWorkspace,
};

const LABELS: Record<TabValue, string> = {
  rules: "Design Rules",
  tokens: "Tokens",
  primitives: "Primitives",
  components: "Components",
  surfaces: "Surfaces",
  playground: "Playground",
};

/* ── Preview mode — a single surface rendered full-bleed for the
   Surfaces live-preview iframes (?preview=<id>&mode=<dark|light>). ── */
const PREVIEW_SURFACES: Record<string, () => React.JSX.Element> = {
  dashboard: DashboardSurface,
  settings: SettingsSurface,
  auth: AuthSurface,
  landing: LandingSurface,
};

function getPreview() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("preview");
  if (!id || !PREVIEW_SURFACES[id]) return null;
  const mode = params.get("mode") === "light" ? "light" : "dark";
  return { id, mode };
}

function PreviewHost({ id, mode }: { id: string; mode: "dark" | "light" }) {
  const [current, setCurrent] = useState<"dark" | "light">(mode);
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", current);
  }, [current]);
  // Parent syncs theme without reloading the iframe.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "bl-mode" && (e.data.mode === "dark" || e.data.mode === "light")) {
        setCurrent(e.data.mode);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  const Surface = PREVIEW_SURFACES[id];
  return <Surface />;
}

function getHashTab(): TabValue {
  const hash = window.location.hash.replace("#", "");
  return VALID_TABS.includes(hash as TabValue) ? (hash as TabValue) : "rules";
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

function App() {
  const preview = getPreview();
  const [tab, setTab] = useState<TabValue>(getHashTab);

  const onHashChange = useCallback(() => setTab(getHashTab()), []);

  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [onHashChange]);

  const onTabChange = (value: string) => {
    const next = value as TabValue;
    setTab(next);
    window.location.hash = next;
  };

  // Live-preview iframe: render only the surface, no app chrome.
  if (preview) {
    return <PreviewHost id={preview.id} mode={preview.mode as "dark" | "light"} />;
  }

  const Workspace = WORKSPACES[tab];

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar activeTab={tab} onTabChange={onTabChange} />
      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <header
          className="sticky top-0 z-20 flex h-10 shrink-0 items-center gap-2 border-b px-4"
          style={{
            borderColor: "var(--bl-border-divider)",
            backgroundColor: "var(--bl-bg-chrome)",
          }}
        >
          <SidebarTrigger className="-ml-1 h-7 w-7" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
          <span
            className="text-[13px] font-heading font-medium"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            {LABELS[tab]}
          </span>
        </header>
        <div
          key={tab}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ease-out"
        >
          <Suspense fallback={<Fallback />}>
            <Workspace />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
