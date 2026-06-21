import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function MillersLaw() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Miller's Law
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The average person can hold 7 plus or minus 2 items in working memory.
        Design interfaces that respect this cognitive limit by chunking
        information into manageable groups.
      </p>

      <DocSection heading="The principle">
        <p>
          George Miller's 1956 paper established that short-term memory can hold
          roughly 7 (plus or minus 2) chunks of information. A "chunk" can be a
          single digit, a word, or a meaningful group. The key is not the number
          7 itself, but the concept of chunking - organizing information into
          meaningful units.
        </p>
      </DocSection>

      <DocSection heading="Chunking strategies">
        <DocKeyValue
          rows={[
            {
              k: "Phone numbers",
              v: "555-867-5309 not 5558675309. Dashes turn 10 individual digits into 3 memorable chunks. The user reads three groups, not ten characters.",
            },
            {
              k: "Credit cards",
              v: "4242 4242 4242 4242 not 4242424242424242. Spaces break 16 digits into 4 groups of 4 - matching how banks print them on the physical card.",
            },
            {
              k: "Navigation",
              v: "Group into 3-4 categories, 3-5 items each. The user first scans categories (3-4 chunks), then items within one category (3-5 chunks) - never 15 items at once.",
            },
            {
              k: "Form sections",
              v: "Group related fields under a heading. 'Personal Info' with 4 fields and 'Address' with 4 fields is easier than 8 unrelated fields in a column.",
            },
            {
              k: "Data tables",
              v: "Group columns into logical sections. A table with 12 columns is overwhelming; 3 visual groups of 4 columns each lets the eye parse in passes.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Design implications">
        <DocKeyValue
          rows={[
            {
              k: "Menus",
              v: "5-9 items per group, with clear group labels. Beyond 9 items in a single undivided group, the user can't hold the full set in mind while deciding.",
            },
            {
              k: "Tabs",
              v: "4-6 tabs visible, overflow into 'More'. Too many visible tabs force the user to scan labels they can't all hold in memory simultaneously.",
            },
            {
              k: "Breadcrumbs",
              v: "3-5 levels before truncation. Deep breadcrumbs become noise - the user only needs enough context to orient and navigate back.",
            },
            {
              k: "Steps / wizards",
              v: "3-7 steps total, show progress. The user should be able to hold the full process shape in mind: where they've been, where they are, what's left.",
            },
            {
              k: "Dashboard widgets",
              v: "5-7 metrics per view. A dashboard with 15 widgets on one screen is a monitoring wall, not a decision tool. Prioritize and paginate.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Format data inputs with visual separators (dashes, spaces)"
            description="A phone number field that auto-formats to 555-867-5309 turns 10 digits into 3 chunks. The user can verify what they typed at a glance."
          />
          <RuleCard
            type="dont"
            title="Display long unformatted strings of numbers or codes"
            description="An order number shown as 8429173650 is nearly impossible to read back or verify. 842-917-3650 is three chunks the eye can parse instantly."
          />
          <RuleCard
            type="do"
            title="Break content into scannable sections with clear headings"
            description="Headings create chunks. The user scans headings first (3-5 chunks), then reads the relevant section - instead of processing the entire page linearly."
          />
          <RuleCard
            type="dont"
            title="Present a wall of undifferentiated text or data"
            description="A settings page with 30 options in a single scrolling list overwhelms working memory. The user can't hold what they've seen while evaluating what's next."
          />
        </div>
      </DocSection>
    </div>
  );
}
