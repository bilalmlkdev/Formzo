import type { FormResponse } from "../types/response";
import type { Form } from "../types/form";

export function exportToCsv(form: Form, responses: FormResponse[]): void {
  if (responses.length === 0) return;

  const headers = ["Submitted At", ...form.fields.map((f) => f.label)];
  const rows = responses.map((r) => {
    return [
      new Date(r.submittedAt).toISOString(),
      ...form.fields.map((f) => {
        const val = r.answers[f.id];
        if (val === undefined || val === null) return "";
        if (Array.isArray(val)) return val.join(", ");
        return String(val);
      }),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${form.name.replace(/\s+/g, "_")}_responses.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
