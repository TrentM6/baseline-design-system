import type { ReactNode } from "react";

interface DocSectionProps {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
}

export function DocSection({ eyebrow, heading, children }: DocSectionProps) {
  return (
    <section className="mt-8 first:mt-0">
      {eyebrow && (
        <p
          className="mb-1 text-[11px] font-mono uppercase tracking-widest"
          style={{ color: "var(--bl-fill-primary)" }}
        >
          {eyebrow}
        </p>
      )}
      <h3
        className="text-lg font-heading font-medium mb-3"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        {heading}
      </h3>
      <div
        className="space-y-3 text-[14px] leading-relaxed"
        style={{ color: "var(--bl-fg-secondary)" }}
      >
        {children}
      </div>
    </section>
  );
}

interface DocKeyValueProps {
  rows: { k: string; v: string }[];
}

export function DocKeyValue({ rows }: DocKeyValueProps) {
  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: "var(--bl-border-divider)" }}
    >
      {rows.map((row, i) => (
        <div
          key={row.k}
          className="grid grid-cols-[160px_1fr] gap-4 px-4 py-3 text-[13px]"
          style={{
            borderBottom: i < rows.length - 1 ? "1px solid var(--bl-border-divider)" : undefined,
          }}
        >
          <span className="font-medium" style={{ color: "var(--bl-fg-primary)" }}>
            {row.k}
          </span>
          <span style={{ color: "var(--bl-fg-secondary)" }}>{row.v}</span>
        </div>
      ))}
    </div>
  );
}

interface RuleCardProps {
  title: string;
  description: string;
  type?: "do" | "dont" | "rule";
}

export function RuleCard({ title, description, type = "rule" }: RuleCardProps) {
  const label =
    type === "do" ? "Do" : type === "dont" ? "Don't" : "Rule";
  const labelColor =
    type === "do"
      ? "var(--bl-fill-success)"
      : type === "dont"
        ? "var(--bl-fill-danger)"
        : "var(--bl-fill-primary)";

  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: "var(--bl-border-divider)",
        backgroundColor: "var(--bl-bg-surface)",
      }}
    >
      <span
        className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mb-2"
        style={{ color: labelColor, backgroundColor: "var(--bl-bg-elevated)" }}
      >
        {label}
      </span>
      <p className="text-[13px] font-medium mb-1" style={{ color: "var(--bl-fg-primary)" }}>
        {title}
      </p>
      <p className="text-[13px]" style={{ color: "var(--bl-fg-secondary)" }}>
        {description}
      </p>
    </div>
  );
}
