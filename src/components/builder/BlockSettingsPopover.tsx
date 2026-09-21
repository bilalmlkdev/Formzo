import { useEffect, useRef } from "react";
import { X, Trash2, Plus } from "lucide-react";
import type { FormField, SelectField, RadioField, CheckboxField, RatingField, SliderField } from "../../types/form";
import { useBuilderStore } from "../../store/builder-store";
import { cn } from "../../lib/utils";

interface BlockSettingsPopoverProps {
  field: FormField;
  onClose: () => void;
}

export function BlockSettingsPopover({ field, onClose }: BlockSettingsPopoverProps) {
  const updateField = useBuilderStore((s) => s.updateField);
  const removeField = useBuilderStore((s) => s.removeField);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const hasOptions = ["select", "radio", "checkbox"].includes(field.type);
  const isRating = field.type === "rating";
  const isSlider = field.type === "slider";
  const isTextLike = ["shortText", "longText", "email", "phone", "url"].includes(field.type);

  const options = hasOptions
    ? ((field as SelectField | RadioField | CheckboxField).config?.options ?? [])
    : [];

  const handleOptionChange = (index: number, label: string) => {
    const newOptions = options.map((opt, i) =>
      i === index ? { ...opt, label } : opt
    );
    updateField(field.id, { config: { options: newOptions } } as Partial<FormField>);
  };

  const handleAddOption = () => {
    const newOptions = [...options, { label: `Option ${options.length + 1}`, value: `option-${options.length + 1}` }];
    updateField(field.id, { config: { options: newOptions } } as Partial<FormField>);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    updateField(field.id, { config: { options: newOptions } } as Partial<FormField>);
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        ref={popoverRef}
        className="absolute right-12 top-0 z-50 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Block Settings</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Required Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Required</span>
          <button
            onClick={() => updateField(field.id, { required: !field.required })}
            className={cn(
              "relative w-9 h-5 rounded-full transition-colors",
              field.required ? "bg-[#9B72FF]" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",
                field.required && "translate-x-4"
              )}
            />
          </button>
        </div>

        {/* Width Selector */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Width</label>
          <div className="flex gap-1">
            {(["full", "half", "third"] as const).map((w) => (
              <button
                key={w}
                onClick={() => updateField(field.id, { width: w })}
                className={cn(
                  "flex-1 px-2 py-1.5 text-xs rounded-lg border transition-colors capitalize",
                  field.width === w
                    ? "border-[#9B72FF] bg-purple-50 text-[#9B72FF] font-medium"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                )}
              >
                {w === "third" ? "1/3" : w === "half" ? "1/2" : "Full"}
              </button>
            ))}
          </div>
        </div>

        {/* Placeholder (for text-like fields) */}
        {isTextLike && (
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Placeholder</label>
            <input
              value={field.placeholder || ""}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              placeholder="Enter placeholder text..."
            />
          </div>
        )}

        {/* Rating Scale */}
        {isRating && (
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Rating scale (max)</label>
            <input
              type="number"
              min={3}
              max={10}
              value={(field as RatingField).config?.scale ?? 5}
              onChange={(e) =>
                updateField(field.id, {
                  config: {
                    ratingType: (field as RatingField).config?.ratingType ?? "stars",
                    scale: Math.max(3, Math.min(10, Number(e.target.value))),
                  },
                } as Partial<FormField>)
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
            />
          </div>
        )}

        {/* Slider min/max/step */}
        {isSlider && (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Min</label>
              <input
                type="number"
                value={(field as SliderField).config?.min ?? 0}
                onChange={(e) =>
                  updateField(field.id, {
                    config: {
                      min: Number(e.target.value),
                      max: (field as SliderField).config?.max ?? 100,
                      step: (field as SliderField).config?.step ?? 1,
                    },
                  } as Partial<FormField>)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Max</label>
              <input
                type="number"
                value={(field as SliderField).config?.max ?? 100}
                onChange={(e) =>
                  updateField(field.id, {
                    config: {
                      min: (field as SliderField).config?.min ?? 0,
                      max: Number(e.target.value),
                      step: (field as SliderField).config?.step ?? 1,
                    },
                  } as Partial<FormField>)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Step</label>
              <input
                type="number"
                value={(field as SliderField).config?.step ?? 1}
                onChange={(e) =>
                  updateField(field.id, {
                    config: {
                      min: (field as SliderField).config?.min ?? 0,
                      max: (field as SliderField).config?.max ?? 100,
                      step: Number(e.target.value),
                    },
                  } as Partial<FormField>)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Options Editor */}
        {hasOptions && (
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Options</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-300 w-4 text-right">{i + 1}</span>
                  <input
                    value={opt.label}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-[#9B72FF] transition-colors"
                  />
                  <button
                    onClick={() => handleRemoveOption(i)}
                    className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddOption}
              className="flex items-center gap-1 text-xs text-[#9B72FF] hover:text-[#8A5FE6] mt-2 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add option
            </button>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Description</label>
          <input
            value={field.description || ""}
            onChange={(e) => updateField(field.id, { description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#9B72FF] transition-colors"
            placeholder="Description for this field..."
          />
        </div>

        {/* Delete */}
        <button
          onClick={() => {
            removeField(field.id);
            onClose();
          }}
          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 w-full py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete block
        </button>
      </div>
    </>
  );
}
