import { DocSection, DocKeyValue } from "@/docs/doc-section";

export default function HeuristicPrinciples() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Heuristic Principles
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Jakob Nielsen's 10 usability heuristics, applied to the Baseline design
        system. These are broad rules of thumb — not specific usability
        guidelines — but they catch the majority of usability problems.
      </p>

      <DocSection eyebrow="01" heading="Visibility of system status">
        <p>
          The system should always keep users informed about what is going on,
          through appropriate feedback within reasonable time.
        </p>
        <DocKeyValue
          rows={[
            { k: "Loading states", v: "Use Skeleton primitives during async loads. Never show a blank screen." },
            { k: "Progress", v: "Use Progress bars for determinate operations, spinners for indeterminate." },
            { k: "Success/error", v: "Toast notifications (Sonner) for async outcomes. Inline validation for forms." },
            { k: "Active state", v: "Selected tabs, active nav items, and pressed buttons must visually confirm the interaction." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="02" heading="Match between system and real world">
        <p>
          Use language and concepts familiar to the user, not system-oriented
          terms. Follow real-world conventions — information appears in a
          natural and logical order.
        </p>
        <DocKeyValue
          rows={[
            { k: "Labels", v: "Use task-oriented labels ('Save changes', not 'Submit'). Avoid technical jargon." },
            { k: "Icons", v: "Use universally recognized icons (Lucide set). Pair with text labels for ambiguous actions." },
            { k: "Order", v: "Most important actions first. Chronological for timelines. Alphabetical for long lists." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="03" heading="User control and freedom">
        <p>
          Users often perform actions by mistake. They need a clearly marked
          "emergency exit" — undo, cancel, back. Support this without requiring
          a confirmation dialog for every action.
        </p>
        <DocKeyValue
          rows={[
            { k: "Undo", v: "Destructive actions should offer undo (toast with undo button) rather than confirmation dialogs." },
            { k: "Cancel", v: "Every dialog and form has a clear cancel path. Escape key dismisses overlays." },
            { k: "Back", v: "Hash routing supports browser back/forward. Never trap users in a flow." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="04" heading="Consistency and standards">
        <p>
          Users should not have to wonder whether different words, situations,
          or actions mean the same thing. Follow platform conventions. This is
          the core reason the design system exists.
        </p>
        <DocKeyValue
          rows={[
            { k: "Components", v: "Use system primitives. Don't build a custom button when Button exists." },
            { k: "Tokens", v: "Use semantic tokens. --bl-fg-primary always means primary text, everywhere." },
            { k: "Patterns", v: "Same action, same pattern. Delete always uses destructive variant + confirmation." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="05" heading="Error prevention">
        <p>
          Even better than good error messages is a design that prevents errors
          from occurring in the first place. Eliminate error-prone conditions
          or check for them and present users with a confirmation.
        </p>
        <DocKeyValue
          rows={[
            { k: "Constraints", v: "Disable invalid options rather than showing errors after selection." },
            { k: "Defaults", v: "Pre-fill sensible defaults. Empty states with guidance, not blank screens." },
            { k: "Confirmation", v: "Only for irreversible destructive actions. Use undo for everything else." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="06" heading="Recognition rather than recall">
        <p>
          Minimize the user's memory load by making elements, actions, and
          options visible. The user should not have to remember information
          from one part of the interface to another.
        </p>
        <DocKeyValue
          rows={[
            { k: "Labels", v: "Always label inputs. Placeholder text is not a label — it disappears on focus." },
            { k: "Context", v: "Show relevant information in context. Don't make users navigate away to find what they need." },
            { k: "Recent items", v: "Show recently used items, recent searches, or recent files to reduce recall burden." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="07" heading="Flexibility and efficiency of use">
        <p>
          Accelerators — unseen by novices — may speed up interaction for
          experts. Allow users to tailor frequent actions.
        </p>
        <DocKeyValue
          rows={[
            { k: "Keyboard shortcuts", v: "Power users expect them. Document and surface them in tooltips." },
            { k: "Command palette", v: "A searchable action launcher for keyboard-first users." },
            { k: "Sensible defaults", v: "Works out of the box for novices. Customizable for experts." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="08" heading="Aesthetic and minimalist design">
        <p>
          Every extra unit of information competes with relevant information
          and diminishes its relative visibility. Remove what doesn't serve
          the task.
        </p>
        <DocKeyValue
          rows={[
            { k: "Content density", v: "Default to comfortable spacing. Offer compact mode for data-heavy screens." },
            { k: "Progressive disclosure", v: "Show summary first, details on demand. Accordions, drawers, drill-downs." },
            { k: "Visual noise", v: "Minimize borders, reduce color variety, use whitespace to separate — not lines." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="09" heading="Help users recognize, diagnose, and recover from errors">
        <p>
          Error messages should be expressed in plain language, precisely
          indicate the problem, and constructively suggest a solution.
        </p>
        <DocKeyValue
          rows={[
            { k: "Tone", v: "Neutral, not alarming. 'That email address isn't valid' not 'ERROR: INVALID INPUT'." },
            { k: "Location", v: "Inline, next to the field that caused it. Not in a banner at the top of the page." },
            { k: "Recovery", v: "Tell the user what to do. 'Try a different email' not just 'Invalid'." },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="10" heading="Help and documentation">
        <p>
          It may be necessary to provide help and documentation. Any such
          information should be easy to search, focused on the user's task,
          list concrete steps, and not be too large.
        </p>
        <DocKeyValue
          rows={[
            { k: "Tooltips", v: "Short, contextual help on hover/focus. Use for icon-only controls and unfamiliar labels." },
            { k: "Empty states", v: "When a screen has no data, explain what it's for and how to populate it." },
            { k: "Inline guidance", v: "Helper text below inputs. Contextual hints, not lengthy instructions." },
          ]}
        />
      </DocSection>
    </div>
  );
}
