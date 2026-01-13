import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Workflow, 
  AlertTriangle, 
  CheckSquare, 
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}

const navItems: NavItem[] = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, isActive: true },
  { path: "/processes", label: "Processes", icon: Workflow, isActive: true },
  { path: "/issues", label: "Issues", icon: AlertTriangle, isActive: true },
  { path: "/actions", label: "Actions", icon: CheckSquare, isActive: true },
  { path: "/documents", label: "Docs", icon: FileText, isActive: true },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div 
        className="flex items-center justify-around"
        style={{ paddingBottom: "var(--safe-area-bottom)" }}
      >
        {navItems.map((item) => {
          const isCurrentPath = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.isActive ? item.path : "#"}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 min-h-[4.5rem] flex-1 transition-colors no-select",
                isCurrentPath 
                  ? "text-accent" 
                  : item.isActive 
                    ? "text-muted-foreground active:text-foreground" 
                    : "text-muted-foreground/50 cursor-not-allowed"
              )}
              onClick={(e) => {
                if (!item.isActive) {
                  e.preventDefault();
                }
              }}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1 transition-transform",
                isCurrentPath && "scale-110"
              )} />
              <span className="text-xs font-medium">{item.label}</span>
              {!item.isActive && (
                <span className="text-[10px] text-muted-foreground/60 mt-0.5">Soon</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
