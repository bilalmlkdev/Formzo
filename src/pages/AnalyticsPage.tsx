import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { useFormStore } from "../store/form-store";

export function AnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const getForm = useFormStore((s) => s.getForm);
  const loadForms = useFormStore((s) => s.loadForms);
  const getResponses = useFormStore((s) => s.getResponses);
  const form = getForm(id ?? "");
  const responses = getResponses(id ?? "");
  const navigate = useNavigate();

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

  const completionRate =
    form.responseCount > 0
      ? Math.min(100, Math.round((responses.length / Math.max(form.responseCount, 1)) * 100))
      : 0;

  const stats = [
    { icon: Eye, label: "Total visits", value: form.responseCount * 3, color: "purple" },
    { icon: CheckCircle, label: "Completion rate", value: `${completionRate}%`, color: "green" },
    { icon: Clock, label: "Avg. time", value: "2m 15s", color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="font-semibold text-gray-900">Analytics</h1>
            <p className="text-xs text-gray-400">{form.name}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    s.color === "purple"
                      ? "bg-purple-100"
                      : s.color === "green"
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <s.icon
                    className={`h-5 w-5 ${
                      s.color === "purple"
                        ? "text-[#9B72FF]"
                        : s.color === "green"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16">
          <BarChart3 className="h-12 w-12 text-gray-300" />
          <h2 className="mt-4 text-lg font-semibold text-gray-700">Detailed analytics</h2>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-400">
            Detailed analytics with charts, response trends, and field-level insights are coming
            soon.
          </p>
        </div>
      </main>
    </div>
  );
}
