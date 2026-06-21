import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function HicksLaw() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Hick's Law
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The time to make a decision increases logarithmically with the number of
        choices. Reduce options, group them, or use progressive disclosure to
        speed decisions.
      </p>

      <DocSection heading="The formula">
        <p>
          T = b &times; log<sub>2</sub>(n + 1) where n is the number of equally
          probable choices. The practical takeaway: every additional option costs
          decision time. Going from 2 to 4 options isn't free - it measurably
          slows the user.
        </p>
      </DocSection>

      <DocSection heading="Application to UI">
        <DocKeyValue
          rows={[
            {
              k: "Navigation",
              v: "7 or fewer top-level items, group the rest. A flat list of 12 links forces the user to evaluate each one; 3 groups of 4 is dramatically faster.",
            },
            {
              k: "Forms",
              v: "Break long forms into steps, one decision per screen. A single screen with 20 fields triggers decision paralysis before the user even starts.",
            },
            {
              k: "Menus",
              v: "Group items into categories, most-used first. Alphabetical order is a last resort - frequency and logical grouping beat it every time.",
            },
            {
              k: "Filters",
              v: "Show 3-5 default filters, expand for more. Most users need the common filters; power users will find the expand control.",
            },
            {
              k: "Settings",
              v: "Show recommended defaults, hide advanced options. The majority of users never touch advanced settings - don't make them wade through them.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Strategies for reducing choice">
        <DocKeyValue
          rows={[
            {
              k: "Smart defaults",
              v: "Pre-select the most common option. When 80% of users pick the same thing, pre-selecting it eliminates a decision for most people.",
            },
            {
              k: "Recommended",
              v: "Highlight the suggested choice. A 'Recommended' badge on a pricing plan cuts decision time by giving users a starting point.",
            },
            {
              k: "Progressive disclosure",
              v: "Show essentials first, expand for more. The user sees 3 options instead of 12; the other 9 are one click away for those who need them.",
            },
            {
              k: "Categorization",
              v: "Group 20 items into 4 groups of 5. The user first picks a category (4 choices), then an item within it (5 choices) - far faster than scanning 20.",
            },
            {
              k: "Search",
              v: "When the list exceeds scannable size, add search. Once the options exceed roughly 15, users switch from scanning to searching - support that.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Break a 20-field form into 4 logical steps"
            description="Each step presents a focused set of decisions. The user completes one group, sees progress, and moves on - instead of facing a wall of fields."
          />
          <RuleCard
            type="dont"
            title="Present all options simultaneously in a flat, ungrouped list"
            description="A flat list of 20 items forces the user to evaluate every option before making a choice. Decision time scales logarithmically - fewer visible options means faster decisions."
          />
          <RuleCard
            type="do"
            title="Highlight a recommended option in pricing or plan selection"
            description="A 'Recommended' or 'Most popular' badge gives the user an anchor. Instead of comparing every option from scratch, they start from the suggestion and compare outward."
          />
          <RuleCard
            type="dont"
            title="Offer more than 7 ungrouped navigation items at the top level"
            description="Top-level navigation is scanned on every page. Beyond 7 items without grouping, the user must re-read the full list each time to find what they need."
          />
        </div>
      </DocSection>
    </div>
  );
}
