import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function GridSpacing() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Grid & Spacing
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Baseline's 4px base grid, spacing tokens, and alignment conventions
        create consistent visual rhythm across every surface. Spacing is the
        invisible structure that makes a layout feel intentional rather than
        arbitrary.
      </p>

      <DocSection heading="The 4px base grid">
        <p>
          All spacing derives from multiples of 4px. This creates a consistent
          vertical and horizontal rhythm that the eye perceives as orderly even
          when it can't articulate why. The 4px unit is small enough to allow
          fine adjustments (4, 8, 12) while large enough to prevent the chaos
          of single-pixel differences.
        </p>
        <p className="mt-3">
          Every margin, padding, gap, and offset in the system should land on a
          4px increment. When a value doesn't divide evenly by 4, it's either a
          deliberate optical adjustment or a bug.
        </p>
      </DocSection>

      <DocSection heading="Spacing tokens">
        <DocKeyValue
          rows={[
            {
              k: "--bl-space-1 (4px)",
              v: "Tight internal padding. Use inside compact elements - the gap between an icon and its label, padding inside a badge or tag.",
            },
            {
              k: "--bl-space-2 (8px)",
              v: "Standard internal padding. The default for input padding, button padding, and gaps between closely related elements within a group.",
            },
            {
              k: "--bl-space-3 (12px)",
              v: "Related element gaps. The space between items in a list, between a label and its input, or between stacked form fields.",
            },
            {
              k: "--bl-space-4 (16px)",
              v: "Section gaps. The space between distinct groups within a card, between a heading and its content, or between sidebar sections.",
            },
            {
              k: "--bl-space-6 (24px)",
              v: "Major section separators. The space between cards in a layout, between major content regions, or as the minimum page-level padding.",
            },
            {
              k: "--bl-space-8 (32px)",
              v: "Page-level spacing. The space between top-level page sections, above and below hero areas, or between the page header and the content body.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Alignment rules">
        <p>
          Left-align text as the default. Centered headings are acceptable in
          hero contexts and empty states, but body copy, labels, and data should
          always left-align - the ragged left edge of centered text slows
          reading.
        </p>
        <p className="mt-3">
          Align form labels and inputs to the same vertical axis. Use consistent
          gutters in grid layouts - mixing 16px and 24px gutters in the same
          grid breaks the rhythm. Optical adjustments are acceptable when
          mathematical alignment looks wrong - a circle icon may need 1px of
          visual compensation to appear aligned with text.
        </p>
      </DocSection>

      <DocSection heading="Margin and padding conventions">
        <DocKeyValue
          rows={[
            {
              k: "Components own their internal padding",
              v: "A card defines its own padding. A button defines its own padding. The component is responsible for its internal spacing.",
            },
            {
              k: "Parent layouts own the gaps between children",
              v: "The grid, flex container, or page layout controls the space between components using gap. Children don't push each other apart.",
            },
            {
              k: "Never use margin on a reusable component",
              v: "Margin creates invisible spacing that changes meaning in different contexts. Use gap on the parent instead - it's explicit, predictable, and doesn't collapse.",
            },
            {
              k: "Page-level padding is --bl-space-6 minimum",
              v: "Content should never touch the edge of the viewport. A 24px minimum page padding ensures breathing room on all screen sizes.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use spacing tokens for all margin, padding, and gap values"
            description="Tokens ensure every spacing value is a multiple of 4px and stays consistent across the entire system. They also make global adjustments possible."
          />
          <RuleCard
            type="dont"
            title="Use arbitrary pixel values like 13px or 17px"
            description="Off-grid values break the rhythm. They look fine in isolation but create subtle misalignment when elements sit next to on-grid neighbors."
          />
          <RuleCard
            type="do"
            title="Let parent containers control spacing between children with gap"
            description="Gap is explicit, doesn't collapse, and keeps spacing logic in the layout where it belongs - not scattered across child components."
          />
          <RuleCard
            type="dont"
            title="Add margin-bottom to reusable components"
            description="A component with baked-in margin assumes its context. When reused in a tighter layout, the margin is wrong - and overriding it with a negative margin is a hack."
          />
        </div>
      </DocSection>
    </div>
  );
}
