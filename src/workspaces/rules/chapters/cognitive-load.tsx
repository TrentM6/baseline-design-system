import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function CognitiveLoad() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Cognitive Load
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Reduce the mental effort required to use an interface. Every unnecessary
        element, choice, or piece of information competes for the user's limited
        attention. Good design eliminates extraneous load so users can focus on
        their actual task.
      </p>

      <DocSection heading="Types of cognitive load">
        <DocKeyValue
          rows={[
            {
              k: "Intrinsic load",
              v: "The complexity inherent to the task itself. Filing taxes is inherently complex — no interface can make the tax code simple. Intrinsic load can be managed but not eliminated.",
            },
            {
              k: "Extraneous load",
              v: "Complexity added by poor design. Confusing navigation, inconsistent patterns, unclear labels, and unnecessary steps are all extraneous load. This is what we eliminate.",
            },
            {
              k: "Germane load",
              v: "Mental effort that builds understanding — learning how the system works, forming mental models, recognizing patterns. Good design maximizes germane load by making the system learnable.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Reduction strategies">
        <DocKeyValue
          rows={[
            {
              k: "Chunking",
              v: "Group related items into meaningful clusters. A phone number displayed as 555-867-5309 is three chunks; 5558675309 is ten individual digits competing for working memory.",
            },
            {
              k: "Visual hierarchy",
              v: "Size, weight, and color signal importance. When the eye knows where to look first, the brain doesn't have to evaluate everything simultaneously.",
            },
            {
              k: "Consistent patterns",
              v: "Learned once, applied everywhere. When every list behaves the same way, every form validates the same way, and every dialog has the same button order, users stop thinking about the interface.",
            },
            {
              k: "Sensible defaults",
              v: "Reduce the number of decisions the user must make. Pre-selected options, smart date ranges, and remembered preferences remove choices that don't require conscious thought.",
            },
            {
              k: "Progressive disclosure",
              v: "Show only what's needed now. Advanced options, edge-case settings, and supplementary details can wait until the user asks for them.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Miller's Law">
        <p>
          Working memory holds 7 plus or minus 2 items. When a list, menu, or set
          of options exceeds this range, the user can no longer hold all options
          in mind simultaneously and must start re-scanning.
        </p>
        <p className="mt-3">
          This doesn't mean every menu must have fewer than 7 items. Navigation
          with 12 items is fine if grouped into 3 categories of 4. The key is
          chunking: the user processes 3 groups, not 12 individual items. Apply
          this to nav menus, filter panels, form sections, and settings pages —
          any time you present a set of options.
        </p>
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Group navigation items into labeled categories"
            description="A sidebar with 'Content,' 'Settings,' and 'Team' sections is three things to scan. The same 15 links in a flat list is 15 things to scan."
          />
          <RuleCard
            type="dont"
            title="Present 15+ ungrouped options in a single menu"
            description="A flat list of 15 options forces the user to read every item to find what they want. Group them, add headings, or use search — anything to reduce the scan."
          />
          <RuleCard
            type="do"
            title="Use clear visual hierarchy so users know where to look first"
            description="A bold heading, a regular-weight description, and a muted timestamp create three levels the eye processes top-down without effort."
          />
          <RuleCard
            type="dont"
            title="Make everything the same size, weight, and color"
            description="When nothing stands out, everything demands equal attention. The user must read every element to determine what matters — that's maximum extraneous load."
          />
        </div>
      </DocSection>
    </div>
  );
}
