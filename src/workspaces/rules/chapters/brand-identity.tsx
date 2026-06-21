import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function BrandIdentity() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Brand Identity
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Baseline's visual identity is built on a monochromatic orange palette,
        dark-first design, and warm surfaces. Every visual decision reinforces
        the same DNA — confident, warm, and unmistakably ours.
      </p>

      <DocSection eyebrow="FOUNDATIONS" heading="Core brand elements">
        <DocKeyValue
          rows={[
            {
              k: "Brand orange",
              v: "#fe4506 — the anchor of every palette decision. All accent, interactive, and emphasis colors are tints, shades, or opacity variants of this single hue.",
            },
            {
              k: "Monochromatic palette",
              v: "Every color in the system derives from the orange family. No secondary hue families — blues, greens, or purples appear only in semantic contexts (success, error) and are kept muted to avoid competing.",
            },
            {
              k: "Heading typeface",
              v: "Geist — geometric, clean, and modern. Used for headings, display text, and any typographic element that needs to command attention.",
            },
            {
              k: "Body typeface",
              v: "Satoshi — humanist warmth with excellent readability at small sizes. Used for body copy, labels, descriptions, and all running text.",
            },
            {
              k: "Design philosophy",
              v: "Dark-first. The brand palette, token system, and visual identity were conceived in dark mode. Light mode is a derived expression — not the other way around.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Surface elevation hierarchy">
        <p>
          Baseline uses warm dark surfaces built on a stone (brown-grey) neutral
          ramp. Each elevation level is a deliberate step lighter, creating depth
          with subtle low-opacity borders rather than heavy shadows. The warmth
          distinguishes Baseline from the cold zinc-grey palettes of most dark UIs.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Level 0 — Base",
              v: "stone-950 (#100e0c) — the deepest background. Used for the application shell, page canvas, and areas that recede visually.",
            },
            {
              k: "Level 1 — Surface",
              v: "stone-900 (#1c1816) — primary content surfaces. Cards, panels, and content containers sit at this level.",
            },
            {
              k: "Level 2 — Elevated",
              v: "stone-800 (#2c2825) — raised elements. Dropdowns, popovers, tooltips, sidebar, and anything that floats above the surface.",
            },
            {
              k: "Level 3 — Active",
              v: "stone-700 (#413c37) — the highest elevation. Active rows, focused input fields, and interactive states that need maximum separation.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Signature design elements">
        <DocKeyValue
          rows={[
            {
              k: "Pill buttons",
              v: "border-radius: 9999px — Baseline's buttons are fully rounded pills, not rectangles with corner radius. This is a deliberate brand choice that signals approachability.",
            },
            {
              k: "Warm neutrals",
              v: "Every neutral is drawn from the warm stone ramp (brown-grey). Pure cold greys (#808080, #ccc) are treated as bugs — they read as cold and disconnected from the palette.",
            },
            {
              k: "Monochromatic discipline",
              v: "The palette is deliberately constrained to a single hue family. This creates a cohesive, premium feel and forces the design to rely on value and saturation for hierarchy rather than competing colors.",
            },
            {
              k: "Opacity as hierarchy",
              v: "Text and icon hierarchy is achieved through opacity and lightness steps within the orange-tinted neutral scale, not by introducing new hues.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Brand identity guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use the monochromatic orange palette"
            description="Every accent, surface, and neutral derives from the orange family. This discipline is what makes Baseline feel cohesive and intentional across every screen."
          />
          <RuleCard
            type="dont"
            title="Introduce competing hue families"
            description="Adding teal, purple, or blue accents fractures the brand. Semantic colors (success green, error red) are the only exception, and they stay desaturated."
          />
          <RuleCard
            type="do"
            title="Design in dark mode first, derive light mode"
            description="Dark is the source of truth. Make your color decisions in dark mode, then translate them to light using the same semantic tokens and intent."
          />
          <RuleCard
            type="dont"
            title="Use pure greys — all neutrals carry a warm orange undertone"
            description="Pure grey (#808080, #f5f5f5) looks alien in Baseline's palette. Every neutral must be tinted warm to maintain the cohesive visual identity."
          />
        </div>
      </DocSection>
    </div>
  );
}
