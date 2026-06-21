import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: { name: string; initials: string };
  text: string;
  time: string;
  isOwn: boolean;
}

const MESSAGES: Message[] = [
  { id: "1", sender: { name: "Sarah Chen", initials: "SC" }, text: "Hey, did you see the latest design review feedback?", time: "10:23 AM", isOwn: false },
  { id: "2", sender: { name: "You", initials: "TC" }, text: "Yeah, looks like they want us to tighten up the spacing on the dashboard cards.", time: "10:24 AM", isOwn: true },
  { id: "3", sender: { name: "Sarah Chen", initials: "SC" }, text: "I was thinking we could use the slot system for that — half/third sizing instead of full-width.", time: "10:25 AM", isOwn: false },
  { id: "4", sender: { name: "You", initials: "TC" }, text: "Good call. I'll update the surface and push it for review.", time: "10:26 AM", isOwn: true },
  { id: "5", sender: { name: "Sarah Chen", initials: "SC" }, text: "Perfect. Also, the chart animations are looking much smoother now with the natural curve type.", time: "10:28 AM", isOwn: false },
];

export function ChatMessage() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="text-[10px] font-semibold">SC</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <CardTitle className="text-sm truncate">Sarah Chen</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--bl-fill-success)" }} />
            <span className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>Online</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 px-3 pb-3">
        <ScrollArea className="flex-1 pr-3 mb-3">
          <div className="space-y-3 py-1">
            {MESSAGES.map((m) => (
              <div key={m.id} className={`flex gap-2.5 ${m.isOwn ? "flex-row-reverse" : ""}`}>
                {!m.isOwn && (
                  <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                    <AvatarFallback className="text-[9px] font-semibold">{m.sender.initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[75%] ${m.isOwn ? "text-right" : ""}`}>
                  <div
                    className="rounded-lg px-3 py-2 text-[13px] leading-relaxed"
                    style={{
                      backgroundColor: m.isOwn ? "var(--bl-fill-primary)" : "var(--bl-bg-elevated)",
                      color: m.isOwn ? "var(--bl-fg-on-primary)" : "var(--bl-fg-primary)",
                    }}
                  >
                    {m.text}
                  </div>
                  <p className="text-[10px] mt-1 tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2">
          <Input placeholder="Type a message…" className="flex-1 h-9 text-[13px]" aria-label="Message" />
          <Button size="icon" className="h-9 w-9 shrink-0" aria-label="Send message">
            <PaperPlaneTilt size={16} weight="fill" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
