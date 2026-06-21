import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function AgentContract() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Agent Contract (CLAUDE.md)
      </h2>
      <p
        className="text-[14px] leading-relaxed mb-8"
        style={{ color: "var(--bl-fg-secondary)" }}
      >
        This is the enforceable contract that every AI agent reads at session
        start. It governs how agents interact with the design system — what
        they must do, what they must not do, and how they validate their own
        output before reporting it as done.
      </p>

      <DocSection eyebrow="Startup" heading="Session checklist">
        <p>Before writing any code, every agent session must verify:</p>
        <DocKeyValue
          rows={[
            {
              k: "Read AGENTS.md",
              v: "Understand the composition rules, token discipline, accessibility requirements, and motion conformance before touching any file.",
            },
            {
              k: "Identify the layer",
              v: "Know which workspace tab the change affects: Rules, Tokens, Primitives, Components, or Surfaces.",
            },
            {
              k: "Identify primitives",
              v: "Search src/components/ui/ for existing primitives to compose from. Never re-implement what already exists.",
            },
            {
              k: "Identify tokens",
              v: "Search tokens/bl-tokens.css for applicable tokens. Never use raw hex, rgb, or hsl values.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="Enforcement" heading="Composition trace">
        <p>
          Every visual element must trace through the system layers. This is
          the composition chain that makes the design system composable and
          maintainable:
        </p>
        <div
          className="rounded-lg p-4 font-mono text-[12px] mt-3"
          style={{
            backgroundColor: "var(--bl-bg-elevated)",
            color: "var(--bl-fg-primary)",
          }}
        >
          bl-tokens.css → tailwind.config.ts → src/components/ui/* →
          workspace components → surfaces
        </div>
        <DocKeyValue
          rows={[
            { k: "Tokens", v: "All values (color, spacing, radius, motion) from --bl-* tokens" },
            { k: "Primitives", v: "All interactive elements from shadcn/ui in src/components/ui/" },
            { k: "Icons", v: "All icons from @phosphor-icons/react — no inline SVG for standard UI icons" },
            { k: "Accessibility", v: "WCAG 2.2 AA on every component — contrast, keyboard, names, focus" },
            { k: "Both modes", v: "Every change verified in dark AND light mode" },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="Validation" heading="UX validation loop">
        <p>
          After completing any visual change, agents must run a 5-step
          validation before reporting work as done. This is mandatory — not
          optional, not aspirational.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "1. Composition audit",
              v: "Grep for raw hex. Verify all interactive elements use shadcn primitives. Verify all icons use Phosphor. Verify spacing uses token-mapped classes.",
            },
            {
              k: "2. Accessibility check",
              v: "Contrast ratios (4.5:1 text, 3:1 UI). Tab reachability. Focus-visible rings. Accessible names. No color-only status. Reduced motion support.",
            },
            {
              k: "3. Mode verification",
              v: "Toggle light mode — verify. Toggle dark mode — verify. Any new token has both values.",
            },
            {
              k: "4. UX reviewer persona",
              v: "Adopt senior UX designer role. Evaluate: clarity, consistency, density, hierarchy, feedback, reversibility, edge cases.",
            },
            {
              k: "5. Report",
              v: "What was built. Which primitives compose it. Any new tokens. Any issues found and fixed.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rejection criteria">
        <p>
          Any of the following is an automatic rejection. The work must be
          fixed before it can be considered done.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="dont"
            title="Raw color values in components"
            description="Any hex, rgb(), hsl(), or named color in JSX or component CSS. Must use --bl-* semantic tokens."
          />
          <RuleCard
            type="dont"
            title="Custom styled divs replacing shadcn primitives"
            description="If shadcn has a component for it (Button, Input, Card, Dialog, etc.), use the primitive. Don't rebuild it."
          />
          <RuleCard
            type="dont"
            title="Inline SVG for standard UI icons"
            description="Use @phosphor-icons/react for all standard icons. Inline SVG is only acceptable for brand marks and custom illustrations."
          />
          <RuleCard
            type="dont"
            title="Missing accessible name on interactive elements"
            description="Every button, link, input, and control must have visible text or aria-label. No exceptions."
          />
          <RuleCard
            type="dont"
            title="Single-mode tokens"
            description="Every new semantic token must declare both dark and light values. A token without both is incomplete work."
          />
          <RuleCard
            type="dont"
            title="Skipping the validation loop"
            description="The 5-step validation is not optional. Reporting work as done without running it is a contract violation."
          />
        </div>
      </DocSection>
    </div>
  );
}
