import { DocSection, RuleCard } from "@/docs/doc-section";

export default function GestaltPrinciples() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Gestalt Principles
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The human visual system organizes elements into groups and patterns
        automatically. These principles describe how. Understanding them lets
        us design interfaces that feel intuitive without the user knowing why.
      </p>

      <DocSection heading="Proximity">
        <p>
          Elements placed close together are perceived as a group. This is the
          most powerful grouping principle — it overrides color, shape, and size.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Group related controls with tighter spacing"
            description="Form labels should be closer to their inputs than to the previous field. Use --sp-2 within a group, --sp-6 between groups."
          />
          <RuleCard
            type="dont"
            title="Use equal spacing everywhere"
            description="Uniform spacing makes every element equidistant — the eye can't distinguish groups, so the user has to read every label to find what they need."
          />
        </div>
      </DocSection>

      <DocSection heading="Similarity">
        <p>
          Elements that look alike are perceived as belonging together. Color,
          shape, size, and orientation all contribute. This is why consistent
          styling of interactive elements matters — users learn "orange pill
          shape = clickable action" and apply it everywhere.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Use consistent visual treatment for similar functions"
            description="All primary actions use the same button style. All status indicators use the same pill component. All links share the same color."
          />
          <RuleCard
            type="dont"
            title="Style similar elements differently"
            description="Using different button styles for the same type of action, or different card layouts for the same type of content, forces users to re-learn each instance."
          />
        </div>
      </DocSection>

      <DocSection heading="Continuity">
        <p>
          The eye follows smooth lines and curves. Elements arranged on a line
          or curve are perceived as related, even if separated by space. This
          is why alignment matters — breaking alignment breaks the perceived
          relationship.
        </p>
        <RuleCard
          type="rule"
          title="Align to the grid"
          description="Every element should sit on the spacing grid. Optical adjustments are fine, but arbitrary positioning breaks the continuity that helps users scan."
        />
      </DocSection>

      <DocSection heading="Closure">
        <p>
          The brain completes incomplete shapes. We see a circle even when part
          of it is missing. This lets us use minimal visual boundaries — a
          card doesn't need a heavy border on every side if the background
          difference and spacing already imply the container.
        </p>
        <RuleCard
          type="do"
          title="Use subtle boundaries"
          description="Background color differences and consistent spacing can define regions without visible borders. The lighter the touch, the more sophisticated the result."
        />
      </DocSection>

      <DocSection heading="Figure-ground">
        <p>
          We instinctively separate foreground from background. Elevated
          surfaces (modals, tooltips, dropdown menus) need visual separation —
          shadow, background contrast, or a scrim — so the user knows what's
          on top and what's behind.
        </p>
        <RuleCard
          type="rule"
          title="Elevated surfaces need shadow or contrast"
          description="Use --bl-shadow-md for cards, --bl-shadow-overlay for modals. The Baseline elevation system (body → surface → elevated) provides three distinct tiers."
        />
      </DocSection>

      <DocSection heading="Common region">
        <p>
          Elements inside a shared boundary are perceived as a group. Cards,
          panels, and bordered sections use this principle. But overusing
          containers creates visual noise — use the minimum enclosure needed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Use cards to group related content"
            description="A card with a subtle border creates a clear region without heavy visual weight."
          />
          <RuleCard
            type="dont"
            title="Nest containers more than two levels deep"
            description="Card inside card inside card creates visual nesting that's hard to parse. Flatten the hierarchy — use spacing and headings instead."
          />
        </div>
      </DocSection>
    </div>
  );
}
