import { highlights } from "../data/highlights";
import { Section } from "../components/layout/Section";

export function Highlights() {
  return (
    <Section className="pt-12 sm:pt-16 lg:pt-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.title}>
            <div className="mb-3 h-px w-8 bg-zinc-300" />
            <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
