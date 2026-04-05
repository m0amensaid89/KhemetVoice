"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Password rules for signup
  const rule1 = password.length >= 8;
  const rule2 = /\d/.test(password);
  const rule3 = /[!@#$%^&*]/.test(password);

  const passwordsMatch = password === repeatPassword;
  const repeatPasswordTouched = repeatPassword.length > 0;

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center pt-20 px-4">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Khemet Voice"
        className="h-12 w-auto object-contain mb-8"
      />

      {/* Card */}
      <div className="w-full max-w-sm">

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "signin"
                ? "text-white border-b-2 border-[#D4AF37]"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "signup"
                ? "text-white border-b-2 border-[#D4AF37]"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Area */}
        {activeTab === "signin" ? (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Email address"
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className="text-right">
              <button type="button" className="text-zinc-400 hover:text-white text-sm">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold mt-2"
            >
              Sign In
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
              disabled={!rule1 || !rule2 || !rule3 || !passwordsMatch}
            >
              Create Free Account
            </Button>
          </form>
        )}

        {/* Disclaimer */}
        <p className="text-zinc-600 text-xs text-center mt-8">
          By continuing you agree to our Terms of Service
        </p>

      </div>
    </div>
  );
}
