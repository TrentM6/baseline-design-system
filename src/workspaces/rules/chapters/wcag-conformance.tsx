import { DocSection, DocKeyValue } from "@/docs/doc-section";

export default function WcagConformance() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        WCAG 2.2 AA Conformance
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The accessibility floor every approved component must clear. We target
        WCAG 2.2 Level AA - the conformance bar US federal procurement
        (Section 508) and most enterprise buyers require.
      </p>

      <DocSection heading="The four POUR principles">
        <p>
          WCAG groups its rules under four principles. Every component review
          walks this list - if a violation falls under any one of them, the
          component cannot promote past <strong>In review</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Perceivable.</strong> Information and UI must be presentable
            in ways users can perceive - text alternatives for non-text,
            sufficient contrast, content not conveyed by colour alone.
          </li>
          <li>
            <strong>Operable.</strong> All interaction must be reachable from
            keyboard, with visible focus, and without timing traps.
          </li>
          <li>
            <strong>Understandable.</strong> Text is readable, behaviour is
            predictable, and errors are caught with help.
          </li>
          <li>
            <strong>Robust.</strong> Markup parses cleanly, name/role/value are
            exposed for assistive tech, and status messages are announced.
          </li>
        </ul>
      </DocSection>

      <DocSection eyebrow="ENFORCEMENT" heading="The five rules every component must pass">
        <p>
          These catch ~95% of the violations we see. A component cannot ship to{" "}
          <strong>Approved</strong> with a known failure on any of them.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Contrast",
              v: "Body text ≥ 4.5:1. Large text (18pt+ or 14pt+ bold) and UI controls ≥ 3:1. WCAG SC 1.4.3 / 1.4.11.",
            },
            {
              k: "Keyboard",
              v: "Every interactive element reachable via Tab, activatable via Enter/Space, with visible :focus-visible ring. WCAG SC 2.1.1 / 2.4.7.",
            },
            {
              k: "Name",
              v: "Every control has an accessible name - text content, aria-label, or aria-labelledby. Icon-only buttons must declare one. WCAG SC 4.1.2.",
            },
            {
              k: "Not by colour",
              v: "Status, validity, and required-ness use a glyph or label in addition to colour. Tone is reinforcement, never the sole signal. WCAG SC 1.4.1.",
            },
            {
              k: "Live regions",
              v: "Async updates - toast, async error, autosave - fire through aria-live so screen readers hear them. WCAG SC 4.1.3.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="ENFORCEMENT" heading="Per-component checklist">
        <p>
          Accessibility is checked at the component level, as part of
          promotion. Every component carries these checks; promotion to{" "}
          <strong>Approved</strong> requires a pass on every box.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Contrast.</strong> All foreground/background pairs measured
            against WCAG SC 1.4.3 / 1.4.11. Body text ≥ 4.5:1, UI/large text ≥ 3:1.
          </li>
          <li>
            <strong>Keyboard reach.</strong> Every interactive element reachable
            via Tab, activatable via Enter/Space, in a sane order.
          </li>
          <li>
            <strong>Focus visible.</strong> Inherits the centralised{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
              :focus-visible
            </code>{" "}
            ring; no custom focus suppression.
          </li>
          <li>
            <strong>Accessible name.</strong> Every control has visible text
            content or{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
              aria-label
            </code>
            . Icon-only buttons declare a label.
          </li>
          <li>
            <strong>Roles + state.</strong> Tablists, listboxes, dialogs,
            alerts use the correct ARIA role + state attributes; no decorative ARIA.
          </li>
          <li>
            <strong>Not by colour.</strong> Status, validity, and required-ness
            reinforced by glyph or label, not colour alone.
          </li>
          <li>
            <strong>Live updates.</strong> Async changes (toast, autosave)
            route through{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
              aria-live
            </code>
            .
          </li>
          <li>
            <strong>Reduced motion.</strong> Animations honour{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
              prefers-reduced-motion
            </code>{" "}
            per the motion tokens.
          </li>
        </ol>
      </DocSection>
    </div>
  );
}
