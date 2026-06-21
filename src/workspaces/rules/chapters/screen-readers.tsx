import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ScreenReaders() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Screen Reader Support
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Screen readers translate visual interfaces into spoken or braille
        output. Proper semantics and ARIA usage ensure that every user —
        regardless of how they perceive the page — gets the same information
        and the same controls.
      </p>

      <DocSection eyebrow="SEMANTICS" heading="ARIA roles">
        <p>
          ARIA roles tell assistive technology what an element is and how it
          behaves. The first rule of ARIA is: don't use ARIA if native HTML
          already provides the semantics you need.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Native HTML first",
              v: "Use button, nav, main, dialog, and other semantic elements before adding ARIA roles. A <button> already has role=\"button\", keyboard handling, and activation — a <div role=\"button\"> requires you to rebuild all of that.",
            },
            {
              k: "role=\"dialog\"",
              v: "Applied to modal containers. Requires aria-labelledby pointing to the dialog title and aria-modal=\"true\" to signal that content behind the dialog is inert.",
            },
            {
              k: "role=\"alert\"",
              v: "For urgent error messages that need immediate attention. The content is announced as soon as it appears — use sparingly to avoid overwhelming the user.",
            },
            {
              k: "role=\"status\"",
              v: "For non-urgent status updates like save confirmations or progress indicators. Announced at the next convenient pause in speech, not immediately.",
            },
            {
              k: "role=\"navigation\"",
              v: "Applied to navigation landmarks. If a page has multiple nav regions, each must have a unique aria-label (e.g., \"Primary navigation\", \"Footer navigation\").",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Live regions">
        <p>
          Live regions are how screen readers learn about dynamic content
          changes — toast notifications, form validation, autosave
          confirmations, and real-time updates. Without them, these changes
          happen silently.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "aria-live=\"polite\"",
              v: "For non-urgent updates: status messages, save confirmations, progress changes. The screen reader waits until the user is idle before announcing. Use this as the default.",
            },
            {
              k: "aria-live=\"assertive\"",
              v: "For urgent messages: validation errors, session timeouts, critical alerts. The screen reader interrupts whatever it's currently saying. Use only when delay could cause the user to miss important information.",
            },
            {
              k: "aria-atomic",
              v: "When set to \"true\", the entire live region is re-read on any change — not just the part that changed. Use for elements like countdown timers or score displays where partial reads are confusing.",
            },
            {
              k: "Toast notifications",
              v: "Every toast must render inside an aria-live region. Without it, the toast appears visually but is completely invisible to screen reader users — a silent failure.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Landmark regions">
        <p>
          Landmarks give screen reader users a structural map of the page.
          They can jump between landmarks the way sighted users scan with
          their eyes. A page without landmarks is a flat wall of content
          with no navigation handholds.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "main",
              v: "The primary content area. Every page must have exactly one <main> element. Screen readers offer a shortcut to jump directly to it.",
            },
            {
              k: "nav",
              v: "Navigation blocks. Label each with aria-label when there are multiple (\"Primary navigation\", \"Breadcrumb\"). Don't wrap every list of links in nav — only true navigation.",
            },
            {
              k: "aside",
              v: "Complementary content that is related to but separate from the main content — sidebars, related links, supplementary information.",
            },
            {
              k: "header / footer",
              v: "Page-level header and footer landmarks. When nested inside main, section, or article, they become scoped landmarks rather than page-level.",
            },
            {
              k: "form",
              v: "Search forms and significant data-entry forms should be landmarks. Add aria-label to describe the form's purpose (\"Search projects\", \"Account settings\").",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Alt text and accessible names">
        <DocKeyValue
          rows={[
            {
              k: "Describe function, not appearance",
              v: "\"Search\" not \"magnifying glass icon.\" \"Close dialog\" not \"X button.\" The alt text should tell the user what the element does, not what it looks like.",
            },
            {
              k: "Empty alt for decorative images",
              v: "Decorative images — visual flourishes, background patterns, illustrative graphics — must use alt=\"\" (empty string). This tells screen readers to skip them entirely.",
            },
            {
              k: "aria-label for icon-only buttons",
              v: "A button with only an icon and no visible text must have aria-label describing its action. Without it, the screen reader announces \"button\" with no context.",
            },
            {
              k: "No 'image of' prefix",
              v: "Screen readers already announce \"image\" before reading the alt text. Writing \"Image of a sunset\" results in \"image, image of a sunset\" — redundant and noisy.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Screen reader guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use semantic HTML (button, nav, main) before reaching for ARIA"
            description="Native elements come with built-in roles, keyboard handling, and screen reader support. ARIA is a repair tool for when HTML semantics fall short — not a first choice."
          />
          <RuleCard
            type="dont"
            title="Add role='button' to a div when you could use a button element"
            description="A div with role='button' needs tabIndex, keydown handlers for Enter and Space, and an accessible name. A <button> gives you all of that for free."
          />
          <RuleCard
            type="do"
            title="Test with a real screen reader (VoiceOver, NVDA)"
            description="Automated tools catch structural issues but miss the lived experience. Turn on VoiceOver, close your eyes, and try to complete a task — that's the real test."
          />
          <RuleCard
            type="dont"
            title="Rely solely on automated accessibility checkers"
            description="Automated tools catch roughly 30-40% of accessibility issues. They can't tell you if an aria-label makes sense in context, or if the tab order is logical."
          />
        </div>
      </DocSection>
    </div>
  );
}
