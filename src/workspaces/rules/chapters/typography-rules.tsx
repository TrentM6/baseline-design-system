import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function TypographyRules() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Typography Rules
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Type scale, heading hierarchy, line length, and readability rules that
        make text easy to read and scan. Typography is the primary vehicle for
        content - get it right and everything else follows.
      </p>

      <DocSection eyebrow="FAMILIES" heading="Font families">
        <DocKeyValue
          rows={[
            {
              k: "Geist",
              v: "Headings - geometric, modern, confident. Used for page titles, section headers, display text, and any typographic element that needs to command attention and establish hierarchy.",
            },
            {
              k: "Satoshi",
              v: "Body text - humanist, readable, warm. Used for running copy, labels, descriptions, form inputs, and all text that users spend time reading. Excellent legibility at small sizes.",
            },
            {
              k: "Geist Mono",
              v: "Code and data - monospaced for technical content. Used for code snippets, terminal output, data values, API references, and anywhere character alignment matters.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="SCALE" heading="Type scale">
        <DocKeyValue
          rows={[
            {
              k: "text-2xl - 24px",
              v: "Page titles. The largest text in standard interfaces. One per page, establishes the primary context.",
            },
            {
              k: "text-xl - 20px",
              v: "Section headers. Major content divisions within a page. Used with font-heading and font-medium.",
            },
            {
              k: "text-lg - 18px",
              v: "Sub-section headers. Secondary divisions within a section. Bridges the gap between section headers and body text.",
            },
            {
              k: "text-base - 16px",
              v: "Emphasized body. Used for lead paragraphs, callout text, and body copy that needs slightly more visual weight than standard.",
            },
            {
              k: "text-[14px]",
              v: "Standard body - Baseline's default. The workhorse size for all running text, descriptions, table cells, and form labels. Optimized for Satoshi's readability.",
            },
            {
              k: "text-[13px]",
              v: "Supporting text and captions. Secondary information that accompanies primary content - timestamps, helper text, metadata summaries.",
            },
            {
              k: "text-[12px]",
              v: "Labels, badges, and metadata. Small but still legible. Used for tags, status indicators, column headers, and compact UI elements.",
            },
            {
              k: "text-[11px]",
              v: "Eyebrows and overlines. The smallest text in the system. Used exclusively for category labels and section eyebrows set in uppercase with letter-spacing.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="READABILITY" heading="Readability rules">
        <DocKeyValue
          rows={[
            {
              k: "Line length",
              v: "45–75 characters optimal, never exceed 80. Lines that are too long cause the eye to lose its place when returning to the left margin. Use max-width to constrain.",
            },
            {
              k: "Line height",
              v: "1.5 for body text, 1.25 for headings. Body text needs generous leading for comfortable reading. Headings are shorter and can be tighter.",
            },
            {
              k: "Paragraph spacing",
              v: "margin-bottom equals line-height for visual rhythm. This creates even vertical cadence between paragraphs that feels natural and predictable.",
            },
            {
              k: "Font weight",
              v: "400 for body, 500 for headings and emphasis, 600 sparingly for strong emphasis. Avoid 700+ in interfaces - bold is for documents, medium is for UI.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="STRUCTURE" heading="Heading hierarchy">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Never skip heading levels - going from h2 to h4 breaks the document
          outline and confuses screen readers that use headings for navigation.
          One h1 per page, always. Headings describe structure, not style - don't
          reach for h3 because you want smaller text, use a className instead.
          The heading level communicates semantic depth in the content hierarchy;
          the className controls visual presentation. These are independent
          concerns and must stay independent.
        </p>
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Use text-[14px] as the default body size"
            description="14px is Baseline's standard body size, optimized for Satoshi's readability characteristics. It balances information density with comfortable reading across screen distances."
          />
          <RuleCard
            type="dont"
            title="Use text-xs (12px) for body copy - it's below the readability threshold"
            description="12px is reserved for labels, badges, and metadata. Using it for running text forces users to lean in and strains readability, especially on high-density displays."
          />
          <RuleCard
            type="do"
            title="Maintain heading hierarchy (h2, h3, h4 in order)"
            description="Sequential heading levels create a navigable document outline for screen readers and establish clear visual hierarchy for sighted users."
          />
          <RuleCard
            type="dont"
            title="Skip heading levels for visual sizing - use className instead"
            description="An h4 after an h2 breaks the document outline. If you want h4-sized text under an h2, use an h3 with a smaller className. Semantics and styling are independent."
          />
        </div>
      </DocSection>
    </div>
  );
}
