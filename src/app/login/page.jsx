"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch(
        "/api/v1/dashboard/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.trim(), password }),
        },
        "login"
      );
      if (typeof window !== "undefined" && res?.data?.token) {
        sessionStorage.setItem("auth-token", res.data.token);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError && (err.status === 400 || err.status === 401)) {
        setError("Username atau password salah.");
      } else {
        setError("Gagal login. Pastikan backend jalan.");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm placeholder:text-text-light " +
    (error ? "border-red-400 bg-red-50" : "border-border");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-3/5 bg-[#E3F2FD] flex flex-col items-center justify-center p-8 relative">
        {/* Home button */}
        <Link href="/" className="absolute top-6 left-6 text-text-secondary hover:text-text-primary transition-colors" aria-label="Kembali ke beranda">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
            <path d="M9 22V12h6v10" />
          </svg>
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <img src="/assets/logo.png" width={80} height={80} alt="Logo Adaptive Network Laboratory" />
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-8">Admin Login</h1>

        {error && (
          <div className="w-full max-w-sm mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600" role="alert">
            {error}
          </div>
        )}

        <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-sm font-medium text-text-primary">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username Admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className={inputCls}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password Admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={inputCls}
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-center bg-primary hover:bg-primary-dark disabled:opacity-50 text-[#E3F2FD] font-medium py-3 px-8 rounded-lg transition-colors shadow-md text-sm"
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* Right side - Visual */}
      <div className="relative hidden overflow-hidden bg-navy md:flex md:w-2/5 md:items-center md:justify-center">
        <img
          src="/assets/video-profile.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/25" />
        <div className="absolute bottom-10 left-10 right-10 border-t border-[#E3F2FD]/25 pt-4 font-mono text-[0.6rem] tracking-[0.15em] text-[#E3F2FD]/55">
          TELKOM UNIVERSITY / BANDUNG
        </div>
        <div className="relative z-10 px-8 text-center">
          <img src="/assets/logo.png" width={120} height={120} alt="" className="mx-auto mb-6 opacity-90" />
          <p className="font-mono text-[0.65rem] tracking-[0.18em] text-primary">ADAPTIVE NETWORK</p>
          <h2 className="mt-3 text-4xl text-[#E3F2FD]">Laboratory</h2>
          <p className="mt-4 text-sm text-[#E3F2FD]/60">Admin portal</p>
        </div>
      </div>
    </div>
  );
}
