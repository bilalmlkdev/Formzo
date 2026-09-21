import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, FileText, LayoutGrid, BarChart3 } from "lucide-react";
import { useAppStore } from "../store/app-store";
import { useFormStore } from "../store/form-store";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const forms = useFormStore((s) => s.forms);
  const loadForms = useFormStore((s) => s.loadForms);
  const navigate = useNavigate();

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  const safeForms = Array.isArray(forms) ? forms : [];
  const totalResponses = safeForms.reduce((sum, f) => sum + f.responseCount, 0);
  const published = safeForms.filter((f) => f.status === "published").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9B72FF]">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">Formzo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/app/forms/new"
              className="flex items-center gap-2 rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]"
            >
              <Plus className="h-4 w-4" />
              New form
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {user?.name ?? "there"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">Here's an overview of your forms.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <LayoutGrid className="h-5 w-5 text-[#9B72FF]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{safeForms.length}</p>
                <p className="text-xs text-gray-500">Total forms</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{published}</p>
                <p className="text-xs text-gray-500">Published</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalResponses}</p>
                <p className="text-xs text-gray-500">Total responses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Your forms</h2>
          {safeForms.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16">
              <FileText className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-sm text-gray-500">No forms yet</p>
              <Link
                to="/app/forms/new"
                className="mt-4 flex items-center gap-2 rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]"
              >
                <Plus className="h-4 w-4" />
                Create a form
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {safeForms.map((form) => (
                <div
                  key={form.id}
                  onClick={() => navigate(`/app/forms/${form.id}`)}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:border-[#9B72FF] hover:shadow-sm"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{form.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {form.responseCount} responses · Updated{" "}
                      {new Date(form.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      form.status === "published"
                        ? "bg-green-50 text-green-700"
                        : form.status === "archived"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {form.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
