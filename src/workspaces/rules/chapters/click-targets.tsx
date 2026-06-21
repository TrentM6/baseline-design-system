import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function ClickTargets() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Click &amp; Touch Targets
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Interactive elements must be large enough to tap accurately. The minimum
        target size is 44x44px. Padding extends the clickable area without
        changing the visual size.
      </p>

      <DocSection heading="Minimum sizes">
        <DocKeyValue
          rows={[
            {
              k: "Touch targets",
              v: "44x44px minimum (WCAG 2.5.8). This is the baseline for any element a finger can tap - buttons, links, checkboxes, toggles, list items with actions.",
            },
            {
              k: "Mouse-only targets",
              v: "24x24px minimum, but prefer 44px. Desktop interfaces can get away with smaller targets, but 44px is still better - it's faster to reach and more forgiving of imprecise clicks.",
            },
            {
              k: "Spacing between targets",
              v: "8px minimum. Adjacent targets without spacing cause mis-taps. The gap ensures the user's finger lands on the intended element, not its neighbor.",
            },
            {
              k: "Icon buttons",
              v: "Must include padding to meet 44px target. A 16px icon inside a 44px tappable area is correct. A 16px icon with a 16px hit area is a usability failure.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="The padding technique">
        <p>
          The visual element (icon, text) can be smaller than 44px. Use padding
          to extend the clickable/tappable area to 44px without changing the
          visual footprint. This is the standard technique for icon buttons,
          close buttons, and compact controls.
        </p>
        <p className="mt-3">
          A close button might render as a 12px X icon, but the tappable area
          should be 44x44px - achieved with 16px of padding on each side. The
          user sees a small, clean icon; their finger hits a generous target.
        </p>
      </DocSection>

      <DocSection heading="Fitts's Law applied">
        <p>
          Larger targets are faster to reach. Important actions should be larger
          than secondary ones. Edge-of-screen targets are effectively infinite
          in one dimension - the screen edge stops the cursor, so the user
          can't overshoot.
        </p>
        <p className="mt-3">
          Place primary actions where the thumb naturally rests on mobile
          (bottom center). The bottom of the screen is the easiest area to
          reach one-handed. Top corners are the hardest - reserve them for
          infrequent actions.
        </p>
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use padding to extend small visual elements to 44px hit areas"
            description="A 16px icon with 14px padding on each side gives a clean visual at 16px and a comfortable tap target at 44px. The user gets precision and ease."
          />
          <RuleCard
            type="dont"
            title="Make icon buttons only as large as the icon itself"
            description="A 16px icon with a 16px hit area requires surgical precision to tap. On mobile, users will miss repeatedly and blame your app."
          />
          <RuleCard
            type="do"
            title="Place primary mobile actions in the thumb zone (bottom of screen)"
            description="The bottom-center of the screen is where the thumb naturally rests in one-handed use. Primary actions here are fast and comfortable to reach."
          />
          <RuleCard
            type="dont"
            title="Put critical actions at the top corners of a mobile screen - they're hard to reach"
            description="Top corners require the user to shift their grip or use their other hand. For actions used frequently, that friction adds up fast."
          />
          <RuleCard
            type="do"
            title="Add 8px minimum spacing between adjacent targets"
            description="Spacing prevents accidental taps on neighboring elements. The gap gives the user's finger a clear landing zone for each target."
          />
          <RuleCard
            type="dont"
            title="Stack small touch targets together without adequate spacing"
            description="Adjacent buttons, links, or icons without spacing become a guessing game. Users mis-tap, trigger the wrong action, and lose trust in the interface."
          />
        </div>
      </DocSection>
    </div>
  );
}
