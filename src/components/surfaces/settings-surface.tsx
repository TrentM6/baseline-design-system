import * as React from "react";
import {
  GearSix,
  User,
  BellSimple,
  CreditCard,
  UsersThree,
  Code,
  FloppyDisk,
  CheckCircle,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsPanel, SurfaceShell, type SurfaceNavItem } from "@/components/composed";

const NAV: SurfaceNavItem[] = [
  { id: "General", label: "General", icon: GearSix },
  { id: "Profile", label: "Profile", icon: User },
  { id: "Notifications", label: "Notifications", icon: BellSimple },
  { id: "Billing", label: "Billing", icon: CreditCard },
  { id: "Team", label: "Team", icon: UsersThree },
  { id: "API", label: "API", icon: Code },
];

export function SettingsSurface() {
  const [active, setActive] = React.useState("General");
  const [saved, setSaved] = React.useState(false);

  return (
    <SurfaceShell
      items={NAV}
      activeId={active}
      onSelect={(id) => {
        setActive(id);
        setSaved(false);
      }}
      title={active}
    >
      <div className="p-6 max-w-lg">
        <h3 className="text-sm font-heading font-semibold mb-1">{active}</h3>
        <p className="text-[11px] text-muted-foreground mb-5">
          {active === "Notifications"
            ? "Choose what you want to hear about"
            : "Manage your workspace settings"}
        </p>

        {active === "Notifications" ? (
          <SettingsPanel />
        ) : (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="ws-name" className="text-xs">Workspace name</Label>
              <Input id="ws-name" defaultValue="Baseline Studio" className="h-8 text-xs" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ws-tz" className="text-xs">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="ws-tz" className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern</SelectItem>
                  <SelectItem value="pst">Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <Button type="submit" size="sm" className="text-xs h-8 gap-1.5">
                <FloppyDisk size={14} weight="fill" />
                Save changes
              </Button>
              <Button type="button" size="sm" variant="outline" className="text-xs h-8">
                Cancel
              </Button>
              {saved && (
                <span
                  className="text-[11px] flex items-center gap-1"
                  style={{ color: "var(--bl-fill-success)" }}
                  role="status"
                >
                  <CheckCircle size={13} weight="fill" />
                  Saved
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </SurfaceShell>
  );
}
