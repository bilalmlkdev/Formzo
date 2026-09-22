import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(15,15,16,0.06),transparent)]"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6">
            <Sparkles size={12} className="text-zinc-500" />
            Free forever for your first forms
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Your forms, finally simple to build
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            Formzo is the form builder for people who care about craft. Create
            beautiful forms, share them anywhere, and read every response in one
            calm workspace.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <span>No credit card required</span>
            <span aria-hidden>·</span>
            <span>Set up in under a minute</span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" href="/new" className="w-full sm:w-auto">
              Create a free form
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="relative mt-14 sm:mt-16">
          <div
            aria-hidden
            className="absolute -inset-x-4 top-0 -z-10 h-40 rounded-[2rem] bg-gradient-to-b from-zinc-100 to-transparent blur-2xl"
          />
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-50/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <span className="ml-3 truncate text-xs text-zinc-400">
                formzo.app/f/customer-feedback
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="border-b border-zinc-100 p-6 sm:p-8 md:border-b-0 md:border-r">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Form builder
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Full name", type: "Text field", active: true },
                    { label: "How was your experience?", type: "Multiple choice" },
                    { label: "Anything else?", type: "Long text" },
                    { label: "Upload a screenshot", type: "File" },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className={`rounded-lg border px-3.5 py-3 transition-colors ${
                        field.active
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-zinc-800">
                          {field.label}
                        </span>
                        <span className="shrink-0 text-[11px] text-zinc-400">
                          {field.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50/50 p-6 sm:p-8">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Live preview
                </p>
                <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <p className="text-base font-semibold text-zinc-900">
                    Customer feedback
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Takes about 2 minutes. We read every answer.
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                        Full name
                      </label>
                      <div className="h-9 rounded-md border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-sm text-zinc-400">
                        Jane Cooper
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                        How was your experience?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Great", "Okay", "Needs work"].map((opt, i) => (
                          <span
                            key={opt}
                            className={`rounded-full border px-3 py-1 text-xs ${
                              i === 0
                                ? "border-zinc-900 bg-zinc-900 text-white"
                                : "border-zinc-200 bg-white text-zinc-600"
                            }`}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-md bg-zinc-950 px-3 py-2 text-center text-xs font-medium text-white">
                      Submit response
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5">
                  <span className="text-xs text-zinc-500">Responses today</span>
                  <span className="text-sm font-semibold text-zinc-900">128</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
