import { useBuilderStore } from "../../store/builder-store";
import { FormBlock } from "./FormBlock";
import { PageBreakBlock } from "./PageBreakBlock";
import type { FormFieldType } from "../../types/form";

interface BlockCanvasProps {
  onAddBlock: (type: FormFieldType, insertIndex?: number) => void;
}

export function BlockCanvas({ onAddBlock }: BlockCanvasProps) {
  const fields = useBuilderStore((s) => s.form?.fields ?? []);

  if (fields.length === 0) {
    return (
      <div
        onClick={() => onAddBlock("shortText")}
        className="border-2 border-dashed border-gray-200 rounded-xl py-16 px-8 text-center cursor-pointer hover:border-[#9B72FF] hover:bg-purple-50/30 transition-all group"
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
          <svg
            className="w-6 h-6 text-[#9B72FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-1">Start building your form</p>
        <p className="text-xs text-gray-400">
          Click here or type{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-xs">
            /
          </kbd>{" "}
          to add your first question
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {fields.map((field, index) => {
        if (field.type === "divider") {
          return (
            <PageBreakBlock
              key={field.id}
              field={field}
              index={index}
            />
          );
        }
        return (
          <FormBlock
            key={field.id}
            field={field}
            index={index}
          />
        );
      })}
    </div>
  );
}
