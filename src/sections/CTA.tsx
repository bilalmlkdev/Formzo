import { ArrowRight } from "lucide-react";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function CTA() {
  return (
    <Section className="border-t border-zinc-100">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Get started
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          Your next form is one click away
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-500 sm:text-lg">
          Stop wrestling with form tools. Build something clean, share it, and
          read every response without the noise.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/new" className="w-full sm:w-auto">
            Create a free form
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
