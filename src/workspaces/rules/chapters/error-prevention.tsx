import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ErrorPrevention() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Error Prevention
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The best error message is one the user never sees. Design systems that
        prevent errors before they happen rather than reporting them after the
        fact. Every error a user encounters is a failure of the interface, not
        the user.
      </p>

      <DocSection heading="Prevention strategies">
        <DocKeyValue
          rows={[
            {
              k: "Inline validation",
              v: "Validate as the user types or on blur — not on submit. Immediate feedback lets users correct mistakes in context, before they've moved on mentally.",
            },
            {
              k: "Constraint-based design",
              v: "Disable invalid options rather than letting users select them and then showing an error. A date picker that grays out unavailable dates prevents the error entirely.",
            },
            {
              k: "Smart defaults",
              v: "Pre-fill known values — country from locale, currency from region, name from account. Every pre-filled field is one less opportunity for a typo or omission.",
            },
            {
              k: "Type-ahead / autocomplete",
              v: "Reduce free-text entry wherever possible. Autocomplete for addresses, tags, and usernames eliminates spelling errors and speeds input.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Undo over confirmation">
        <p>
          Prefer undo (a toast with an undo button) over "Are you sure?"
          confirmation dialogs. Confirmation fatigue is real — users click
          "Yes" reflexively after the third dialog, which means the dialog
          protects nothing. Undo is superior because it lets the user act
          confidently and reverse mistakes without friction.
        </p>
        <p className="mt-3">
          Reserve confirmation dialogs only for truly irreversible destructive
          actions — permanently deleting data with no recovery path, revoking
          access that can't be reinstated, or publishing to a live audience.
          Everything else should be undoable.
        </p>
      </DocSection>

      <DocSection heading="Form validation patterns">
        <DocKeyValue
          rows={[
            {
              k: "Validate on blur, not on change",
              v: "Validating on every keystroke creates a jarring experience — the field screams 'invalid' before the user has finished typing. Wait until they leave the field.",
            },
            {
              k: "Show validation state next to the field",
              v: "Place error messages directly below or beside the input they relate to. A summary of errors at the top of the form forces the user to map errors back to fields.",
            },
            {
              k: "Use helper text proactively",
              v: "Show constraints before the user fails them. 'Password must be 8+ characters' as helper text prevents the error. Showing it only after failure punishes the user for not guessing.",
            },
            {
              k: "Never clear the entire form on error",
              v: "Clearing valid data because one field failed is hostile. Preserve everything the user entered and highlight only the fields that need attention.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Show character count on limited fields before the limit is hit"
            description="A visible counter at 80/100 characters lets the user self-correct. Truncating silently at 100 or rejecting the input after submission is a preventable error."
          />
          <RuleCard
            type="dont"
            title="Wait until form submission to show validation errors"
            description="Batch validation after submit forces the user to scroll back, re-read, and fix — often losing context. Inline, on-blur validation catches problems in real time."
          />
          <RuleCard
            type="do"
            title="Offer undo with a toast after destructive actions"
            description="A 5-second toast with an undo button gives the user a safety net without the friction of a confirmation dialog. It respects their intent while allowing recovery."
          />
          <RuleCard
            type="dont"
            title="Show 'Are you sure?' for every delete action"
            description="Confirmation dialogs for low-stakes actions train users to click 'Yes' without reading. When the truly dangerous action arrives, they'll click through it just as fast."
          />
        </div>
      </DocSection>
    </div>
  );
}
