import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function AgenticDesign() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Agentic Design
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Rules for AI agents working in the Baseline design system. Agents are
        first-class contributors - they must follow the same standards as human
        designers and developers.
      </p>

      <DocSection eyebrow="PROTOCOL" heading="Agent workflow">
        <p>
          Every agent session that touches the design system must follow this
          workflow. These steps are not suggestions - they are the minimum bar
          for an agent to produce work that meets system standards.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Read docs first",
              v: "Understand the system before making changes. Read the relevant chapter of the documentation for the area you're about to touch. No exceptions.",
            },
            {
              k: "Match existing patterns",
              v: "Find the closest existing component and follow its conventions. Token usage, prop naming, file structure, accessibility patterns - match what's already there.",
            },
            {
              k: "Use tokens always",
              v: "Agents are the most likely to emit raw hex values - never do this. Every color, spacing value, radius, and duration must resolve to a --bl-* or --dur-* token.",
            },
            {
              k: "Compose from base components",
              v: "Check what exists in src/components/ui/ before building something new. If a base component covers your use case, use it. If it almost covers it, extend it.",
            },
            {
              k: "Verify both modes",
              v: "Toggle the theme and confirm the change works in dark AND light mode. This is the step agents skip most often, and it's the one that produces the most bugs.",
            },
            {
              k: "Update docs with code",
              v: "A new decision or pattern must be documented in the same change set. Code without documentation is incomplete work.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="The right level rule">
        <p>
          When an agent needs something the system doesn't have, the agent must
          add it at the correct level. This is the most common mistake agents
          make - solving a local problem with a local fix that should be a
          system-level addition.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Token for a color.</strong> If the design needs a color that
            doesn't exist as a token, add it to bl-tokens.css with both mode
            values. Don't write a hex value in the component and move on.
          </li>
          <li>
            <strong>Primitive for a control.</strong> If you need a new
            interactive element, build it as a proper base component in
            src/components/ui/. Don't inline a custom div with click handlers.
          </li>
          <li>
            <strong>Pattern for a reusable arrangement.</strong> If you're
            wiring together the same three base components in multiple places, that's
            a pattern - extract it. Don't duplicate the wiring.
          </li>
          <li>
            <strong>Why agents get this wrong.</strong> Agents optimize for
            task completion speed. Adding a token or base component feels like scope
            creep when the prompt just said "build this card." But the local fix
            creates tech debt that compounds with every subsequent agent session.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Common agent mistakes">
        <DocKeyValue
          rows={[
            {
              k: "Raw hex values",
              v: "Agents trained on general code emit #ffffff, #000000, and other raw colors by default. Replace with --bl-fg-inverse, --bl-bg-body, or the appropriate semantic token.",
            },
            {
              k: "Reimplementing base components",
              v: "Building a custom button because the prompt said 'button' without checking if a Button component exists. Always search src/components/ui/ first.",
            },
            {
              k: "Skipping accessibility",
              v: "Omitting aria-label on icon buttons, missing focus states, no keyboard support. Agents treat accessibility as an afterthought - in this system it's a requirement.",
            },
            {
              k: "Single-mode tokens",
              v: "Defining a token for dark mode and forgetting light mode. Every token must have both values. An agent that ships one mode value has shipped half the work.",
            },
            {
              k: "Decorative ARIA",
              v: "Adding role and aria-* attributes to elements that don't need them. A div with role='presentation' and aria-hidden='true' is noise. Only add ARIA when semantic HTML falls short.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Agent guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Read the relevant doc chapter before touching a component"
            description="Documentation exists to prevent rework. Five minutes reading saves an hour of corrections. The chapter will tell you which tokens, base components, and patterns apply."
          />
          <RuleCard
            type="dont"
            title="Jump straight to code without understanding the system's conventions"
            description="An agent that writes code without reading docs produces output that looks correct but violates system conventions. The result is harder to fix than if it were written from scratch."
          />
          <RuleCard
            type="do"
            title="Check if a base component already exists before building something new"
            description="Run a search of src/components/ui/ before creating any interactive element. The system likely has what you need, or something close enough to extend."
          />
          <RuleCard
            type="dont"
            title="Create a one-off styled component when a system base component covers the use case"
            description="One-off components bypass the system's accessibility work, token integration, and mode support. They look right today and break in ways that are hard to diagnose tomorrow."
          />
          <RuleCard
            type="do"
            title="Test changes in both dark and light mode before considering them done"
            description="Toggle the theme. Check contrast. Verify that token values resolve correctly in both modes. This is the verification step that catches the most agent-introduced regressions."
          />
          <RuleCard
            type="dont"
            title="Assume dark mode works just because it looks right - verify contrast ratios"
            description="Visual appearance is not the same as measured contrast. A color pair can look readable at a glance and still fail WCAG 4.5:1 requirements. Measure, don't estimate."
          />
        </div>
      </DocSection>
    </div>
  );
}
