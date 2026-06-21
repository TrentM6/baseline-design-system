import { CheckCircle, Circle } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Reward {
  title: string;
  detail: string;
  done: boolean;
}

const REWARDS: Reward[] = [
  { title: "Invite a friend using your referral code", detail: "+10.00 USDT", done: true },
  { title: "Get your first coin", detail: "50% bonus on your next deposit", done: false },
  { title: "Complete your profile", detail: "+2.00 USDT", done: false },
];

/**
 * RewardsCard — onboarding checklist + CTA. Composes Card, Button, Phosphor.
 * Completed items use the brand fill; pending use a muted ring.
 */
export function RewardsCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Rewards</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="space-y-3">
          {REWARDS.map((r) => (
            <div key={r.title} className="flex items-start gap-2.5">
              {r.done ? (
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-[var(--bl-fill-primary)]" />
              ) : (
                <Circle size={18} weight="regular" className="mt-0.5 shrink-0" style={{ color: "var(--bl-fg-muted)" }} />
              )}
              <div className="leading-tight">
                <p className="text-[13px] font-medium" style={{ color: "var(--bl-fg-primary)" }}>{r.title}</p>
                <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-auto">Get a reward</Button>
      </CardContent>
    </Card>
  );
}
