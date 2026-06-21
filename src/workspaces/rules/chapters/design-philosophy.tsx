import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function DesignPhilosophy() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Design Philosophy
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The principles that guide every design decision in the Baseline system.
        These are not aspirational - they are constraints. Every component,
        pattern, and surface must satisfy them.
      </p>

      <DocSection eyebrow="CORE PRINCIPLES" heading="The seven non-negotiables">
        <DocKeyValue
          rows={[
            {
              k: "Tokens, never literals",
              v: "No raw hex, rgb, or hsl in JSX or CSS. Every color resolves to a semantic token with both dark and light values.",
            },
            {
              k: "Compose from base components",
              v: "Higher-level components route every control, indicator, and surface through a documented base component. No bespoke reimplementations.",
            },
            {
              k: "Add at the right level",
              v: "When the system is missing something, mint at the atomic level (token, base component) - never inline at the component level.",
            },
            {
              k: "Accessibility is non-negotiable",
              v: "WCAG 2.2 AA. Contrast, focus, keyboard, accessible names, no info by color alone. Every base component ships with a verified checklist.",
            },
            {
              k: "Dark mode is ground truth",
              v: "Color decisions are made in dark first. Light values are derived expressions of the same semantic intent.",
            },
            {
              k: "Docs and code move together",
              v: "New token, new pattern, status change - the documentation and the code update in the same change set.",
            },
            {
              k: "Serve the user's task",
              v: "Every element earns its space. If it doesn't help the user accomplish their goal, remove it.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Design is decision-making">
        <p>
          Good design is not decoration - it is the sum of thousands of small
          decisions that make a product intuitive, efficient, and trustworthy.
          Every pixel, every interaction, every piece of copy is a decision.
          This system exists to make those decisions consistent, composable,
          and grounded in evidence.
        </p>
        <p>
          When a decision has been made and documented, follow it. When a
          decision needs to change, change it explicitly - update the rule,
          not just the code. Silent divergence is how systems fragment.
        </p>
      </DocSection>

      <DocSection heading="Simplicity over cleverness">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use established patterns"
            description="Users have learned conventions from thousands of apps. Leverage that muscle memory - don't force them to learn yours."
          />
          <RuleCard
            type="dont"
            title="Reinvent standard interactions"
            description="Custom scrollbars, novel navigation paradigms, and clever animations that sacrifice usability for novelty."
          />
          <RuleCard
            type="do"
            title="Reduce to essentials"
            description="Every element should serve a purpose. White space is not wasted space - it's breathing room that aids comprehension."
          />
          <RuleCard
            type="dont"
            title="Add without subtracting"
            description="New features should prompt the question: what can we remove to make room? Accretion without curation creates bloat."
          />
        </div>
      </DocSection>

      <DocSection heading="Trust through consistency">
        <p>
          Users build mental models as they interact with a product. Every
          inconsistency - a button that looks different, a spacing that shifts,
          a color that means something else on a different page - erodes trust
          and increases cognitive load. The design system exists to make
          consistency the path of least resistance.
        </p>
      </DocSection>
    </div>
  );
}
