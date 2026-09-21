import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import type { DividerField } from "../../types/form";
import { useBuilderStore } from "../../store/builder-store";
import { cn } from "../../lib/utils";

interface PageBreakBlockProps {
  field: DividerField;
  index: number;
}

export function PageBreakBlock({ field, index }: PageBreakBlockProps) {
  const removeField = useBuilderStore((s) => s.removeField);
  const moveField = useBuilderStore((s) => s.moveField);
  const form = useBuilderStore((s) => s.form);

  const [hovered, setHovered] = useState(false);
  const fields = form?.fields ?? [];
  const canMoveUp = index > 0;
  const canMoveDown = index < fields.length - 1;

  return (
    <div
      className={cn(
        "group flex items-center gap-2 py-2 px-2 rounded-lg transition-all",
        "hover:bg-gray-50"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "flex items-center gap-0.5 shrink-0 transition-opacity",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <GripVertical className="w-4 h-4 text-gray-300" />
        <button
          onClick={() => {
            if (canMoveUp) moveField(index, index - 1);
          }}
          disabled={!canMoveUp}
          className="p-0.5 rounded hover:bg-gray-200 disabled:opacity-20"
        >
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (canMoveDown) moveField(index, index + 1);
          }}
          disabled={!canMoveDown}
          className="p-0.5 rounded hover:bg-gray-200 disabled:opacity-20"
        >
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 border-t border-dashed border-gray-300" />
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Page break</span>
        <div className="flex-1 border-t border-dashed border-gray-300" />
      </div>

      <button
        onClick={() => removeField(field.id)}
        className={cn(
          "p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
