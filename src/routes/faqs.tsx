import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQs — KitchenBloom" }, { name: "description", content: "Answers to common questions about KitchenBloom." }] }),
  component: FAQs,
});

const faqs = [
  { q: "Do you deliver plants?", a: "No — KitchenBloom is pickup-only. This keeps prices fair and plants healthy." },
  { q: "How do I pay?", a: "You pay at the nursery when you collect your plant. Cash, UPI, or card — whatever the nursery accepts." },
  { q: "Can I change my pickup slot?", a: "Yes, contact the nursery directly using the phone number in your confirmation email." },
  { q: "How do I list my nursery?", a: "Sign up as a supplier and complete your nursery profile — it takes about 3 minutes." },
  { q: "Are the plants organic?", a: "Most of our partner nurseries grow chemical-free. Look for the badge on each nursery's page." },
];

function FAQs() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQs</p>
      <h1 className="mt-2 font-display text-5xl font-semibold">Questions, answered.</h1>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}