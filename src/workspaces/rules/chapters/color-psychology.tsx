import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ColorPsychology() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Color Psychology
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        How color affects perception and behavior, and why Baseline chose warm
        orange as its brand color. Color is never decorative - it carries meaning,
        sets tone, and shapes how users feel about the product before they read a
        single word.
      </p>

      <DocSection eyebrow="BRAND" heading="Why orange">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Orange communicates energy, confidence, warmth, and approachability. It
          sits between red's urgency and yellow's optimism - inheriting the best
          of both without the baggage of either. For a design system consultancy,
          it signals creative confidence without the aggression of red or the
          caution of yellow. Orange is rare in enterprise software, which means
          Baseline stands out in a sea of blue SaaS products. It's a color that
          says "we're serious about craft, but we're not stiff about it."
        </p>
      </DocSection>

      <DocSection eyebrow="ASSOCIATIONS" heading="Color meaning reference">
        <DocKeyValue
          rows={[
            {
              k: "Orange",
              v: "Energy, confidence, warmth, creativity. Baseline's primary identity color - used for brand accents, interactive elements, and emphasis.",
            },
            {
              k: "Red",
              v: "Danger, urgency, error, stop. Reserved exclusively for destructive actions, error states, and critical alerts.",
            },
            {
              k: "Green",
              v: "Success, growth, go, safety. Used for success confirmations, positive status indicators, and completion states.",
            },
            {
              k: "Blue",
              v: "Trust, calm, professional, corporate. Used sparingly for informational callouts and neutral status indicators.",
            },
            {
              k: "Yellow",
              v: "Warning, caution, attention, optimism. Reserved for warning states and content that requires user awareness before proceeding.",
            },
            {
              k: "Grey",
              v: "Neutral, sophisticated, balanced, subdued. The backbone of the interface - surfaces, borders, secondary text, and disabled states.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="STRATEGY" heading="Monochromatic advantage">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Using a single hue family (orange) with variations in saturation and
          lightness creates visual cohesion without the complexity of managing
          complementary or triadic palettes. Every color in the system reinforces
          the brand. A monochromatic palette is also dramatically easier to
          maintain across dark and light modes - you're tuning one hue curve, not
          juggling the relationships between multiple hue families. The result is
          a system where every screen feels unmistakably Baseline without
          requiring a designer to manually balance color harmony.
        </p>
      </DocSection>

      <DocSection eyebrow="FUNCTIONAL" heading="Semantic color assignments">
        <DocKeyValue
          rows={[
            {
              k: "Success - green",
              v: "Universal 'go' signal. Used for completed actions, valid inputs, positive deltas, and healthy status. Maps to --bl-status-success tokens.",
            },
            {
              k: "Error - red",
              v: "Universal 'stop' signal. Used for failed actions, invalid inputs, destructive confirmations, and critical alerts. Maps to --bl-status-error tokens.",
            },
            {
              k: "Warning - yellow",
              v: "Universal 'caution' signal. Used for degraded status, approaching limits, and actions with side effects. Maps to --bl-status-warning tokens.",
            },
            {
              k: "Info - blue",
              v: "Neutral informational signal. Used for tips, documentation callouts, and non-urgent system messages. Maps to --bl-status-info tokens.",
            },
            {
              k: "Brand / primary - orange",
              v: "Baseline identity. Used for primary CTAs, active states, selected items, focus rings, and any element that says 'this is interactive.' Maps to --bl-accent tokens.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="GUIDANCE" heading="Do / Don't">
        <div className="grid gap-3">
          <RuleCard
            type="do"
            title="Use functional colors for their intended semantic meaning"
            description="Green means success. Red means error. Yellow means warning. These associations are universal and deeply ingrained - leverage them, don't fight them."
          />
          <RuleCard
            type="dont"
            title="Use red for non-error decorative purposes"
            description="Red triggers an immediate 'something is wrong' response. Using it for decoration, badges, or emphasis confuses users and dilutes the signal when a real error occurs."
          />
          <RuleCard
            type="do"
            title="Let the monochromatic orange palette carry the brand identity"
            description="Orange tints, shades, and opacity variants provide all the visual range the brand needs. One hue family, used with discipline, is more memorable than a rainbow."
          />
          <RuleCard
            type="dont"
            title="Introduce additional hue families for visual variety"
            description="Adding purples, teals, or pinks for variety fractures the brand and creates maintenance burden. If a new color is needed, it should serve a semantic purpose - not a decorative one."
          />
        </div>
      </DocSection>
    </div>
  );
}
