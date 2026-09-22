import { useEffect } from "react";
import { X } from "lucide-react";
import { useFormsStore } from "../../store/forms-store";

interface PublishModalProps {
  open: boolean;
  formId: string;
  onClose: () => void;
}

export function PublishModal({ open, formId, onClose }: PublishModalProps) {
  const updateForm = useFormsStore((s) => s.updateForm);

  useEffect(() => {
    if (open) updateForm(formId, { published: true });
  }, [open, formId, updateForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Publish form"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Form published
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Your form is marked as live. Shareable links are coming soon.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
