import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CalEvent {
  title: string;
  time: string;
  color: string;
}

const EVENTS: CalEvent[] = [
  { title: "Design review", time: "10:00 AM", color: "var(--bl-fill-primary)" },
  { title: "Sprint planning", time: "2:00 PM", color: "var(--bl-chart-4)" },
  { title: "1:1 with Sarah", time: "4:30 PM", color: "var(--bl-chart-2)" },
];

export function CalendarWidget() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Calendar</CardTitle>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
            {EVENTS.length} events
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
        />
        <Separator className="my-3" />
        <div className="space-y-2 px-1">
          <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--bl-fg-muted)" }}>
            Today
          </p>
          {EVENTS.map((e) => (
            <div key={e.title} className="flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="text-[13px] font-medium flex-1 truncate" style={{ color: "var(--bl-fg-primary)" }}>
                {e.title}
              </span>
              <span className="text-[11px] tabular-nums shrink-0" style={{ color: "var(--bl-fg-muted)" }}>
                {e.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
