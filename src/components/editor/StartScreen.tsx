import { FileText, Sparkles, LayoutTemplate, Download, type LucideIcon } from "lucide-react";

interface StartScreenProps {
  onStartScratch: () => void;
}

const options: {
  id: string;
  label: string;
  icon: LucideIcon;
  enabled: boolean;
}[] = [
  {
    id: "scratch",
    label: "Press Enter to start from scratch",
    icon: FileText,
    enabled: true,
  },
  {
    id: "ai",
    label: "Create with AI",
    icon: Sparkles,
    enabled: false,
  },
  {
    id: "template",
    label: "Use a template",
    icon: LayoutTemplate,
    enabled: false,
  },
  {
    id: "import",
    label: "Import form",
    icon: Download,
    enabled: false,
  },
];

export function StartScreen({ onStartScratch }: StartScreenProps) {
  return (
    <div className="mt-6">
      <ul className="space-y-0.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const disabled = !opt.enabled;

          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={opt.enabled ? onStartScratch : undefined}
                className={
                  disabled
                    ? "flex w-full cursor-default items-center gap-3 rounded-lg px-2 py-2.5 text-left"
                    : "group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-zinc-50"
                }
              >
                <span
                  className={
                    disabled
                      ? "flex h-5 w-5 shrink-0 items-center justify-center text-zinc-300"
                      : "flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400 transition-colors group-hover:text-zinc-700"
                  }
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span
                  className={
                    disabled
                      ? "text-[15px] text-zinc-400"
                      : "text-[15px] text-zinc-600 transition-colors group-hover:text-zinc-900"
                  }
                >
                  {opt.label}
                </span>
                {disabled && (
                  <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                    Coming soon
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 max-w-lg text-[15px] leading-relaxed text-zinc-700">
        <p>
          Formzo is a form builder that{" "}
          <span className="rounded bg-blue-50 px-1 py-0.5 font-medium text-blue-700">
            works like a doc
          </span>
          .
        </p>
        <p className="mt-1.5">
          Just type <span className="font-semibold text-blue-600">/</span> to
          insert form blocks and{" "}
          <span className="font-semibold text-blue-600">@</span> to mention
          question answers.
        </p>
      </div>
    </div>
  );
}
