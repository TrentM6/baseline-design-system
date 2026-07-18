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

      <DocSection eyebrow="OKLCH" heading="Building ramps">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Baseline's tokens are authored in OKLCH, which makes ramp and palette construction a
          matter of holding the right channels constant (from better-colors, jakub.kr).
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>A shade ramp holds C and H constant and steps L only.</strong> The orange scale
            (50 through 950) is one hue, one chroma, ten lightness stops. In HSL, holding hue and
            saturation constant while stepping lightness still drifts perceptually - purple creeps
            into the light end, muddy brown into the dark end. Constant OKLCH hue avoids that: a hue
            spread greater than 10&deg; across steps is a sign the ramp was built in the wrong space.
          </li>
          <li>
            <strong>A set of same-weight colors holds L and C, varies H only.</strong> Status fills
            (success green, error red, warning yellow, info blue) at the same "weight" in the UI
            should share L and C and differ only in H - that's what makes them read as equally bright,
            equally saturated siblings rather than one color looking louder than the rest.
          </li>
          <li>
            <strong>"Same saturation" across hues means the same percentage of max chroma, not the
            same absolute C.</strong> Max chroma varies by hue and lightness - yellow can go far more
            saturated at high L than blue can. Matching raw C values across hues under- or
            over-saturates some of them; match the percentage of each hue's own ceiling instead.
          </li>
          <li>
            <strong>Derive dark mode from light by reversing L, keeping C and H.</strong> Baseline is
            dark-first, but the relationship still holds in reverse: flipping a token's L (and
            re-checking contrast) while leaving C and H untouched keeps the hue identity consistent
            between modes instead of re-picking colors by eye.
          </li>
        </ul>
      </DocSection>

      <DocSection eyebrow="OKLCH" heading="Gamut & clamping">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          OKLCH can describe colors no display can actually show - it's a superset of sRGB and
          Display-P3, not a match for either (from better-colors, jakub.kr).
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Out-of-gamut values",
              v: "oklch(0.7 0.4 40) is a valid OKLCH value that sits outside sRGB. Left alone, browsers clip it to the nearest in-gamut color unpredictably - not necessarily the color you'd pick by hand.",
            },
            {
              k: "Clamp chroma, not lightness or hue",
              v: "Cap C at the maximum in-gamut value for that L/H pair in the target gamut (sRGB or Display-P3). This keeps the intended hue and lightness intact and only pulls back saturation.",
            },
            {
              k: "P3 fallback for sRGB displays",
              v: "Ship P3-only colors behind @media (color-gamut: p3) { ... } with an sRGB-safe value as the default, so displays that can't show the wider gamut still get a correct, clamped color.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="OKLCH" heading="Gradients">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          The interpolation space matters as much as the endpoint colors - sRGB interpolation
          desaturates through the middle of a gradient, producing a muddy midpoint even when both
          ends are vivid (from better-colors, jakub.kr).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Interpolate in oklab for a safe default"
            description="oklab moves linearly through the color space with no hue detours - it's the predictable choice when you're not sure which hue path a gradient should take."
          />
          <RuleCard
            type="do"
            title="Interpolate in oklch when you want the hue to travel"
            description="oklch takes the short arc around the hue wheel, producing a vivid, saturated transition - use it deliberately when the gradient should visibly move through hues."
          />
          <RuleCard
            type="dont"
            title="Interpolate in sRGB and expect a clean midpoint"
            description="linear-gradient(in srgb, red, blue) washes out through gray in the middle. If a gradient looks muddy, the interpolation space is almost always the cause, not the endpoint colors."
          />
          <RuleCard
            type="dont"
            title="Add an extra color stop just to shift the transition point"
            description="Use a color hint instead - red, 40%, blue moves where the midpoint falls without introducing a third color. Reserve a real stop (or a hard stop: the same position twice) for an actual color change or a crisp edge."
          />
        </div>
      </DocSection>
    </div>
  );
}
