import { useEffect, useCallback, useState } from "react";
import {
  ArrowLeft,
  Settings,
  Eye,
  Upload,
  Undo2,
  Redo2,
  Plus,
  Check,
  Loader2,
} from "lucide-react";
import { useBuilderStore } from "../../store/builder-store";
import { useAutoSave } from "../../hooks/useAutoSave";
import { BlockCanvas } from "./BlockCanvas";
import { BlockPickerMenu } from "./BlockPickerMenu";
import { FormSettingsModal } from "./FormSettingsModal";
import { PublishDialog } from "../shared/PublishDialog";
import { ShareDialog } from "../shared/ShareDialog";
import { createBlankField } from "../../types/form";
import type { FormFieldType } from "../../types/form";

export function BuilderLayout() {
  const form = useBuilderStore((s) => s.form);
  const saveStatus = useBuilderStore((s) => s.saveStatus);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const canUndo = useBuilderStore((s) => s.canUndo);
  const canRedo = useBuilderStore((s) => s.canRedo);
  const setForm = useBuilderStore((s) => s.setForm);
  const addField = useBuilderStore((s) => s.addField);

  useAutoSave();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [blockPickerInsertIndex, setBlockPickerInsertIndex] = useState(-1);

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

  const handleDescriptionChange = (description: string) => {
    if (!form) return;
    setForm({ ...form, description });
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

  const saveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Saved";
      default:
        return "Unsaved changes";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <header className="flex items-center h-14 border-b border-gray-200 px-4 shrink-0 z-10">
        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="ml-3 flex items-center gap-2 min-w-0">
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="text-sm font-semibold border-b border-transparent hover:border-gray-300 focus:border-[#9B72FF] outline-none bg-transparent px-0.5 py-0.5 min-w-[120px] transition-colors"
            placeholder="Form name"
          />
        </div>

        <div className="ml-3 flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
          {saveStatus === "saving" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : saveStatus === "saved" ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : null}
          <span>{saveStatusText()}</span>
        </div>

        <div className="ml-4 flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPublishOpen(true)}
            className="flex items-center gap-1.5 bg-[#9B72FF] hover:bg-[#8A5FE6] text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>
      </header>

      {/* Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-10 px-4">
          {/* Editable Title */}
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full text-3xl font-bold outline-none bg-transparent placeholder-gray-300 mb-2"
            placeholder="Form name"
          />

          {/* Editable Description */}
          <textarea
            value={form.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="w-full text-sm text-gray-500 outline-none bg-transparent placeholder-gray-300 resize-none mb-8"
            placeholder="Form description (optional)"
            rows={1}
          />

          {/* Block Canvas */}
          <BlockCanvas onAddBlock={handleAddBlock} />

          {/* Add Block Button */}
          <button
            onClick={() => setBlockPickerOpen(true)}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm hover:border-[#9B72FF] hover:text-[#9B72FF] hover:bg-purple-50/50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add a block
          </button>
        </div>
      </div>

      {/* Block Picker Menu */}
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

      {/* Settings Modal */}
      <FormSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

      {/* Publish Dialog */}
      <PublishDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        formId={form.id}
      />

      {/* Share Dialog */}
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        formId={form.id}
        formName={form.name}
      />
    </div>
  );
}
