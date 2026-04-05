"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X, Check } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

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
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password rules
  const rule1 = password.length >= 8;
  const rule2 = /\d/.test(password);
  const rule3 = /[!@#$%^&*]/.test(password);

  const passwordsMatch = password === repeatPassword;
  const repeatPasswordTouched = repeatPassword.length > 0;

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setRepeatPassword("");
      setShowPassword(false);
      setShowRepeatPassword(false);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rule1 || !rule2 || !rule3 || !passwordsMatch || !email || !firstName || !lastName || !mobile) {
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset localstorage tries
      localStorage.setItem('kv_tries', '0');

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D4AF37]"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-display font-bold text-white mb-2">You've discovered something powerful.</h2>
            <p className="text-sm text-zinc-400">
              Create your free account to unlock more generations and download your creations.
            </p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Account created! You're all set.</h3>
              <p className="text-sm text-zinc-400">Redirecting to your command center...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="tel"
                placeholder="+20 XXX XXX XXXX"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Rules */}
              <div className="space-y-1 mt-2 mb-4 text-xs">
                <div className={`flex items-center gap-2 ${rule1 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  <span>{rule1 ? '✓' : '·'}</span>
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${rule2 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  <span>{rule2 ? '✓' : '·'}</span>
                  <span>At least one number</span>
                </div>
                <div className={`flex items-center gap-2 ${rule3 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  <span>{rule3 ? '✓' : '·'}</span>
                  <span>At least one special character (!@#$%^&*)</span>
                </div>
              </div>

              <div className="relative mt-4">
                <Input
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showRepeatPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Repeat Password Validation */}
              {repeatPasswordTouched && !passwordsMatch && (
                <div className="text-red-400 text-xs mt-1">Passwords do not match</div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold mt-6"
                disabled={isSubmitting || !rule1 || !rule2 || !rule3 || !passwordsMatch}
              >
                {isSubmitting ? "Creating Account..." : "Create Free Account"}
              </Button>

              <div className="text-center text-sm text-zinc-400 mt-4">
                Already have an account?{" "}
                <Link href="/auth" className="text-[#D4AF37] hover:underline">
                  Sign in →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
