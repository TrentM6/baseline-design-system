import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function FeedbackPatterns() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Feedback Patterns
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Users need to know what happened, what's happening, and what will happen
        next. Every action must produce visible, timely feedback.
      </p>

      <DocSection eyebrow="TAXONOMY" heading="Feedback types">
        <p>
          Each feedback type serves a distinct moment in the user's workflow.
          Choosing the right type depends on timing, persistence, and whether
          the user needs to act on the information.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Inline validation",
              v: "Immediate — field border color + helper text. Fires on blur to confirm or correct input while the user is still in context.",
            },
            {
              k: "Toast notification",
              v: "Transient — 4-5 seconds, auto-dismiss, action optional. For confirmations and non-critical alerts that don't require the user to stop what they're doing.",
            },
            {
              k: "Progress indicator",
              v: "Ongoing — determinate bar or indeterminate spinner. Shows that work is happening and, when possible, how much remains.",
            },
            {
              k: "Empty state",
              v: "Informational — explains absence + suggests next step. Fills what would otherwise be a confusing blank area with guidance.",
            },
            {
              k: "Skeleton screen",
              v: "Anticipatory — shows layout shape during load. Reduces perceived wait time by giving the user a preview of the structure they're about to see.",
            },
            {
              k: "Optimistic update",
              v: "Immediate — shows expected result before server confirms. The UI assumes success and rolls back only if the server rejects the change.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Toast notification rules">
        <DocKeyValue
          rows={[
            {
              k: "Duration",
              v: "4-5 seconds for informational toasts. Errors that require user action must persist until dismissed — don't auto-remove a message the user needs to read.",
            },
            {
              k: "Placement",
              v: "Top-right or bottom-right, consistent across the entire application. Pick one position and never vary it — users build spatial memory for notifications.",
            },
            {
              k: "Stacking",
              v: "Newest on top, max 3 visible at once. If a fourth toast arrives, the oldest is dismissed. Stacking more than 3 creates a wall of text nobody reads.",
            },
            {
              k: "Content",
              v: "Short sentence + optional action button. 'Project saved' is good. 'Your project has been successfully saved to the database' is not. Keep it scannable.",
            },
            {
              k: "Accessibility",
              v: "Must use an aria-live region so screen readers announce the toast when it appears. Without this, the notification is invisible to non-visual users.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Validation patterns">
        <DocKeyValue
          rows={[
            {
              k: "Validate on blur",
              v: "Not on every keystroke — that's too aggressive. Let the user finish typing before judging their input. Keystroke validation creates anxiety.",
            },
            {
              k: "Show success state",
              v: "Green check when a field is valid. Positive feedback is as important as error feedback — it tells the user they can move on with confidence.",
            },
            {
              k: "Show error inline",
              v: "Red border + helper text below the field. The error message should explain what's wrong and how to fix it, not just 'Invalid input.'",
            },
            {
              k: "Don't clear valid input",
              v: "If one field errors on submit, keep all other field values intact. Clearing the form because one field failed is one of the most hostile patterns in UI.",
            },
            {
              k: "Submit button",
              v: "Disable only if you show why — otherwise let them submit and show errors. A disabled button with no explanation is a dead end with no diagnosis.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Empty state design">
        <p>
          Empty states are not error states. They are opportunities to guide the
          user. Show what this area will contain, explain how to populate it, and
          provide a clear call to action. Never show a blank area with no
          explanation.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Explain the absence.</strong> "No projects yet" tells the
            user this is normal, not broken. "Something went wrong" is an error
            — different state, different treatment.
          </li>
          <li>
            <strong>Show what will go here.</strong> A subtle illustration or
            icon that represents the content type helps the user understand what
            this area is for, even before it has data.
          </li>
          <li>
            <strong>Provide a clear action.</strong> A "Create your first
            project" button turns a dead end into an onboarding moment. Every
            empty state should answer "what do I do now?"
          </li>
          <li>
            <strong>Don't over-design.</strong> Empty states should be helpful,
            not theatrical. A simple message with a single CTA is more effective
            than an elaborate illustration with a paragraph of copy.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Feedback guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Show inline validation messages next to the field that has an issue"
            description="Proximity is everything in error feedback. The message should appear directly below the field it refers to, not in a remote location the user has to hunt for."
          />
          <RuleCard
            type="dont"
            title="Collect all errors in a banner at the top of the page"
            description="Error banners force the user to read a list, find their field, scroll to it, fix it, then scroll back to check. Inline messages eliminate all of that."
          />
          <RuleCard
            type="do"
            title="Use skeleton screens to show page structure during loading"
            description="Skeletons reduce perceived load time by showing the user what's coming. They also prevent layout shift when content arrives, because the space is already allocated."
          />
          <RuleCard
            type="dont"
            title="Show a full-screen spinner that hides the page layout"
            description="A spinner with no structure tells the user nothing about what they're waiting for or how long it will take. It also causes a jarring layout shift when content appears."
          />
          <RuleCard
            type="do"
            title="Design empty states with guidance and a call to action"
            description="An empty state is a first-run experience in disguise. Use it to teach the user what this area does and give them a clear next step to populate it."
          />
          <RuleCard
            type="dont"
            title="Show a blank area or just the text 'No data'"
            description="A blank area looks broken. 'No data' is technically accurate but tells the user nothing about why it's empty or what to do about it."
          />
        </div>
      </DocSection>
    </div>
  );
}
