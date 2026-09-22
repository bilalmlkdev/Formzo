import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { blockTypes } from "../../data/block-types";
import type { BlockType } from "../../types/form";
import { cn } from "../../lib/utils";

interface BlockPickerModalProps {
  open: boolean;
  index?: number;
  query?: string | null;
  onClose: () => void;
  onPick: (type: BlockType) => void;
}

export function BlockPickerModal({
  open,
  query,
  onClose,
  onPick,
}: BlockPickerModalProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSearch(query ?? "");
      setSelected(0);
      setTimeout(() => searchRef.current?.focus(), 30);
    }
  }, [open, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blockTypes;
    return blockTypes.filter(
      (b) =>
        b.label.toLowerCase().includes(q) ||
        b.type.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [search]);

  const active = filtered[Math.min(selected, filtered.length - 1)];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 px-4 pt-[10vh] backdrop-blur-[1px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex h-[min(78vh,640px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Insert block"
      >
        <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5">
          <Search size={16} className="shrink-0 text-zinc-400" />
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              }
              if (e.key === "Enter" && active) {
                e.preventDefault();
                onPick(active.type);
              }
            }}
            placeholder="Find questions, input fields and layout options..."
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            aria-label="Search blocks"
          />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="overflow-y-auto border-b border-zinc-100 md:border-b-0 md:border-r">
            {(["Questions", "Layout blocks"] as const).map((group) => {
              const items = filtered.filter((b) => b.group === group);
              if (!items.length) return null;
              return (
                <div key={group} className="py-2">
                  <p className="px-4 py-2 text-xs font-medium text-zinc-400">
                    {group}
                  </p>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active?.type === item.type;
                    return (
                      <button
                        key={item.type}
                        type="button"
                        onMouseEnter={() =>
                          setSelected(filtered.findIndex((f) => f.type === item.type))
                        }
                        onClick={() => onPick(item.type)}
                        className={cn(
                          "flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors",
                          isActive
                            ? "bg-zinc-100 text-zinc-950"
                            : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        <Icon size={15} className="shrink-0 text-zinc-500" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="hidden flex-col overflow-hidden md:flex">
            {active && (
              <>
                <div className="flex items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {active.label}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
                      {active.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPick(active.type)}
                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Insert
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto bg-zinc-50/50 px-5 py-5">
                  <span className="inline-block rounded bg-zinc-200/70 px-2 py-0.5 text-xs font-medium text-zinc-600">
                    Example
                  </span>
                  <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <p className="text-base font-semibold text-zinc-900">
                      What is your first name?
                    </p>
                    <div className="mt-3 h-10 rounded-lg border border-zinc-200 bg-white" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
