import { Plugs } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  initials: string;
  tint: string;
}

const INTEGRATIONS: Integration[] = [
  { id: "slack", name: "Slack", description: "Post notifications to channels", connected: true, initials: "SL", tint: "var(--bl-fill-info)" },
  { id: "github", name: "GitHub", description: "Sync repos and pull requests", connected: true, initials: "GH", tint: "var(--bl-fg-primary)" },
  { id: "stripe", name: "Stripe", description: "Process payments and invoices", connected: false, initials: "ST", tint: "var(--bl-fill-primary)" },
  { id: "zapier", name: "Zapier", description: "Automate cross-app workflows", connected: false, initials: "ZP", tint: "var(--bl-fill-warning)" },
];

/**
 * IntegrationCard - grid of integration items with connection toggles and
 * configure actions. Composes: Card, Badge, Button, Switch, Phosphor
 * Plugs icon.
 */
export function IntegrationCard({ className }: { className?: string }) {
  const connectedCount = INTEGRATIONS.filter((i) => i.connected).length;

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Plugs size={18} weight="bold" style={{ color: "var(--bl-fill-primary)" }} />
          <CardTitle className="text-sm">Integrations</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {connectedCount} connected
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
          >
            {/* App icon placeholder */}
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${integration.tint} 16%, transparent)`,
                color: integration.tint,
              }}
            >
              {integration.initials}
            </span>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>
                {integration.name}
              </p>
              <p className="text-[11px] truncate" style={{ color: "var(--bl-fg-muted)" }}>
                {integration.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[11px] px-2"
                disabled={!integration.connected}
              >
                Configure
              </Button>
              <Switch
                checked={integration.connected}
                aria-label={`Toggle ${integration.name} connection`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
