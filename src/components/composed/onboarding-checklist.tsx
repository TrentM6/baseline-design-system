import * as React from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingChecklistProps {
  className?: string;
}

const DEFAULT_STEPS: OnboardingStep[] = [
  { id: "1", title: "Create your account", description: "Set up credentials and enable two-factor authentication", completed: true },
  { id: "2", title: "Configure workspace", description: "Name your workspace, set billing, and assign team roles", completed: true },
  { id: "3", title: "Connect integrations", description: "Link GitHub, Vercel, and Figma to your workspace", completed: true },
  { id: "4", title: "Invite team members", description: "Add collaborators and assign seats to your plan", completed: false },
  { id: "5", title: "Deploy first project", description: "Push your first build to production and verify health checks", completed: false },
];

export function OnboardingChecklist({ className }: OnboardingChecklistProps) {
  const [steps, setSteps] = React.useState(DEFAULT_STEPS);
  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);
  const currentStep = steps.find((s) => !s.completed);

  const toggleStep = (id: string) =>
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Getting Started</CardTitle>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
              {completedCount} of {steps.length} complete
            </p>
            <p className="text-[11px] font-medium tabular-nums" style={{ color: "var(--bl-fg-secondary)" }}>
              {progressPercent}%
            </p>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
            >
              <Checkbox
                checked={step.completed}
                onCheckedChange={() => toggleStep(step.id)}
                className="mt-0.5"
                aria-label={`Mark "${step.title}" as ${step.completed ? "incomplete" : "complete"}`}
              />
              <div className="min-w-0 flex-1">
                <p
                  className="text-[13px] font-medium leading-snug"
                  style={{
                    color: step.completed ? "var(--bl-fg-muted)" : "var(--bl-fg-primary)",
                    textDecoration: step.completed ? "line-through" : "none",
                  }}
                >
                  {step.title}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
                  {step.description}
                </p>
              </div>
              {step.completed && (
                <Check size={14} weight="bold" className="mt-1 shrink-0" style={{ color: "var(--bl-fill-success)" }} />
              )}
            </div>
          ))}
        </div>

        {currentStep && (
          <Button size="sm" className="mt-3 w-full text-xs h-8">
            {currentStep.title}
            <ArrowRight size={14} className="ml-1.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
