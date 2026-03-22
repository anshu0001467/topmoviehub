import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Film,
  LayoutDashboard,
  List,
  PlusCircle,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Zap,
} from "lucide-react";
import { getAdminSession, setAdminSession } from "@/lib/store";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: List, label: "Movies", href: "/admin/movies" },
  { icon: PlusCircle, label: "Add Movie", href: "/admin/movies/new" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!getAdminSession()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    setAdminSession(false);
    navigate("/admin/login");
  };

  const currentLabel =
    NAV_ITEMS.find((n) => location.pathname.startsWith(n.href))?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#070709] flex">
      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0d0d10] border-r border-white/8 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#e8a020]/6 blur-[50px] rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="relative px-5 py-5 border-b border-white/8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#e8a020] flex items-center justify-center shadow-[0_0_20px_rgba(232,160,32,0.4)] group-hover:shadow-[0_0_30px_rgba(232,160,32,0.6)] transition-shadow">
              <Film className="w-4 h-4 text-black" />
            </div>
            <div>
              <p
                className="font-black text-white text-sm leading-tight"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                TopMoviesHub
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Zap className="w-2.5 h-2.5 text-[#e8a020]" />
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                  Admin Panel
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-mono font-bold px-3 mb-3">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin/dashboard"
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-[#e8a020]/12 text-[#e8a020] shadow-[inset_0_0_0_1px_rgba(232,160,32,0.25)]"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#e8a020]" : ""}`}
                />
                {item.label}
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e8a020]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <Globe className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:text-red-400 hover:bg-red-500/8 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#070709]/90 backdrop-blur-md border-b border-white/8 px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/40 hover:text-white/80 rounded-lg hover:bg-white/8 transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/20 text-xs font-mono">/</span>
              <span className="text-white/60 text-sm font-medium">{currentLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/30 text-xs font-mono hidden sm:block">Active session</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-white/35 text-xs hover:text-red-400 hover:bg-red-500/8 rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
