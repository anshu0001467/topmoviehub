import { useEffect, useState } from "react";
import { Save, Check, Settings, Film, Star, Zap } from "lucide-react";
import { getSettings, saveSettings, getMovies } from "@/lib/store";
import { SiteSettings } from "@/types/movie";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: "",
    metaDescription: "",
    featuredMovieId: "",
    heroMovieId: "",
  });
  const [movies, setMovies] = useState<{ id: string; title: string }[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    setMovies(getMovies().map((m) => ({ id: m.id, title: m.title })));
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/15 transition-all";
  const labelCls =
    "block text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono font-bold mb-2.5";

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-[#e8a020]" />
          <span className="text-[#e8a020] text-xs font-bold tracking-[0.2em] uppercase font-mono">
            Configuration
          </span>
        </div>
        <h1
          className="font-black text-3xl text-white"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Settings
        </h1>
        <p className="text-white/30 text-sm font-mono mt-1">
          Configure site-wide settings and featured content.
        </p>
      </div>

      {/* Site Identity */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-[#e8a020]" />
          <h2 className="text-white font-semibold">Site Identity</h2>
        </div>
        <div>
          <label className={labelCls}>Site Title</label>
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => setSettings((p) => ({ ...p, siteTitle: e.target.value }))}
            className={inputCls}
            placeholder="TopMoviesHub"
          />
        </div>
        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea
            value={settings.metaDescription}
            onChange={(e) => setSettings((p) => ({ ...p, metaDescription: e.target.value }))}
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="Your site meta description for SEO..."
          />
        </div>
      </div>

      {/* Featured Content */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Film className="w-4 h-4 text-[#e8a020]" />
          <h2 className="text-white font-semibold">Featured Content</h2>
        </div>
        <div>
          <label className={labelCls}>Hero Movie (Homepage Spotlight)</label>
          <select
            value={settings.heroMovieId}
            onChange={(e) => setSettings((p) => ({ ...p, heroMovieId: e.target.value }))}
            className={`${inputCls} bg-[#0d0d10]`}
          >
            <option value="">Select a movie...</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
          <p className="text-white/20 text-xs font-mono mt-2">
            This movie will appear in the full-screen hero section on the homepage.
          </p>
        </div>
        <div>
          <label className={labelCls}>Featured Movie (Spotlight Section)</label>
          <select
            value={settings.featuredMovieId}
            onChange={(e) => setSettings((p) => ({ ...p, featuredMovieId: e.target.value }))}
            className={`${inputCls} bg-[#0d0d10]`}
          >
            <option value="">Select a movie...</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
          <p className="text-white/20 text-xs font-mono mt-2">
            This movie is highlighted in the editor's picks section.
          </p>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2.5 px-8 py-3.5 font-bold text-sm rounded-xl transition-all ${
          saved
            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            : "bg-[#e8a020] text-black hover:bg-[#f5b830] shadow-[0_0_25px_rgba(232,160,32,0.3)] hover:shadow-[0_0_35px_rgba(232,160,32,0.5)]"
        }`}
      >
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Settings Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
