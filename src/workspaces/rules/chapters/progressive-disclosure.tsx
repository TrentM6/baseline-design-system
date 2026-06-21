import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ProgressiveDisclosure() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Progressive Disclosure
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Show only what's needed at each step, revealing complexity gradually as
        the user needs it. An interface that shows everything at once overwhelms;
        one that hides everything frustrates. Progressive disclosure finds the
        balance.
      </p>

      <DocSection heading="Core principle">
        <p>
          Show the summary first, let users drill into details on demand. Every
          screen has a "default view" that serves 80% of users — the people who
          need the most common information or the most frequent action. The
          remaining 20% of complexity is one click away, not crowding the
          default.
        </p>
        <p className="mt-3">
          This isn't about hiding things to make the UI look cleaner. It's
          about respecting the user's attention. A settings page with 40
          visible options is harder to use than one with 8 visible options and
          an "Advanced" section — even though they contain the same controls.
        </p>
      </DocSection>

      <DocSection heading="Disclosure patterns">
        <DocKeyValue
          rows={[
            {
              k: "Accordion",
              v: "Show the heading, expand for content. Best for long pages with distinct sections where the user needs one section at a time — FAQs, settings groups, filter panels.",
            },
            {
              k: "Drawer",
              v: "Slide-in panel for secondary content. Ideal for detail views, editing forms, or supplementary information that the user needs in context without leaving the current page.",
            },
            {
              k: "Tooltip",
              v: "Contextual help on hover or focus. Use for inline definitions, icon labels, and short explanations. Not for essential information — tooltips are invisible to touch users without focus management.",
            },
            {
              k: "Drill-down",
              v: "Navigate deeper into a hierarchy. Master-detail layouts, breadcrumb navigation, and nested folder structures all use this pattern to manage depth.",
            },
            {
              k: "\"Show more\"",
              v: "Truncated lists with an expand affordance. Show the first 5 items with a 'Show all 23' link. The user sees enough to evaluate relevance before committing to the full list.",
            },
            {
              k: "Tabs",
              v: "Parallel content, visible one at a time. Use when the user needs to compare or switch between related views — not for sequential steps (use a stepper for that).",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="When to use — and when not to">
        <p>
          Not everything should be hidden. Critical information, primary
          actions, and navigation should always be visible. Progressive
          disclosure is for supporting details, advanced options, and
          edge-case functionality.
        </p>
        <p className="mt-3">
          A good test: if more than 30% of users need it on every visit, it
          belongs in the default view. If fewer than 30% need it, or they only
          need it occasionally, it's a candidate for disclosure. Never hide
          something just because it makes the design look simpler — hide it
          because the user genuinely doesn't need it yet.
        </p>
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Show summary with a 'View details' affordance"
            description="A card showing name, status, and date with a 'View details' link gives the user enough to scan and decide. The full record is one click away."
          />
          <RuleCard
            type="dont"
            title="Hide primary actions behind menus or accordions"
            description="The main thing a user came to do should never require expanding, hovering, or navigating to find. Primary actions are always visible."
          />
          <RuleCard
            type="do"
            title="Use accordions for optional configuration sections"
            description="Advanced settings, optional metadata, and rarely-used filters belong in collapsible sections. The default collapsed state tells the user 'you probably don't need this.'"
          />
          <RuleCard
            type="dont"
            title="Make users click three times to reach frequently needed content"
            description="If analytics show a feature is used daily, it belongs on the surface — not buried behind a menu, then a tab, then an accordion. Depth should correlate with infrequency."
          />
        </div>
      </DocSection>
    </div>
  );
}
