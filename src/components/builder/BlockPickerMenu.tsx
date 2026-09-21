import { useState, useEffect, useRef, useMemo } from "react";
import {
  Type,
  AlignLeft,
  Mail,
  Phone,
  Link,
  Hash,
  ChevronDown,
  Circle,
  CheckSquare,
  ToggleLeft,
  Calendar,
  Clock,
  Star,
  SlidersHorizontal,
  Heading,
  Minus,
  Image,
  Search,
  X,
  FileText,
  ToggleRight,
} from "lucide-react";
import type { FormFieldType } from "../../types/form";
import { cn } from "../../lib/utils";

interface BlockTypeItem {
  type: FormFieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const BLOCK_TYPES: BlockTypeItem[] = [
  { type: "shortText", label: "Short Text", icon: Type, category: "Basic" },
  { type: "longText", label: "Long Text", icon: AlignLeft, category: "Basic" },
  { type: "email", label: "Email", icon: Mail, category: "Basic" },
  { type: "phone", label: "Phone", icon: Phone, category: "Basic" },
  { type: "url", label: "URL", icon: Link, category: "Basic" },
  { type: "number", label: "Number", icon: Hash, category: "Basic" },
  { type: "select", label: "Dropdown", icon: ChevronDown, category: "Choice" },
  { type: "radio", label: "Radio", icon: Circle, category: "Choice" },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare, category: "Choice" },
  { type: "yesNo", label: "Yes / No", icon: ToggleLeft, category: "Choice" },
  { type: "date", label: "Date", icon: Calendar, category: "Date & Time" },
  { type: "time", label: "Time", icon: Clock, category: "Date & Time" },
  { type: "dateTime", label: "Date & Time", icon: Calendar, category: "Date & Time" },
  { type: "rating", label: "Rating", icon: Star, category: "Rating" },
  { type: "slider", label: "Slider", icon: SlidersHorizontal, category: "Rating" },
  { type: "heading", label: "Heading", icon: Heading, category: "Layout" },
  { type: "paragraph", label: "Paragraph", icon: FileText, category: "Layout" },
  { type: "divider", label: "Page Break", icon: Minus, category: "Layout" },
  { type: "spacer", label: "Spacer", icon: ToggleRight, category: "Layout" },
  { type: "image", label: "Image", icon: Image, category: "Layout" },
];

const CATEGORY_ORDER = ["Basic", "Choice", "Date & Time", "Rating", "Layout"];

interface BlockPickerMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBlock: (type: FormFieldType, insertIndex?: number) => void;
  insertIndex: number;
}

export function BlockPickerMenu({ open, onOpenChange, onAddBlock, insertIndex }: BlockPickerMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => {
    const filtered = BLOCK_TYPES.filter((b) =>
      b.label.toLowerCase().includes(query.toLowerCase())
    );
    const groups: Record<string, BlockTypeItem[]> = {};
    for (const cat of CATEGORY_ORDER) {
      const items = filtered.filter((b) => b.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [query]);

  const flatItems = useMemo(() => Object.values(grouped).flat(), [grouped]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: BlockTypeItem) => {
    onAddBlock(item.type, insertIndex >= 0 ? insertIndex : undefined);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatItems[selectedIndex]) handleSelect(flatItems[selectedIndex]);
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => onOpenChange(false)}>
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
            placeholder="Search blocks..."
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-0.5 rounded hover:bg-gray-100">
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Block List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="px-4 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {category}
              </p>
              {items.map((item) => {
                const Icon = item.icon;
                const idx = flatIndex++;
                return (
                  <button
                    key={item.type}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors",
                      idx === selectedIndex
                        ? "bg-purple-50 text-[#9B72FF]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {flatItems.length === 0 && (
            <p className="px-4 py-8 text-sm text-gray-400 text-center">No blocks found</p>
          )}
        </div>
      </div>
    </div>
  );
}
