import { useState, useEffect, useRef } from "react";
import { Monitor, DeviceMobile } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { PAGE } from "@/lib/layout";

/** Mirror the app's theme into the preview iframes (without reloading them). */
function useThemeMode() {
  const [mode, setMode] = useState<"dark" | "light">(
    () => (document.documentElement.getAttribute("data-mode") as "dark" | "light") ?? "dark"
  );
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setMode((el.getAttribute("data-mode") as "dark" | "light") ?? "dark")
    );
    obs.observe(el, { attributes: true, attributeFilter: ["data-mode"] });
    return () => obs.disconnect();
  }, []);
  return mode;
}

interface SurfaceDef {
  id: string;
  label: string;
  description: string;
  composes: string[];
}

const SURFACES: SurfaceDef[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description:
      "Toggle web/mobile — the chrome reflows (sidebar → offcanvas) instantly. Switch sections, change the chart range, hover charts, search and sort the table.",
    composes: ["SurfaceShell", "PriceChartCard", "BalanceCard", "MarketsTable", "ProfitRings", "TransactionList", "RewardsCard"],
  },
  {
    id: "settings",
    label: "Settings",
    description: "Navigate sections; the Notifications panel has live toggles; saving the form confirms inline.",
    composes: ["SurfaceShell", "SettingsPanel", "Input", "Select", "Button"],
  },
  {
    id: "auth",
    label: "Authentication",
    description: "Real form: email validation, password visibility toggle, and a signed-in confirmation state.",
    composes: ["LoginForm", "Card", "Input", "Button", "Checkbox"],
  },
  {
    id: "landing",
    label: "Landing Page",
    description: "Marketing layout with hover-reactive feature cards, a featured pricing tier, and a keyboard-accessible FAQ.",
    composes: ["FeatureGrid", "PricingTable", "FaqAccordion", "Badge", "Button"],
  },
];

function LivePreview({ surface }: { surface: SurfaceDef }) {
  const [device, setDevice] = useState<"web" | "mobile">("web");
  const mode = useThemeMode();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // src is computed once (stable) so the iframe never reloads on theme/device change.
  const initialMode = useRef(mode).current;
  const src = `${window.location.pathname}?preview=${surface.id}&mode=${initialMode}`;

  // Theme changes are pushed to the live iframe via postMessage — no reload.
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "bl-mode", mode }, "*");
  }, [mode]);

  const isWeb = device === "web";

  return (
    <section>
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-lg font-heading font-medium" style={{ color: "var(--bl-fg-primary)" }}>
          {surface.label}
        </h2>
        <Badge className="text-[9px] px-2 py-0 h-5">Live preview</Badge>
        <div className="ml-auto">
          <ToggleGroup
            type="single"
            value={device}
            onValueChange={(v) => v && setDevice(v as "web" | "mobile")}
            size="sm"
          >
            <ToggleGroupItem value="web" aria-label="Web preview" className="h-7 px-2.5 gap-1.5 text-[11px]">
              <Monitor size={14} weight={isWeb ? "fill" : "regular"} />
              Web
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Mobile preview" className="h-7 px-2.5 gap-1.5 text-[11px]">
              <DeviceMobile size={14} weight={!isWeb ? "fill" : "regular"} />
              Mobile
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <p className="text-[13px] mb-2" style={{ color: "var(--bl-fg-secondary)" }}>
        {surface.description}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap mb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--bl-fg-muted)" }}>
          Composes
        </span>
        {surface.composes.map((c) => (
          <Badge key={c} variant="outline" className="text-[10px] px-1.5 py-0 h-5">
            {c}
          </Badge>
        ))}
      </div>

      <div className="flex justify-center">
        <div
          className={cn(
            "overflow-hidden border transition-all duration-medium ease-out",
            isWeb ? "w-full rounded-xl shadow-[var(--bl-shadow-lg)]" : "rounded-[2.25rem] border-[6px] shadow-[var(--bl-shadow-overlay)]"
          )}
          style={
            isWeb
              ? { borderColor: "var(--bl-border-card)" }
              : { width: 402, borderColor: "var(--bl-stone-700)", backgroundColor: "var(--bl-stone-950)" }
          }
        >
          {/* chrome — restyled per device, but kept at a stable position so the iframe never remounts */}
          <div
            className="flex items-center gap-1.5 px-3 shrink-0"
            style={{
              height: isWeb ? 34 : 26,
              borderBottom: isWeb ? "1px solid var(--bl-border-divider)" : "none",
              backgroundColor: isWeb ? "var(--bl-bg-elevated)" : "var(--bl-stone-950)",
              justifyContent: isWeb ? "flex-start" : "center",
            }}
          >
            {isWeb ? (
              <>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--bl-fill-danger)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--bl-fill-warning)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--bl-fill-success)" }} />
                <div
                  className="ml-3 flex h-5 max-w-md flex-1 items-center rounded-md px-2.5 text-[10px] font-mono"
                  style={{ backgroundColor: "var(--bl-bg-body)", color: "var(--bl-fg-muted)" }}
                >
                  baseline.app/{surface.id}
                </div>
              </>
            ) : (
              <span className="h-1.5 w-16 rounded-full" style={{ backgroundColor: "var(--bl-stone-700)" }} />
            )}
          </div>
          <iframe
            ref={iframeRef}
            title={surface.label}
            src={src}
            onLoad={() =>
              iframeRef.current?.contentWindow?.postMessage({ type: "bl-mode", mode }, "*")
            }
            className="block w-full transition-[height] duration-medium ease-out"
            style={{ height: isWeb ? 880 : 780, border: 0, backgroundColor: "var(--bl-bg-body)" }}
          />
        </div>
      </div>
    </section>
  );
}

function SurfacesWorkspace() {
  return (
    <div className="overflow-y-auto">
      <div className={PAGE}>
        <header className="mb-8">
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Surfaces
          </p>
          <h1 className="text-3xl font-heading font-medium mb-2" style={{ color: "var(--bl-fg-primary)" }}>
            Page Compositions
          </h1>
          <p className="text-[14px] max-w-3xl" style={{ color: "var(--bl-fg-secondary)" }}>
            Each surface is a real, running screen — rendered in its own viewport
            so it behaves exactly as it would shipped. Switch <strong>Web</strong> /{" "}
            <strong>Mobile</strong> for an instant chrome + layout reflow, and
            scroll inside the frame for more content.
          </p>
        </header>

        <div className="space-y-14">
          {SURFACES.map((s) => (
            <LivePreview key={s.id} surface={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurfacesWorkspace;
