import { Lock, ShieldCheck, KeyRound, EyeOff } from "lucide-react";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";

const items = [
  {
    icon: Lock,
    title: "Encrypted everywhere",
    description: "TLS in transit, AES-256 at rest for every response you collect.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    description: "GDPR-ready workflows with clear data controls and deletion.",
  },
  {
    icon: KeyRound,
    title: "Access control",
    description: "Workspace roles keep drafts, responses, and settings scoped.",
  },
  {
    icon: EyeOff,
    title: "No shady tracking",
    description: "We don't sell data or inject trackers into your published forms.",
  },
];

export function Security() {
  return (
    <Section id="security" className="border-t border-zinc-100 bg-zinc-950 text-white">
      <SectionHeader
        eyebrow="Security"
        title="Secure by design"
        description="Protection is built into every layer — from the form renderer to the response store."
        tone="dark"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900">
                <Icon size={16} className="text-zinc-300" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {["AES-256", "TLS 1.3", "GDPR", "CCPA", "SOC 2 ready"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Section>
  );
}
