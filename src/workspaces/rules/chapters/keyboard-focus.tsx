import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function KeyboardFocus() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Keyboard & Focus Management
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Every interaction in Baseline must be reachable and operable via
        keyboard alone. Focus management is how keyboard users navigate - if
        they can't see where they are or reach what they need, the interface
        is broken for them.
      </p>

      <DocSection eyebrow="NAVIGATION" heading="Tab order rules">
        <p>
          Tab order determines the sequence in which interactive elements
          receive focus. A logical, predictable tab order is the foundation of
          keyboard accessibility.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Follow DOM order",
              v: "The visual layout and the DOM order must match. If elements appear left-to-right visually, they must be left-to-right in the source. CSS reordering (order, flex-direction: row-reverse) breaks this.",
            },
            {
              k: "No positive tabIndex",
              v: "Never use tabIndex=\"1\" or any positive value. It overrides natural DOM order and creates an unpredictable experience. Use only tabIndex=\"0\" (add to tab order) or tabIndex=\"-1\" (programmatically focusable, not in tab order).",
            },
            {
              k: "Skip links for long pages",
              v: "Pages with navigation or repeated blocks must include a \"Skip to content\" link as the first focusable element. It becomes visible on focus and jumps past the header. WCAG SC 2.4.1.",
            },
            {
              k: "Logical grouping",
              v: "Related controls (form fields, toolbar buttons, tab lists) should be grouped so Tab moves between groups and arrow keys move within them. This follows the WAI-ARIA composite widget pattern.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Focus visibility">
        <p>
          A keyboard user must always be able to see which element is focused.
          The focus indicator is their cursor - hiding it is the equivalent of
          making the mouse pointer invisible.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Use :focus-visible",
              v: "Style focus with :focus-visible, not :focus. This shows the ring for keyboard users while hiding it for mouse users, giving both a clean experience.",
            },
            {
              k: "Focus ring spec",
              v: "2px solid ring using the --bl-focus-ring token, with a 2px offset from the element edge. The ring must be visible against all background surfaces in both modes.",
            },
            {
              k: "Never suppress focus styles",
              v: "outline: none without a visible replacement is one of the most common accessibility failures. If you remove the browser default, you must provide something better - not nothing.",
            },
            {
              k: "Contrast requirement",
              v: "The focus indicator must have >= 3:1 contrast against the adjacent background. On dark surfaces this typically means a light-colored ring; on light surfaces, a darker one. WCAG SC 2.4.11.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Focus trapping and restoration">
        <p>
          Modal dialogs, dropdown menus, and popovers must manage focus
          carefully. When an overlay opens, focus must be contained within it.
          When it closes, focus must return to where the user was.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Trap focus inside overlays",
              v: "When a modal or dialog opens, Tab and Shift+Tab must cycle through only the elements inside it. Focus must not escape to content behind the overlay.",
            },
            {
              k: "Return focus on close",
              v: "When a modal, dropdown, or popover closes, focus returns to the element that triggered it. If the trigger no longer exists, focus moves to the nearest logical ancestor.",
            },
            {
              k: "Escape dismisses",
              v: "Pressing Escape must close the topmost overlay - modal, dropdown, tooltip, or popover. This is a universal keyboard convention and must be consistent across all components.",
            },
            {
              k: "Auto-focus the first element",
              v: "When a dialog opens, focus moves to the first interactive element inside it (or the close button if the dialog is informational). Never leave focus on the trigger behind the overlay.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Focus management guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use native HTML elements that are keyboard-accessible by default"
            description="button, a, input, select, and textarea are focusable and activatable out of the box. Start with these before reaching for custom implementations."
          />
          <RuleCard
            type="dont"
            title="Add tabIndex to non-interactive elements like divs"
            description="Making a div focusable creates a keyboard trap with no interaction. If it needs to be interactive, it needs role, keyboard handlers, and accessible name too."
          />
          <RuleCard
            type="do"
            title="Return focus to the trigger when closing a modal"
            description="The user opened the modal from a specific button. When it closes, their mental model expects to be back at that button. Breaking this creates disorientation."
          />
          <RuleCard
            type="dont"
            title="Use outline: none without a visible alternative"
            description="Removing the focus ring without replacing it makes the interface unusable for keyboard users. Every focused element must have a visible indicator."
          />
        </div>
      </DocSection>
    </div>
  );
}
