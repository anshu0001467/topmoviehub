import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, X, Trash2, ChevronLeft } from "lucide-react";
import { addMovie, updateMovie, getMovieById, getCategories } from "@/lib/store";
import { Movie, CastMember, DownloadLink } from "@/types/movie";

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
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.posterUrl.trim()) e.posterUrl = "Poster URL is required";
    if (!form.backdropUrl.trim()) e.backdropUrl = "Backdrop URL is required";
    if (form.genres.length === 0) e.genres = "Select at least one genre";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    if (isEdit && id) {
      updateMovie(id, form);
    } else {
      addMovie(form);
    }
    setSaving(false);
    navigate("/admin/movies");
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
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${
      key && errors[key]
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 focus:border-[#e8a020]/60 focus:ring-[#e8a020]/15"
    }`;

  const labelCls = "block text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono font-bold mb-2.5";

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
      <h2
        className="font-black text-lg text-white mb-5"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/movies")}
          className="flex items-center gap-1.5 text-white/35 hover:text-[#e8a020] text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h1
          className="font-black text-3xl text-white"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {isEdit ? "Edit Movie" : "Add New Movie"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Title *</label>
              <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls("title")} placeholder="Movie title" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls("slug")} placeholder="movie-slug-url" />
              {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input type="text" value={form.tagline || ""} onChange={(e) => set("tagline", e.target.value)} className={inputCls()} placeholder="Memorable tagline" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={4}
                className={`${inputCls("description")} resize-none`}
                placeholder="Movie synopsis..."
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input type="number" value={form.year} onChange={(e) => set("year", parseInt(e.target.value))} className={inputCls()} />
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <input type="text" value={form.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls()} placeholder="2h 30m" />
            </div>
            <div>
              <label className={labelCls}>Language</label>
              <input type="text" value={form.language} onChange={(e) => set("language", e.target.value)} className={inputCls()} placeholder="English" />
            </div>
            <div>
              <label className={labelCls}>Rating (0–10)</label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={form.rating}
                onChange={(e) => set("rating", parseFloat(e.target.value))}
                className={inputCls()}
              />
            </div>
          </div>
        </SectionCard>

        {/* Media */}
        <SectionCard title="Media URLs">
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Poster URL *</label>
              <input type="url" value={form.posterUrl} onChange={(e) => set("posterUrl", e.target.value)} className={inputCls("posterUrl")} placeholder="https://..." />
              {errors.posterUrl && <p className="text-red-400 text-xs mt-1">{errors.posterUrl}</p>}
            </div>
            <div>
              <label className={labelCls}>Backdrop URL *</label>
              <input type="url" value={form.backdropUrl} onChange={(e) => set("backdropUrl", e.target.value)} className={inputCls("backdropUrl")} placeholder="https://..." />
              {errors.backdropUrl && <p className="text-red-400 text-xs mt-1">{errors.backdropUrl}</p>}
            </div>
            <div>
              <label className={labelCls}>Trailer URL (embed)</label>
              <input type="url" value={form.trailerUrl || ""} onChange={(e) => set("trailerUrl", e.target.value)} className={inputCls()} placeholder="https://youtube.com/embed/..." />
            </div>
          </div>
        </SectionCard>

        {/* Genres */}
        <SectionCard title="Genres & Tags">
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Genres * {errors.genres && <span className="text-red-400 normal-case tracking-normal">— {errors.genres}</span>}</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className={`px-4 py-2 text-sm rounded-xl border transition-all font-mono ${
                      form.genres.includes(g)
                        ? "bg-[#e8a020] text-black border-[#e8a020] font-bold"
                        : "border-white/10 text-white/40 hover:border-[#e8a020]/40 hover:text-white/70"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-[#e8a020]/15 border border-[#e8a020]/30 text-[#e8a020] text-xs rounded-full font-mono">
                    #{tag}
                    <button type="button" onClick={() => set("tags", form.tags.filter((t) => t !== tag))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } if (e.key === "Backspace" && !tagInput && form.tags.length > 0) set("tags", form.tags.slice(0, -1)); }}
                  className={inputCls()}
                  placeholder="Add tag and press Enter"
                />
                <button type="button" onClick={addTag} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Flags */}
        <SectionCard title="Display Settings">
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set("featured", !form.featured)}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${form.featured ? "bg-[#e8a020]" : "bg-[#2e2b27]"}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? "left-7" : "left-1"}`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Featured</p>
                <p className="text-white/35 text-xs">Appears in Editor's Picks section</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set("hero", !form.hero)}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${form.hero ? "bg-[#e8a020]" : "bg-[#2e2b27]"}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.hero ? "left-7" : "left-1"}`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Hero Spotlight</p>
                <p className="text-white/35 text-xs">Shows as the main hero on homepage</p>
              </div>
            </label>
          </div>
        </SectionCard>

        {/* Cast */}
        <SectionCard title="Cast & Crew">
          <div className="space-y-3 mb-4">
            {form.cast.map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <p className="text-white/35 text-xs font-mono">{c.role}</p>
                </div>
                <button type="button" onClick={() => set("cast", form.cast.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={castInput.name}
              onChange={(e) => setCastInput((prev) => ({ ...prev, name: e.target.value }))}
              className={inputCls()}
              placeholder="Actor name"
            />
            <input
              type="text"
              value={castInput.role}
              onChange={(e) => setCastInput((prev) => ({ ...prev, role: e.target.value }))}
              className={inputCls()}
              placeholder="Character role"
            />
            <button type="button" onClick={addCast} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors flex-shrink-0">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </SectionCard>

        {/* Screenshots */}
        <SectionCard title="Screenshots">
          <div className="flex flex-wrap gap-3 mb-3">
            {form.screenshots.map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} alt="" className="w-32 h-20 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => set("screenshots", form.screenshots.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-[#c0392b] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              value={screenshotInput}
              onChange={(e) => setScreenshotInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addScreenshot(); }}}
              className={inputCls()}
              placeholder="Screenshot URL..."
            />
            <button type="button" onClick={addScreenshot} className="px-4 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-colors flex-shrink-0">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </SectionCard>

        {/* Download Links */}
        <SectionCard title="Download Links">
          <div className="space-y-3 mb-4">
            {form.downloadLinks.map((dl, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                <select
                  value={dl.quality}
                  onChange={(e) => updateDL(i, "quality", e.target.value)}
                  className="bg-[#0d0d10] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-[#e8a020]"
                >
                  {["480p", "720p", "1080p", "4K"].map((q) => <option key={q}>{q}</option>)}
                </select>
                <input
                  value={dl.size}
                  onChange={(e) => updateDL(i, "size", e.target.value)}
                  className="bg-[#0d0d10] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]"
                  placeholder="Size (e.g. 1.5 GB)"
                />
                <select
                  value={dl.format}
                  onChange={(e) => updateDL(i, "format", e.target.value)}
                  className="bg-[#0d0d10] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-[#e8a020]"
                >
                  {["MKV", "MP4", "AVI"].map((f) => <option key={f}>{f}</option>)}
                </select>
                <input
                  value={dl.server}
                  onChange={(e) => updateDL(i, "server", e.target.value)}
                  className="bg-[#0d0d10] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]"
                  placeholder="Server name"
                />
                <div className="flex gap-1 col-span-2 sm:col-span-1">
                  <input
                    value={dl.url}
                    onChange={(e) => updateDL(i, "url", e.target.value)}
                    className="flex-1 bg-[#0d0d10] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]"
                    placeholder="Download URL"
                  />
                  <button type="button" onClick={() => removeDL(i)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addDownloadLink}
            className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-white/15 text-white/40 text-sm rounded-xl hover:border-[#e8a020]/40 hover:text-[#e8a020] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Download Link
          </button>
        </SectionCard>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/movies")}
            className="px-6 py-3 border border-white/10 text-white/60 text-sm rounded-xl hover:border-white/20 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(232,160,32,0.25)]"
          >
            {saving ? "Saving..." : isEdit ? "Update Movie" : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}
