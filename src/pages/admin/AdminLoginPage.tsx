import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Film, Zap, Globe } from "lucide-react";
import { getAdminSession, setAdminSession } from "@/lib/store";

const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getAdminSession()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminSession(true);
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#e8a020]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-900/8 blur-[100px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <Globe className="w-3 h-3 text-[#e8a020]" />
            <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Admin Access</span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#e8a020] flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(232,160,32,0.4)]">
            <Film className="w-8 h-8 text-black" />
          </div>
          <h1
            className="font-black text-4xl text-white mb-2"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            TopMoviesHub
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-[#e8a020]" />
            <p className="text-white/35 text-sm font-mono">Dashboard Sign In</p>
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/35 text-[10px] uppercase tracking-[0.2em] font-mono font-bold mb-2.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/15 transition-all"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#e8a020] text-black font-bold rounded-xl hover:bg-[#f5b830] transition-all shadow-[0_0_25px_rgba(232,160,32,0.3)] hover:shadow-[0_0_35px_rgba(232,160,32,0.5)] active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-center text-white/25 text-xs mt-6 font-mono">
            Default password:{" "}
            <code className="text-[#e8a020] bg-[#e8a020]/10 px-1.5 py-0.5 rounded">
              admin123
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
