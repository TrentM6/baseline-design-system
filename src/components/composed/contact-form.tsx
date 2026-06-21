import * as React from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * ContactForm — multi-field form with a sent confirmation state.
 * Composes: Card, Input, Label, Textarea, Select, Button, Phosphor.
 */
export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <CheckCircle size={40} weight="fill" style={{ color: "var(--bl-fill-success)" }} />
          <div>
            <p className="font-heading font-semibold">Message sent</p>
            <p className="text-sm text-muted-foreground">We'll respond within 24 hours.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSent(false)}>
            Send another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Get in touch</CardTitle>
        <CardDescription>We'll respond within 24 hours</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="contact-first">First name</Label>
              <Input id="contact-first" placeholder="Jane" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-last">Last name</Label>
              <Input id="contact-last" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-topic">Topic</Label>
            <Select>
              <SelectTrigger id="contact-topic">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-msg">Message</Label>
            <Textarea id="contact-msg" placeholder="How can we help?" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full gap-2">
            <PaperPlaneTilt size={16} weight="fill" />
            Send message
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
