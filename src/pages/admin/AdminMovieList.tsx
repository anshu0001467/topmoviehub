import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Edit2, Trash2, Star, Search, Film, SlidersHorizontal } from "lucide-react";
import { getMovies, deleteMovie } from "@/lib/store";
import { Movie } from "@/types/movie";

export default function AdminMovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => setMovies(getMovies());
  useEffect(() => { load(); }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteMovie(id);
    setDeleteConfirm(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="font-black text-3xl text-white"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Movies
          </h1>
          <p className="text-white/30 text-sm font-mono">{movies.length} total movies</p>
        </div>
        <Link
          to="/admin/movies/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#e8a020] text-black font-bold text-sm rounded-xl hover:bg-[#f5b830] transition-all shadow-[0_0_20px_rgba(232,160,32,0.25)]"
        >
          <PlusCircle className="w-4 h-4" />
          Add Movie
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies by title..."
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/15 transition-all"
        />
        {search && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono">
            {filtered.length} results
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Movie", "Year", "Genre", "Rating", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-left text-white/25 text-[10px] font-mono uppercase tracking-[0.15em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0 ring-1 ring-white/10">
                        <img
                          src={m.posterUrl}
                          alt={m.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{m.title}</p>
                        <p className="text-white/25 text-xs font-mono">/{m.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-white/40 text-sm font-mono">{m.year}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {m.genres.slice(0, 2).map((g) => (
                        <span
                          key={g}
                          className="text-[10px] px-2 py-0.5 bg-[#e8a020]/10 text-[#e8a020] rounded-full font-mono border border-[#e8a020]/20"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 text-[#e8a020] font-mono font-bold text-sm">
                      <Star className="w-3 h-3 fill-current" />
                      {m.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      {m.featured && (
                        <span className="text-[10px] px-2 py-0.5 bg-violet-500/15 text-violet-400 rounded-full font-mono w-fit border border-violet-500/20">
                          Featured
                        </span>
                      )}
                      {m.hero && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#e8a020]/15 text-[#e8a020] rounded-full font-mono w-fit border border-[#e8a020]/20">
                          Hero
                        </span>
                      )}
                      {!m.featured && !m.hero && (
                        <span className="text-[10px] px-2 py-0.5 bg-white/5 text-white/30 rounded-full font-mono w-fit border border-white/10">
                          Normal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate(`/admin/movies/edit/${m.id}`)}
                        className="p-2 rounded-lg text-white/30 hover:text-[#e8a020] hover:bg-[#e8a020]/10 transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(m.id)}
                        className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <Film className="w-10 h-10 text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm font-mono">
                      {search ? "No movies match your search." : "No movies yet. Add your first!"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d10] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h3
              className="font-black text-xl text-white text-center mb-2"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Delete Movie?
            </h3>
            <p className="text-white/35 text-sm text-center mb-7 font-mono leading-relaxed">
              This action cannot be undone. The movie will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-white/10 text-white/60 text-sm rounded-xl hover:border-white/20 hover:text-white transition-all"
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


