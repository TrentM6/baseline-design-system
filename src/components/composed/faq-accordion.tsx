import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FaqAccordion — titled card wrapping an accordion.
 * Composes: Card, Accordion (keyboard + animation baked in).
 */
export function FaqAccordion({
  title = "FAQ",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
