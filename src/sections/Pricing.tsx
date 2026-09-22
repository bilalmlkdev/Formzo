import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { pricingPlans } from "../data/pricing";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <Section id="pricing" className="border-t border-zinc-100">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple pricing, no surprises"
        description="Two plans. Cancel anytime. Start free and upgrade only when you need to."
      />

      <div className="mb-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-medium",
            !annual ? "text-zinc-900" : "text-zinc-400"
          )}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual pricing"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors",
            annual ? "bg-zinc-950" : "bg-zinc-300"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
              annual ? "translate-x-[22px]" : "translate-x-0.5"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm font-medium",
            annual ? "text-zinc-900" : "text-zinc-400"
          )}
        >
          Annual
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          Save 21%
        </span>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-6">
        {pricingPlans.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-white p-6 sm:p-7",
                plan.highlighted
                  ? "border-zinc-950 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)]"
                  : "border-zinc-200 shadow-sm"
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-zinc-950 px-3 py-0.5 text-[11px] font-semibold text-white">
                  Most popular
                </span>
              )}

              <p className="text-base font-semibold text-zinc-900">{plan.name}</p>
              <p className="mt-1 text-sm text-zinc-500">{plan.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-zinc-950">
                  ${price}
                </span>
                <span className="text-sm text-zinc-500">/month</span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                {price === 0
                  ? "No credit card required"
                  : annual
                    ? "Billed annually"
                    : "Billed monthly"}
              </p>

              <Button
                className="mt-6 w-full"
                variant={plan.highlighted ? "primary" : "secondary"}
                href="/new"
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-zinc-900"
                        strokeWidth={2.25}
                      />
                    ) : (
                      <Minus
                        size={16}
                        className="mt-0.5 shrink-0 text-zinc-300"
                        strokeWidth={2}
                      />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? "text-zinc-700"
                          : "text-zinc-400 line-through decoration-zinc-300"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
