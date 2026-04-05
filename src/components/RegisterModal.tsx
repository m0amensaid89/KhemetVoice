"use client";

import { useState } from "react";
import { X, Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const rules = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character (!@#$%^&*)", met: /[!@#$%^&*]/.test(password) },
  ];

  const passwordsMatch = repeatPassword === "" || password === repeatPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch || rules.some(r => !r.met)) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    localStorage.setItem("kv_tries", "0");
    localStorage.setItem("kv_tries_date", new Date().toISOString().split("T")[0]);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10">
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 size={48} className="text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Account created!</h3>
              <p className="text-zinc-400 text-sm">You're all set. Welcome to Khemet Voice.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">You've discovered something powerful.</h2>
                <p className="text-zinc-400 text-sm">Create your free account to unlock more generations and download your creations.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required
                    className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50" />
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required
                    className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50" />
                </div>

                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required
                  className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50" />

                <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+20 XXX XXX XXXX" required
                  className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50" />

                <div>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Password" required
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50" />
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
                    <input type={showRepeat ? "text" : "password"} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}
                      placeholder="Repeat Password" required
                      className={`w-full bg-zinc-800 border rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${!passwordsMatch ? "border-red-500/50" : "border-white/10 focus:border-[#D4AF37]/50"}`} />
                    <button type="button" onClick={() => setShowRepeat(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                      {showRepeat ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {!passwordsMatch && <p className="text-xs text-red-400 mt-1">Passwords do not match</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg bg-[#D4AF37] text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 mt-2">
                  {loading ? "Creating account..." : "Create Free Account"}
                </button>

                <p className="text-center text-xs text-zinc-500">
                  Already have an account?{" "}
                  <a href="/auth" className="text-[#D4AF37] hover:underline">Sign in →</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
