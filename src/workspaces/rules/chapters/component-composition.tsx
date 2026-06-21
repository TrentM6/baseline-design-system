import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ComponentComposition() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Component Composition
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Every component in the system is built by composing smaller, documented
        primitives. No bespoke reimplementations. No inline one-offs. The
        composition model is how the system scales.
      </p>

      <DocSection eyebrow="ARCHITECTURE" heading="The layer architecture">
        <p>
          The system is organized into five layers. Each layer builds on the
          ones below it. Components at higher layers compose from lower layers —
          they never skip levels or reimplement what a lower layer provides.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "L1 Tokens",
              v: "Design decisions as variables — color, spacing, motion, radii. The atomic units that every other layer consumes. Defined in bl-tokens.css.",
            },
            {
              k: "L2 Primitives",
              v: "Atomic UI elements — Button, Input, Badge, Avatar. Each primitive is a single-purpose component that handles one interaction pattern well.",
            },
            {
              k: "L3 Patterns",
              v: "Composed arrangements — FormField wraps Label + Input + HelperText. Patterns solve a recurring layout problem by wiring primitives together.",
            },
            {
              k: "L4 Features",
              v: "Product-specific compositions — LoginForm, SettingsPanel. Features combine patterns and primitives into functional units tied to a user workflow.",
            },
            {
              k: "L5 Pages",
              v: "Full views assembled from features and patterns. Pages handle routing, layout, and data flow — they compose from everything below.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Composition rules">
        <DocKeyValue
          rows={[
            {
              k: "Route through primitives",
              v: "Every interactive element uses a system primitive. If a user can click it, type in it, or toggle it, it must be an instance of a primitive from src/components/ui/.",
            },
            {
              k: "No re-implementation",
              v: "If Button exists, you use Button — don't build a custom clickable div. If the existing Button doesn't support what you need, extend the Button.",
            },
            {
              k: "Props over forks",
              v: "Extend a primitive's prop surface rather than forking it into a separate file. A variant prop is almost always better than a second component.",
            },
            {
              k: "Consistent API",
              v: "Similar components expose similar prop patterns. If Input takes size and variant, Select should too. Predictable APIs reduce the learning curve for every new component.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Adding to the system">
        <p>
          When something is missing, add it at the right level. This is the most
          important rule in the composition model — it prevents the slow
          degradation that happens when system-level concerns get solved with
          component-level hacks.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Need a new color?</strong> Add a token at L1 in
            bl-tokens.css with both dark and light values. Never define a color
            inside a component file.
          </li>
          <li>
            <strong>Need a new control?</strong> Build a primitive at L2 in
            src/components/ui/. Give it the same API conventions as existing
            primitives.
          </li>
          <li>
            <strong>Need a reusable arrangement?</strong> Create a pattern at
            L3 that composes from existing primitives. The pattern owns layout
            and wiring, not visual styling.
          </li>
          <li>
            <strong>The failure mode:</strong> Adding system-level concerns at
            the component level is how you end up with 15 different button
            implementations. Each one solves a local problem; collectively they
            are unmaintainable.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Composition guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Compose higher-level components from existing primitives"
            description="A settings form should use FormField, Input, Select, and Button — not custom divs styled to look like those primitives. Composition is the entire point of the system."
          />
          <RuleCard
            type="dont"
            title="Re-implement a button as a styled div because the existing Button doesn't look right — fix the Button"
            description="If the Button primitive doesn't support your use case, that's a signal the Button needs a new variant or prop — not that you need a parallel implementation."
          />
          <RuleCard
            type="do"
            title="Add missing capabilities at the atomic level (tokens, primitives)"
            description="When you need something the system doesn't have, add it where it belongs. A missing color is a token gap. A missing control is a primitive gap. Fix the gap, don't work around it."
          />
          <RuleCard
            type="dont"
            title="Inline a one-off styled component that duplicates an existing primitive"
            description="One-offs accumulate. Each one is justified in isolation; together they fragment the system. If you find yourself building something that already exists, use the existing one."
          />
          <RuleCard
            type="do"
            title="Extend a primitive's props when you need a new variant"
            description="Adding a 'compact' size to Button is one change in one file that benefits every consumer. Forking Button into CompactButton creates a maintenance burden that compounds over time."
          />
          <RuleCard
            type="dont"
            title="Fork a primitive into a separate file for a single use case"
            description="A forked primitive will drift from the original. It won't get token updates, accessibility fixes, or API improvements. Within weeks it becomes a liability."
          />
        </div>
      </DocSection>
    </div>
  );
}
