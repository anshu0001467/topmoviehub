import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Download,
  TrendingUp,
  Flame,
  Clock,
  ChevronDown,
  Globe,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovies, getCategories, getSettings } from "@/lib/store";
import { Movie, Category } from "@/types/movie";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const allMovies = getMovies();
    const cats = getCategories();
    const settings = getSettings();
    setMovies(allMovies);
    setCategories(cats);
    const hero =
      allMovies.find((m) => m.id === settings.heroMovieId) ||
      allMovies.find((m) => m.hero) ||
      allMovies[0];
    setHeroMovie(hero || null);
    setTimeout(() => setHeroLoaded(true), 150);
  }, []);

  const trendingMovies = movies.filter((m) => m.rating >= 8.0).slice(0, 10);
  const featuredMovies = movies.filter((m) => m.featured);
  const recentMovies = [...movies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 9);

  const genreRows = categories
    .slice(0, 5)
    .map((cat) => ({
      category: cat,
      movies: movies.filter((m) => m.genres.includes(cat.name)).slice(0, 8),
    }))
    .filter((row) => row.movies.length > 0);

  const heroPool = movies.filter((m) => m.hero || m.featured).slice(0, 5);

  const switchHero = (idx: number) => {
    if (idx === heroIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setHeroIndex(idx);
      setHeroMovie(heroPool[idx]);
      setIsTransitioning(false);
    }, 400);
  };

  // Auto-cycle hero
  useEffect(() => {
    if (heroPool.length < 2) return;
    const t = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setHeroIndex((i) => {
          const next = (i + 1) % heroPool.length;
          setHeroMovie(heroPool[next]);
          return next;
        });
        setIsTransitioning(false);
      }, 400);
    }, 7000);
    return () => clearInterval(t);
  }, [heroPool.length]);

  return (
    <div className="min-h-screen bg-[#070709]">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO — Cinematic International Design
      ═══════════════════════════════════════ */}
      {heroMovie && (
        <section className="relative min-h-screen flex items-end overflow-hidden">
          {/* Layered backdrop */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            <img
              src={heroMovie.backdropUrl}
              alt={heroMovie.title}
              className="w-full h-full object-cover scale-105"
              style={{ filter: "brightness(0.35) saturate(0.6)" }}
            />
          </div>

          {/* Layered mesh gradients — cinematic atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/30" />

          {/* Diagonal golden accent lines */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                #e8a020 0,
                #e8a020 1px,
                transparent 0,
                transparent 60px
              )`,
            }}
          />

          {/* Glowing orb background FX */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#e8a020]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

          {/* Vertical side accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#e8a020]/60 to-transparent" />

          {/* CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 pb-28 pt-36 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
              {/* Left: Text */}
              <div className="max-w-2xl">
                {/* Tag row */}
                <div
                  className={`flex items-center gap-3 mb-7 transition-all duration-700 ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#e8a020] text-black rounded-sm">
                    <Sparkles className="w-3 h-3" />
                    Now Spotlighted
                  </span>
                  <div className="flex items-center gap-1.5 text-[#8a8070] text-xs">
                    <Globe className="w-3 h-3" />
                    <span className="font-mono">{heroMovie.language}</span>
                  </div>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-[#e8a020]/40 to-transparent" />
                </div>

                {/* Genre pills */}
                <div
                  className={`flex flex-wrap gap-2 mb-5 transition-all duration-700 delay-100 ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  {heroMovie.genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/10 text-white/50 rounded-full backdrop-blur-sm bg-white/5"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1
                  className={`font-black leading-[0.88] mb-5 transition-all duration-700 delay-150 ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "clamp(46px, 7.5vw, 100px)",
                    color: "#f5f0e8",
                    textShadow: "0 2px 60px rgba(0,0,0,0.9)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {heroMovie.title}
                </h1>

                {/* Tagline */}
                {heroMovie.tagline && (
                  <p
                    className={`text-[#e8a020] text-lg italic mb-5 transition-all duration-700 delay-200 ${
                      heroLoaded && !isTransitioning
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    "{heroMovie.tagline}"
                  </p>
                )}

                {/* Meta */}
                <div
                  className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-[250ms] ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="flex items-center gap-1.5 bg-[#e8a020] px-2.5 py-1 rounded">
                    <Star className="w-3 h-3 text-black fill-black" />
                    <span className="text-black text-xs font-black font-mono">
                      {heroMovie.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-white/50 text-sm font-mono">{heroMovie.year}</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/50 text-sm font-mono">{heroMovie.duration}</span>
                </div>

                {/* Description */}
                <p
                  className={`text-white/45 text-sm sm:text-base leading-relaxed mb-9 max-w-xl line-clamp-2 transition-all duration-700 delay-300 ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {heroMovie.description}
                </p>

                {/* CTAs */}
                <div
                  className={`flex flex-wrap gap-3 transition-all duration-700 delay-[380ms] ${
                    heroLoaded && !isTransitioning
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Link
                    to={`/movie/${heroMovie.slug}`}
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-[#e8a020] text-black font-bold text-sm tracking-wide rounded-sm hover:bg-[#f5b830] transition-all hover:shadow-[0_0_30px_rgba(232,160,32,0.5)] active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Details
                  </Link>
                  <Link
                    to={`/movie/${heroMovie.slug}/download`}
                    className="flex items-center gap-2.5 px-8 py-3.5 border border-white/15 text-white/80 font-semibold text-sm tracking-wide rounded-sm hover:border-[#e8a020]/60 hover:text-[#e8a020] transition-all backdrop-blur-sm bg-white/5"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                </div>
              </div>

              {/* Right: Film strip thumbnail selector */}
              {heroPool.length > 1 && (
                <div className="hidden lg:flex flex-col gap-3">
                  {heroPool.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => switchHero(i)}
                      className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${
                        i === heroIndex
                          ? "w-28 h-[70px] ring-2 ring-[#e8a020] scale-105"
                          : "w-24 h-16 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={m.backdropUrl}
                        alt={m.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${
                          i === heroIndex ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      {i === heroIndex && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e8a020]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile dots */}
          {heroPool.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden z-20">
              {heroPool.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchHero(i)}
                  className={`rounded-full transition-all ${
                    i === heroIndex
                      ? "w-6 h-2 bg-[#e8a020]"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-1 opacity-40 animate-bounce">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <div className="border-y border-white/5 bg-[#0c0c0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
            {[
              { label: "Total Films", value: `${movies.length}+` },
              { label: "Languages", value: `${[...new Set(movies.map((m) => m.language))].length}+` },
              { label: "Genres", value: `${categories.length}` },
              { label: "Quality", value: "4K · 1080p · 720p" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-px h-8 bg-[#e8a020]/30 hidden sm:block" />
                <div>
                  <p className="text-[#e8a020] font-black text-lg font-mono">{s.value}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TRENDING STRIP
      ═══════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <SectionHeader
            icon={<TrendingUp className="w-4 h-4" />}
            title="Trending Now"
            subtitle="Top rated this season"
          />
          <HorizontalScrollRow>
            {trendingMovies.map((m) => (
              <MovieCard key={m.id} movie={m} size="md" />
            ))}
          </HorizontalScrollRow>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECENTLY ADDED
      ═══════════════════════════════════════ */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <SectionHeader
            icon={<Clock className="w-4 h-4" />}
            title="Recently Added"
            subtitle="Fresh to the collection"
            link={{ href: "/movies", label: "View all →" }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {recentMovies[0] && (
              <Link
                to={`/movie/${recentMovies[0].slug}`}
                className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-auto sm:h-full min-h-[200px]"
              >
                <img
                  src={recentMovies[0].backdropUrl}
                  alt={recentMovies[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#e8a020] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    New
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {recentMovies[0].genres.slice(0, 2).map((g) => (
                      <span key={g} className="text-[10px] px-2 py-0.5 bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] font-mono rounded-sm uppercase">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-black text-xl sm:text-2xl group-hover:text-[#e8a020] transition-colors" style={{ fontFamily: "Fraunces, serif" }}>
                    {recentMovies[0].title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#e8a020] fill-[#e8a020]" />
                      <span className="text-[#e8a020] font-bold">{recentMovies[0].rating.toFixed(1)}</span>
                    </div>
                    <span className="text-white/40">{recentMovies[0].year}</span>
                    <span className="text-white/40">{recentMovies[0].language}</span>
                  </div>
                </div>
              </Link>
            )}
            {recentMovies.slice(1).map((m) => (
              <Link
                key={m.id}
                to={`/movie/${m.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[2/3]"
              >
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute top-2 right-2 bg-[#e8a020] text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                  {m.year}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-[#e8a020] transition-colors leading-tight">
                    {m.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 text-[#e8a020] fill-[#e8a020]" />
                    <span className="text-[#e8a020] text-[10px] font-bold font-mono">{m.rating.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GENRE SHELF ROWS
      ═══════════════════════════════════════ */}
      {genreRows.map(({ category, movies: catMovies }) => (
        <section key={category.id} className="py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-10">
            <SectionHeader
              icon={<span className="text-base">{category.icon}</span>}
              title={category.name}
              link={{ href: `/categories/${category.slug}`, label: "See all →" }}
            />
            <HorizontalScrollRow>
              {catMovies.map((m) => (
                <MovieCard key={m.id} movie={m} size="md" />
              ))}
            </HorizontalScrollRow>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════
          EDITOR'S PICKS
      ═══════════════════════════════════════ */}
      {featuredMovies.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-10">
            <SectionHeader
              icon={<Flame className="w-4 h-4 text-orange-400" />}
              title="Editor's Picks"
              subtitle="Handpicked for cinephiles"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredMovies.slice(0, 6).map((m, idx) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.slug}`}
                  className={`group relative rounded-2xl overflow-hidden ${idx === 0 ? "sm:col-span-2 aspect-[21/9]" : "aspect-video"}`}
                >
                  <img
                    src={m.backdropUrl}
                    alt={m.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#e8a020]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {m.genres.slice(0, 2).map((g) => (
                        <span key={g} className="text-[9px] px-2 py-0.5 bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] rounded-sm font-mono uppercase tracking-wide">
                          {g}
                        </span>
                      ))}
                    </div>
                    <h3
                      className={`text-white font-black group-hover:text-[#e8a020] transition-colors leading-tight ${idx === 0 ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {m.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#e8a020] fill-[#e8a020]" />
                        <span className="text-[#e8a020] font-bold">{m.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-white/40">{m.year}</span>
                      <span className="text-white/40">{m.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          BROWSE CATEGORIES CTA
      ═══════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111115] via-[#15131a] to-[#0d0d10] border border-white/8">
            <div className="absolute top-0 left-1/4 w-96 h-64 bg-[#e8a020]/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-40 bg-purple-700/8 blur-[60px] rounded-full pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(#e8a020 1px, transparent 1px), linear-gradient(90deg, #e8a020 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[#e8a020]" />
                  <span className="text-[#e8a020] text-xs font-bold tracking-widest uppercase font-mono">
                    World Cinema
                  </span>
                </div>
                <h2
                  className="font-black text-3xl sm:text-4xl text-white mb-2"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  Browse by Genre
                </h2>
                <p className="text-white/40 text-sm">
                  {categories.length} curated genre collections · {movies.length} films total
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-sm font-medium rounded-xl hover:border-[#e8a020]/50 hover:text-[#e8a020] hover:bg-[#e8a020]/5 transition-all"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
                <Link
                  to="/categories"
                  className="px-5 py-2 bg-[#e8a020] text-black text-sm font-bold rounded-xl hover:bg-[#f5b830] transition-all shadow-[0_0_20px_rgba(232,160,32,0.3)]"
                >
                  All Genres →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  link,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between mb-7">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#e8a020]/10 border border-[#e8a020]/20 flex items-center justify-center text-[#e8a020]">
            {icon}
          </div>
        )}
        <div>
          <h2
            className="font-black text-2xl sm:text-3xl text-white leading-none"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/35 text-xs font-mono mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {link && (
        <Link
          to={link.href}
          className="text-white/40 text-sm font-medium hover:text-[#e8a020] transition-colors flex items-center gap-1 font-mono"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}

function HorizontalScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/row -mx-2">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-10 h-10 rounded-full bg-[#111115] border border-white/10 flex items-center justify-center text-white hover:bg-[#e8a020] hover:text-black hover:border-[#e8a020] transition-all opacity-0 group-hover/row:opacity-100 shadow-2xl"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div ref={ref} className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 px-2">
        {children}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-10 h-10 rounded-full bg-[#111115] border border-white/10 flex items-center justify-center text-white hover:bg-[#e8a020] hover:text-black hover:border-[#e8a020] transition-all opacity-0 group-hover/row:opacity-100 shadow-2xl"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
