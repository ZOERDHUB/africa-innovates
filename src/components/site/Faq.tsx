import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import type { FaqItem } from "@/lib/residency";

export function Faq({ items }: { items: FaqItem[] | undefined }) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions about the residency and voting"
        align="center"
      />

      <Accordion type="single" collapsible className="mt-10">
        {(items ?? []).map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-sm font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
