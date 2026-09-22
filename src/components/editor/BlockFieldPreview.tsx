import type { FormBuilder, FormBlock } from "../../types/form";

interface BlockFieldPreviewProps {
  block: FormBlock;
  preview: boolean;
  theme: FormBuilder["theme"];
  onOptionsChange: (options: string[]) => void;
}

export function BlockFieldPreview({
  block,
  preview,
  theme,
  onOptionsChange,
}: BlockFieldPreviewProps) {
  const dark = theme.theme === "dark";
  const inputStyle: React.CSSProperties = {
    borderColor: dark ? "#3f3f46" : "#e4e4e7",
    color: theme.text,
    background: dark ? "#18181b" : "#ffffff",
  };

  const updateOption = (i: number, value: string) => {
    const next = [...(block.options ?? [])];
    next[i] = value;
    onOptionsChange(next);
  };

  const addOption = () => {
    onOptionsChange([
      ...(block.options ?? []),
      `Option ${(block.options?.length ?? 0) + 1}`,
    ]);
  };

  if (block.type === "statement" || block.type === "heading") {
    return null;
  }

  if (block.type === "short_answer" || block.type === "email" || block.type === "phone" || block.type === "link" || block.type === "number") {
    return (
      <div
        className="relative flex h-11 max-w-md items-center rounded-lg border px-3.5 text-sm"
        style={inputStyle}
      >
        <span className="text-zinc-400">
          {preview
            ? block.placeholder || "Short answer"
            : block.placeholder || "Short answer"}
        </span>
        <span className="absolute right-3 text-xs text-zinc-400">Aa</span>
      </div>
    );
  }

  if (block.type === "long_answer") {
    return (
      <div
        className="min-h-[96px] max-w-xl rounded-lg border p-3.5 text-sm"
        style={inputStyle}
      >
        <span className="text-zinc-400">{block.placeholder || "Long answer"}</span>
      </div>
    );
  }

  if (block.type === "date" || block.type === "time") {
    return (
      <div
        className="flex h-11 max-w-xs items-center rounded-lg border px-3.5 text-sm text-zinc-400"
        style={inputStyle}
      >
        {block.type === "date" ? "MM / DD / YYYY" : "--:-- --"}
      </div>
    );
  }

  if (block.type === "rating") {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="text-2xl leading-none"
            style={{ color: theme.accent }}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  if (block.type === "yes_no") {
    return (
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <span
            key={opt}
            className="rounded-lg border px-4 py-2 text-sm"
            style={inputStyle}
          >
            {opt}
          </span>
        ))}
      </div>
    );
  }

  if (
    block.type === "multiple_choice" ||
    block.type === "checkboxes" ||
    block.type === "dropdown" ||
    block.type === "multi_select"
  ) {
    const options = block.options ?? [];

    if (block.type === "dropdown") {
      return (
        <div
          className="flex h-11 max-w-md items-center justify-between rounded-lg border px-3.5 text-sm text-zinc-400"
          style={inputStyle}
        >
          <span>Select an option</span>
          <span aria-hidden>▾</span>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label
            key={i}
            className="flex max-w-md cursor-pointer items-center gap-2.5 text-sm"
            style={{ color: theme.text }}
          >
            <input
              type={
                block.type === "multiple_choice"
                  ? "radio"
                  : block.type === "multi_select"
                    ? "checkbox"
                    : "checkbox"
              }
              name={block.id}
              readOnly
              className="h-4 w-4 shrink-0"
              style={{ accentColor: theme.accent }}
            />
            {preview ? (
              <span>{opt}</span>
            ) : (
              <input
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="w-full bg-transparent outline-none focus:bg-zinc-50"
                style={{ color: theme.text }}
              />
            )}
          </label>
        ))}
        {!preview && (
          <button
            type="button"
            onClick={addOption}
            className="mt-1 text-sm text-zinc-400 hover:text-zinc-700"
          >
            + Add option
          </button>
        )}
      </div>
    );
  }

  return null;
}
