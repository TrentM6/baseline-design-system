import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function FittsLaw() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Fitts's Law
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The time to acquire a target is a function of the distance to and size
        of the target. Larger, closer targets are faster to reach. This is the
        most validated law in human-computer interaction.
      </p>

      <DocSection heading="The formula">
        <p>
          <strong>T = a + b × log₂(1 + D/W)</strong> — where D is distance to
          the target and W is the target's width. The practical takeaway:
          make important targets big and put them where the cursor already is.
        </p>
      </DocSection>

      <DocSection heading="Application to UI design">
        <DocKeyValue
          rows={[
            {
              k: "Button sizing",
              v: "Primary actions use the large button size (44px height, pill shape). Minimum touch target: 44×44px (WCAG SC 2.5.8).",
            },
            {
              k: "Edge targets",
              v: "Elements at screen edges are effectively infinite width — the cursor can't overshoot. Nav bars and toolbars benefit from edge placement.",
            },
            {
              k: "Contextual actions",
              v: "Place actions near the content they affect. A row's delete button should be in the row, not in a toolbar at the top of the page.",
            },
            {
              k: "Dropdown placement",
              v: "Open menus near the trigger. The first item should be directly under the cursor — zero travel distance.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="rule"
            title="44px minimum touch target"
            description="Interactive elements must be at least 44×44px including padding. This satisfies both Fitts's Law and WCAG 2.5.8 Target Size."
          />
          <RuleCard
            type="rule"
            title="Primary actions are largest"
            description="The most important action on a screen should be the largest interactive element. Visual weight and clickable area align."
          />
          <RuleCard
            type="do"
            title="Group related actions"
            description="Place confirm/cancel buttons adjacent — the user doesn't have to travel across the screen to change their mind."
          />
          <RuleCard
            type="dont"
            title="Scatter actions across the viewport"
            description="Save at the top, delete at the bottom, cancel in the sidebar — every placement decision is a distance penalty for the user."
          />
        </div>
      </DocSection>
    </div>
  );
}
