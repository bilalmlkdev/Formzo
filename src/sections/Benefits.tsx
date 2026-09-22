import { benefits } from "../data/benefits";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Card, CardTitle, CardDescription } from "../components/ui/Card";

export function Benefits() {
  return (
    <Section id="benefits" className="border-t border-zinc-100">
      <SectionHeader
        eyebrow="Benefits"
        title="Less busywork. More signal."
        description="Formzo keeps creation, collection, and review in one place so you always know where every response stands."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="hover:border-zinc-300">
            <CardTitle>{benefit.title}</CardTitle>
            <CardDescription>{benefit.description}</CardDescription>
          </Card>
        ))}
      </div>
    </Section>
  );
}
