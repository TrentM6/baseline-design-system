import { Check } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  featured?: boolean;
  cta?: string;
}

/**
 * PricingTable — side-by-side plan cards, one optionally featured.
 * Composes: Card, Button, Badge, Separator, Phosphor check.
 */
export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiers.map((tier) => (
        <Card key={tier.name} className={tier.featured ? "border-primary" : undefined}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{tier.name}</CardTitle>
              {tier.featured && <Badge>Popular</Badge>}
            </div>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-heading font-bold">
              {tier.price}
              {tier.period && (
                <span className="text-xs font-normal text-muted-foreground">
                  /{tier.period}
                </span>
              )}
            </p>
            <Separator className="my-3" />
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check size={13} weight="bold" style={{ color: "var(--bl-fill-primary)" }} />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={tier.featured ? "default" : "outline"}
              className="w-full"
              size="sm"
            >
              {tier.cta ?? "Get started"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
