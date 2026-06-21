import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ResponsivePatterns() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Responsive Patterns
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Mobile-first design thinking, breakpoints, and fluid layouts that adapt
        gracefully across screen sizes. Start from the smallest viewport and
        layer complexity upward — constraints at the bottom produce clarity at
        the top.
      </p>

      <DocSection eyebrow="PHILOSOPHY" heading="Mobile-first principle">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Design for the smallest screen first, then enhance. This forces
          prioritization — if it doesn't fit on mobile, question whether it
          belongs at all. Mobile constraints produce better desktop designs
          because they demand hierarchy, focus, and ruthless editing. A layout
          that works beautifully on 375px will almost always scale up gracefully.
          A layout designed for 1440px almost never scales down without pain.
        </p>
      </DocSection>

      <DocSection eyebrow="TOKENS" heading="Breakpoints">
        <DocKeyValue
          rows={[
            {
              k: "sm — 640px",
              v: "Large phones in landscape orientation. Single-column layouts may begin to relax here, but most content stays stacked.",
            },
            {
              k: "md — 768px",
              v: "Tablets in portrait. Two-column layouts become viable. Side navigation can begin to appear alongside content.",
            },
            {
              k: "lg — 1024px",
              v: "Small laptops and tablets in landscape. Full multi-column layouts, persistent sidebars, and expanded toolbars.",
            },
            {
              k: "xl — 1280px",
              v: "Standard desktops. Maximum content density is comfortable here. Most dashboard layouts target this as their primary breakpoint.",
            },
            {
              k: "2xl — 1536px",
              v: "Large displays and ultrawide monitors. Content should max-width constrain to avoid excessively long line lengths.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="STRATEGIES" heading="Layout adaptation patterns">
        <DocKeyValue
          rows={[
            {
              k: "Stack to grid",
              v: "Single column on mobile, multi-column grid on desktop. The most common pattern — cards, features, and content blocks stack vertically then reflow into 2- or 3-column grids.",
            },
            {
              k: "Show / hide",
              v: "Secondary navigation hidden behind a hamburger menu on mobile, expanded into a persistent sidebar on desktop. Content that aids discovery but isn't essential collapses on small screens.",
            },
            {
              k: "Reflow",
              v: "Horizontal layouts become vertical. A row of stats becomes a stacked list. A horizontal tab bar becomes a dropdown selector. The information stays, the axis changes.",
            },
            {
              k: "Resize",
              v: "Fluid containers that scale with the viewport using percentage widths and max-width constraints. Elements breathe with the screen rather than snapping between fixed sizes.",
            },
            {
              k: "Relocate",
              v: "Actions move from inline positions to bottom sheets or floating action buttons on mobile. Primary CTAs that sit in a toolbar on desktop anchor to the bottom of the viewport on phones.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Design mobile layout first, add complexity for larger screens"
            description="Starting small forces you to identify the essential content and interactions. Enhancement is always easier than reduction."
          />
          <RuleCard
            type="dont"
            title="Design desktop first and try to shrink it down"
            description="Desktop-first designs accumulate features and density that become impossible to gracefully compress into a mobile viewport."
          />
          <RuleCard
            type="do"
            title="Use fluid containers with max-width constraints"
            description="Percentage-based widths with a max-width (e.g. max-w-7xl) let layouts breathe on large screens without stretching content beyond readable line lengths."
          />
          <RuleCard
            type="dont"
            title="Use fixed pixel widths that break at different viewport sizes"
            description="A 960px fixed-width container creates horizontal scroll on any device narrower than that. Fluid layouts eliminate this entire class of bugs."
          />
          <RuleCard
            type="do"
            title="Test at every breakpoint, not just phone and desktop"
            description="Tablet portrait, tablet landscape, and small laptop viewports are where most responsive bugs hide. Test the in-between sizes, not just the extremes."
          />
        </div>
      </DocSection>
    </div>
  );
}
