import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useBuilderStore } from "../../store/builder-store";
import { Switch } from "../ui/switch";
import { cn } from "../../lib/utils";

interface FormSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormSettingsModal({ open, onOpenChange }: FormSettingsModalProps) {
  const form = useBuilderStore((s) => s.form);
  const setForm = useBuilderStore((s) => s.setForm);

  const [name, setName] = useState(form?.name ?? "");
  const [description, setDescription] = useState(form?.description ?? "");
  const [slug, setSlug] = useState(form?.slug ?? "");
  const [submitLabel, setSubmitLabel] = useState(form?.settings.submitLabel ?? "Submit");

  useEffect(() => {
    if (form) {
      setName(form.name);
      setDescription(form.description);
      setSlug(form.slug);
      setSubmitLabel(form.settings.submitLabel);
    }
  }, [form]);

  if (!form || !open) return null;

  const handleSave = () => {
    setForm({
      ...form,
      name,
      description,
      slug,
      settings: {
        ...form.settings,
        submitLabel,
      },
    });
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => onOpenChange(false)}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Form Settings</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Form Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Form name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              placeholder="My Form"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9B72FF] resize-none transition-colors"
              rows={3}
              placeholder="Describe your form..."
            />
          </div>

          {/* Custom URL Slug */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Custom URL</label>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg px-3 py-2">
                formzo.app/f/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                className="flex-1 border border-gray-200 rounded-r-lg px-3 py-2 text-sm outline-none focus:border-[#9B72FF] transition-colors"
                placeholder="my-form"
              />
            </div>
          </div>

          {/* Submit Button Label */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Submit button label</label>
            <input
              value={submitLabel}
              onChange={(e) => setSubmitLabel(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              placeholder="Submit"
            />
          </div>

          {/* Show Required Indicators */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700 block">Show required indicators</span>
              <span className="text-xs text-gray-400">Display asterisks on required fields</span>
            </div>
            <Switch
              checked={form.settings.showRequiredIndicators}
              onCheckedChange={(checked: boolean) =>
                setForm({
                  ...form,
                  settings: { ...form.settings, showRequiredIndicators: checked },
                })
              }
            />
          </div>

          {/* Theme Width */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Form width</label>
            <div className="flex gap-1">
              {(["sm", "md", "lg"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() =>
                    setForm({
                      ...form,
                      settings: { ...form.settings, theme: { ...form.settings.theme, width: w } },
                    })
                  }
                  className={cn(
                    "flex-1 px-2 py-1.5 text-xs rounded-lg border transition-colors capitalize",
                    form.settings.theme.width === w
                      ? "border-[#9B72FF] bg-purple-50 text-[#9B72FF] font-medium"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {w === "sm" ? "Small" : w === "md" ? "Medium" : "Large"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-[#9B72FF] hover:bg-[#8A5FE6] rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
