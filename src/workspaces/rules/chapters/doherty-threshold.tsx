import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function DohertyThreshold() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Doherty Threshold
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        System response time must stay under 400ms to maintain the user's flow
        state. Above this threshold, users perceive the system as sluggish and
        lose engagement. Use loading states, skeleton screens, and optimistic
        updates.
      </p>

      <DocSection heading="The threshold">
        <p>
          Walter Doherty and Ahrvind Thadani's 1982 IBM research established
          that when computer response time drops below 400ms, productivity
          increases dramatically and users stay in a flow state. Above 400ms,
          users begin to notice the wait. Above 1000ms, they start
          context-switching. Above 10 seconds, they leave.
        </p>
      </DocSection>

      <DocSection heading="Response time tiers">
        <DocKeyValue
          rows={[
            {
              k: "0-100ms",
              v: "Instantaneous — hover states, button presses, toggles. The user perceives this as immediate. No feedback beyond the visual change itself is needed.",
            },
            {
              k: "100-400ms",
              v: "Fast — page transitions, simple queries, tab switches. The user notices a brief pause but stays in flow. This is the target for most interactions.",
            },
            {
              k: "400ms-1s",
              v: "Noticeable — show a skeleton or spinner, keep the user informed. The user's attention begins to drift; a loading indicator keeps them anchored.",
            },
            {
              k: "1s-10s",
              v: "Slow — show a progress indicator with estimated time. The user is waiting and knows it. Tell them how long and show measurable progress.",
            },
            {
              k: "10s+",
              v: "Very slow — background the task, notify on completion. The user has mentally moved on. Don't hold them hostage; let them do other things and come back.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Perceived performance techniques">
        <DocKeyValue
          rows={[
            {
              k: "Skeleton screens",
              v: "Show the layout shape before content loads. The page feels faster because the user sees structure immediately — their brain starts processing the layout while data arrives.",
            },
            {
              k: "Optimistic updates",
              v: "Update UI immediately, reconcile with server async. When the user clicks 'like,' the heart fills instantly. If the server rejects it, roll back — but 99% of the time, the instant feedback was correct.",
            },
            {
              k: "Progressive loading",
              v: "Show content as it arrives, don't wait for everything. The first visible items render while below-the-fold content streams in. The user starts engaging before the page is technically complete.",
            },
            {
              k: "Prefetching",
              v: "Load likely next pages or data before the user asks. When the user hovers a link, prefetch the destination. When they reach step 3 of a wizard, preload step 4's assets.",
            },
            {
              k: "Instant feedback",
              v: "Button depresses immediately, result catches up. The visual acknowledgment (press state, animation start) must be instant even if the operation takes time.",
            },
          ]}
        />
      </DocSection>

      <DocSection heading="Rules for the system">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            type="do"
            title="Show a skeleton screen within 100ms of navigation"
            description="The skeleton appears instantly, giving the user a sense of the page structure. Content fills in progressively — the experience feels fast even if the data takes a full second."
          />
          <RuleCard
            type="dont"
            title="Show a blank white screen while loading"
            description="A blank screen gives no information — the user doesn't know if the page is loading, broken, or empty. Skeleton screens eliminate this ambiguity."
          />
          <RuleCard
            type="do"
            title="Use optimistic updates for common actions (like, save, toggle)"
            description="For high-confidence actions where server failure is rare, update the UI instantly. The user's flow is unbroken and the interface feels responsive."
          />
          <RuleCard
            type="dont"
            title="Wait for server confirmation before showing UI feedback"
            description="A 300ms round trip to the server means the user clicks and waits. For low-risk actions, show the result immediately and reconcile in the background."
          />
          <RuleCard
            type="do"
            title="Show a progress indicator for operations over 1 second"
            description="Progress bars, percentage counters, or step indicators tell the user the system is working and how much is left. Uncertainty is more frustrating than waiting."
          />
          <RuleCard
            type="dont"
            title="Use a spinner for operations that take more than 4 seconds — show progress instead"
            description="A spinner conveys 'working' but not 'how long.' After 4 seconds, the user wants to know if this is 5 seconds or 5 minutes. Show measurable progress."
          />
        </div>
      </DocSection>
    </div>
  );
}
