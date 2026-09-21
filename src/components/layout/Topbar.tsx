import { useEffect } from "react";
import { Search, Bell, LogOut, User, Settings } from "lucide-react";
import { useUIStore } from "../../store/ui-store";
import { Button } from "../ui/button";

export function Topbar() {
  const setCommandMenuOpen = useUIStore((s) => s.setCommandMenuOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCommandMenuOpen]);

  return (
    <header className="flex h-12 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-muted-foreground"
          onClick={() => setCommandMenuOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
            <span className="text-xs">Ctrl</span>
            <span className="text-xs">K</span>
          </kbd>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="relative group">
          <button className="flex items-center gap-2 rounded-md p-1.5 hover:bg-accent transition-colors">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          </button>
          <div className="invisible group-hover:visible absolute right-0 top-full mt-1 w-48 rounded-md border bg-card shadow-md z-50">
            <div className="p-2">
              <div className="px-2 py-1.5 text-sm font-medium">John Doe</div>
              <div className="px-2 py-1 text-xs text-muted-foreground">john@example.com</div>
            </div>
            <div className="border-t p-1">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors">
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
