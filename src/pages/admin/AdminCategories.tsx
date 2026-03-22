import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { getCategories, saveCategories } from "@/lib/store";
import { Category } from "@/types/movie";

const ICONS = ["⚡", "🎭", "🔪", "👻", "🚀", "😂", "✨", "🎬", "🌊", "🏆", "💥", "🎯", "🌙", "🔥", "❤️", "🎪"];

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newCat, setNewCat] = useState({ name: "", slug: "", icon: "🎬", backdropUrl: "" });
  const [editCat, setEditCat] = useState({ name: "", slug: "", icon: "", backdropUrl: "" });

  const load = () => setCategories(getCategories());
  useEffect(() => { load(); }, []);

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleAdd = () => {
    if (!newCat.name.trim()) return;
    const cat: Category = {
      id: Date.now().toString(),
      name: newCat.name.trim(),
      slug: newCat.slug || slugify(newCat.name),
      icon: newCat.icon,
      backdropUrl: newCat.backdropUrl || undefined,
    };
    const updated = [...categories, cat];
    saveCategories(updated);
    setCategories(updated);
    setNewCat({ name: "", slug: "", icon: "🎬", backdropUrl: "" });
    setAdding(false);
  };

  const handleEdit = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const updated = categories.map((c) =>
      c.id === id ? { ...c, name: editCat.name, slug: editCat.slug, icon: editCat.icon, backdropUrl: editCat.backdropUrl || undefined } : c
    );
    saveCategories(updated);
    setCategories(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);
    setCategories(updated);
    setDeleteConfirm(null);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditCat({ name: cat.name, slug: cat.slug, icon: cat.icon, backdropUrl: cat.backdropUrl || "" });
  };

  const inputCls = "px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/15 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="font-black text-3xl text-white"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Categories
          </h1>
          <p className="text-white/30 text-sm font-mono">{categories.length} genres configured</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-all shadow-[0_0_20px_rgba(232,160,32,0.25)]"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="bg-white/[0.03] border border-[#e8a020]/25 rounded-2xl p-6">
          <h2
            className="font-black text-lg text-white mb-4"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            New Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              value={newCat.name}
              onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value, slug: slugify(e.target.value) }))}
              className={inputCls}
              placeholder="Category name"
            />
            <input
              value={newCat.slug}
              onChange={(e) => setNewCat((p) => ({ ...p, slug: e.target.value }))}
              className={inputCls}
              placeholder="category-slug"
            />
            <input
              value={newCat.backdropUrl}
              onChange={(e) => setNewCat((p) => ({ ...p, backdropUrl: e.target.value }))}
              className={`${inputCls} sm:col-span-2`}
              placeholder="Backdrop image URL (optional)"
            />
          </div>
          <div className="mb-5">
            <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-mono font-bold mb-2.5">Icon</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setNewCat((p) => ({ ...p, icon }))}
                  className={`w-10 h-10 text-xl rounded-xl transition-all ${
                    newCat.icon === icon
                      ? "bg-[#e8a020]/20 ring-2 ring-[#e8a020] scale-110"
                      : "bg-white/5 border border-white/10 hover:border-[#e8a020]/40"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAdding(false)}
              className="px-4 py-2.5 border border-white/10 text-white/50 text-sm rounded-xl hover:border-white/20 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-6 py-2.5 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-all"
            >
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {categories.map((cat) => (
            <div key={cat.id} className="px-5 py-4">
              {editingId === cat.id ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    value={editCat.name}
                    onChange={(e) => setEditCat((p) => ({ ...p, name: e.target.value }))}
                    className={inputCls}
                    placeholder="Name"
                  />
                  <input
                    value={editCat.slug}
                    onChange={(e) => setEditCat((p) => ({ ...p, slug: e.target.value }))}
                    className={inputCls}
                    placeholder="Slug"
                  />
                  <input
                    value={editCat.backdropUrl}
                    onChange={(e) => setEditCat((p) => ({ ...p, backdropUrl: e.target.value }))}
                    className={inputCls}
                    placeholder="Backdrop URL"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#e8a020] text-black font-bold text-sm rounded-xl"
                    >
                      <Check className="w-3.5 h-3.5" /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 border border-white/10 text-white/40 rounded-xl hover:border-white/20"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-2xl w-8 text-center">{cat.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{cat.name}</p>
                    <p className="text-white/25 text-xs font-mono">/{cat.slug}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-2 text-white/30 hover:text-[#e8a020] hover:bg-[#e8a020]/10 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(cat.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-white/20 text-sm text-center py-12 font-mono">
              No categories yet.
            </p>
          )}
        </div>
      </div>

      {/* Delete modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d10] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3
              className="font-black text-xl text-white text-center mb-2"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Delete Category?
            </h3>
            <p className="text-white/35 text-sm text-center mb-7 font-mono">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-white/10 text-white/60 text-sm rounded-xl hover:border-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
