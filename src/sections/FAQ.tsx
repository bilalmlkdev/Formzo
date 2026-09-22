import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/faq";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { cn } from "../lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="border-t border-zinc-100 bg-zinc-50/40">
      <SectionHeader
        eyebrow="FAQ"
        title="Everything you need to know"
        description="Quick answers about building, sharing, and collecting with Formzo."
      />

      <div className="mx-auto max-w-2xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-50 sm:px-6"
              >
                <span className="text-sm font-medium text-zinc-900">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 transition-transform",
                    open && "rotate-180"
                  )}
                >
                  {open ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-500 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
