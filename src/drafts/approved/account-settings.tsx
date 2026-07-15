/**
 * THE CANVAS — the design currently being drafted on Baseline HQ's /design/canvas.
 *
 * Agent contract:
 * - This file IS the canvas. Whatever it exports renders live in the preview.
 * - Compose from the design system: components from "@/components/ui",
 *   "@/components/composed", "@/components/charts" — never bespoke one-offs,
 *   never raw hex values, tokens only (see AGENTS.md).
 * - Replace the placeholder below entirely when starting a new design.
 * - Approving a design snapshots this file into src/drafts/approved/<name>.tsx
 *   (the operator's Approve button does this — leave that mechanism alone).
 */

import * as React from "react";
import { Warning, Camera } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NotificationRow {
  id: string;
  title: string;
  desc: string;
  defaultOn?: boolean;
}

const NOTIFICATION_ROWS: NotificationRow[] = [
  { id: "product", title: "Product updates", desc: "New features and improvements", defaultOn: true },
  { id: "security", title: "Security alerts", desc: "Sign-ins and account changes", defaultOn: true },
  { id: "marketing", title: "Marketing emails", desc: "Tips, offers, and announcements" },
  { id: "digest", title: "Weekly digest", desc: "A summary of your activity", defaultOn: true },
];

function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
        <CardDescription>Your public identity across Baseline.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">TM</AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Change avatar"
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full shadow-button"
            >
              <Camera size={14} weight="bold" />
            </Button>
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium" style={{ color: "var(--bl-fg-primary)" }}>
              Profile photo
            </p>
            <p className="text-xs" style={{ color: "var(--bl-fg-muted)" }}>
              JPG, PNG, or GIF. 2MB max.
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Full name</Label>
            <Input id="profile-name" defaultValue="Trent Mitchell" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" defaultValue="trxntmitchell@gmail.com" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm">Save changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationsCard() {
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATION_ROWS.map((r) => [r.id, !!r.defaultOn]))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Notifications</CardTitle>
        <CardDescription>Choose what you want to hear about.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {NOTIFICATION_ROWS.map((row, i) => (
          <React.Fragment key={row.id}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label htmlFor={`notif-${row.id}`} className="text-sm font-medium">
                  {row.title}
                </Label>
                <p className="text-xs mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
                  {row.desc}
                </p>
              </div>
              <Switch
                id={`notif-${row.id}`}
                checked={state[row.id]}
                onCheckedChange={(v) => setState((s) => ({ ...s, [row.id]: v }))}
              />
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

function DangerZoneCard() {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-destructive">
          <Warning size={18} weight="bold" />
          Danger zone
        </CardTitle>
        <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium" style={{ color: "var(--bl-fg-primary)" }}>
              Delete account
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
              Permanently remove your account and all associated data.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="shrink-0">
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and remove all of
                  your data from our servers. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CurrentDraft() {
  return (
    <div className="h-full min-h-svh px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[640px] space-y-8">
        <header>
          <h1
            className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            Account settings
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--bl-fg-secondary)" }}>
            Manage your profile, notification preferences, and account.
          </p>
        </header>

        <ProfileCard />
        <NotificationsCard />
        <DangerZoneCard />
      </div>
    </div>
  );
}
