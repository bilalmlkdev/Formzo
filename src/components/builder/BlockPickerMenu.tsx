import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { FormFieldType } from "../../types/form";
import { cn } from "../../lib/utils";

interface BlockTypeItem {
  type: FormFieldType;
  label: string;
  icon: string;
  category: string;
  description: string;
  exampleLabel: string;
  examplePreview: React.ReactNode;
}

const BLOCK_TYPES: BlockTypeItem[] = [
  {
    type: "shortText",
    label: "Short answer",
    icon: "Aa",
    category: "Questions",
    description:
      "Use this to insert a question combined with a short text answer. Add an answer label or placeholder text for guidance.",
    exampleLabel: "What is your first name?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          Short text input
        </div>
      </div>
    ),
  },
  {
    type: "longText",
    label: "Long answer",
    icon: "AB",
    category: "Questions",
    description:
      "Use this to insert a question combined with a long text answer. Great for detailed responses.",
    exampleLabel: "Tell us about yourself",
    examplePreview: (
      <div className="mt-2">
        <div className="h-20 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pt-2 text-sm text-gray-400">
          Long text input
        </div>
      </div>
    ),
  },
  {
    type: "radio",
    label: "Multiple choice",
    icon: "✓",
    category: "Questions",
    description:
      "Use this to insert a multiple choice question. Respondents can select only one option from the list.",
    exampleLabel: "What is your preferred contact method?",
    examplePreview: (
      <div className="mt-2 space-y-2">
        {["Email", "Phone", "SMS"].map((opt) => (
          <div key={opt} className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
            <span className="text-sm text-gray-600">{opt}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: "☑",
    category: "Questions",
    description:
      "Use this to insert a question where respondents can select multiple options from a list.",
    exampleLabel: "Which languages do you speak?",
    examplePreview: (
      <div className="mt-2 space-y-2">
        {["English", "Spanish", "French"].map((opt) => (
          <div key={opt} className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-gray-300" />
            <span className="text-sm text-gray-600">{opt}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    type: "select",
    label: "Dropdown",
    icon: "▾",
    category: "Questions",
    description:
      "Use this to insert a dropdown menu. Respondents select one option from a list.",
    exampleLabel: "Select your country",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center justify-between text-sm text-gray-400">
          <span>Select an option</span>
          <span>▾</span>
        </div>
      </div>
    ),
  },
  {
    type: "checkbox",
    label: "Multi-select",
    icon: "≡",
    category: "Questions",
    description:
      "Use this to insert a multi-select question. Respondents can choose multiple options from a dropdown.",
    exampleLabel: "Select all that apply",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center justify-between text-sm text-gray-400">
          <span>Select multiple</span>
          <span>▾</span>
        </div>
      </div>
    ),
  },
  {
    type: "number",
    label: "Number",
    icon: "#",
    category: "Questions",
    description:
      "Use this to insert a question that accepts a numeric answer. You can set min/max values.",
    exampleLabel: "How many employees work at your company?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          0
        </div>
      </div>
    ),
  },
  {
    type: "email",
    label: "Email",
    icon: "@",
    category: "Questions",
    description:
      "Use this to collect email addresses. The input is validated to ensure a proper email format.",
    exampleLabel: "What is your email address?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          email@example.com
        </div>
      </div>
    ),
  },
  {
    type: "phone",
    label: "Phone number",
    icon: "📞",
    category: "Questions",
    description:
      "Use this to collect phone numbers. The input is validated for phone number format.",
    exampleLabel: "What is your phone number?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          +1 (555) 000-0000
        </div>
      </div>
    ),
  },
  {
    type: "url",
    label: "Link",
    icon: "🔗",
    category: "Questions",
    description:
      "Use this to collect URLs. The input is validated to ensure a proper web address format.",
    exampleLabel: "What is your website URL?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          https://example.com
        </div>
      </div>
    ),
  },
  {
    type: "shortText",
    label: "File upload",
    icon: "📎",
    category: "Questions",
    description:
      "Use this to allow respondents to upload a file. Supports common file formats.",
    exampleLabel: "Upload your resume",
    examplePreview: (
      <div className="mt-2">
        <div className="h-20 w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-sm text-gray-400">
          <span className="text-lg">📎</span>
          <span>Drop file or click to upload</span>
        </div>
      </div>
    ),
  },
  {
    type: "date",
    label: "Date",
    icon: "📅",
    category: "Questions",
    description:
      "Use this to collect a date from respondents. Opens a date picker calendar.",
    exampleLabel: "When is your birthday?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center justify-between text-sm text-gray-400">
          <span>mm/dd/yyyy</span>
          <span>📅</span>
        </div>
      </div>
    ),
  },
  {
    type: "time",
    label: "Time",
    icon: "🕐",
    category: "Questions",
    description:
      "Use this to collect a time from respondents. Opens a time picker.",
    exampleLabel: "What time works best for you?",
    examplePreview: (
      <div className="mt-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center justify-between text-sm text-gray-400">
          <span>hh:mm</span>
          <span>🕐</span>
        </div>
      </div>
    ),
  },
  {
    type: "slider",
    label: "Linear scale",
    icon: "•••",
    category: "Questions",
    description:
      "Use this to insert a linear scale question. Respondents select a value on a sliding scale.",
    exampleLabel: "How satisfied are you with our service?",
    examplePreview: (
      <div className="mt-2">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Not at all</span>
          <span>Very much</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-gray-200">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    ),
  },
  {
    type: "radio",
    label: "Matrix",
    icon: "⊞",
    category: "Questions",
    description:
      "Use this to insert a matrix question. Respondents answer multiple questions using the same set of row and column options.",
    exampleLabel: "Rate the following aspects",
    examplePreview: (
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-1" />
              {["Poor", "Fair", "Good"].map((h) => (
                <th key={h} className="text-center py-1 px-2 text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["Quality", "Value"].map((row) => (
              <tr key={row}>
                <td className="py-1 text-gray-600">{row}</td>
                {["Poor", "Fair", "Good"].map((col) => (
                  <td key={col} className="text-center py-1 px-2">
                    <div className="mx-auto h-3 w-3 rounded-full border-2 border-gray-300" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    type: "rating",
    label: "Rating",
    icon: "★",
    category: "Questions",
    description:
      "Use this to insert a rating question. Respondents can rate using stars or numbers.",
    exampleLabel: "How would you rate your experience?",
    examplePreview: (
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="text-xl text-gray-300">
            ★
          </span>
        ))}
      </div>
    ),
  },
  {
    type: "shortText",
    label: "Payment",
    icon: "💳",
    category: "Questions",
    description:
      "Use this to collect payments. Connect to Stripe to accept payments directly in your form.",
    exampleLabel: "Enter your payment details",
    examplePreview: (
      <div className="mt-2 space-y-2">
        <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
          Card number
        </div>
        <div className="flex gap-2">
          <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
            MM/YY
          </div>
          <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center text-sm text-gray-400">
            CVC
          </div>
        </div>
      </div>
    ),
  },
  {
    type: "longText",
    label: "Signature",
    icon: "✍",
    category: "Questions",
    description:
      "Use this to collect a digital signature. Respondents can draw their signature on a canvas.",
    exampleLabel: "Please sign below",
    examplePreview: (
      <div className="mt-2">
        <div className="h-16 w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
          Draw your signature here
        </div>
      </div>
    ),
  },
  {
    type: "checkbox",
    label: "Ranking",
    icon: "🏆",
    category: "Questions",
    description:
      "Use this to insert a ranking question. Respondents drag and drop options to rank them in order of preference.",
    exampleLabel: "Rank these features by importance",
    examplePreview: (
      <div className="mt-2 space-y-1">
        {["Speed", "Design", "Price"].map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600"
          >
            <span className="text-gray-400">{i + 1}.</span>
            <span>⋮⋮</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    type: "heading",
    label: "New page",
    icon: "📄",
    category: "Layout blocks",
    description:
      "Use this to add a new page to your form. Helps organize long forms into multiple pages.",
    exampleLabel: "Page 2",
    examplePreview: (
      <div className="mt-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
        <div className="text-2xl text-gray-300 mb-1">📄</div>
        <div className="text-sm font-medium text-gray-500">New Page</div>
        <div className="text-xs text-gray-400">Click to start adding blocks</div>
      </div>
    ),
  },
  {
    type: "heading",
    label: "Thank you page",
    icon: "✓",
    category: "Layout blocks",
    description:
      "Use this to add a thank you page at the end of your form. Customize the message shown after submission.",
    exampleLabel: "Thank you!",
    examplePreview: (
      <div className="mt-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
        <div className="text-2xl text-green-400 mb-1">✓</div>
        <div className="text-sm font-medium text-gray-500">Thank you!</div>
        <div className="text-xs text-gray-400">
          Your response has been submitted.
        </div>
      </div>
    ),
  },
];

const CATEGORY_ORDER = ["Questions", "Layout blocks"];

interface BlockPickerMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBlock: (type: FormFieldType, insertIndex?: number) => void;
  insertIndex: number;
}

export function BlockPickerMenu({
  open,
  onOpenChange,
  onAddBlock,
  insertIndex,
}: BlockPickerMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const flatItems = useMemo(
    () => Object.values(grouped).flat(),
    [grouped]
  );

  const activeIndex = hoveredIndex ?? selectedIndex;
  const activeItem = flatItems[activeIndex];

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
    setHoveredIndex(null);
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
      if (flatItems[selectedIndex])
        handleSelect(flatItems[selectedIndex]);
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-[800px] h-[500px] flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Left Panel */}
        <div className="flex flex-col w-[60%] border-r border-gray-100">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 shrink-0">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
              placeholder="Find questions, input fields and layout options..."
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-0.5 rounded hover:bg-gray-100"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Block List */}
          <div ref={listRef} className="flex-1 overflow-y-auto py-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-4 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {category}
                </p>
                {items.map((item) => {
                  const idx = flatIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={`${item.type}-${item.label}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors",
                        isSelected
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <span className="w-5 text-center text-base shrink-0">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {flatItems.length === 0 && (
              <p className="px-4 py-8 text-sm text-gray-400 text-center">
                No blocks found
              </p>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-col w-[40%] bg-gray-50/50">
          {activeItem ? (
            <div className="flex flex-col h-full">
              {/* Header with Insert button */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                <h3 className="text-base font-semibold text-gray-900">
                  {activeItem.label}
                </h3>
                <button
                  onClick={() => handleSelect(activeItem)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                >
                  Insert →
                </button>
              </div>

              {/* Description & Preview */}
              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {activeItem.description}
                </p>

                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Example
                </p>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-800">
                    {activeItem.exampleLabel}
                  </p>
                  {activeItem.examplePreview}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm">Select a block to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
