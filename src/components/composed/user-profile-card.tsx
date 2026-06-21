import { MapPin, Envelope, LinkSimple } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Stat {
  label: string;
  value: string;
}

const STATS: Stat[] = [
  { label: "Projects", value: "24" },
  { label: "Followers", value: "1.2k" },
  { label: "Following", value: "340" },
];

export function UserProfileCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="text-lg font-bold">SC</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-heading font-semibold truncate" style={{ color: "var(--bl-fg-primary)" }}>
                Sarah Chen
              </h3>
              <Badge className="text-[10px] px-1.5 py-0 h-5 shrink-0">Pro</Badge>
            </div>
            <p className="text-[13px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
              Senior Product Designer
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
                <MapPin size={12} weight="bold" /> San Francisco, CA
              </span>
              <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
                <Envelope size={12} weight="bold" /> sarah@company.com
              </span>
              <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>
                <LinkSimple size={12} weight="bold" /> portfolio.dev
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-3 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-lg font-heading font-bold tabular-nums" style={{ color: "var(--bl-fg-primary)" }}>
                {s.value}
              </p>
              <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1" size="sm">Follow</Button>
          <Button variant="outline" className="flex-1" size="sm">Message</Button>
        </div>
      </CardContent>
    </Card>
  );
}
