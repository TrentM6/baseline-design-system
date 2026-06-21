import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToggleRow {
  id: string;
  title: string;
  desc: string;
  defaultOn?: boolean;
}

const DEFAULT_ROWS: ToggleRow[] = [
  { id: "email", title: "Email notifications", desc: "Receive updates via email", defaultOn: true },
  { id: "marketing", title: "Marketing emails", desc: "Product announcements" },
];

/**
 * SettingsPanel -preference card with live toggles + a select.
 * Composes: Card, Switch, Separator, Label, Select. Stateful toggles.
 */
export function SettingsPanel({ rows = DEFAULT_ROWS }: { rows?: ToggleRow[] }) {
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.map((r) => [r.id, !!r.defaultOn]))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row, i) => (
          <React.Fragment key={row.id}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor={`pref-${row.id}`} className="text-sm font-medium">
                  {row.title}
                </Label>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Switch
                id={`pref-${row.id}`}
                checked={state[row.id]}
                onCheckedChange={(v) =>
                  setState((s) => ({ ...s, [row.id]: v }))
                }
              />
            </div>
          </React.Fragment>
        ))}
        <Separator />
        <div className="space-y-1.5">
          <Label htmlFor="pref-language" className="text-sm">
            Language
          </Label>
          <Select defaultValue="en">
            <SelectTrigger id="pref-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
