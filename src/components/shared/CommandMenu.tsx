import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Plus, Layout, BarChart3, Settings, Moon, Sun, Monitor } from "lucide-react";
import { useUIStore } from "../../store/ui-store";
import { useFormStore } from "../../store/form-store";
import { createBlankForm } from "../../types/form";
import { cn } from "../../lib/utils";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: "forms" | "actions" | "navigation";
}

export function CommandMenu() {
  const navigate = useNavigate();
  const commandMenuOpen = useUIStore((s) => s.commandMenuOpen);
  const setCommandMenuOpen = useUIStore((s) => s.setCommandMenuOpen);
  const forms = useFormStore((s) => s.forms);
  const safeForms = Array.isArray(forms) ? forms : [];
  const createForm = useFormStore((s) => s.createForm);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: CommandItem[] = [
    {
      id: "create-form",
      label: "Create New Form",
      icon: <Plus className="h-4 w-4" />,
      action: () => {
        const form = createBlankForm();
        createForm(form);
        navigate(`/app/forms/${form.id}`);
        setCommandMenuOpen(false);
      },
      category: "actions",
    },
    {
      id: "go-overview",
      label: "Go to Overview",
      icon: <Layout className="h-4 w-4" />,
      action: () => {
        navigate("/app");
        setCommandMenuOpen(false);
      },
      category: "navigation",
    },
    {
      id: "go-forms",
      label: "Go to Forms",
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        navigate("/app/forms");
        setCommandMenuOpen(false);
      },
      category: "navigation",
    },
    {
      id: "go-templates",
      label: "Go to Templates",
      icon: <Layout className="h-4 w-4" />,
      action: () => {
        navigate("/app/templates");
        setCommandMenuOpen(false);
      },
      category: "navigation",
    },
    {
      id: "go-analytics",
      label: "Go to Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      action: () => {
        navigate("/app/analytics");
        setCommandMenuOpen(false);
      },
      category: "navigation",
    },
    {
      id: "go-settings",
      label: "Go to Settings",
      icon: <Settings className="h-4 w-4" />,
      action: () => {
        navigate("/app/settings");
        setCommandMenuOpen(false);
      },
      category: "navigation",
    },
    {
      id: "theme-light",
      label: "Set Theme: Light",
      icon: <Sun className="h-4 w-4" />,
      action: () => {
        setCommandMenuOpen(false);
      },
      category: "actions",
    },
    {
      id: "theme-dark",
      label: "Set Theme: Dark",
      icon: <Moon className="h-4 w-4" />,
      action: () => {
        setCommandMenuOpen(false);
      },
      category: "actions",
    },
    {
      id: "theme-system",
      label: "Set Theme: System",
      icon: <Monitor className="h-4 w-4" />,
      action: () => {
        setCommandMenuOpen(false);
      },
      category: "actions",
    },
    ...safeForms.map((form) => ({
      id: `form-${form.id}`,
      label: form.name,
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        navigate(`/app/forms/${form.id}`);
        setCommandMenuOpen(false);
      },
      category: "forms" as const,
    })),
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  const flatItems = Object.values(groupedItems).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCommandMenuOpen(false);
      }
    },
    [setCommandMenuOpen]
  );

  useEffect(() => {
    if (commandMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [commandMenuOpen, handleKeyDown]);

  if (!commandMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={() => setCommandMenuOpen(false)} />
      <div className="relative w-full max-w-lg rounded-lg border bg-card shadow-lg">
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search forms and actions..."
            className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {flatItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-2">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground capitalize">
                  {category}
                </div>
                {items.map((item) => {
                  const index = flatItems.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                        selectedIndex === index
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
