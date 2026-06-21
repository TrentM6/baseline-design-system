import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function TokenDiscipline() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Token Discipline
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        Every color, spacing value, radius, shadow, and motion duration resolves
        to a semantic token. No raw values in component code. Tokens are named
        by role, not appearance. Both dark and light values are required.
      </p>

      <DocSection eyebrow="NON-NEGOTIABLE" heading="The rules">
        <DocKeyValue
          rows={[
            {
              k: "No raw hex/rgb/hsl",
              v: "Every color must reference a --bl-* token. If you type # followed by six characters in a component file, it's a bug. No exceptions.",
            },
            {
              k: "Semantic naming",
              v: "--bl-bg-surface not --bl-dark-brown - name by role. The token name must make sense in both dark and light mode. If it mentions a color, it's wrong.",
            },
            {
              k: "Both modes required",
              v: "Every token must declare dark AND light values. A token without both is incomplete and will break one mode. Both values ship in the same commit.",
            },
            {
              k: "Base palette is authoring-only",
              v: "--bl-orange-500 is for defining semantic tokens in bl-tokens.css, not for use in components. Components consume semantic tokens that reference the palette.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Token categories">
        <p>
          The token system is organized by function. Each category covers a
          specific surface or visual property in the UI. When you need a value,
          find the right category first, then pick the specific token.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "--bl-bg-*",
              v: "Background surfaces - body, surface, elevated, overlay. These define the layered surface system that creates depth and hierarchy.",
            },
            {
              k: "--bl-fg-*",
              v: "Foreground text - primary, secondary, muted, inverse. Ordered by visual weight. Primary for body text, secondary for supporting text, muted for hints.",
            },
            {
              k: "--bl-border-*",
              v: "Borders and dividers - default, divider, focus-ring. Structural lines that separate or contain UI elements.",
            },
            {
              k: "--bl-fill-*",
              v: "Solid fills - primary brand, success, warning, danger, info. Used for buttons, badges, indicators, and any filled surface that carries semantic meaning.",
            },
            {
              k: "--bl-shadow-*",
              v: "Elevation shadows - sm, md, lg, overlay. Create the illusion of layered surfaces. Higher shadows mean the element is closer to the user.",
            },
            {
              k: "--bl-space-*",
              v: "Spacing - 1 through 12 in 4px increments. The spatial rhythm of the entire system. Consistent spacing is what makes a UI feel designed rather than assembled.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Naming conventions">
        <p>
          Tokens describe what they do, not what they look like.
          --bl-fg-muted works because "muted foreground" is a role - it means
          the same thing regardless of whether the current mode renders it as
          light grey or dark grey. --bl-light-grey fails because "light grey" is
          an appearance that flips meaning in light mode.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>The swap test.</strong> When you can swap the theme and the
            name still makes sense, the name is correct. --bl-bg-surface
            describes a surface in both modes. --bl-white-bg describes a color
            that's wrong in dark mode.
          </li>
          <li>
            <strong>Role over appearance.</strong> --bl-fg-primary is "the most
            prominent text color." In dark mode that might be warm off-white; in
            light mode it might be near-black. The role is consistent even when
            the value changes.
          </li>
          <li>
            <strong>Category prefix.</strong> Every token starts with its
            category: bg, fg, border, fill, shadow, space. This makes tokens
            grep-friendly and self-documenting in code.
          </li>
          <li>
            <strong>No hedging.</strong> --bl-bg-surface-maybe or
            --bl-fg-sort-of-muted aren't tokens - they're indecision. A token
            is a design decision. If you can't name it confidently, the decision
            isn't made yet.
          </li>
        </ul>
      </DocSection>

      <DocSection heading="Token guardrails">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Use --bl-bg-surface for card backgrounds"
            description="The surface token is purpose-built for card and panel backgrounds. It responds to mode changes automatically and maintains proper contrast with foreground tokens."
          />
          <RuleCard
            type="dont"
            title="Write background: #1c1816 in component styles"
            description="A raw hex value won't respond to mode changes, can't be updated system-wide, and forces anyone reading the code to decode what color #1c1816 even is."
          />
          <RuleCard
            type="do"
            title="Name tokens by their semantic role (--bl-fg-muted)"
            description="Semantic names survive mode changes because they describe function. 'Muted foreground' means the same thing in dark and light mode - the value changes, the role doesn't."
          />
          <RuleCard
            type="dont"
            title="Name tokens by appearance (--bl-light-text, --bl-dark-bg)"
            description="Appearance-based names become lies when the mode changes. --bl-light-text in dark mode is... dark text? The name contradicts the value, and confusion follows."
          />
          <RuleCard
            type="do"
            title="Define both dark and light values for every new token"
            description="Both values ship in the same commit. A token with only one mode value is a half-built bridge - it will break for someone, and debugging it later is harder than defining it now."
          />
          <RuleCard
            type="dont"
            title="Ship a token that only works in one mode"
            description="A dark-only token will render incorrectly or invisibly in light mode. Every user who switches themes becomes a bug reporter. Define both values upfront."
          />
        </div>
      </DocSection>
    </div>
  );
}
