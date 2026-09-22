import { X } from "lucide-react";
import type { FormBuilder } from "../../types/form";
import { useFormsStore } from "../../store/forms-store";

interface CustomizePanelProps {
  form: FormBuilder;
  onClose: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-2">
      <label className="relative h-5 w-5 shrink-0 cursor-pointer overflow-hidden rounded border border-zinc-200">
        <span
          className="absolute inset-0"
          style={{ background: value }}
          aria-hidden
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Pick color"
        />
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent text-xs text-zinc-700 outline-none"
        aria-label="Hex color"
      />
    </div>
  );
}

export function CustomizePanel({ form, onClose }: CustomizePanelProps) {
  const updateForm = useFormsStore((s) => s.updateForm);
  const theme = form.theme;

  const setTheme = (patch: Partial<typeof theme>) => {
    updateForm(form.id, { theme: { ...theme, ...patch } });
  };

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 max-h-[70vh] overflow-y-auto border-t border-zinc-200 bg-white shadow-2xl lg:inset-y-12 lg:left-auto lg:right-0 lg:top-12 lg:max-h-none lg:w-[320px] lg:border-l lg:border-t-0">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-3.5">
        <h2 className="text-sm font-semibold text-zinc-900">Customize</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100"
            aria-label="Help"
          >
            ?
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100"
            aria-label="Close customize"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-6 px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Theme">
            <select
              value={theme.theme}
              onChange={(e) =>
                setTheme({ theme: e.target.value as "light" | "dark" })
              }
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-800 outline-none focus:border-zinc-400"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </Field>
          <Field label="Font">
            <select
              value={theme.font}
              onChange={(e) => setTheme({ font: e.target.value })}
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-800 outline-none focus:border-zinc-400"
            >
              <option value="Inter">Inter</option>
              <option value="Georgia">Georgia</option>
              <option value="ui-monospace, monospace">Mono</option>
              <option value="system-ui">System</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Background">
            <ColorInput
              value={theme.background}
              onChange={(background) => setTheme({ background })}
            />
          </Field>
          <Field label="Text">
            <ColorInput
              value={theme.text}
              onChange={(text) => setTheme({ text })}
            />
          </Field>
          <Field label="Button background">
            <ColorInput
              value={theme.buttonBg}
              onChange={(buttonBg) => setTheme({ buttonBg })}
            />
          </Field>
          <Field label="Button text">
            <ColorInput
              value={theme.buttonText}
              onChange={(buttonText) => setTheme({ buttonText })}
            />
          </Field>
          <div className="col-span-2">
            <Field label="Accent">
              <ColorInput
                value={theme.accent}
                onChange={(accent) => setTheme({ accent })}
              />
            </Field>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-900">Layout</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Page width">
              <div className="flex h-9 items-center rounded-md border border-zinc-200 bg-white px-2">
                <input
                  type="number"
                  value={theme.pageWidth}
                  onChange={(e) =>
                    setTheme({ pageWidth: Number(e.target.value) || 700 })
                  }
                  className="w-full bg-transparent text-sm outline-none"
                />
                <span className="text-xs text-zinc-400">px</span>
              </div>
            </Field>
            <Field label="Base font size">
              <div className="flex h-9 items-center rounded-md border border-zinc-200 bg-white px-2">
                <input
                  type="number"
                  value={theme.baseFontSize}
                  onChange={(e) =>
                    setTheme({ baseFontSize: Number(e.target.value) || 16 })
                  }
                  className="w-full bg-transparent text-sm outline-none"
                />
                <span className="text-xs text-zinc-400">px</span>
              </div>
            </Field>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900">Advanced</p>
            <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-600">
              Pro
            </span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            Custom CSS, cover images, and logo upload unlock on Pro.
          </p>
        </div>
      </div>
    </aside>
  );
}
