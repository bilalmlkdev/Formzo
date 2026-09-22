import { templates } from "../data/templates";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Button } from "../components/ui/Button";

export function Templates() {
  return (
    <Section id="templates" className="border-t border-zinc-100 bg-zinc-50/40">
      <SectionHeader
        eyebrow="Templates"
        title="Start from something real"
        description="Pick a proven structure, swap in your questions, and publish. Blank pages optional."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {templates.map((tpl) => (
          <button
            key={tpl.name}
            type="button"
            className="group rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:p-5"
          >
            <div className="mb-4 h-16 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 transition-colors group-hover:border-zinc-300" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              {tpl.category}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900">{tpl.name}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="secondary" href="/new">
          Browse all templates
        </Button>
      </div>
    </Section>
  );
}
