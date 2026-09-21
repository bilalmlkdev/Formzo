import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Clock,
  Settings,
  Undo2,
  Redo2,
  Plus,
  Loader2,
  FileText,
  Sparkles,
  LayoutGrid,
  Download,
  X,
  GripVertical,
  Trash2,
} from "lucide-react";
import { useBuilderStore } from "../../store/builder-store";
import { useAutoSave } from "../../hooks/useAutoSave";
import { BlockCanvas } from "./BlockCanvas";
import { BlockPickerMenu } from "./BlockPickerMenu";
import { PublishDialog } from "../shared/PublishDialog";
import { createBlankField } from "../../types/form";
import type { FormFieldType } from "../../types/form";

function CustomizeSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 z-30 w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col">
      <div className="flex items-center justify-between px-4 h-12 border-b border-gray-200 shrink-0">
        <span className="text-sm font-semibold text-gray-800">Customize</span>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-gray-400">Customization options coming soon.</p>
      </div>
    </div>
  );
}

function VersionHistoryPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 z-30 w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col">
      <div className="flex items-center justify-between px-4 h-12 border-b border-gray-200 shrink-0">
        <span className="text-sm font-semibold text-gray-800">Version History</span>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-gray-400">Version history coming soon.</p>
      </div>
    </div>
  );
}

function EmptyState({ onAddBlock }: { onAddBlock: (type: FormFieldType) => void }) {
  const options = [
    {
      icon: FileText,
      label: "Press Enter to start from scratch",
      onClick: () => onAddBlock("shortText"),
    },
    {
      icon: Sparkles,
      label: "Create with AI",
      onClick: () => {},
    },
    {
      icon: LayoutGrid,
      label: "Use a template",
      onClick: () => {},
    },
    {
      icon: Download,
      label: "Import form",
      onClick: () => {},
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="space-y-1 w-full max-w-xs">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={opt.onClick}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
          >
            <opt.icon className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-8 text-xs text-gray-400 text-center max-w-sm leading-relaxed">
        Formzo is a form builder that works like a doc. Just type{" "}
        <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 rounded text-[10px] font-mono font-medium text-gray-500 align-middle">
          /
        </span>{" "}
        to insert form blocks and{" "}
        <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 rounded text-[10px] font-mono font-medium text-gray-500 align-middle">
          @
        </span>{" "}
        to mention question answers.
      </p>
    </div>
  );
}

export function BuilderLayout() {
  const form = useBuilderStore((s) => s.form);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const canUndo = useBuilderStore((s) => s.canUndo);
  const canRedo = useBuilderStore((s) => s.canRedo);
  const setForm = useBuilderStore((s) => s.setForm);
  const addField = useBuilderStore((s) => s.addField);
  const removeField = useBuilderStore((s) => s.removeField);

  useAutoSave();

  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [blockPickerInsertIndex, setBlockPickerInsertIndex] = useState(-1);
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNameChange = (name: string) => {
    if (!form) return;
    setForm({ ...form, name });
  };

  const handleAddBlock = (type: FormFieldType, insertIndex?: number) => {
    const field = createBlankField(type);
    addField(field, insertIndex);
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const lastField = form.fields.length > 0 ? form.fields[form.fields.length - 1] : null;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Topbar */}
      <header className="flex items-center h-12 border-b border-gray-200 px-3 shrink-0 z-20">
        {/* Left: Logo + / + Form name */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </button>
          <span className="text-gray-300 text-sm">/</span>
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="text-sm font-medium text-gray-700 outline-none bg-transparent w-48 placeholder-gray-300"
            placeholder="Untitled"
          />
        </div>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors">
            <Zap className="w-4 h-4" />
          </button>
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCustomizeOpen(!customizeOpen)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Customize
          </button>
          <span className="text-blue-500 text-sm font-medium px-2 cursor-pointer hover:underline">
            Sign up
          </span>
          <button
            onClick={() => navigate(`/app/forms/${form.id}/preview`)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Preview
          </button>
          <button
            onClick={() => setPublishOpen(true)}
            className="ml-1 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Publish
          </button>
        </div>
      </header>

      {/* Main canvas area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-16 px-4">
          {/* Editable form title */}
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full text-[32px] font-bold outline-none bg-transparent text-gray-300 placeholder-gray-300 mb-8"
            placeholder="Form title"
          />

          {/* Block canvas or empty state */}
          {form.fields.length === 0 ? (
            <EmptyState onAddBlock={handleAddBlock} />
          ) : (
            <>
              <BlockCanvas onAddBlock={handleAddBlock} />
              {/* Add block row at bottom */}
              <div className="flex items-center gap-2 mt-3 py-2">
                {lastField && (
                  <button
                    onClick={() => removeField(lastField.id)}
                    className="p-1 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setBlockPickerOpen(true)}
                  className="w-7 h-7 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center text-pink-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <GripVertical className="w-4 h-4 text-gray-300" />
                <span
                  className="text-sm text-gray-300 cursor-text"
                  onClick={() => setBlockPickerOpen(true)}
                >
                  Type '/' to insert blocks
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sidebars */}
      {customizeOpen && <CustomizeSidebar onClose={() => setCustomizeOpen(false)} />}
      {historyOpen && <VersionHistoryPanel onClose={() => setHistoryOpen(false)} />}

      {/* Block Picker */}
      {blockPickerOpen && (
        <BlockPickerMenu
          open={blockPickerOpen}
          onOpenChange={(open: boolean) => {
            setBlockPickerOpen(open);
            if (!open) setBlockPickerInsertIndex(-1);
          }}
          onAddBlock={handleAddBlock}
          insertIndex={blockPickerInsertIndex}
        />
      )}

      {/* Publish Dialog */}
      <PublishDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        formId={form.id}
      />
    </div>
  );
}
