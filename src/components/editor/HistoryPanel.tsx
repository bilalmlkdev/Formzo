import { X, RotateCcw, HelpCircle } from "lucide-react";

interface HistoryPanelProps {
  onClose: () => void;
}

export function HistoryPanel({ onClose }: HistoryPanelProps) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 max-h-[70vh] overflow-y-auto border-t border-zinc-200 bg-white shadow-2xl lg:inset-y-12 lg:left-auto lg:right-0 lg:top-12 lg:max-h-none lg:w-[320px] lg:border-l lg:border-t-0">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5">
        <h2 className="text-sm font-semibold text-zinc-900">Version history</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100"
            aria-label="Help"
          >
            <HelpCircle size={15} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100"
            aria-label="Close history"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 text-2xl text-zinc-300" aria-hidden>
          ✳
        </div>
        <p className="text-sm text-zinc-500">
          Autosaved versions will appear here as you edit.
        </p>
        <p className="mt-1 text-xs text-zinc-400">Current version · Just now</p>
      </div>

      <div className="sticky bottom-0 border-t border-zinc-100 bg-white p-4">
        <button
          type="button"
          disabled
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white opacity-60"
        >
          <RotateCcw size={15} />
          Restore
        </button>
      </div>
    </aside>
  );
}
