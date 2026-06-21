import { Lightning, ShieldCheck, Cube } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FeatureGrid,
  PricingTable,
  FaqAccordion,
  type Feature,
  type PricingTier,
  type FaqItem,
} from "@/components/composed";

const FEATURES: Feature[] = [
  { icon: Cube, title: "Token System", desc: "Semantic tokens with dark/light support" },
  { icon: Lightning, title: "40+ Primitives", desc: "shadcn/ui branded with your tokens" },
  { icon: ShieldCheck, title: "Composable", desc: "Build anything from building blocks" },
];

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    description: "For small teams",
    price: "$29",
    period: "mo",
    features: ["5 team members", "10GB storage", "Email support"],
  },
  {
    name: "Pro",
    description: "For growing teams",
    price: "$79",
    period: "mo",
    features: ["Unlimited members", "100GB storage", "Priority support"],
    featured: true,
  },
];

const FAQ: FaqItem[] = [
  { q: "What's included?", a: "All primitives, components, and design tokens, plus the full design rules documentation." },
  { q: "Can I customize the tokens?", a: "Yes. Edit bl-tokens.css to change any value — both dark and light update globally." },
  { q: "Is it accessible?", a: "Every component meets WCAG 2.2 AA: contrast, keyboard, focus, labels, and ARIA." },
];

export function LandingSurface() {
  return (
    <div className="min-h-svh" style={{ backgroundColor: "var(--bl-bg-body)" }}>
      <div className="text-center py-12 px-8">
        <Badge className="mb-3 text-[9px]">Now in beta</Badge>
        <h1 className="text-2xl font-heading font-bold mb-2">
          Build better products, faster
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
          The composable design system that scales from prototype to production.
          Every token, primitive, and component — connected.
        </p>
        <div className="flex justify-center gap-2">
          <Button size="sm" className="text-xs h-8">Get started</Button>
          <Button size="sm" variant="outline" className="text-xs h-8">View docs</Button>
        </div>
      </div>

      <Separator />

      <div className="py-8 px-8 max-w-2xl mx-auto">
        <h2 className="text-sm font-heading font-semibold text-center mb-5">
          Everything you need
        </h2>
        <FeatureGrid features={FEATURES} columns={3} />
      </div>

      <Separator />

      <div className="py-8 px-8 max-w-2xl mx-auto">
        <h2 className="text-sm font-heading font-semibold text-center mb-5">
          Simple pricing
        </h2>
        <PricingTable tiers={TIERS} />
      </div>

      <Separator />

      <div className="py-8 px-8 max-w-xl mx-auto">
        <FaqAccordion items={FAQ} />
      </div>
    </div>
  );
}
