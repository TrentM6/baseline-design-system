import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ColorContrast() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Color & Contrast
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        WCAG contrast ratios are not suggestions - they are the minimum bar for
        text and UI elements to be perceivable by users with low vision.
        Baseline's dark palette makes contrast a constant design consideration.
      </p>

      <DocSection eyebrow="REQUIREMENTS" heading="Contrast ratio thresholds">
        <p>
          Every foreground/background pair in the system must meet these
          minimums. These are WCAG 2.2 Level AA requirements - the conformance
          level Baseline targets.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Normal text (< 18pt)",
              v: ">= 4.5:1 contrast ratio against its background. This covers body copy, labels, descriptions, and any text below 24px / 18pt. WCAG SC 1.4.3.",
            },
            {
              k: "Large text (>= 18pt or 14pt bold)",
              v: ">= 3:1 contrast ratio. Headings and bold UI text get a lower threshold because larger glyphs are inherently more legible. WCAG SC 1.4.3.",
            },
            {
              k: "UI components & graphics",
              v: ">= 3:1 contrast ratio for borders, icons, form field boundaries, and any graphical element needed to understand the UI. WCAG SC 1.4.11.",
            },
            {
              k: "Focus indicators",
              v: ">= 3:1 contrast ratio against both the focused element and the adjacent background. The focus ring must be clearly visible. WCAG SC 2.4.7 / 2.4.11.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="How to test contrast">
        <DocKeyValue
          rows={[
            {
              k: "Browser DevTools",
              v: "Inspect any element, hover the color swatch in Computed styles - Chrome and Firefox show the contrast ratio and WCAG pass/fail inline. Test both modes.",
            },
            {
              k: "axe DevTools extension",
              v: "Run a full-page audit. axe catches contrast failures across every visible element and reports the exact ratio and required threshold.",
            },
            {
              k: "Manual calculation",
              v: "Relative luminance formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color. Use WebAIM's contrast checker for quick manual verification.",
            },
            {
              k: "Both modes, every time",
              v: "A pair that passes in dark mode may fail in light mode (or vice versa). Every contrast check must be run against both theme values of the token.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Dark palette considerations">
        <p>
          Baseline's dark-first palette introduces specific contrast challenges
          that lighter UIs don't face. Dark backgrounds amplify certain
          readability issues while masking others.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Don't go too dim.</strong> Muted text on dark backgrounds
            drops below legibility faster than on light backgrounds. What looks
            like a subtle design choice may be invisible to users with low
            vision or on lower-quality displays.
          </li>
          <li>
            <strong>Watch for halation.</strong> Bright white text on pure dark
            backgrounds causes a glow effect (halation) for users with
            astigmatism. Baseline's warm off-white foreground tokens mitigate
            this - never use{" "}
            <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
              #ffffff
            </code>{" "}
            directly.
          </li>
          <li>
            <strong>Elevation affects contrast.</strong> A text color that
            passes on Level 0 (#1a0d06) may fail on Level 3 (#4d240f) because
            the background is lighter. Check contrast at every surface level
            the text may appear on.
          </li>
          <li>
            <strong>Borders and dividers need care.</strong> Subtle divider
            lines that are visible on light backgrounds can vanish on dark
            surfaces. Use tokens that guarantee 3:1 for any structural line.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Contrast guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Test every text/background pair in both modes"
            description="A color combination that passes at 5.2:1 in dark mode may drop to 3.8:1 in light mode. Both values of every semantic token must be verified."
          />
          <RuleCard
            type="dont"
            title="Assume dark background = light text is always sufficient"
            description="Light text on a warm dark surface can fail contrast if the text is too dim or the surface too light. Always measure - don't eyeball."
          />
          <RuleCard
            type="do"
            title="Use --bl-fg-primary for body text (verified 4.5:1+)"
            description="The primary foreground token is pre-verified against all standard surface levels. Reach for it first - it's the safe default for readable text."
          />
          <RuleCard
            type="dont"
            title="Use --bl-fg-muted for critical information"
            description="Muted tokens are designed for supplementary hints, not primary content. They may sit right at the contrast threshold and fail on elevated surfaces."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="COLOR MODEL" heading="OKLCH syntax">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Baseline's tokens (<code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>tokens/bl-tokens.css</code>) are authored
          in OKLCH, a perceptually uniform color space - equal steps in lightness look equally different
          to the eye, which HSL and RGB don't guarantee. The syntax is{" "}
          <code className="text-[12px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
            oklch(L C H / alpha)
          </code>{" "}
          (from better-colors, jakub.kr).
        </p>
        <DocKeyValue
          rows={[
            {
              k: "L - Lightness",
              v: "0 to 1. 0 is black, 1 is white. Perceptually uniform - moving L by 0.1 looks like the same lightness jump anywhere in the range, unlike HSL's lightness channel.",
            },
            {
              k: "C - Chroma",
              v: "0 to ~0.4. 0 is grayscale, higher is more saturated. The real maximum isn't fixed - it depends on the current L and H (the OKLCH gamut is an irregular volume, not a cylinder).",
            },
            {
              k: "H - Hue",
              v: "0 to 360 degrees, same wheel concept as HSL but the perceptual result differs because OKLCH corrects for the eye's uneven sensitivity across hues.",
            },
            {
              k: "alpha - slash syntax only",
              v: "oklch(0.7 0.15 40 / 0.5) - the alpha channel is always separated by a slash, never a comma. Comma-separated OKLCH is invalid CSS.",
            },
          ]}
        />
      </DocSection>

      <DocSection eyebrow="MEASUREMENT" heading="Contrast thresholds">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          OKLCH's L channel gives a fast, reliable read on whether text should be light or dark on a
          given background - and it lines up with both the WCAG 2 ratios above and the newer APCA
          model (from better-colors, jakub.kr).
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Light/dark text boundary",
              v: "Background L > 0.6 -> use dark text. L <= 0.6 -> use light text. A fast heuristic for picking foreground color against any OKLCH background.",
            },
            {
              k: "WCAG 2 - normal text",
              v: ">= 4.5:1 for AA, >= 7:1 for AAA. Same thresholds as the Contrast ratio thresholds section above - OKLCH doesn't change the WCAG 2 math, only how you author the colors.",
            },
            {
              k: "APCA - body text",
              v: "|Lc| >= 75 minimum, >= 90 preferred. APCA is perceptually weighted and is the likely successor to the WCAG 2 ratio formula.",
            },
            {
              k: "APCA - non-body text",
              v: "|Lc| >= 60. Applies to large text, UI chrome, and other non-paragraph content where APCA is used.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Fix contrast by adjusting L only">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--bl-fg-secondary)" }}>
          Chroma has a negligible effect on contrast ratio - the ratio is driven almost entirely by
          lightness. When a pair fails, hold C and H constant and move L on whichever side is easier
          to change (from better-colors, jakub.kr).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Move L until the ratio clears the threshold"
            description="oklch(0.55 0.15 40) failing at 3.9:1? Lower L to 0.45 or raise the background L - keep C and H fixed so the hue and saturation don't shift."
          />
          <RuleCard
            type="dont"
            title="Reach for chroma to 'fix' a failing contrast pair"
            description="Cranking C up or down barely moves the contrast ratio. It changes how saturated the color looks without solving the underlying legibility problem."
          />
        </div>
      </DocSection>
    </div>
  );
}
