import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Monitor, Smartphone, Eye } from "lucide-react";
import { useFormStore } from "../store/form-store";
import { FormRenderer } from "../components/forms/FormRenderer";

export function FormPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const getForm = useFormStore((s) => s.getForm);
  const loadForms = useFormStore((s) => s.loadForms);
  const form = getForm(id ?? "");
  const navigate = useNavigate();
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Form not found</p>
          <button
            onClick={() => navigate("/app")}
            className="mt-4 text-sm font-medium text-[#9B72FF] hover:text-[#8A5FE6]"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1">
            <Eye className="h-3.5 w-3.5 text-[#9B72FF]" />
            <span className="text-xs font-medium text-[#9B72FF]">Preview</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setViewport("desktop")}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
              viewport === "desktop"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
              viewport === "mobile"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex justify-center py-10">
        <div
          className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all ${
            viewport === "mobile" ? "w-full max-w-sm" : "w-full max-w-3xl"
          }`}
        >
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
            {form.description && (
              <p className="text-gray-500">{form.description}</p>
            )}
          </div>
          <FormRenderer fields={form.fields} mode="preview" />
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-400 mt-6">
            Submit is disabled in preview mode
          </div>
        </div>
      </div>
    </div>
  );
}
