import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const RulesWorkspace = lazy(() => import("@/workspaces/rules/rules-workspace"));
const TokensWorkspace = lazy(() => import("@/workspaces/tokens/tokens-workspace"));
const ComponentsWorkspace = lazy(() => import("@/workspaces/components/components-workspace"));
const PlaygroundWorkspace = lazy(() => import("@/workspaces/playground/playground-workspace"));

const VALID_TABS = ["rules", "tokens", "components", "playground"] as const;
type TabValue = (typeof VALID_TABS)[number];

const WORKSPACES: Record<TabValue, React.LazyExoticComponent<() => React.JSX.Element>> = {
  rules: RulesWorkspace,
  tokens: TokensWorkspace,
  components: ComponentsWorkspace,
  playground: PlaygroundWorkspace,
};

const LABELS: Record<TabValue, string> = {
  rules: "Design Rules",
  tokens: "Tokens",
  components: "Components",
  playground: "Playground",
};

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

function useTheme() {
  const [mode, setMode] = useState<"dark" | "light">(
    () => (document.documentElement.getAttribute("data-mode") as "dark" | "light") ?? "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);
  return [mode, setMode] as const;
}

function App() {
  const [tab, setTab] = useState<TabValue>(getHashTab);
  const [mode, setMode] = useTheme();

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

  const Workspace = WORKSPACES[tab];

  return (
    <SidebarProvider
      className="h-svh overflow-hidden"
      style={{ "--sidebar-width": "16rem", "--header-height": "3rem" } as React.CSSProperties}
    >
      <AppSidebar activeTab={tab} onTabChange={onTabChange} variant="inset" />
      <SidebarInset className="h-svh min-h-0 overflow-hidden">
        <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b px-4 lg:px-6 transition-[width,height] ease-linear">
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
