import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function JakobsLaw() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Jakob's Law
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Users spend most of their time on other sites and products. They prefer
        interfaces that work the same way as what they already know. Match
        conventions unless you have a very good reason not to.
      </p>

      <DocSection heading="The principle">
        <p>
          Jakob Nielsen's Law states that users transfer expectations from one
          product to another. They expect your search bar at the top, your
          navigation on the left or top, your submit button at the bottom right
          of a form. Breaking these conventions creates friction - the user has
          to learn your way instead of applying what they already know.
        </p>
      </DocSection>

      <DocSection heading="Common conventions">
        <DocKeyValue
          rows={[
            {
              k: "Logo top-left",
              v: "Links to home. This convention is so deeply ingrained that users don't even think about it - they reach for the top-left corner reflexively when they want to start over.",
            },
            {
              k: "Search top-right",
              v: "Or top-center. Users scan the top of the page for search without thinking. Moving it to a sidebar or footer forces a conscious hunt.",
            },
            {
              k: "Primary nav",
              v: "Top or left sidebar. Horizontal top navigation for broad apps, vertical sidebar for deep apps with many sections. Users know both patterns instinctively.",
            },
            {
              k: "Form submit button",
              v: "Bottom-right. The eye reads top-to-bottom, left-to-right. The submit button sits at the terminal point of that scan - the natural endpoint of the form.",
            },
            {
              k: "Close / cancel",
              v: "Top-right of modals. The X in the top-right corner is universal. Moving it elsewhere causes users to fumble for the exit.",
            },
            {
              k: "Destructive actions in red",
              v: "Red signals danger across cultures and platforms. A red delete button needs no label to communicate risk - but always include one anyway.",
            },
            {
              k: "Shopping cart icon",
              v: "Top-right. E-commerce users glance top-right for their cart without thinking. This convention crosses every platform and locale.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="When to break convention">
        <p>
          Innovation means solving a problem better, not differently for the sake
          of it. Break convention only when you have evidence that the new
          pattern is significantly better AND you can teach it quickly. The bar
          is high - "it looks cooler" is not sufficient.
        </p>
        <p className="mt-3">
          Before breaking a convention, ask: will users figure this out in under
          5 seconds without instruction? If not, the learning cost likely
          outweighs the benefit. Run a usability test. If new users stumble,
          revert to the convention.
        </p>
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Place primary actions where users expect them - bottom of forms, end of flows"
            description="Users have a mental model of where to find the 'next step.' Bottom-right for forms, bottom-center for wizards. Match those expectations."
          />
          <RuleCard
            type="dont"
            title="Put navigation in unusual locations for aesthetic reasons"
            description="A hamburger menu in the bottom-left or navigation hidden behind a gesture looks novel but forces every user to learn your layout from scratch."
          />
          <RuleCard
            type="do"
            title="Use standard icons (magnifying glass for search, X for close, gear for settings)"
            description="These icons are a shared visual language. Users recognize them instantly because they've seen them in thousands of other products."
          />
          <RuleCard
            type="dont"
            title="Create custom icon metaphors that require learning"
            description="A diamond icon for search or a spiral for settings might be on-brand, but every user has to learn what it means. That's a cost you pay on every new user."
          />
          <RuleCard
            type="do"
            title="Follow platform conventions (scrolling, gestures, shortcuts)"
            description="Cmd+S to save, Cmd+Z to undo, swipe to go back. These are muscle memory. Supporting them makes your app feel native and effortless."
          />
          <RuleCard
            type="dont"
            title="Override browser defaults (back button, scroll behavior, right-click)"
            description="Hijacking the back button, adding custom scroll physics, or disabling right-click breaks the user's trust in how the platform works."
          />
        </div>
      </DocSection>
    </div>
  );
}
