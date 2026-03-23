import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  X,
  Trash2,
  ChevronLeft,
  Film,
  Image,
  Tag,
  Users,
  Download,
  Sliders,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Globe,
  Clock,
  Calendar,
} from "lucide-react";
import { addMovie, updateMovie, getMovieById, getCategories } from "@/lib/store";
import { Movie, CastMember, DownloadLink } from "@/types/movie";

type Section = "basic" | "media" | "genres" | "flags" | "cast" | "screenshots" | "downloads";

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "basic", label: "Basic Info", icon: <Film className="w-3.5 h-3.5" /> },
  { id: "media", label: "Media URLs", icon: <Image className="w-3.5 h-3.5" /> },
  { id: "genres", label: "Genres & Tags", icon: <Tag className="w-3.5 h-3.5" /> },
  { id: "flags", label: "Display", icon: <Sliders className="w-3.5 h-3.5" /> },
  { id: "cast", label: "Cast", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "screenshots", label: "Screenshots", icon: <Image className="w-3.5 h-3.5" /> },
  { id: "downloads", label: "Downloads", icon: <Download className="w-3.5 h-3.5" /> },
];

const EMPTY_MOVIE: Omit<Movie, "id" | "createdAt"> = {
  title: "",
  slug: "",
  description: "",
  tagline: "",
  posterUrl: "",
  backdropUrl: "",
  trailerUrl: "",
  year: new Date().getFullYear(),
  duration: "",
  language: "English",
  rating: 7.0,
  genres: [],
  cast: [],
  screenshots: [],
  tags: [],
  featured: false,
  hero: false,
  downloadLinks: [],
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminMovieForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<Omit<Movie, "id" | "createdAt">>(EMPTY_MOVIE);
  const [genres, setGenres] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");
  const [castInput, setCastInput] = useState<CastMember>({ name: "", role: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("basic");

  useEffect(() => {
    const cats = getCategories();
    setGenres(cats.map((c) => c.name));
    if (isEdit && id) {
      const m = getMovieById(id);
      if (m) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, createdAt: _ct, ...rest } = m;
        setForm(rest);
      }
    }
  }, [id, isEdit]);

  const set = (key: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
  };

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!isEdit) set("slug", slugify(title));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.slug.trim()) e.slug = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.posterUrl.trim()) e.posterUrl = "Required";
    if (!form.backdropUrl.trim()) e.backdropUrl = "Required";
    if (form.genres.length === 0) e.genres = "Select at least one genre";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (isEdit && id) {
      updateMovie(id, form);
    } else {
      addMovie(form);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate("/admin/movies"), 900);
  };

  const toggleGenre = (g: string) => {
    set("genres", form.genres.includes(g) ? form.genres.filter((x) => x !== g) : [...form.genres, g]);
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const addScreenshot = () => {
    if (screenshotInput.trim() && !form.screenshots.includes(screenshotInput.trim())) {
      set("screenshots", [...form.screenshots, screenshotInput.trim()]);
    }
    setScreenshotInput("");
  };

  const addCast = () => {
    if (castInput.name.trim()) {
      set("cast", [...form.cast, castInput]);
      setCastInput({ name: "", role: "" });
    }
  };

  const addDownloadLink = () => {
    set("downloadLinks", [
      ...form.downloadLinks,
      { quality: "1080p", size: "", format: "MKV", server: "Server 1", url: "" },
    ]);
  };

  const updateDL = (i: number, key: keyof DownloadLink, value: string) => {
    const links = [...form.downloadLinks];
    links[i] = { ...links[i], [key]: value };
    set("downloadLinks", links);
  };

  const removeDL = (i: number) => {
    set("downloadLinks", form.downloadLinks.filter((_, idx) => idx !== i));
  };

  const inputCls = (key?: string) =>
    `w-full px-4 py-3 bg-[#0a0a0f] border rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${
      key && errors[key]
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/8 focus:border-[#e8a020]/60 focus:ring-[#e8a020]/10"
    }`;

  const labelCls = "block text-white/40 text-[10px] uppercase tracking-[0.18em] font-mono font-bold mb-2";

  return (
    <div className="min-h-screen">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e8a020]/60 to-transparent mb-8" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/movies")}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/8 rounded-xl text-white/40 hover:text-[#e8a020] hover:border-[#e8a020]/30 text-sm transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e8a020]" />
              <span className="text-[#e8a020] text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                {isEdit ? "Edit Entry" : "New Entry"}
              </span>
            </div>
            <h1 className="font-black text-2xl text-white" style={{ fontFamily: "Fraunces, serif" }}>
              {isEdit ? `Editing: ${form.title || "..."}` : "Add New Movie"}
            </h1>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={saving || saved}
          className={`hidden sm:flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-[#e8a020] text-black hover:bg-[#f5b830] shadow-[0_0_20px_rgba(232,160,32,0.3)]"
          } disabled:opacity-60`}
        >
          {saved ? (
            <><CheckCircle2 className="w-4 h-4" /> Saved!</>
          ) : saving ? (
            <><span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Saving...</>
          ) : (
            <>{isEdit ? "Update Movie" : "Add Movie"}</>
          )}
        </button>
      </div>

      <div className="flex gap-6 max-w-5xl">
        {/* Sidebar nav */}
        <div className="hidden lg:flex flex-col gap-1 w-44 flex-shrink-0">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                activeSection === s.id
                  ? "bg-[#e8a020]/10 border border-[#e8a020]/25 text-[#e8a020]"
                  : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
              }`}
            >
              <span className="flex-shrink-0">{s.icon}</span>
              <span className="font-mono text-xs">{s.label}</span>
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/8">
            <div className="px-3 py-2.5 bg-white/[0.02] rounded-xl border border-white/5">
              <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mb-2">Preview</p>
              {form.posterUrl ? (
                <img src={form.posterUrl} alt="" className="w-full aspect-[2/3] object-cover rounded-lg" />
              ) : (
                <div className="w-full aspect-[2/3] bg-white/[0.03] rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white/10" />
                </div>
              )}
              {form.title && <p className="text-white/60 text-xs font-semibold mt-2 line-clamp-1">{form.title}</p>}
              {form.rating > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-2.5 h-2.5 text-[#e8a020] fill-[#e8a020]" />
                  <span className="text-[#e8a020] text-[10px] font-bold font-mono">{form.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          {/* Section tabs mobile */}
          <div className="flex lg:hidden gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeSection === s.id
                    ? "bg-[#e8a020]/10 border border-[#e8a020]/25 text-[#e8a020]"
                    : "bg-white/[0.03] border border-white/8 text-white/40"
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* BASIC INFO */}
          {activeSection === "basic" && (
            <SectionCard title="Basic Information" icon={<Film className="w-4 h-4" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Title *</label>
                  <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls("title")} placeholder="Movie title" />
                  {errors.title && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
                </div>
                <div>
                  <label className={labelCls}>Slug *</label>
                  <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls("slug")} placeholder="movie-slug-url" />
                  {errors.slug && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.slug}</p>}
                </div>
                <div>
                  <label className={labelCls}>Tagline</label>
                  <input type="text" value={form.tagline || ""} onChange={(e) => set("tagline", e.target.value)} className={inputCls()} placeholder="Memorable tagline" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Description *</label>
                  <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} className={`${inputCls("description")} resize-none`} placeholder="Movie synopsis..." />
                  {errors.description && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
                </div>
                <div>
                  <label className={labelCls}><Calendar className="w-3 h-3 inline mr-1" />Year</label>
                  <input type="number" value={form.year} onChange={(e) => set("year", parseInt(e.target.value))} className={inputCls()} min={1900} max={2099} />
                </div>
                <div>
                  <label className={labelCls}><Clock className="w-3 h-3 inline mr-1" />Duration</label>
                  <input type="text" value={form.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls()} placeholder="2h 30m" />
                </div>
                <div>
                  <label className={labelCls}><Globe className="w-3 h-3 inline mr-1" />Language</label>
                  <input type="text" value={form.language} onChange={(e) => set("language", e.target.value)} className={inputCls()} placeholder="English" />
                </div>
                <div>
                  <label className={labelCls}><Star className="w-3 h-3 inline mr-1" />Rating (0–10)</label>
                  <div className="relative">
                    <input type="number" min={0} max={10} step={0.1} value={form.rating} onChange={(e) => set("rating", parseFloat(e.target.value))} className={inputCls()} />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                      <Star className="w-3 h-3 text-[#e8a020] fill-[#e8a020]" />
                      <span className="text-[#e8a020] text-xs font-bold font-mono">{form.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e8a020] to-[#f5b830] rounded-full transition-all" style={{ width: `${(form.rating / 10) * 100}%` }} />
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* MEDIA */}
          {activeSection === "media" && (
            <SectionCard title="Media URLs" icon={<Image className="w-4 h-4" />}>
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Poster URL *</label>
                  <input type="url" value={form.posterUrl} onChange={(e) => set("posterUrl", e.target.value)} className={inputCls("posterUrl")} placeholder="https://images.unsplash.com/..." />
                  {errors.posterUrl && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.posterUrl}</p>}
                  {form.posterUrl && (
                    <div className="mt-3 flex gap-3 items-start">
                      <img src={form.posterUrl} alt="" className="w-20 aspect-[2/3] object-cover rounded-lg border border-white/10" />
                      <div className="text-white/30 text-xs font-mono pt-1">Poster preview</div>
                    </div>
                  )}
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <label className={labelCls}>Backdrop URL *</label>
                  <input type="url" value={form.backdropUrl} onChange={(e) => set("backdropUrl", e.target.value)} className={inputCls("backdropUrl")} placeholder="https://images.unsplash.com/..." />
                  {errors.backdropUrl && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.backdropUrl}</p>}
                  {form.backdropUrl && (
                    <div className="mt-3">
                      <img src={form.backdropUrl} alt="" className="w-full h-28 object-cover rounded-lg border border-white/10" />
                    </div>
                  )}
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <label className={labelCls}>Trailer URL (YouTube Embed)</label>
                  <input type="url" value={form.trailerUrl || ""} onChange={(e) => set("trailerUrl", e.target.value)} className={inputCls()} placeholder="https://youtube.com/embed/..." />
                </div>
              </div>
            </SectionCard>
          )}

          {/* GENRES & TAGS */}
          {activeSection === "genres" && (
            <SectionCard title="Genres & Tags" icon={<Tag className="w-4 h-4" />}>
              <div className="space-y-6">
                <div>
                  <label className={labelCls}>
                    Genres *{" "}
                    {errors.genres && <span className="text-red-400 normal-case tracking-normal ml-1">— {errors.genres}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <button key={g} type="button" onClick={() => toggleGenre(g)}
                        className={`px-4 py-2 text-sm rounded-xl border transition-all font-mono ${
                          form.genres.includes(g)
                            ? "bg-[#e8a020] text-black border-[#e8a020] font-bold shadow-[0_0_12px_rgba(232,160,32,0.3)]"
                            : "border-white/8 text-white/35 hover:border-[#e8a020]/40 hover:text-white/70 bg-white/[0.02]"
                        }`}
                      >{g}</button>
                    ))}
                  </div>
                  {form.genres.length > 0 && (
                    <p className="text-emerald-400 text-xs font-mono mt-2">✓ Selected: {form.genres.join(", ")}</p>
                  )}
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <label className={labelCls}>Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                    {form.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e8a020]/10 border border-[#e8a020]/25 text-[#e8a020] text-xs rounded-full font-mono">
                        #{tag}
                        <button type="button" onClick={() => set("tags", form.tags.filter((t) => t !== tag))} className="opacity-60 hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } if (e.key === "Backspace" && !tagInput && form.tags.length > 0) set("tags", form.tags.slice(0, -1)); }}
                      className={inputCls()} placeholder="Type tag and press Enter..." />
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors flex-shrink-0">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* DISPLAY FLAGS */}
          {activeSection === "flags" && (
            <SectionCard title="Display Settings" icon={<Sliders className="w-4 h-4" />}>
              <div className="space-y-4">
                <p className="text-white/30 text-xs font-mono">Control where this movie appears on the homepage.</p>

                <div onClick={() => set("featured", !form.featured)}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    form.featured ? "bg-[#e8a020]/8 border-[#e8a020]/30" : "bg-white/[0.02] border-white/8 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.featured ? "bg-[#e8a020]/20" : "bg-white/5"}`}>
                      <Star className={`w-5 h-5 transition-colors ${form.featured ? "text-[#e8a020] fill-[#e8a020]" : "text-white/20"}`} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Featured</p>
                      <p className="text-white/35 text-xs font-mono mt-0.5">Appears in Editor's Picks section on homepage</p>
                    </div>
                  </div>
                  <div className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${form.featured ? "bg-[#e8a020]" : "bg-white/10"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "left-7" : "left-1"}`} />
                  </div>
                </div>

                <div onClick={() => set("hero", !form.hero)}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${
                    form.hero ? "bg-purple-500/8 border-purple-500/30" : "bg-white/[0.02] border-white/8 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.hero ? "bg-purple-500/20" : "bg-white/5"}`}>
                      <Sparkles className={`w-5 h-5 transition-colors ${form.hero ? "text-purple-400" : "text-white/20"}`} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Hero Spotlight</p>
                      <p className="text-white/35 text-xs font-mono mt-0.5">Shown in the full-screen hero section on homepage</p>
                    </div>
                  </div>
                  <div className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${form.hero ? "bg-purple-500" : "bg-white/10"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.hero ? "left-7" : "left-1"}`} />
                  </div>
                </div>

                {(form.featured || form.hero) && (
                  <div className="flex items-start gap-2 px-4 py-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-emerald-400 text-xs font-mono">
                      {[form.featured && "Featured", form.hero && "Hero"].filter(Boolean).join(" + ")} enabled. Changes take effect after save.
                    </p>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* CAST */}
          {activeSection === "cast" && (
            <SectionCard title="Cast & Crew" icon={<Users className="w-4 h-4" />}>
              <div className="space-y-3 mb-5">
                {form.cast.length === 0 && (
                  <p className="text-white/20 text-xs font-mono py-4 text-center">No cast members added yet.</p>
                )}
                {form.cast.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] border border-white/8 rounded-xl group">
                    <div className="w-8 h-8 rounded-full bg-[#e8a020]/10 border border-[#e8a020]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#e8a020] text-xs font-bold">{c.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{c.name}</p>
                      <p className="text-white/35 text-xs font-mono">{c.role}</p>
                    </div>
                    <button type="button" onClick={() => set("cast", form.cast.filter((_, idx) => idx !== i))} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={castInput.name} onChange={(e) => setCastInput((prev) => ({ ...prev, name: e.target.value }))} className={inputCls()} placeholder="Actor name" />
                <input type="text" value={castInput.role} onChange={(e) => setCastInput((prev) => ({ ...prev, role: e.target.value }))} className={inputCls()} placeholder="Character role" />
                <button type="button" onClick={addCast} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </SectionCard>
          )}

          {/* SCREENSHOTS */}
          {activeSection === "screenshots" && (
            <SectionCard title="Screenshots" icon={<Image className="w-4 h-4" />}>
              <div className="flex flex-wrap gap-3 mb-4">
                {form.screenshots.length === 0 && <p className="text-white/20 text-xs font-mono py-4 w-full text-center">No screenshots added.</p>}
                {form.screenshots.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="w-36 h-24 object-cover rounded-xl border border-white/8" />
                    <button type="button" onClick={() => set("screenshots", form.screenshots.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="url" value={screenshotInput} onChange={(e) => setScreenshotInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addScreenshot(); } }}
                  className={inputCls()} placeholder="Screenshot URL..." />
                <button type="button" onClick={addScreenshot} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </SectionCard>
          )}

          {/* DOWNLOAD LINKS */}
          {activeSection === "downloads" && (
            <SectionCard title="Download Links" icon={<Download className="w-4 h-4" />}>
              <div className="space-y-3 mb-4">
                {form.downloadLinks.length === 0 && <p className="text-white/20 text-xs font-mono py-4 text-center">No download links added yet.</p>}
                {form.downloadLinks.map((dl, i) => (
                  <div key={i} className="p-4 bg-white/[0.03] border border-white/8 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Link #{i + 1}</span>
                      <button type="button" onClick={() => removeDL(i)} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-white/25 text-[9px] uppercase tracking-widest font-mono mb-1">Quality</label>
                        <select value={dl.quality} onChange={(e) => updateDL(i, "quality", e.target.value)} className="w-full bg-[#0a0a0f] border border-white/8 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#e8a020]/50">
                          {["480p", "720p", "1080p", "4K"].map((q) => <option key={q}>{q}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/25 text-[9px] uppercase tracking-widest font-mono mb-1">Size</label>
                        <input value={dl.size} onChange={(e) => updateDL(i, "size", e.target.value)} className="w-full bg-[#0a0a0f] border border-white/8 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/50" placeholder="e.g. 2.5 GB" />
                      </div>
                      <div>
                        <label className="block text-white/25 text-[9px] uppercase tracking-widest font-mono mb-1">Format</label>
                        <select value={dl.format} onChange={(e) => updateDL(i, "format", e.target.value)} className="w-full bg-[#0a0a0f] border border-white/8 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#e8a020]/50">
                          {["MKV", "MP4", "AVI"].map((f) => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/25 text-[9px] uppercase tracking-widest font-mono mb-1">Server</label>
                        <input value={dl.server} onChange={(e) => updateDL(i, "server", e.target.value)} className="w-full bg-[#0a0a0f] border border-white/8 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/50" placeholder="Server name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/25 text-[9px] uppercase tracking-widest font-mono mb-1">Download URL</label>
                      <input value={dl.url} onChange={(e) => updateDL(i, "url", e.target.value)} className="w-full bg-[#0a0a0f] border border-white/8 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/50" placeholder="https://..." />
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addDownloadLink}
                className="flex items-center gap-2 px-5 py-3 border border-dashed border-white/15 text-white/40 text-sm rounded-xl hover:border-[#e8a020]/40 hover:text-[#e8a020] hover:bg-[#e8a020]/5 transition-all w-full justify-center">
                <Plus className="w-4 h-4" />
                Add Download Link
              </button>
            </SectionCard>
          )}

          {/* Bottom submit */}
          <div className="flex gap-3 pt-2 pb-8">
            <button type="button" onClick={() => navigate("/admin/movies")} className="px-6 py-3 border border-white/10 text-white/50 text-sm rounded-xl hover:border-white/20 hover:text-white transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving || saved}
              className={`flex items-center gap-2 px-8 py-3 font-bold text-sm rounded-xl transition-all ${
                saved ? "bg-emerald-500 text-white" : "bg-[#e8a020] text-black hover:bg-[#f5b830] shadow-[0_0_25px_rgba(232,160,32,0.25)]"
              } disabled:opacity-60`}
            >
              {saved ? (
                <><CheckCircle2 className="w-4 h-4" /> Saved!</>
              ) : saving ? (
                <><span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" /> Saving...</>
              ) : (
                <>{isEdit ? "Update Movie" : "Add Movie"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
        {icon && (
          <div className="w-7 h-7 rounded-lg bg-[#e8a020]/10 border border-[#e8a020]/20 flex items-center justify-center text-[#e8a020]">
            {icon}
          </div>
        )}
        <h2 className="font-bold text-sm text-white/70 font-mono uppercase tracking-widest">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

