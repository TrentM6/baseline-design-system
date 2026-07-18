import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function HoverFocusStates() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Hover & Focus States
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Every interactive element needs clear visual states for hover, focus,
        active, and disabled. These states communicate interactivity and provide
        feedback.
      </p>

      <DocSection eyebrow="FUNDAMENTALS" heading="State definitions">
        <DocKeyValue
          rows={[
            {
              k: "Default",
              v: "Resting state - no interaction. The element's baseline appearance as defined by its tokens. This is what the user sees before any engagement.",
            },
            {
              k: "Hover",
              v: "Mouse over - subtle background shift or underline. Signals that the element is interactive and will respond to a click.",
            },
            {
              k: "Focus-visible",
              v: "Keyboard navigation - 2px ring using the --bl-focus-ring token. Appears only on keyboard focus, not mouse click. Essential for accessibility.",
            },
            {
              k: "Active / Pressed",
              v: "Mouse down or Enter key - slight scale reduction or background darken. Confirms the interaction is registering before the action completes.",
            },
            {
              k: "Disabled",
              v: "Non-interactive - reduced opacity, cursor: not-allowed, no pointer events. The element is visible but cannot be activated.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Hover patterns by element type">
        <DocKeyValue
          rows={[
            {
              k: "Buttons",
              v: "Lighten or darken the background by one step on the token scale. Primary buttons darken; ghost and outline buttons add a subtle background tint.",
            },
            {
              k: "Links",
              v: "Underline on hover, not by default. Inline links in body text are the exception - they keep a permanent underline for discoverability.",
            },
            {
              k: "Cards",
              v: "Subtle elevation change or border highlight. The entire card surface is the hover target - don't limit the hover zone to just the title or action area.",
            },
            {
              k: "Table rows",
              v: "Background tint for scanability. Use a light wash of --bl-bg-elevated so the row highlights without competing with selection state.",
            },
            {
              k: "Icons",
              v: "Opacity shift or color change. Interactive icon buttons shift from --bl-fg-secondary to --bl-fg-primary on hover.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Focus-visible rules">
        <p>
          Use <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>:focus-visible</code>, not{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>:focus</code>.
          Focus rings should be visible against all backgrounds. The standard
          ring is 2px solid using the --bl-focus-ring token with a 2px offset.
          Never remove focus styles without providing an equally visible
          alternative.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Keyboard-only visibility.</strong> :focus-visible ensures
            rings appear during keyboard navigation but not on mouse click,
            keeping the UI clean for pointer users while remaining accessible.
          </li>
          <li>
            <strong>Contrast requirement.</strong> The focus ring must meet
            3:1 contrast against both the focused element and the adjacent
            background. Test on every surface level the element appears on.
          </li>
          <li>
            <strong>Offset matters.</strong> The 2px offset separates the ring
            from the element border, preventing visual collision on elements
            that already have a visible border.
          </li>
          <li>
            <strong>Never suppress without replacement.</strong> If the default
            ring conflicts with a specific layout, replace it with an equally
            visible alternative - a background shift, inner glow, or thicker
            border - never just <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>outline: none</code>.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Disabled state rules">
        <DocKeyValue
          rows={[
            {
              k: "Opacity",
              v: "0.5 for disabled elements. This is dim enough to read as inactive but visible enough to understand what the control would do if enabled.",
            },
            {
              k: "Cursor",
              v: "not-allowed to signal non-interactivity. The cursor change is a secondary affordance - don't rely on it as the only disabled indicator.",
            },
            {
              k: "Pointer events",
              v: "none to prevent click handlers from firing. This ensures disabled elements can't be activated by any pointer interaction.",
            },
            {
              k: "Tooltip",
              v: "Explain WHY it's disabled if not obvious. A tooltip on a disabled submit button might say 'Complete all required fields to continue.'",
            },
            {
              k: "Color",
              v: "Do not rely on color change alone to indicate disabled. The opacity reduction plus cursor change work together - color alone fails WCAG SC 1.4.1.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="State guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use :focus-visible to show focus rings only for keyboard navigation"
            description="Keyboard users need the ring to track their position. Mouse users don't - showing it on click is visual noise that makes the UI feel less polished."
          />
          <RuleCard
            type="dont"
            title="Use :focus which shows rings on mouse click too"
            description="Blanket :focus styling produces a ring on every mouse click, which confuses pointer users and trains them to ignore the ring when it actually matters."
          />
          <RuleCard
            type="do"
            title="Explain why a control is disabled via tooltip"
            description="A greyed-out button with no explanation is a dead end. A tooltip that says 'Select at least one item to export' turns a blocked state into guidance."
          />
          <RuleCard
            type="dont"
            title="Just grey out a button without any explanation"
            description="Users shouldn't have to guess why something is disabled. Without context, they may think the feature is broken rather than conditionally unavailable."
          />
          <RuleCard
            type="do"
            title="Provide hover states on all interactive elements"
            description="Hover feedback confirms interactivity before the user commits to a click. Every clickable element should visually respond to the cursor."
          />
          <RuleCard
            type="dont"
            title="Use hover-only reveals for essential content - mobile has no hover"
            description="Content that appears only on hover is invisible to touch users. Use hover to enhance, never to gate access to information or actions."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="TACTILE FEEDBACK" heading="Scale on press">
        <p>
          A subtle <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>active:scale-[0.96]</code> (the{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>--press-scale</code>{" "}
          token) gives buttons tactile feedback - the element visibly compresses
          under the pointer, confirming the press registered before the action
          completes (from better-ui, jakub.kr). Keep it fixed at 0.96; never scale
          below 0.95 - anything more aggressive reads as exaggerated bounce rather
          than a press.
        </p>
        <p>
          Drive the scale with a CSS transition, not a keyframe animation, so it
          stays interruptible - if the pointer lifts mid-press, the element eases
          back from wherever it currently is instead of finishing a fixed
          timeline. Offer a way to disable the press scale on controls where the
          motion would distract - dense toolbars, drag handles, or any element
          honoring <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>prefers-reduced-motion</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use active:scale-[0.96] driven by a CSS transition"
            description="0.96 (--press-scale) reads as a confident, consistent press across every button in the system, and a transition lets the release ease back smoothly from any point mid-press."
          />
          <RuleCard
            type="dont"
            title="Scale below 0.95 or animate the press with @keyframes"
            description="A more aggressive scale feels exaggerated rather than tactile, and a keyframe-driven press can't reverse cleanly if the pointer lifts before the animation finishes."
          />
        </div>
      </DocSection>
    </div>
  );
}
