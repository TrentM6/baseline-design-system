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
              v: "--dur-quick / 200ms. The sweet spot for micro-interactions - perceptible motion without blocking the user's next action.",
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
              v: "--dur-medium / 300ms. Modals combine a backdrop fade with a panel entrance - the medium duration accommodates both.",
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
              v: "cubic-bezier(0, 0, 0.2, 1) - for entrances. The element arrives fast and decelerates into place. This mimics how physical objects come to rest.",
            },
            {
              k: "ease-in",
              v: "cubic-bezier(0.4, 0, 1, 1) - for exits. The element starts slow and accelerates away. It picks up speed as it leaves, which feels decisive rather than abrupt.",
            },
            {
              k: "ease-in-out",
              v: "cubic-bezier(0.4, 0, 0.2, 1) - for repositioning. The element moves between two on-screen positions, cushioning both the start and the stop.",
            },
            {
              k: "linear",
              v: "No acceleration curve - constant speed. Only for progress bars, loading indicators, and continuous animations where uniform motion is the correct metaphor.",
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
            --dur-quick. Exits should be faster than entrances - this makes the
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
            content is already understood - get it out of the way quickly.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Timing guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use the duration token that matches the interaction type"
            description="The token table maps every interaction category to its duration. Reference the token in code - the value may be tuned system-wide later."
          />
          <RuleCard
            type="dont"
            title="Write transition: all 200ms ease in component CSS"
            description="Raw millisecond values bypass the token system. When the system tunes timing globally, hardcoded values won't update and the UI will feel inconsistent."
          />
          <RuleCard
            type="do"
            title="Make exits faster than entrances - it feels snappier"
            description="Asymmetric timing mirrors user intent. They want arriving content to be legible and departing content to get out of the way. The speed difference is subtle but it shapes perception."
          />
          <RuleCard
            type="dont"
            title="Use ease-in for entrances - elements should decelerate into place, not accelerate"
            description="Ease-in starts slow and speeds up, which is the opposite of what arrival motion should feel like. It makes elements appear to accelerate into their resting position, which feels unnatural."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="INTERRUPTIBILITY" heading="Interruptible animations">
        <p>
          Prefer CSS transitions for interactive state - hover, press, open/close
          (from better-ui, jakub.kr). A transition interpolates from wherever the
          element currently is toward the latest state, so it can reverse mid-flight
          if the user changes their mind. Reserve <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>@keyframes</code> for
          one-shot staged sequences that run once and don't need to respond to a
          change of state partway through.
        </p>
        <p>
          A menu the user can't close mid-open feels broken. If the trigger fires
          again before the open animation finishes, the close animation must be
          able to pick up from the current position - not wait for the open
          animation to finish, and not snap.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Drive hover, press, and open/close state with CSS transitions"
            description="Transitions target whatever the current computed value is, so a state change mid-animation reverses smoothly instead of restarting or snapping."
          />
          <RuleCard
            type="dont"
            title="Use @keyframes for interactive state that can be toggled again mid-animation"
            description="Keyframe animations run a fixed timeline once started. If the user re-triggers the interaction before it finishes, the animation either ignores the new state or restarts jarringly."
          />
        </div>
      </DocSection>

      <DocSection heading="Property specificity & will-change">
        <p>
          Never write <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>transition: all</code> (from
          better-ui, jakub.kr). It watches every property on the element, which
          means it also animates properties nobody intended to animate -
          including layout-triggering ones that showed up from an unrelated
          class change. Name the properties explicitly:{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>transition-property: scale, opacity</code>{" "}
          (Tailwind: <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>transition-[scale,opacity]</code>).
          Note that Tailwind's <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>transition-transform</code> already
          covers translate, scale, and rotate together - no need to list them
          separately.
        </p>
        <p>
          Use <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>will-change</code> sparingly:
          only on transform, opacity, filter, or clip-path, and only when a
          first-frame stutter is actually visible (Safari benefits from it the
          most). Each hinted property promotes the element to its own
          compositing layer, which costs GPU memory - never write{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>will-change: all</code>,
          and never hint background-color, padding, top, or left.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Name the exact properties in transition-property"
            description="transition-[scale,opacity] (or transition-transform for translate/scale/rotate together) animates only what you intend and keeps the browser from watching every CSS property for changes."
          />
          <RuleCard
            type="dont"
            title="Write transition: all"
            description="Watching every property means unrelated style changes - a class toggle, a layout shift - animate too, producing motion nobody designed."
          />
          <RuleCard
            type="do"
            title="Reserve will-change for transform/opacity/filter/clip-path, added only when stutter is visible"
            description="Each will-change hint promotes the element to its own compositing layer. Add it deliberately to fix an observed first-frame stutter, not as a blanket performance habit."
          />
          <RuleCard
            type="dont"
            title="Set will-change: all or hint background-color/padding/top/left"
            description="Those properties don't benefit from layer promotion, and hinting them just burns GPU memory on layers that don't solve a real stutter."
          />
        </div>
      </DocSection>
    </div>
  );
}
