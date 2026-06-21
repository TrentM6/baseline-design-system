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
    </div>
  );
}
