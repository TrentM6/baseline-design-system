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
              k: "--dur-instant — 100ms",
              v: "Hover states, focus rings, color shifts. Interactions that need to feel instantaneous — the user shouldn't perceive a delay, just a smooth state change.",
            },
            {
              k: "--dur-quick — 200ms",
              v: "Button press, toggle switch, tooltip appear, popover open/close. Fast enough to feel responsive, slow enough for the eye to register the transition.",
            },
            {
              k: "--dur-medium — 300ms",
              v: "Drawer slide, accordion expand/collapse, modal entrance. These elements move larger distances and need enough time to communicate their spatial origin.",
            },
            {
              k: "--dur-slow — 500ms",
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
              v: "Entrances. The element arrives quickly and settles into its final position. Objects entering the viewport should decelerate — they're coming to rest.",
            },
            {
              k: "ease-in",
              v: "Exits. The element starts slowly and accelerates away. Objects leaving the viewport should speed up — they're departing and the user's attention should release.",
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
          instant cuts — use opacity changes only, no transforms. Never remove
          information that animation conveys. If a slide-in transition reveals
          content, make the content appear immediately instead of animating it.
          The information must arrive; only the motion is optional. This is not a
          nice-to-have — it's a WCAG 2.2 AA requirement and a non-negotiable
          part of every component's accessibility checklist.
        </p>
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Use --dur-quick for tooltips and popovers"
            description="200ms is the sweet spot for small overlays — fast enough that they feel responsive, slow enough that the appearance isn't jarring."
          />
          <RuleCard
            type="dont"
            title="Write raw ms values like transition: 200ms"
            description="Raw duration values bypass the token system and can't be globally adjusted. Always reference --dur-instant, --dur-quick, --dur-medium, or --dur-slow."
          />
          <RuleCard
            type="do"
            title="Honor prefers-reduced-motion: reduce"
            description="Wrap every animation in a reduced-motion media query. Replace transforms with opacity-only transitions or instant cuts. Never skip content — only skip motion."
          />
          <RuleCard
            type="dont"
            title="Use animation for decoration — every motion must have a functional purpose"
            description="Bouncing icons, pulsing badges, and gratuitous parallax add visual noise without serving feedback, spatial, attention, or context purposes. Remove them."
          />
        </div>
      </DocSection>
    </div>
  );
}
