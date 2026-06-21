import { PAGE } from "@/lib/layout";

function TokensWorkspace() {
  return (
    <div className="overflow-y-auto">
      <div className={`${PAGE} space-y-12`}>
        <header>
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Token Reference
          </p>
          <h1
            className="text-3xl font-heading font-medium mb-2"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Design Tokens
          </h1>
          <p className="text-[14px]" style={{ color: "var(--bl-fg-secondary)" }}>
            The complete <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>--bl-*</code> token
            system. Every color, spacing step, radius, shadow, and motion
            value in the Baseline design system.
          </p>
        </header>

        {/* Color palette */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-1" style={{ color: "var(--bl-fg-primary)" }}>
            Brand Palette
          </h2>
          <p className="text-[13px] mb-4" style={{ color: "var(--bl-fg-muted)" }}>
            Base palette — authoring only. Components consume semantic tokens, not these directly.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-mono mb-2" style={{ color: "var(--bl-fg-muted)" }}>Orange ramp</p>
              <div className="flex rounded-lg overflow-hidden h-12">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
                  <div
                    key={step}
                    className="flex-1 flex items-end justify-center pb-1"
                    style={{ backgroundColor: `var(--bl-orange-${step})` }}
                  >
                    <span className="text-[9px] font-mono" style={{ color: step < 400 ? "var(--bl-stone-900)" : "var(--bl-stone-50)" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-mono mb-2" style={{ color: "var(--bl-fg-muted)" }}>Stone neutral ramp — warm espresso</p>
              <div className="flex rounded-lg overflow-hidden h-12">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
                  <div
                    key={step}
                    className="flex-1 flex items-end justify-center pb-1"
                    style={{ backgroundColor: `var(--bl-stone-${step})` }}
                  >
                    <span className="text-[9px] font-mono" style={{ color: step < 500 ? "var(--bl-stone-900)" : "var(--bl-stone-50)" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting hues — companions to the brand orange */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { name: "Gold", ramp: "gold", note: "analogous" },
                { name: "Clay", ramp: "clay", note: "terracotta bridge" },
                { name: "Teal", ramp: "teal", note: "cool counterpoint" },
              ].map((hue) => (
                <div key={hue.ramp}>
                  <p className="text-[12px] font-mono mb-2" style={{ color: "var(--bl-fg-muted)" }}>
                    {hue.name} <span className="opacity-60">· {hue.note}</span>
                  </p>
                  <div className="flex rounded-lg overflow-hidden h-12">
                    {[300, 400, 500, 600].map((step) => (
                      <div
                        key={step}
                        className="flex-1 flex items-end justify-center pb-1"
                        style={{ backgroundColor: `var(--bl-${hue.ramp}-${step})` }}
                      >
                        <span className="text-[9px] font-mono" style={{ color: step < 500 ? "var(--bl-stone-900)" : "var(--bl-stone-50)" }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart series — how the palette reads as a categorical set */}
            <div className="pt-2">
              <p className="text-[12px] font-mono mb-2" style={{ color: "var(--bl-fg-muted)" }}>
                Chart series — orange → gold → clay → teal → stone
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full h-10 rounded-lg"
                      style={{ backgroundColor: `var(--bl-chart-${n})` }}
                    />
                    <span className="text-[10px] font-mono" style={{ color: "var(--bl-fg-muted)" }}>
                      chart-{n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Semantic tokens */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Semantic Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { label: "bg-body", var: "--bl-bg-body" },
              { label: "bg-surface", var: "--bl-bg-surface" },
              { label: "bg-elevated", var: "--bl-bg-elevated" },
              { label: "bg-active", var: "--bl-bg-active" },
              { label: "bg-well", var: "--bl-bg-well" },
              { label: "bg-chrome", var: "--bl-bg-chrome" },
              { label: "fill-primary", var: "--bl-fill-primary" },
              { label: "fill-success", var: "--bl-fill-success" },
              { label: "fill-warning", var: "--bl-fill-warning" },
              { label: "fill-danger", var: "--bl-fill-danger" },
              { label: "fill-info", var: "--bl-fill-info" },
              { label: "border-divider", var: "--bl-border-divider" },
            ].map((t) => (
              <div key={t.var} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-lg border"
                  style={{ backgroundColor: `var(${t.var})`, borderColor: "var(--bl-border-divider)" }}
                />
                <span className="text-[11px] font-mono" style={{ color: "var(--bl-fg-muted)" }}>{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Text colors */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Text Colors
          </h2>
          <div
            className="rounded-xl border p-6 space-y-3"
            style={{ borderColor: "var(--bl-border-card)", backgroundColor: "var(--bl-bg-surface)" }}
          >
            <p className="text-lg font-medium" style={{ color: "var(--bl-fg-primary)" }}>
              fg-primary — Headlines and primary text
            </p>
            <p className="text-[15px]" style={{ color: "var(--bl-fg-secondary)" }}>
              fg-secondary — Body copy, descriptions, and supporting text
            </p>
            <p className="text-[14px]" style={{ color: "var(--bl-fg-muted)" }}>
              fg-muted — Labels, captions, and tertiary text
            </p>
            <p className="text-[14px]" style={{ color: "var(--bl-fg-link)" }}>
              fg-link — Hyperlinks and interactive text
            </p>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Type Scale
          </h2>
          <div
            className="rounded-xl border p-6 space-y-4"
            style={{ borderColor: "var(--bl-border-card)", backgroundColor: "var(--bl-bg-surface)" }}
          >
            <p className="text-hero font-heading font-medium leading-none">Hero 64</p>
            <p className="text-section font-heading font-medium">Section 44</p>
            <p className="text-h3 font-heading font-medium">Heading 3 — 24px</p>
            <p className="text-h4 font-heading font-medium">Heading 4 — 20px</p>
            <p className="text-body font-body">Body — 16px. The quick brown fox jumps over the lazy dog.</p>
            <p className="text-label font-body" style={{ color: "var(--bl-fg-muted)" }}>Label — 13px</p>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Spacing Scale
          </h2>
          <div className="space-y-2">
            {[
              { name: "sp-1", px: 4 },
              { name: "sp-2", px: 8 },
              { name: "sp-3", px: 12 },
              { name: "sp-4", px: 16 },
              { name: "sp-5", px: 20 },
              { name: "sp-6", px: 24 },
              { name: "sp-8", px: 32 },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="text-[11px] font-mono w-10" style={{ color: "var(--bl-fg-muted)" }}>{s.name}</span>
                <div
                  className="h-4 rounded-sm"
                  style={{ width: `${s.px}px`, backgroundColor: "var(--bl-fill-primary)" }}
                />
                <span className="text-[11px] font-mono" style={{ color: "var(--bl-fg-muted)" }}>{s.px}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* Radii */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Border Radii
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "sm", val: "var(--r-sm)" },
              { name: "md", val: "var(--r-md)" },
              { name: "lg", val: "var(--r-lg)" },
              { name: "xl", val: "var(--r-xl)" },
              { name: "pill", val: "var(--r-pill)" },
            ].map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 border-2"
                  style={{
                    borderRadius: r.val,
                    borderColor: "var(--bl-fill-primary)",
                    backgroundColor: "var(--bl-bg-surface)",
                  }}
                />
                <span className="text-[11px] font-mono" style={{ color: "var(--bl-fg-muted)" }}>{r.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Shadows
          </h2>
          <div className="flex flex-wrap gap-6">
            {["sm", "md", "lg", "tooltip", "overlay"].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="w-20 h-20 rounded-lg"
                  style={{
                    backgroundColor: "var(--bl-bg-surface)",
                    boxShadow: `var(--bl-shadow-${s})`,
                  }}
                />
                <span className="text-[11px] font-mono" style={{ color: "var(--bl-fg-muted)" }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Motion */}
        <section>
          <h2 className="text-xl font-heading font-medium mb-4" style={{ color: "var(--bl-fg-primary)" }}>
            Motion Tokens
          </h2>
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--bl-border-divider)" }}
          >
            {[
              { token: "--dur-instant", val: "100ms", use: "Hover, focus rings, color shifts" },
              { token: "--dur-quick", val: "200ms", use: "Press, toggles, tooltips, popover" },
              { token: "--dur-medium", val: "300ms", use: "Drawers, accordions, modals" },
              { token: "--dur-slow", val: "500ms", use: "Full-screen transitions" },
            ].map((m, i, arr) => (
              <div
                key={m.token}
                className="grid grid-cols-[140px_80px_1fr] gap-4 px-4 py-3 text-[13px]"
                style={{
                  borderBottom: i < arr.length - 1 ? "1px solid var(--bl-border-divider)" : undefined,
                }}
              >
                <span className="font-mono" style={{ color: "var(--bl-fg-primary)" }}>{m.token}</span>
                <span className="font-mono" style={{ color: "var(--bl-fill-primary)" }}>{m.val}</span>
                <span style={{ color: "var(--bl-fg-secondary)" }}>{m.use}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TokensWorkspace;
