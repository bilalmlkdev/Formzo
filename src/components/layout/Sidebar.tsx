import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Layout, BarChart3, Settings, HelpCircle, Plus, ChevronLeft } from "lucide-react";
import { useUIStore } from "../../store/ui-store";
import { useFormStore } from "../../store/form-store";
import { createBlankForm } from "../../types/form";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/app" },
  { label: "Forms", icon: FileText, to: "/app/forms" },
  { label: "Templates", icon: Layout, to: "/app/templates" },
  { label: "Analytics", icon: BarChart3, to: "/app/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, to: "/app/settings" },
  { label: "Help", icon: HelpCircle, to: "/" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const createForm = useFormStore((s) => s.createForm);

  const handleNewForm = () => {
    const form = createBlankForm();
    createForm(form);
    navigate(`/app/forms/${form.id}`);
  };

  const isActive = (path: string) => {
    if (path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={cn("flex h-screen flex-col border-r bg-card transition-all duration-200", sidebarOpen ? "w-56" : "w-14")}>
      <div className="flex h-12 items-center justify-between border-b px-3">
        {sidebarOpen && <Link to="/" className="text-sm font-bold tracking-tight text-foreground">formzo</Link>}
        <button onClick={toggleSidebar} className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent transition-colors" aria-label="Toggle sidebar">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {sidebarOpen ? (
          <button onClick={handleNewForm} className="mb-2 flex w-full items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> New form
          </button>
        ) : (
          <button onClick={handleNewForm} className="mb-2 flex w-full items-center justify-center rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors" title="New form">
            <Plus className="h-4 w-4" />
          </button>
        )}
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={cn("flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors", isActive(item.to) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")} title={!sidebarOpen ? item.label : undefined}>
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t p-2">
        <div className="space-y-0.5">
          {bottomItems.map((item) => (
            <Link key={item.label} to={item.to} className={cn("flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors", isActive(item.to) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")} title={!sidebarOpen ? item.label : undefined}>
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
