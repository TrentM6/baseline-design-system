import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function VisualHierarchy() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Visual Hierarchy
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Use size, weight, color, and position to signal what matters most on a
        screen. Hierarchy is how users navigate an interface without reading
        every word - it tells the eye where to go first, second, and third.
      </p>

      <DocSection heading="The four tools of hierarchy">
        <DocKeyValue
          rows={[
            {
              k: "Size",
              v: "Larger elements draw attention first. A 24px heading dominates a 14px body paragraph. Use size differences to establish clear levels - if two elements are similar in size, they compete.",
            },
            {
              k: "Weight",
              v: "Bold text stands out from regular weight. Font weight creates emphasis within the same size level. Use medium (500) for headings, regular (400) for body, and avoid bold body text - it flattens the hierarchy.",
            },
            {
              k: "Color",
              v: "High-contrast and brand colors pull focus. --bl-fg-primary commands attention, --bl-fg-secondary recedes, --bl-fg-muted disappears into the background. Use the full range to create depth.",
            },
            {
              k: "Position",
              v: "Top-left in LTR layouts gets seen first. The eye follows an F-pattern on text-heavy pages and a Z-pattern on visual pages. Place the most important content where the eye lands naturally.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Establishing hierarchy">
        <p>
          Every screen should have exactly one primary focal point. If everything
          is bold, nothing is bold. If every element uses{" "}
          <span
            className="text-[12px] px-1 py-0.5 rounded"
            style={{ backgroundColor: "var(--bl-bg-elevated)" }}
          >
            --bl-fg-primary
          </span>
          , nothing stands out. The hierarchy should be readable in a 3-second
          glance: what is this page, what is the primary action, where do I
          start.
        </p>
        <p className="mt-3">
          Build hierarchy by contrasting levels. A page title at 24px medium
          weight with primary color, section headings at 18px medium with
          secondary color, and body at 14px regular with secondary color creates
          three distinct tiers. Each tier signals a different role without the
          user needing to think about it.
        </p>
      </DocSection>

      <DocSection heading="Typography hierarchy">
        <DocKeyValue
          rows={[
            {
              k: "Page title",
              v: "text-2xl, font-heading, font-medium. The largest, heaviest text on the screen. One per page. Uses --bl-fg-primary.",
            },
            {
              k: "Section heading",
              v: "text-lg, font-heading. Groups content into scannable sections. Uses --bl-fg-primary at slightly reduced visual weight through size alone.",
            },
            {
              k: "Body text",
              v: "text-[14px], --bl-fg-secondary. The default reading level. Most content lives here. Secondary color keeps it from competing with headings.",
            },
            {
              k: "Supporting text",
              v: "text-[13px], --bl-fg-muted. Timestamps, helper text, metadata. Present but not demanding attention. One step above invisible.",
            },
            {
              k: "Caption / label",
              v: "text-[11px], uppercase, tracking-widest. Eyebrow labels, category tags, overline text. The smallest tier - used sparingly for classification, not reading.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Design one clear focal point per screen"
            description="The user's eye should land on the most important element without searching. A single dominant heading, a hero action, or a key metric - one thing leads."
          />
          <RuleCard
            type="dont"
            title="Make multiple elements compete for primary attention"
            description="Two large bold headings, three equally-sized CTAs, or a page where everything is --bl-fg-primary creates visual noise. Demote supporting elements."
          />
          <RuleCard
            type="do"
            title="Use muted colors for supporting content"
            description="Timestamps, metadata, and helper text should use --bl-fg-muted. They're available when needed but don't compete with the content the user came for."
          />
          <RuleCard
            type="dont"
            title="Use --bl-fg-primary for everything - it flattens the hierarchy"
            description="When everything is high-contrast, nothing stands out. Reserve --bl-fg-primary for headings and key content; let secondary and muted colors do the rest."
          />
          <RuleCard
            type="do"
            title="Size primary actions larger than secondary ones"
            description="The main CTA should be visually dominant - larger padding, bolder color, more prominent position. Secondary actions use ghost or outline variants at the same or smaller size."
          />
          <RuleCard
            type="dont"
            title="Make destructive actions more prominent than the primary task action"
            description="A red 'Delete' button that's larger than the 'Save' button inverts the hierarchy. Destructive actions should be visually subordinate - smaller, ghost style, or tucked into a menu."
          />
        </div>
      </DocSection>
    </div>
  );
}
