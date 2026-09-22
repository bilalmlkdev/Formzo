import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Settings,
  Sparkles,
  Eye,
  Upload,
  ChevronLeft,
} from "lucide-react";
import { useFormsStore } from "../store/forms-store";
import { CustomizePanel } from "../components/editor/CustomizePanel";
import { EditorCanvas } from "../components/editor/EditorCanvas";
import { PublishModal } from "../components/editor/PublishModal";
import { HistoryPanel } from "../components/editor/HistoryPanel";

export function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const form = useFormsStore((s) =>
    id ? s.forms.find((f) => f.id === id) : undefined
  );
  const updateForm = useFormsStore((s) => s.updateForm);
  const navigate = useNavigate();

  const [panel, setPanel] = useState<"none" | "customize" | "history">("none");
  const [preview, setPreview] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (!id) return;
    setSaved(false);
    const t = setTimeout(() => setSaved(true), 400);
    return () => clearTimeout(t);
  }, [form?.title, form?.blocks, form?.theme, id]);

  const canPublish = useMemo(() => !!form && form.blocks.length > 0, [form]);

  if (!id || !form) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <p className="text-sm text-zinc-500">Form not found.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-zinc-100 bg-white px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Back to home"
          >
            <ChevronLeft size={18} />
          </Link>
          <span className="hidden text-zinc-400 sm:inline" aria-hidden>
            ✳
          </span>
          <span className="truncate text-sm text-zinc-600">
            / {form.title || "Untitled"}
          </span>
          <span className="ml-1 hidden text-xs text-zinc-400 sm:inline">
            {saved ? "Saved" : "Saving…"}
          </span>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            className="hidden h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 sm:inline-flex"
            title="Automations"
            aria-label="Automations"
          >
            <Sparkles size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              setPanel(panel === "history" ? "none" : "history")
            }
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 ${
              panel === "history" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500"
            }`}
            title="Version history"
            aria-label="Version history"
          >
            <Clock size={16} />
          </button>
          <button
            type="button"
            className="hidden h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 sm:inline-flex"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={16} />
          </button>

          <button
            type="button"
            onClick={() => setPanel(panel === "customize" ? "none" : "customize")}
            className={`hidden h-8 items-center rounded-md px-2.5 text-sm font-medium hover:bg-zinc-100 sm:inline-flex ${
              panel === "customize"
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-700"
            }`}
          >
            Customize
          </button>

          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className={`inline-flex h-8 items-center rounded-md px-2.5 text-sm font-medium hover:bg-zinc-100 ${
              preview ? "bg-zinc-100 text-zinc-900" : "text-zinc-700"
            }`}
          >
            <Eye size={15} className="mr-1.5 sm:mr-1.5" />
            <span className="hidden sm:inline">
              {preview ? "Editing" : "Preview"}
            </span>
          </button>

          <button
            type="button"
            disabled={!canPublish}
            onClick={() => setPublishOpen(true)}
            className="ml-1 inline-flex h-8 items-center rounded-md bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
          >
            <Upload size={14} className="mr-1.5 hidden sm:block" />
            Publish
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <main className={`flex-1 overflow-y-auto ${panel !== "none" ? "lg:mr-[320px]" : ""}`}>
          <EditorCanvas
            form={form}
            preview={preview}
            onTitleChange={(title) => updateForm(form.id, { title })}
            onDescChange={(description) => updateForm(form.id, { description })}
          />
        </main>

        {panel === "customize" && (
          <CustomizePanel
            form={form}
            onClose={() => setPanel("none")}
          />
        )}
        {panel === "history" && (
          <HistoryPanel onClose={() => setPanel("none")} />
        )}
      </div>

      <PublishModal
        open={publishOpen}
        formId={form.id}
        onClose={() => setPublishOpen(false)}
      />
    </div>
  );
}
