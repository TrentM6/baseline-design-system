/**
 * The empty-canvas placeholder. "New design" on the HQ canvas copies this
 * over current.tsx. Keep it minimal — it's the blank page, not a demo.
 */

export default function EmptyCanvas() {
  return (
    <div className="flex h-full min-h-svh items-center justify-center">
      <div className="max-w-sm text-center">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: "var(--bl-accent-strong)" }}
        >
          Canvas
        </p>
        <p
          className="mt-3 font-heading text-xl font-semibold"
          style={{ color: "var(--bl-fg-primary)" }}
        >
          Nothing here yet
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--bl-fg-muted)" }}>
          Describe the design you want in the chat — a dashboard, a landing
          section, a settings screen — and it will take shape here, built from
          the design system.
        </p>
      </div>
    </div>
  );
}
