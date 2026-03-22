import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Film,
  FolderOpen,
  PlusCircle,
  Clock,
  Star,
  TrendingUp,
  Settings,
  ArrowUpRight,
  BarChart3,
  Globe,
  Zap,
  Award,
} from "lucide-react";
import { getMovies, getCategories } from "@/lib/store";
import { Movie } from "@/types/movie";

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [catCount, setCatCount] = useState(0);

  useEffect(() => {
    setMovies(getMovies());
    setCatCount(getCategories().length);
  }, []);

  const recent = [...movies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const languages = [...new Set(movies.map((m) => m.language))];
  const avgRating =
    movies.length > 0
      ? (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Total Movies",
      value: movies.length,
      icon: Film,
      color: "text-[#e8a020]",
      bg: "from-[#e8a020]/15 to-[#e8a020]/5",
      border: "border-[#e8a020]/20",
      glow: "shadow-[0_0_30px_rgba(232,160,32,0.08)]",
    },
    {
      label: "Categories",
      value: catCount,
      icon: FolderOpen,
      color: "text-sky-400",
      bg: "from-sky-400/15 to-sky-400/5",
      border: "border-sky-400/20",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.08)]",
    },
    {
      label: "Languages",
      value: languages.length,
      icon: Globe,
      color: "text-violet-400",
      bg: "from-violet-400/15 to-violet-400/5",
      border: "border-violet-400/20",
      glow: "shadow-[0_0_30px_rgba(167,139,250,0.08)]",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: Award,
      color: "text-emerald-400",
      bg: "from-emerald-400/15 to-emerald-400/5",
      border: "border-emerald-400/20",
      glow: "shadow-[0_0_30px_rgba(52,211,153,0.08)]",
    },
  ];

  const quickActions = [
    {
      to: "/admin/movies/new",
      icon: PlusCircle,
      label: "Add New Movie",
      desc: "Upload & publish a new film",
      color: "text-[#e8a020]",
      bg: "bg-[#e8a020]/10",
      hoverBg: "hover:bg-[#e8a020]/20",
      border: "border-[#e8a020]/25 hover:border-[#e8a020]/60",
      accent: "bg-[#e8a020]",
    },
    {
      to: "/admin/movies",
      icon: BarChart3,
      label: "Manage Movies",
      desc: "Edit, organize & delete",
      color: "text-sky-400",
      bg: "bg-sky-400/10",
      hoverBg: "hover:bg-sky-400/20",
      border: "border-sky-400/20 hover:border-sky-400/50",
      accent: "bg-sky-400",
    },
    {
      to: "/admin/categories",
      icon: FolderOpen,
      label: "Categories",
      desc: "Manage genre collections",
      color: "text-violet-400",
      bg: "bg-violet-400/10",
      hoverBg: "hover:bg-violet-400/20",
      border: "border-violet-400/20 hover:border-violet-400/50",
      accent: "bg-violet-400",
    },
    {
      to: "/admin/settings",
      icon: Settings,
      label: "Site Settings",
      desc: "Configure hero & featured",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      hoverBg: "hover:bg-emerald-400/20",
      border: "border-emerald-400/20 hover:border-emerald-400/50",
      accent: "bg-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#e8a020]" />
            <span className="text-[#e8a020] text-xs font-bold tracking-[0.2em] uppercase font-mono">
              Control Center
            </span>
          </div>
          <h1
            className="font-black text-3xl sm:text-4xl text-white mb-1 leading-tight"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Dashboard
          </h1>
          <p className="text-white/35 text-sm font-mono">
            Welcome back — {movies.length} movies across {catCount} categories
          </p>
        </div>
        <Link
          to="/admin/movies/new"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#e8a020] text-black font-bold text-sm rounded-lg hover:bg-[#f5b830] transition-all shadow-[0_0_20px_rgba(232,160,32,0.25)]"
        >
          <PlusCircle className="w-4 h-4" />
          Add Movie
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`relative overflow-hidden bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5 ${s.glow} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <ArrowUpRight className={`w-4 h-4 ${s.color} opacity-40`} />
            </div>
            <p className={`text-3xl font-black font-mono ${s.color} leading-none`}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1.5 uppercase tracking-widest font-mono">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-white/40 text-xs uppercase tracking-widest font-mono font-bold mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className={`group flex items-center gap-4 p-4 bg-white/[0.03] border ${a.border} rounded-2xl transition-all hover:bg-white/[0.06]`}
            >
              <div className={`w-11 h-11 rounded-xl ${a.bg} ${a.hoverBg} flex items-center justify-center transition-colors flex-shrink-0`}>
                <a.icon className={`w-5 h-5 ${a.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate group-hover:text-[#e8a020] transition-colors">
                  {a.label}
                </p>
                <p className="text-white/35 text-xs truncate">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Added */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#e8a020]" />
              <h2 className="text-white font-semibold text-sm">Recently Added</h2>
            </div>
            <Link
              to="/admin/movies"
              className="text-white/30 text-xs hover:text-[#e8a020] transition-colors flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recent.length === 0 && (
              <p className="text-white/25 text-sm text-center py-10">No movies yet.</p>
            )}
            {recent.map((m) => (
              <Link
                key={m.id}
                to={`/admin/movies/edit/${m.id}`}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-9 h-13 rounded-lg overflow-hidden bg-black/30 flex-shrink-0 ring-1 ring-white/10">
                  <img src={m.posterUrl} alt={m.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate group-hover:text-[#e8a020] transition-colors">
                    {m.title}
                  </p>
                  <p className="text-white/30 text-xs font-mono">{m.year} · {m.genres[0]}</p>
                </div>
                <div className="flex items-center gap-1 text-[#e8a020] text-xs font-mono font-bold flex-shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                  {m.rating.toFixed(1)}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#e8a020]" />
            <h2 className="text-white font-semibold text-sm">Top Rated</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topRated.length === 0 && (
              <p className="text-white/25 text-sm text-center py-10">No movies yet.</p>
            )}
            {topRated.map((m, i) => (
              <Link
                key={m.id}
                to={`/admin/movies/edit/${m.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.04] transition-colors group"
              >
                <span
                  className={`text-sm font-black font-mono w-6 text-center flex-shrink-0 ${
                    i === 0
                      ? "text-[#e8a020]"
                      : i === 1
                      ? "text-sky-400"
                      : i === 2
                      ? "text-violet-400"
                      : "text-white/25"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate group-hover:text-[#e8a020] transition-colors">
                    {m.title}
                  </p>
                  <p className="text-white/30 text-xs font-mono">{m.year} · {m.language}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="flex items-center gap-1 bg-[#e8a020]/10 border border-[#e8a020]/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-[#e8a020] fill-current" />
                    <span className="text-[#e8a020] text-xs font-black font-mono">
                      {m.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Language distribution */}
      {languages.length > 0 && (
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#e8a020]" />
            <h2 className="text-white font-semibold text-sm">Content by Language</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => {
              const count = movies.filter((m) => m.language === lang).length;
              const pct = Math.round((count / movies.length) * 100);
              return (
                <div
                  key={lang}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
                >
                  <span className="text-white/70 text-xs font-medium">{lang}</span>
                  <span className="text-[#e8a020] text-xs font-black font-mono">{count}</span>
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e8a020] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
