import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function MotionAnimation() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Motion & Animation
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        When and how to use motion. Every animation must have a purpose, a
        documented duration token, and a reduced-motion fallback. Motion that
        doesn't serve the user serves no one.
      </p>

      <DocSection eyebrow="PHILOSOPHY" heading="Purpose-driven motion">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Animation is not decoration. Every transition must serve one of four
          purposes: <strong>provide feedback</strong> (a button press confirms
          the tap registered), <strong>show spatial relationships</strong> (a
          drawer slides from the edge it's anchored to, reinforcing where it
          lives), <strong>guide attention</strong> (a new item fades in so the
          eye is drawn to the change), or <strong>maintain context</strong> (page
          transitions preserve scroll position so users don't lose their place).
          If an animation doesn't clearly serve one of these purposes, remove it.
        </p>
      </DocSection>

      <DocSection eyebrow="TOKENS" heading="Duration tokens">
        <DocKeyValue
          rows={[
            {
              k: "--dur-instant - 100ms",
              v: "Hover states, focus rings, color shifts. Interactions that need to feel instantaneous - the user shouldn't perceive a delay, just a smooth state change.",
            },
            {
              k: "--dur-quick - 200ms",
              v: "Button press, toggle switch, tooltip appear, popover open/close. Fast enough to feel responsive, slow enough for the eye to register the transition.",
            },
            {
              k: "--dur-medium - 300ms",
              v: "Drawer slide, accordion expand/collapse, modal entrance. These elements move larger distances and need enough time to communicate their spatial origin.",
            },
            {
              k: "--dur-slow - 500ms",
              v: "Full-screen transitions and complex multi-element reveals. Reserved for moments where the entire view is changing and the user needs time to reorient.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="CURVES" heading="Easing rules">
        <DocKeyValue
          rows={[
            {
              k: "ease-out",
              v: "Entrances. The element arrives quickly and settles into its final position. Objects entering the viewport should decelerate - they're coming to rest.",
            },
            {
              k: "ease-in",
              v: "Exits. The element starts slowly and accelerates away. Objects leaving the viewport should speed up - they're departing and the user's attention should release.",
            },
            {
              k: "ease-in-out",
              v: "Position changes. The element accelerates from its origin and decelerates into its destination. Used when something moves between two on-screen states.",
            },
            {
              k: "linear",
              v: "Progress bars and looping animations only. Constant velocity feels mechanical and unnatural for UI transitions, but correct for indicators of continuous progress.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="ACCESSIBILITY" heading="Reduced motion">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Always wrap animations in a <code>prefers-reduced-motion</code> media
          query. When reduced motion is preferred, replace transitions with
          instant cuts - use opacity changes only, no transforms. Never remove
          information that animation conveys. If a slide-in transition reveals
          content, make the content appear immediately instead of animating it.
          The information must arrive; only the motion is optional. This is not a
          nice-to-have - it's a WCAG 2.2 AA requirement and a non-negotiable
          part of every component's accessibility checklist.
        </p>
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Use --dur-quick for tooltips and popovers"
            description="200ms is the sweet spot for small overlays - fast enough that they feel responsive, slow enough that the appearance isn't jarring."
          />
          <RuleCard
            type="dont"
            title="Write raw ms values like transition: 200ms"
            description="Raw duration values bypass the token system and can't be globally adjusted. Always reference --dur-instant, --dur-quick, --dur-medium, or --dur-slow."
          />
          <RuleCard
            type="do"
            title="Honor prefers-reduced-motion: reduce"
            description="Wrap every animation in a reduced-motion media query. Replace transforms with opacity-only transitions or instant cuts. Never skip content - only skip motion."
          />
          <RuleCard
            type="dont"
            title="Use animation for decoration - every motion must have a functional purpose"
            description="Bouncing icons, pulsing badges, and gratuitous parallax add visual noise without serving feedback, spatial, attention, or context purposes. Remove them."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="ENTER SEQUENCING" heading="Split & stagger enters">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Don't animate one container as a single unit (from better-ui, jakub.kr).
          Break content into semantic chunks - a heading, a subheading, each row
          of a list - and stagger each entrance roughly{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>--stagger</code>{" "}
          (100ms) apart. Titles can split further, word-by-word, at a tighter
          ~80ms interval so the eye tracks a wave rather than a block.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Base enter motion",
              v: "translateY(8-12px) + blur(8px) + opacity 0, animating to translateY(0) + blur(0) + opacity 1 over --dur-enter (800ms) with --ease-enter (cubic-bezier(0.25, 0.46, 0.45, 0.94)).",
            },
            {
              k: "Stagger implementation",
              v: "animation-delay: calc(var(--i) * var(--stagger)) - set --i as an inline custom property per child (0, 1, 2, ...) so the delay compounds automatically.",
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Split content into semantic chunks and stagger each ~100ms apart"
            description="A staggered reveal reads as content arriving in order of importance. It also masks layout shift better than one large block popping in at once."
          />
          <RuleCard
            type="dont"
            title="Animate an entire section as one container"
            description="A single large block entering all at once reads as a slide, not a reveal - it hides the hierarchy of what's actually appearing and feels heavier than it needs to."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="EXIT SEQUENCING" heading="Subtle exits">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Exits are shorter and quieter than enters - roughly 150ms (from
          better-ui, jakub.kr). Use a small fixed{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>translateY(-12px)</code>{" "}
          or just fade opacity and blur; never move the element the full height
          of its container. Exit duration is always less than enter duration -
          the user already understood the content, so getting it out of the way
          fast reads as responsive rather than abrupt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Exit with a small fixed translateY(-12px) or opacity + blur fade, ~150ms"
            description="A small, quick exit removes the element without drawing attention away from whatever appears next. Duration under the enter duration keeps the asymmetry the system relies on."
          />
          <RuleCard
            type="dont"
            title="Move an exiting element the full height of the viewport or container"
            description="Full-height exit motion competes for attention with the next state and takes longer than the dismissal deserves - the user already dismissed it, don't make them watch it leave."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="ICONS" heading="Contextual icon animation">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Animate icon swaps - copy becoming a checkmark, play becoming pause -
          never toggle visibility with a hard cut (from better-ui, jakub.kr).
          Scale from 0.25 to 1, opacity from 0 to 1, blur from 4px to 0.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>With a motion library.</strong> Use a spring with{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>duration: 0.3, bounce: 0</code>.
            Bounce is always 0 for icon swaps - any overshoot on a small glyph
            reads as a glitch, not personality.
          </li>
          <li>
            <strong>Without a motion library.</strong> Keep both icons mounted in
            the DOM simultaneously (one absolutely positioned over the other) and
            cross-fade between them with a CSS transition using{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>--ease-out</code>.
          </li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Cross-fade icon swaps with scale 0.25→1, opacity 0→1, blur 4px→0"
            description="A small scale-and-blur transition communicates a state change (copied, completed, toggled) without the abruptness of a hard visibility swap."
          />
          <RuleCard
            type="dont"
            title="Toggle icon visibility with display: none / block or a hard conditional swap"
            description="A hard cut between icons reads as a flicker, not a confirmation. The user misses the feedback that the click actually registered."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="MOUNT BEHAVIOR" heading="Skip animation on load">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          On <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>AnimatePresence</code>, set{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>initial={"{false}"}</code>{" "}
          so state-toggle elements - icons, tabs, toggles - don't play their
          enter animation on first render (from better-ui, jakub.kr). The
          element should just be there when the page loads, not visibly animate
          into existence for no reason. This does not apply to intentional
          hero or loading entrances, where the first-paint animation is the
          point.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Set initial={false} on AnimatePresence for state-toggle elements"
            description="Icons, tabs, and toggles that reflect existing state shouldn't animate in on first render - they should look like they were always there."
          />
          <RuleCard
            type="dont"
            title="Apply initial={false} to intentional hero or loading entrances"
            description="A deliberate first-paint reveal is the one case where the enter animation is the point - skipping it there removes the effect the section was designed for."
          />
        </div>
      </DocSection>
    </div>
  );
}
