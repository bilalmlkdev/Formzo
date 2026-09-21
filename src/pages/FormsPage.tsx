import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, FileText } from "lucide-react";
import { useFormStore } from "../store/form-store";

type FilterType = "all" | "draft" | "published" | "archived";

export function FormsPage() {
  const forms = useFormStore((s) => s.forms);
  const loadForms = useFormStore((s) => s.loadForms);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  const safeForms = Array.isArray(forms) ? forms : [];
  const filtered = safeForms.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || f.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Forms</h1>
          <Link
            to="/app/forms/new"
            className="flex items-center gap-2 rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]"
          >
            <Plus className="h-4 w-4" />
            New form
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#9B72FF] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
            />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            {(["all", "draft", "published", "archived"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                  filter === f
                    ? "bg-purple-100 text-[#9B72FF]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm text-gray-500">
              {search || filter !== "all" ? "No forms match your search" : "No forms yet"}
            </p>
            {!search && filter === "all" && (
              <Link
                to="/app/forms/new"
                className="mt-4 flex items-center gap-2 rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]"
              >
                <Plus className="h-4 w-4" />
                Create a form
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map((form) => (
              <div
                key={form.id}
                onClick={() => navigate(`/app/forms/${form.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:border-[#9B72FF] hover:shadow-sm"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{form.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {form.responseCount} responses · {form.fields.length} fields · Updated{" "}
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
      </main>
    </div>
  );
}
