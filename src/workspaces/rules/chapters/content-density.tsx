import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ContentDensity() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Content Density
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Balancing information density with readability. When to use comfortable
        spacing versus compact layouts, and how to let users choose the density
        that matches their workflow.
      </p>

      <DocSection eyebrow="MODES" heading="Two density modes">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Baseline supports two density modes. <strong>Comfortable</strong> is
          the default - generous spacing, clear visual separation between
          elements, and optimized for scanning and comprehension. It prioritizes
          readability over quantity. <strong>Compact</strong> is opt-in - tighter
          spacing, more data visible per viewport, and optimized for power users
          who work with large tables, long lists, and data-heavy dashboards.
          Compact never sacrifices legibility; it reduces whitespace, not content.
        </p>
      </DocSection>

      <DocSection eyebrow="CONTEXT" heading="When to use which">
        <DocKeyValue
          rows={[
            {
              k: "Comfortable",
              v: "Forms, marketing pages, onboarding flows, settings screens, documentation, and any interface where the user is reading or making decisions. Default for all new views.",
            },
            {
              k: "Compact",
              v: "Data tables, dashboards, admin panels, list views with many items, log viewers, and any interface where the user needs to scan large volumes of structured data quickly.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="SPECS" heading="Comfortable mode spacing">
        <DocKeyValue
          rows={[
            {
              k: "Row height",
              v: "48–56px. Generous vertical space gives each row room to breathe and makes touch targets comfortably large.",
            },
            {
              k: "Cell padding",
              v: "12–16px. Enough internal padding to visually separate content from cell boundaries without squeezing.",
            },
            {
              k: "Line spacing",
              v: "1.5–1.75. Relaxed leading improves readability for body text and multi-line content within cells.",
            },
            {
              k: "Section gaps",
              v: "24–32px. Clear separation between logical groups of content. Sections should feel like distinct blocks.",
            },
            {
              k: "Card padding",
              v: "16–24px. Internal padding inside cards and panels that keeps content from pressing against edges.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="SPECS" heading="Compact mode spacing">
        <DocKeyValue
          rows={[
            {
              k: "Row height",
              v: "32–40px. Tighter rows that maximize visible data. Still meets minimum 32px touch target size.",
            },
            {
              k: "Cell padding",
              v: "8–12px. Reduced padding that keeps text legible while fitting more columns and rows into the viewport.",
            },
            {
              k: "Line spacing",
              v: "1.25–1.5. Tighter leading for data-heavy views where vertical space is at a premium.",
            },
            {
              k: "Section gaps",
              v: "16–24px. Narrower gaps that still maintain visual grouping but reduce total scroll distance.",
            },
            {
              k: "Card padding",
              v: "12–16px. Leaner internal padding that preserves structure without excess whitespace.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Default to comfortable spacing for general interfaces"
            description="Most users most of the time benefit from generous spacing. Comfortable mode should be the out-of-the-box experience for every view."
          />
          <RuleCard
            type="dont"
            title="Use compact density for first-time user experiences"
            description="New users need room to orient themselves. Compact density overwhelms users who haven't yet built a mental model of the interface."
          />
          <RuleCard
            type="do"
            title="Let users toggle density in data-heavy views"
            description="Power users working with tables and lists should be able to switch to compact mode. Offer a density toggle in the view controls - don't force one size on everyone."
          />
          <RuleCard
            type="dont"
            title="Mix comfortable and compact density on the same screen"
            description="Inconsistent density within a single view creates visual dissonance. Pick one mode per screen and apply it uniformly to all elements."
          />
        </div>
      </DocSection>
    </div>
  );
}
