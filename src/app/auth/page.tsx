"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const rules = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character (!@#$%^&*)", met: /[!@#$%^&*]/.test(password) },
  ];

  const passwordsMatch = repeatPassword === "" || password === repeatPassword;

  const inputClass = "w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors";

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <img src="/logo.png" alt="Khemet Voice" className="h-16 w-auto object-contain" />
        <span className="text-white uppercase text-sm tracking-[0.2em]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Voice of Khemet
        </span>
      </div>

      <div className="w-full max-w-sm">
        {/* Tab toggle */}
        <div className="flex border-b border-white/10 mb-8">
          {(["signin", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 pb-3 text-sm font-medium transition-all ${tab === t ? "text-white border-b-2 border-[#D4AF37] -mb-px" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {tab === "signin" ? (
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email address" required className={inputClass} />

            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" required className={inputClass} />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-zinc-400 hover:text-[#D4AF37] transition-colors">Forgot password?</a>
            </div>

            <button type="submit"
              className="w-full py-3 rounded-lg bg-[#D4AF37] text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all mt-2">
              Sign In
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="First Name" required className={inputClass} />
              <input placeholder="Last Name" required className={inputClass} />
            </div>

            <input type="email" placeholder="Email address" required className={inputClass} />
            <input type="tel" placeholder="+20 XXX XXX XXXX" required className={inputClass} />

            <div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className={inputClass} />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex flex-col gap-1">
                  {rules.map(r => (
                    <div key={r.label} className="flex items-center gap-2 text-xs">
                      <span className={r.met ? "text-emerald-400" : "text-zinc-600"}>{r.met ? "✓" : "·"}</span>
                      <span className={r.met ? "text-emerald-400" : "text-zinc-500"}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <input type={showRepeat ? "text" : "password"} placeholder="Repeat Password" required
                  value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}
                  className={`${inputClass} ${!passwordsMatch ? "border-red-500/50" : ""}`} />
                <button type="button" onClick={() => setShowRepeat(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                  {showRepeat ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {!passwordsMatch && <p className="text-xs text-red-400 mt-1">Passwords do not match</p>}
            </div>

            <button type="submit"
              className="w-full py-3 rounded-lg bg-[#D4AF37] text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all mt-2">
              Create Free Account
            </button>
          </form>
        )}

        <p className="text-center text-xs text-zinc-600 mt-6">
          By continuing you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
