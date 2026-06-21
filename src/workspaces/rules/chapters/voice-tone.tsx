import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function VoiceTone() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Voice & Tone
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        How Baseline communicates - in product copy, error messages, onboarding,
        and every surface where words meet the user. The voice is confident,
        direct, human, honest, and premium without being pretentious.
      </p>

      <DocSection eyebrow="FOUNDATIONS" heading="Voice principles">
        <p>
          Voice is who we are. It doesn't change with context - only the tone
          adjusts. These six principles define how Baseline sounds everywhere.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "First person singular",
              v: "Use \"I\" not \"we.\" Baseline speaks as one clear voice, not a faceless committee. \"I'll save your changes\" feels like a tool that works for you.",
            },
            {
              k: "Confident, not arrogant",
              v: "State things clearly without hedging (\"your file is saved\") but never talk down to the user (\"as you should know\"). Confidence comes from clarity.",
            },
            {
              k: "Direct and concise",
              v: "Say it in fewer words. If a label can be one word, don't use three. If an explanation can be one sentence, don't write a paragraph.",
            },
            {
              k: "Human, not corporate",
              v: "Write like a knowledgeable colleague, not a legal department. No one has ever felt reassured by \"we are committed to leveraging synergies.\"",
            },
            {
              k: "Honest about limitations",
              v: "When something doesn't work, say so plainly. \"I couldn't reach the server\" beats \"an unexpected error has occurred.\" Users trust products that tell the truth.",
            },
            {
              k: "Premium, not pretentious",
              v: "The product should feel high-quality without performing luxury. Clean, precise language - not marketing fluff or unnecessary formality.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Writing rules">
        <DocKeyValue
          rows={[
            {
              k: "Active voice always",
              v: "\"I saved your file\" not \"Your file has been saved.\" Active voice is shorter, clearer, and gives the user a sense that something is in control.",
            },
            {
              k: "Short, punchy sentences",
              v: "One idea per sentence. If you need a comma, consider splitting into two sentences. Scannability matters more than literary flow in product UI.",
            },
            {
              k: "No corporate jargon",
              v: "Ban \"leverage,\" \"utilize,\" \"synergy,\" \"ecosystem,\" \"robust,\" \"seamless.\" Use the simplest word that carries the meaning.",
            },
            {
              k: "No emojis in product copy",
              v: "Emojis undermine the premium feel and create accessibility issues for screen readers. Use words and icons instead.",
            },
            {
              k: "Action-oriented CTAs",
              v: "Buttons say what they do: \"Save changes,\" \"Create project,\" \"Send invite.\" Never vague (\"Submit\") or pushy (\"Get started for free today!\").",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Copy in practice">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="I'll save your changes"
            description="First person, active, concise. The user knows exactly what happened and who did it."
          />
          <RuleCard
            type="dont"
            title="Your changes have been successfully saved by our system"
            description="Passive voice, unnecessarily long, and 'our system' is corporate filler that adds no information."
          />
          <RuleCard
            type="do"
            title="Something went wrong. Try again."
            description="Honest, short, and actionable. The user knows the state and what to do next."
          />
          <RuleCard
            type="dont"
            title="An unexpected error has occurred. Please contact support."
            description="'Unexpected' is the system's problem, not the user's. Sending them to support for a transient error is a dead end."
          />
          <RuleCard
            type="do"
            title="Start building"
            description="Direct, active, and assumes the user is capable. Two words that respect the user's time."
          />
          <RuleCard
            type="dont"
            title="Get started with our revolutionary platform today!"
            description="Marketing-speak in product UI erodes trust. The user already signed up - they don't need to be sold again."
          />
        </div>
      </DocSection>

      <DocSection heading="Tone spectrum">
        <p>
          Voice stays constant - tone flexes with context. Think of it as a
          dial between casual and serious, adjusted by what the user is
          experiencing.
        </p>
        <DocKeyValue
          rows={[
            {
              k: "Onboarding & empty states",
              v: "Warmer, more encouraging. The user is learning - be patient and inviting. \"Create your first project\" feels welcoming.",
            },
            {
              k: "In-flow actions",
              v: "Neutral and efficient. The user is in the zone - stay out of the way. Short confirmations, minimal interruption.",
            },
            {
              k: "Errors & failures",
              v: "Calm and direct. Never blame the user. State what happened, what it means, and what they can do. No exclamation marks on errors.",
            },
            {
              k: "Destructive actions",
              v: "Serious and precise. Name exactly what will be deleted and whether it can be undone. No casual tone when data is at risk.",
            },
            {
              k: "Success moments",
              v: "Brief and clear. A simple confirmation is enough - don't celebrate routine actions. Save enthusiasm for genuine milestones.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
