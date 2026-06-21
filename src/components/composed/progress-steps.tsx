import { Check } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  label: string;
  description: string;
  status: StepStatus;
}

const STEPS: Step[] = [
  { label: "Account created", description: "Set up credentials and 2FA", status: "complete" },
  { label: "Workspace setup", description: "Name, billing, and team roles", status: "complete" },
  { label: "Connect services", description: "Link GitHub, Vercel, and Figma", status: "current" },
  { label: "Invite team", description: "Add members and assign seats", status: "upcoming" },
  { label: "Go live", description: "Deploy first project to production", status: "upcoming" },
];

function StepNode({ status, index }: { status: StepStatus; index: number }) {
  if (status === "complete") {
    return (
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--bl-fill-primary)" }}
      >
        <Check size={14} weight="bold" style={{ color: "var(--bl-fg-on-primary)" }} />
      </span>
    );
  }
  if (status === "current") {
    return (
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2"
        style={{ borderColor: "var(--bl-fill-primary)", backgroundColor: "var(--bl-bg-surface)" }}
      >
        <span className="text-[11px] font-bold tabular-nums" style={{ color: "var(--bl-fill-primary)" }}>
          {index + 1}
        </span>
      </span>
    );
  }
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2"
      style={{ borderColor: "var(--bl-border-divider)", backgroundColor: "var(--bl-bg-surface)" }}
    >
      <span className="text-[11px] font-bold tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
        {index + 1}
      </span>
    </span>
  );
}

export function ProgressSteps() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Onboarding</CardTitle>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
          2 of 5 steps completed
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepNode status={step.status} index={i} />
                {i < STEPS.length - 1 && (
                  <div
                    className="w-0.5 flex-1 my-1 rounded-full"
                    style={{
                      backgroundColor:
                        step.status === "complete" ? "var(--bl-fill-primary)" : "var(--bl-border-divider)",
                    }}
                  />
                )}
              </div>
              <div className={i < STEPS.length - 1 ? "pb-4" : ""}>
                <p
                  className="text-[13px] font-medium leading-7"
                  style={{
                    color: step.status === "upcoming" ? "var(--bl-fg-muted)" : "var(--bl-fg-primary)",
                  }}
                >
                  {step.label}
                </p>
                <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
