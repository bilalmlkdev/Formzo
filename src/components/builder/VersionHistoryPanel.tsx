import { X, HelpCircle } from "lucide-react";

interface VersionHistoryPanelProps {
  onClose: () => void;
}

export function VersionHistoryPanel({ onClose }: VersionHistoryPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex flex-col w-[350px] h-full bg-white shadow-xl transition-transform duration-300 ease-out translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-900">Version history</h2>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
              title="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-5">
          <p className="text-sm text-gray-400">No version history yet</p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            disabled
            className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}
