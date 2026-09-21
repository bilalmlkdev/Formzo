import { useState } from "react";
import {
  GripVertical,
  Settings,
  Trash2,
  Plus,
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

export function FormBlock({ field, index: _index }: FormBlockProps) {
  const updateField = useBuilderStore((s) => s.updateField);
  const removeField = useBuilderStore((s) => s.removeField);
  const duplicateField = useBuilderStore((s) => s.duplicateField);

  const [showSettings, setShowSettings] = useState(false);
  const [hovered, setHovered] = useState(false);
  const widthClass =
    field.width === "half"
      ? "w-1/2"
      : field.width === "third"
        ? "w-1/3"
        : "w-full";

  return (
    <div
      className="group relative flex items-start px-2 py-1 transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left Controls (visible on hover) */}
      <div
        className={cn(
          "flex flex-col items-center pt-0.5 w-8 shrink-0 transition-opacity gap-0.5",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Trash */}
        <button
          onClick={() => removeField(field.id)}
          className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete block"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Add new block (pink circle) */}
        <button
          onClick={() => duplicateField(field.id)}
          className="p-1.5 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 transition-colors"
          title="Add block"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Drag handle */}
        <div className="p-1 cursor-grab text-gray-300 hover:text-gray-500 transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Block Content */}
      <div className="flex-1 min-w-0">
        {/* Label */}
        <input
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          placeholder="Type a question"
          className="w-full text-lg font-medium outline-none bg-transparent text-gray-800 placeholder-gray-300 pb-1"
        />

        {/* Description */}
        {"description" in field && field.description && (
          <p className="text-sm text-gray-400 mt-0.5">{field.description}</p>
        )}

        {/* Field Preview */}
        <div className="mt-2">
          <FieldPreview field={field} widthClass={widthClass} />
        </div>
      </div>

      {/* Settings Gear (far right, always visible) */}
      <div className="shrink-0 pt-0.5 pl-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
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
        <div className={cn("border-b border-gray-200 py-1.5 text-sm text-gray-300", widthClass)}>
          {field.placeholder || `Enter ${field.type === "shortText" ? "text" : field.type}...`}
        </div>
      );

    case "longText":
      return (
        <div className={cn("border-b border-gray-200 py-1.5 text-sm text-gray-300 min-h-[60px]", widthClass)}>
          {field.placeholder || "Enter text..."}
        </div>
      );

    case "number":
      return (
        <div className="w-1/2 border-b border-gray-200 py-1.5 text-sm text-gray-300">
          {field.placeholder || "0"}
        </div>
      );

    case "select":
      return (
        <div className={cn("flex items-center justify-between border-b border-gray-200 py-1.5 text-sm text-gray-300", widthClass)}>
          <span>{field.placeholder || "Select an option..."}</span>
          <ChevronIcon className="w-4 h-4 text-gray-300" />
        </div>
      );

    case "radio":
      return (
        <div className={cn("space-y-2", widthClass)}>
          {(field.config?.options ?? []).map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
              <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-300" />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className={cn("space-y-2", widthClass)}>
          {(field.config?.options ?? []).map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
              <div className="w-4 h-4 rounded border-[1.5px] border-gray-300" />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "yesNo":
      return (
        <div className="flex gap-2">
          <div className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-center text-gray-400">
            Yes
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-center text-gray-400">
            No
          </div>
        </div>
      );

    case "date":
      return (
        <div className="flex items-center gap-2 border-b border-gray-200 py-1.5 text-sm text-gray-300 w-1/2">
          <Calendar className="w-4 h-4" />
          <span>dd/mm/yyyy</span>
        </div>
      );

    case "time":
      return (
        <div className="flex items-center gap-2 border-b border-gray-200 py-1.5 text-sm text-gray-300 w-1/2">
          <Clock className="w-4 h-4" />
          <span>hh:mm</span>
        </div>
      );

    case "rating": {
      const scale = field.config?.scale ?? 5;
      return (
        <div className="flex gap-1">
          {Array.from({ length: scale }).map((_, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded flex items-center justify-center text-sm text-gray-300 border border-gray-200"
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
          <div className="h-1 bg-gray-200 rounded-full">
            <div className="h-1 bg-gray-300 rounded-full w-1/3" />
          </div>
          <div className="absolute top-0 left-1/3 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-gray-300 rounded-full shadow-sm" />
          <div className="flex justify-between text-[10px] text-gray-300 mt-2">
            <span>{field.config?.min ?? 0}</span>
            <span>{field.config?.max ?? 100}</span>
          </div>
        </div>
      );

    case "heading":
      return null;

    case "paragraph":
      return null;

    case "image":
      return (
        <div className="border border-dashed border-gray-200 rounded-lg py-8 flex flex-col items-center justify-center text-gray-300">
          <Image className="w-8 h-8 mb-2" />
          <span className="text-xs">Click to add an image</span>
        </div>
      );

    default:
      return null;
  }
}
