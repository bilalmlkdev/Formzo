import { useState } from "react";
import {
  GripVertical,
  Settings,
  Copy,
  Trash2,
  ChevronDown as ChevronIcon,
  Calendar,
  Clock,
  Image,
} from "lucide-react";
import type { FormField } from "../../types/form";
import { useBuilderStore } from "../../store/builder-store";
import { BlockSettingsPopover } from "./BlockSettingsPopover";
import { cn } from "../../lib/utils";

interface FormBlockProps {
  field: FormField;
  index: number;
}

export function FormBlock({ field, index }: FormBlockProps) {
  const updateField = useBuilderStore((s) => s.updateField);
  const removeField = useBuilderStore((s) => s.removeField);
  const duplicateField = useBuilderStore((s) => s.duplicateField);
  const moveField = useBuilderStore((s) => s.moveField);
  const form = useBuilderStore((s) => s.form);

  const [showSettings, setShowSettings] = useState(false);
  const [hovered, setHovered] = useState(false);

  const fields = form?.fields ?? [];
  const canMoveUp = index > 0;
  const canMoveDown = index < fields.length - 1;
  const widthClass =
    field.width === "half"
      ? "w-1/2"
      : field.width === "third"
      ? "w-1/3"
      : "w-full";

  return (
    <div
      className={cn(
        "group relative flex items-start gap-2 rounded-xl border bg-white transition-all",
        "border-gray-200 hover:border-gray-300",
        "px-2 py-3"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grip Handle */}
      <div
        className={cn(
          "flex flex-col items-center pt-1 shrink-0 transition-opacity",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <GripVertical className="w-4 h-4 text-gray-300 mb-0.5" />
        <button
          onClick={() => {
            if (canMoveUp) moveField(index, index - 1);
          }}
          disabled={!canMoveUp}
          className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed"
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
          className="p-0.5 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Block Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Type Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 uppercase tracking-wide">
            {field.type === "yesNo"
              ? "Yes/No"
              : field.type === "shortText"
              ? "Short Text"
              : field.type === "longText"
              ? "Long Text"
              : field.type}
          </span>
          {field.required && (
            <span className="text-red-400 text-xs">Required</span>
          )}
        </div>

        {/* Label */}
        <input
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          placeholder="Question"
          className="w-full text-sm font-medium outline-none bg-transparent placeholder-gray-300"
        />

        {/* Description */}
        {"description" in field && field.description && (
          <p className="text-xs text-gray-400">{field.description}</p>
        )}

        {/* Field Preview */}
        <div className="mt-1">
          <FieldPreview field={field} widthClass={widthClass} />
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={cn(
          "flex items-center gap-0.5 shrink-0 transition-opacity",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            duplicateField(field.id);
          }}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
          className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Settings Popover */}
      {showSettings && (
        <BlockSettingsPopover
          field={field}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

function FieldPreview({ field, widthClass }: { field: FormField; widthClass: string }) {
  switch (field.type) {
    case "shortText":
    case "email":
    case "phone":
    case "url":
      return (
        <div className={cn("border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-300 bg-gray-50/50", widthClass)}>
          {field.placeholder || `Enter ${field.type === "shortText" ? "text" : field.type}...`}
        </div>
      );

    case "longText":
      return (
        <div className={cn("border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-300 bg-gray-50/50 min-h-[80px]", widthClass)}>
          {field.placeholder || "Enter text..."}
        </div>
      );

    case "number":
      return (
        <div className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-300 bg-gray-50/50">
          {field.placeholder || "0"}
        </div>
      );

    case "select":
      return (
        <div className={cn("flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-300 bg-gray-50/50", widthClass)}>
          <span>{field.placeholder || "Select an option..."}</span>
          <ChevronIcon className="w-4 h-4 text-gray-300" />
        </div>
      );

    case "radio":
      return (
        <div className={cn("space-y-2", widthClass)}>
          {(field.config?.options ?? []).map((opt, i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className={cn("space-y-2", widthClass)}>
          {(field.config?.options ?? []).map((opt, i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 rounded border-2 border-gray-300" />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "yesNo":
      return (
        <div className="flex gap-2">
          <div className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-center text-gray-400 bg-gray-50/50">
            Yes
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-center text-gray-400 bg-gray-50/50">
            No
          </div>
        </div>
      );

    case "date":
      return (
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-300 bg-gray-50/50 w-1/2">
          <Calendar className="w-4 h-4" />
          <span>dd/mm/yyyy</span>
        </div>
      );

    case "time":
      return (
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-300 bg-gray-50/50 w-1/2">
          <Clock className="w-4 h-4" />
          <span>hh:mm</span>
        </div>
      );

    case "rating": {
      const scale = field.config?.scale ?? 5;
      return (
        <div className="flex gap-1.5">
          {Array.from({ length: scale }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-sm text-gray-400 bg-gray-50/50"
            >
              {i + 1}
            </div>
          ))}
        </div>
      );
    }

    case "slider":
      return (
        <div className="relative py-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div className="h-1.5 bg-gray-300 rounded-full w-1/3" />
          </div>
          <div className="absolute top-0 left-1/3 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full shadow-sm" />
          <div className="flex justify-between text-[10px] text-gray-300 mt-2">
            <span>{field.config?.min ?? 0}</span>
            <span>{field.config?.max ?? 100}</span>
          </div>
        </div>
      );

    case "heading":
      return (
        <div className="text-lg font-semibold text-gray-700">
          {field.label || "Heading"}
        </div>
      );

    case "paragraph":
      return (
        <p className="text-sm text-gray-500 leading-relaxed">
          Add a paragraph of text here to provide context or instructions for your form.
        </p>
      );

    case "image":
      return (
        <div className="border-2 border-dashed border-gray-200 rounded-lg py-8 flex flex-col items-center justify-center text-gray-300">
          <Image className="w-8 h-8 mb-2" />
          <span className="text-xs">Click to add an image</span>
        </div>
      );

    default:
      return null;
  }
}
