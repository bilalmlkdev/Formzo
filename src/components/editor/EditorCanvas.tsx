import { useRef, useState } from "react";
import { Copy, GripVertical, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import type { FormBuilder, FormBlock } from "../../types/form";
import { useFormsStore } from "../../store/forms-store";
import { BlockPickerModal } from "./BlockPickerModal";
import { BlockFieldPreview } from "./BlockFieldPreview";
import { StartScreen } from "./StartScreen";
import { cn } from "../../lib/utils";

interface EditorCanvasProps {
  form: FormBuilder;
  preview: boolean;
  onTitleChange: (title: string) => void;
  onDescChange: (desc: string) => void;
}

export function EditorCanvas({
  form,
  preview,
  onTitleChange,
  onDescChange,
}: EditorCanvasProps) {
  const updateBlock = useFormsStore((s) => s.updateBlock);
  const removeBlock = useFormsStore((s) => s.removeBlock);
  const moveBlock = useFormsStore((s) => s.moveBlock);
  const duplicateBlock = useFormsStore((s) => s.duplicateBlock);
  const addBlock = useFormsStore((s) => s.addBlock);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerIndex, setPickerIndex] = useState<number | undefined>(undefined);
  const [slashQuery, setSlashQuery] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const slashRef = useRef<HTMLInputElement>(null);

  const showStart = !preview && form.blocks.length === 0;

  const openPicker = (index?: number) => {
    setPickerIndex(index);
    setPickerOpen(true);
    setSlashQuery(null);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      openPicker(0);
    }
    if (e.key === "/" && !e.currentTarget.textContent) {
      e.preventDefault();
      openPicker(0);
    }
  };

  const handleBlockKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "/" && !e.currentTarget.textContent) {
      e.preventDefault();
      setSlashQuery("");
      setPickerIndex(index + 1);
      setTimeout(() => slashRef.current?.focus(), 0);
    }
  };

  const style = {
    fontFamily: form.theme.font,
    fontSize: form.theme.baseFontSize,
    maxWidth: form.theme.pageWidth,
  } as React.CSSProperties;

  return (
    <div
      className="mx-auto min-h-full w-full px-4 py-10 sm:px-8 sm:py-14"
      style={style}
    >
      <div className="mx-auto w-full" style={{ maxWidth: form.theme.pageWidth }}>
        <div
          contentEditable={!preview}
          suppressContentEditableWarning
          spellCheck={false}
          onBlur={(e) => onTitleChange(e.currentTarget.textContent || "Untitled")}
          onKeyDown={handleTitleKeyDown}
          data-placeholder="Form title"
          className={cn(
            "outline-none",
            preview
              ? "cursor-default"
              : "empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-300",
            "text-3xl font-bold sm:text-4xl"
          )}
          style={{ color: form.theme.theme === "dark" ? undefined : form.theme.text }}
        >
          {form.title === "Untitled" ? "" : form.title}
        </div>

        {!showStart && (
          <div
            contentEditable={!preview}
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) => onDescChange(e.currentTarget.textContent || "")}
            data-placeholder="Add a description (optional)"
            className={cn(
              "mt-3 outline-none",
              preview
                ? "cursor-default"
                : "empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-300",
              "text-base leading-relaxed",
              form.theme.theme === "dark" ? "text-zinc-400" : "text-zinc-500"
            )}
          >
            {form.description ?? ""}
          </div>
        )}

        {showStart ? (
          <StartScreen onStartScratch={() => openPicker(0)} />
        ) : (
          <>
            <div className="mt-8 space-y-1">
              {form.blocks.map((block, index) => (
                <BlockRow
                  key={block.id}
                  block={block}
                  index={index}
                  total={form.blocks.length}
                  preview={preview}
                  theme={form.theme}
                  active={activeId === block.id}
                  onFocus={() => setActiveId(block.id)}
                  onBlur={() => setActiveId(null)}
                  onLabelChange={(label) =>
                    updateBlock(form.id, block.id, { label })
                  }
                  onToggleRequired={() =>
                    updateBlock(form.id, block.id, {
                      required: !block.required,
                    })
                  }
                  onOptionsChange={(options) =>
                    updateBlock(form.id, block.id, { options })
                  }
                  onDelete={() => removeBlock(form.id, block.id)}
                  onDuplicate={() => duplicateBlock(form.id, block.id)}
                  onMove={(dir) => moveBlock(form.id, block.id, dir)}
                  onInsertBelow={() => openPicker(index + 1)}
                  onKeyDown={(e) => handleBlockKeyDown(e, index)}
                />
              ))}
            </div>

            {!preview && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => openPicker(form.blocks.length)}
                  className="group inline-flex items-center gap-2 rounded-full border border-transparent px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-200 hover:bg-white hover:text-zinc-700"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                    <Plus size={14} />
                  </span>
                  Type &apos;/&apos; to insert blocks
                </button>
                <input
                  ref={slashRef}
                  value={slashQuery ?? ""}
                  onChange={(e) => setSlashQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && slashQuery !== null) {
                      e.preventDefault();
                      openPicker(form.blocks.length);
                      setSlashQuery(null);
                    }
                    if (e.key === "/" || e.key === "Escape") {
                      setSlashQuery(null);
                    }
                  }}
                  className={cn(
                    "h-0 w-0 border-0 p-0 opacity-0",
                    slashQuery !== null &&
                      "h-8 w-40 border border-zinc-200 px-2 opacity-100"
                  )}
                  placeholder="Search blocks…"
                  aria-label="Search blocks"
                />
              </div>
            )}
          </>
        )}

        {!preview && form.blocks.length > 0 && (
          <button
            type="button"
            className="mt-6 rounded-lg px-4 py-2 text-sm font-semibold"
            style={{
              background: form.theme.buttonBg,
              color: form.theme.buttonText,
            }}
          >
            Submit →
          </button>
        )}
      </div>

      <BlockPickerModal
        open={pickerOpen}
        index={pickerIndex}
        query={slashQuery}
        onClose={() => {
          setPickerOpen(false);
          setSlashQuery(null);
        }}
        onPick={(type) => {
          addBlock(form.id, type, pickerIndex);
          setPickerOpen(false);
          setSlashQuery(null);
        }}
      />
    </div>
  );
}

interface BlockRowProps {
  block: FormBlock;
  index: number;
  total: number;
  preview: boolean;
  theme: FormBuilder["theme"];
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onLabelChange: (label: string) => void;
  onToggleRequired: () => void;
  onOptionsChange: (options: string[]) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMove: (dir: -1 | 1) => void;
  onInsertBelow: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

function BlockRow({
  block,
  preview,
  theme,
  active,
  onFocus,
  onBlur,
  onLabelChange,
  onToggleRequired,
  onOptionsChange,
  onDelete,
  onDuplicate,
  onInsertBelow,
  onKeyDown,
}: BlockRowProps) {
  if (block.type === "divider") {
    return (
      <div className="group relative py-3">
        {!preview && (
          <BlockControls
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onInsertBelow={onInsertBelow}
            active={active}
          />
        )}
        <hr
          className="border-0 border-t"
          style={{ borderColor: theme.theme === "dark" ? "#3f3f46" : "#e4e4e7" }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-lg py-3 transition-colors",
        active && !preview && "bg-zinc-50/60"
      )}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {!preview && (
        <BlockControls
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onInsertBelow={onInsertBelow}
          active={active}
          onToggleRequired={onToggleRequired}
          required={block.required}
        />
      )}

      <div>
        <div className="flex flex-wrap items-baseline gap-2">
          <div
            contentEditable={!preview}
            suppressContentEditableWarning
            spellCheck={false}
            onKeyDown={onKeyDown}
            onBlur={(e) => onLabelChange(e.currentTarget.textContent || "Untitled")}
            data-placeholder="Type a question"
            className={cn(
              "outline-none",
              preview
                ? "cursor-default"
                : "empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-300",
              "text-lg font-medium"
            )}
            style={{
              color: theme.theme === "dark" ? "#fafafa" : theme.text,
              fontSize: block.type === "heading" ? "1.35rem" : undefined,
            }}
          >
            {block.label === "Type a question" && !preview ? "" : block.label}
          </div>

          {!preview && block.type !== "heading" && block.type !== "statement" && (
            <button
              type="button"
              onClick={onToggleRequired}
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium transition-opacity",
                block.required
                  ? "bg-red-50 text-red-600 opacity-100"
                  : "text-zinc-400 opacity-0 group-hover:opacity-100"
              )}
              title={block.required ? "Required" : "Optional"}
            >
              {block.required ? "Required" : "Optional"}
            </button>
          )}
        </div>

        <div className="mt-2.5">
          <BlockFieldPreview
            block={block}
            preview={preview}
            theme={theme}
            onOptionsChange={onOptionsChange}
          />
        </div>
      </div>
    </div>
  );
}

function BlockControls({
  onDelete,
  onDuplicate,
  onInsertBelow,
  active,
  onToggleRequired,
  required,
}: {
  onDelete: () => void;
  onDuplicate: () => void;
  onInsertBelow: () => void;
  active: boolean;
  onToggleRequired?: () => void;
  required?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute -left-14 top-2 hidden w-12 flex-col items-center gap-0.5 transition-opacity sm:flex",
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}
    >
      <button
        type="button"
        onClick={onDelete}
        className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-red-600"
        aria-label="Delete block"
      >
        <Trash2 size={14} />
      </button>
      <button
        type="button"
        onClick={onInsertBelow}
        className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
        aria-label="Insert below"
      >
        <Plus size={14} />
      </button>
      <button
        type="button"
        className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
        aria-label="Drag"
      >
        <GripVertical size={14} />
      </button>
      <button
        type="button"
        onClick={onDuplicate}
        className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
        aria-label="Duplicate"
      >
        <Copy size={14} />
      </button>
      {onToggleRequired && (
        <button
          type="button"
          onClick={onToggleRequired}
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
          aria-label={required ? "Make optional" : "Make required"}
        >
          {required ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
      )}
    </div>
  );
}
