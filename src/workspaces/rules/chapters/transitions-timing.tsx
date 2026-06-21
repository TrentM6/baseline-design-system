import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function TransitionsTiming() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Transitions & Timing
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Consistent timing creates a cohesive feel across the system. Every
        transition maps to a duration token and an easing curve. Raw millisecond
        values in component code are treated as bugs.
      </p>

      <DocSection eyebrow="TOKENS" heading="Duration token mapping">
        <p>
          Every transition in the system uses one of these four duration tokens.
          The token name describes the feel, the value is the implementation.
          Components reference the token, never the millisecond value.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Hover / focus color changes",
              v: "--dur-instant / 100ms. Fast enough to feel immediate but slow enough to register as a transition rather than a binary swap.",
            },
            {
              k: "Button press / toggle",
              v: "--dur-quick / 200ms. The sweet spot for micro-interactions — perceptible motion without blocking the user's next action.",
            },
            {
              k: "Tooltip appear / dismiss",
              v: "--dur-quick / 200ms. Tooltips need to arrive fast enough to feel responsive but not so fast they flash when the cursor passes over.",
            },
            {
              k: "Popover / dropdown",
              v: "--dur-quick / 200ms. Menus and popovers open at the same speed as tooltips for consistency across overlay elements.",
            },
            {
              k: "Accordion expand / collapse",
              v: "--dur-medium / 300ms. Content reflow needs slightly more time so the user can track where things moved.",
            },
            {
              k: "Modal open / close",
              v: "--dur-medium / 300ms. Modals combine a backdrop fade with a panel entrance — the medium duration accommodates both.",
            },
            {
              k: "Drawer slide",
              v: "--dur-medium / 300ms. Drawers travel a significant distance across the viewport and need enough time to read as a smooth slide.",
            },
            {
              k: "Page transitions",
              v: "--dur-slow / 500ms. Full-page transitions are the longest in the system. Anything slower feels sluggish; faster and the user loses spatial context.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Easing curves explained">
        <p>
          Easing curves control the acceleration profile of a transition. The
          right curve makes motion feel natural; the wrong curve makes it feel
          mechanical or jarring.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "ease-out",
              v: "cubic-bezier(0, 0, 0.2, 1) — for entrances. The element arrives fast and decelerates into place. This mimics how physical objects come to rest.",
            },
            {
              k: "ease-in",
              v: "cubic-bezier(0.4, 0, 1, 1) — for exits. The element starts slow and accelerates away. It picks up speed as it leaves, which feels decisive rather than abrupt.",
            },
            {
              k: "ease-in-out",
              v: "cubic-bezier(0.4, 0, 0.2, 1) — for repositioning. The element moves between two on-screen positions, cushioning both the start and the stop.",
            },
            {
              k: "linear",
              v: "No acceleration curve — constant speed. Only for progress bars, loading indicators, and continuous animations where uniform motion is the correct metaphor.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Pairing guide">
        <p>
          Duration and easing are always paired deliberately. The principle is
          simple: arrivals decelerate, departures accelerate, and movements
          cushion both ends.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Entrances</strong> pair ease-out with --dur-quick or
            --dur-medium. The element enters the viewport fast and settles into
            position. Longer durations for larger elements.
          </li>
          <li>
            <strong>Exits</strong> pair ease-in with --dur-instant or
            --dur-quick. Exits should be faster than entrances — this makes the
            interface feel snappy and responsive. The user initiated the
            dismissal; don't make them wait.
          </li>
          <li>
            <strong>Position changes</strong> pair ease-in-out with
            --dur-medium. When an element moves from one spot to another on
            screen, the cushioned curve prevents the motion from feeling
            mechanical.
          </li>
          <li>
            <strong>The asymmetry is intentional.</strong> Entrances are slower
            than exits because arriving content needs time to register. Exiting
            content is already understood — get it out of the way quickly.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Timing guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use the duration token that matches the interaction type"
            description="The token table maps every interaction category to its duration. Reference the token in code — the value may be tuned system-wide later."
          />
          <RuleCard
            type="dont"
            title="Write transition: all 200ms ease in component CSS"
            description="Raw millisecond values bypass the token system. When the system tunes timing globally, hardcoded values won't update and the UI will feel inconsistent."
          />
          <RuleCard
            type="do"
            title="Make exits faster than entrances — it feels snappier"
            description="Asymmetric timing mirrors user intent. They want arriving content to be legible and departing content to get out of the way. The speed difference is subtle but it shapes perception."
          />
          <RuleCard
            type="dont"
            title="Use ease-in for entrances — elements should decelerate into place, not accelerate"
            description="Ease-in starts slow and speeds up, which is the opposite of what arrival motion should feel like. It makes elements appear to accelerate into their resting position, which feels unnatural."
          />
        </div>
      </DocSection>
    </div>
  );
}
