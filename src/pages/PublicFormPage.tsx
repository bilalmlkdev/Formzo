import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Zap, CheckCircle } from "lucide-react";
import { useFormStore } from "../store/form-store";
import { FormRenderer } from "../components/forms/FormRenderer";

export function PublicFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const forms = useFormStore((s) => s.forms);
  const loadForms = useFormStore((s) => s.loadForms);
  const addResponse = useFormStore((s) => s.addResponse);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  const safeForms = Array.isArray(forms) ? forms : [];
  const form = safeForms.find((f) => f.slug === slug);

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
            <Zap className="h-6 w-6 text-[#9B72FF]" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Form not found</h1>
          <p className="mt-2 text-sm text-gray-500">
            This form may have been removed or the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Thank you!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your response has been recorded.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    addResponse({
      id: crypto.randomUUID(),
      formId: form.id,
      formSlug: form.slug,
      answers: values,
      submittedAt: new Date().toISOString(),
      metadata: {},
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9B72FF]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">Formzo</span>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
            {form.description && (
              <p className="text-gray-500">{form.description}</p>
            )}
          </div>
          <FormRenderer
            fields={form.fields}
            mode="public"
            values={values}
            onChange={(fieldId, value) => setValues((prev) => ({ ...prev, [fieldId]: value }))}
          />
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#9B72FF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#8A5FE6] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
          >
            {form.settings.submitLabel || "Submit"}
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">
          Powered by <span className="font-medium text-[#9B72FF]">Formzo</span>
        </p>
      </div>
    </div>
  );
}
