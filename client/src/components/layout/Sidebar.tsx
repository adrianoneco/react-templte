import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  PieChart,
  LogOut 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FileText },
  { label: "Team", href: "/team", icon: Users },
  { label: "Analytics", href: "/analytics", icon: PieChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-16 bottom-0 border-r bg-card/50 backdrop-blur-xl z-30">
      <div className="p-4 flex-1 overflow-y-auto py-8">
        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t bg-muted/10">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
