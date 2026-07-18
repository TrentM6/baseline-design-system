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

      <DocSection eyebrow="WRAPPING" heading="Text wrapping & measure">
        <p className="text-[14px] leading-relaxed mb-3" style={{ color: "var(--bl-fg-secondary)" }}>
          Browser-native wrapping controls prevent the small readability failures
          that spacing and font choice alone don't fix (from better-typography,
          jakub.kr).
        </p>
        <DocKeyValue
          rows={[
            {
              k: "text-wrap: balance",
              v: "Headings and titles - distributes words evenly across lines so short heading wraps never leave one orphaned word on the last line. Pair with text-wrap: pretty on the paragraph beneath it.",
            },
            {
              k: "text-wrap: pretty",
              v: "Paragraphs and descriptions - avoids a single orphaned word on the final line of a block. Cheaper than balance for longer text; use it for anything balance shouldn't touch.",
            },
            {
              k: "Measure (line length)",
              v: "Long-form text caps at 65ch (roughly 560-680px) - a full-width paragraph on a wide viewport is a defect, not a stylistic choice. This is stricter than the general 45-80 character range above for body copy that's meant to be read start to finish.",
            },
            {
              k: "Line-height units",
              v: "Always unitless (line-height: 1.5, not line-height: 24px). Unitless line-height scales with the element's own font-size, so it survives responsive resizing; a pixel value locks to one size and breaks the moment text scales.",
            },
            {
              k: "Letter-spacing by size",
              v: "Large headings take a slightly negative tracking (tighter, more confident at scale). Small uppercase labels take positive tracking (legibility at small caps sizes). Body text takes neither - default tracking reads best at 13-16px.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="RENDERING" heading="Numerals & font rendering">
        <DocKeyValue
          rows={[
            {
              k: "Tabular numbers",
              v: "Apply font-variant-numeric: tabular-nums (Baseline's .tnum utility) to any value that changes in place - counters, table cells, meters, live stat tiles. Fixed digit width stops the layout from twitching sideways as digits change. Prefer font-variant-numeric over font-feature-settings: \"tnum\" 1 - it's the modern, more broadly supported property.",
            },
            {
              k: "Font smoothing",
              v: "-webkit-font-smoothing: antialiased and -moz-osx-font-smoothing: grayscale, applied once at the root layout - not per component. Renders Geist and Satoshi thinner and crisper on macOS; setting it per-component is redundant and risks inconsistency if one surface forgets it.",
            },
            {
              k: "font-synthesis: none",
              v: "Prevents the browser from faking a bold or italic weight it doesn't have loaded. Use an actual font-weight value from the loaded family (400/500/600) instead of relying on synthesis - never font-variation-settings: \"wght\" as a substitute for font-weight.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="TRUNCATION" heading="Truncation, case & underlines">
        <DocKeyValue
          rows={[
            {
              k: "Single-line truncation",
              v: "text-overflow: ellipsis + overflow: hidden + white-space: nowrap together - all three are required, none work alone. Keep the full text reachable via a tooltip or expand affordance; truncation must never be the only way to read a value.",
            },
            {
              k: "Multi-line truncation",
              v: "line-clamp for anything allowed to wrap before cutting off. Same rule applies - the full text stays reachable somewhere (detail view, tooltip, expand).",
            },
            {
              k: "Copy case",
              v: "Store and type text in natural case always. Uppercase presentation (eyebrows, small labels) comes from text-transform: uppercase in CSS, never from typing the string in caps - natural case stays correct for screen readers, search, and copy-paste.",
            },
            {
              k: "Underlines",
              v: "text-underline-position: from-font, text-decoration-thickness: from-font, and text-decoration-skip-ink: auto together - the underline sits where the font's own metrics intend and breaks around descenders (g, y, p) instead of cutting through them.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="INPUTS & LOGICAL" heading="Inputs & logical properties">
        <DocKeyValue
          rows={[
            {
              k: "Mobile input size",
              v: "Inputs render at 16px or larger on mobile viewports (text-base sm:text-sm - 16px on small screens, 14px from sm breakpoint up). Below 16px, iOS Safari zooms the viewport on focus, which is a jarring, unrequested layout jump.",
            },
            {
              k: "Logical properties",
              v: "margin-inline-start, not margin-left. text-align: start, not text-align: left. Logical properties follow writing direction automatically instead of hard-coding a physical side, which matters the moment any surface needs RTL support.",
            },
            {
              k: "Justification",
              v: "Never justify interface text (text-align: justify). Justified text in narrow UI columns creates uneven word-spacing rivers that hurt readability - reserve justification for print, if ever.",
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <RuleCard
            type="do"
            title="Pair text-wrap: balance on the heading with pretty on the paragraph beneath it"
            description="Balance keeps short titles even; pretty keeps longer copy from stranding a single word on its own last line. They solve different problems and are meant to be used together, not as alternatives."
          />
          <RuleCard
            type="dont"
            title="Type UPPERCASE labels directly into the copy"
            description="Typed caps break screen readers (which may spell out or emphasize differently), search, and copy-paste. Use text-transform: uppercase and keep the source string in natural case."
          />
          <RuleCard
            type="do"
            title="Apply .tnum to any number that updates in place"
            description="Stat tiles, counters, live meters, and table cells that refresh need tabular-nums so neighboring content doesn't shift sideways as digit widths change."
          />
          <RuleCard
            type="dont"
            title="Ship a mobile input below 16px font size"
            description="iOS Safari auto-zooms on focus for any input under 16px, yanking the viewport out from under the user. Use text-base sm:text-sm so mobile stays at 16px."
          />
        </div>
      </DocSection>
    </div>
  );
}
