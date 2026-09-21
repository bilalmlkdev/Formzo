import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, Inbox } from "lucide-react";
import { useFormStore } from "../store/form-store";

export function ResponsesPage() {
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

  const handleExportCsv = () => {
    if (responses.length === 0) return;
    const headers = ["Submitted At", ...form.fields.map((f) => f.label)];
    const rows = responses.map((r) => [
      new Date(r.submittedAt).toLocaleString(),
      ...form.fields.map((f) => {
        const val = r.answers[f.id];
        return Array.isArray(val) ? val.join(", ") : String(val ?? "");
      }),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.name}-responses.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900">{form.name}</h1>
              <p className="text-xs text-gray-400">Responses</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/f/${form.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View form
            </Link>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        {responses.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center">
            <Inbox className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm text-gray-500">No responses yet</p>
            <p className="mt-1 text-xs text-gray-400">
              Share your form to start collecting responses
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-500">#</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Submitted</th>
                  {form.fields.slice(0, 5).map((f) => (
                    <th key={f.id} className="px-4 py-3 font-medium text-gray-500">
                      {f.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {responses.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.submittedAt).toLocaleString()}
                    </td>
                    {form.fields.slice(0, 5).map((f) => (
                      <td key={f.id} className="px-4 py-3 text-gray-700">
                        {(() => {
                          const val = r.answers[f.id];
                          return Array.isArray(val) ? val.join(", ") : String(val ?? "");
                        })()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
