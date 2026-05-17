"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credDoc = await getDoc(doc(db, "admin", "credentials"));
      
      if (!credDoc.exists()) {
        setError("System configuration error");
        return;
      }

      const rawCreds = credDoc.data();
      // Normalize keys — Firestore may have trailing spaces in field names
      const creds = {};
      Object.entries(rawCreds).forEach(([k, v]) => { creds[k.trim()] = typeof v === "string" ? v.trim() : v; });
      
      const typedUser = email.trim();
      const typedPass = password.trim();
      
      if ((typedUser === creds.username || typedUser === creds.email) && typedPass === creds.password) {
        sessionStorage.setItem("pis_admin", "true");
        onLogin();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Check Firebase config.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0d0e] px-4 admin-cursor-restore">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.webp" alt="Party in Style" className="h-20 mx-auto mb-4" width={80} height={80} />
          <h1 className="text-2xl font-display-xl text-on-surface">Admin Panel</h1>
          <p className="text-on-surface-variant/60 text-sm mt-1">Secure access for authorized personnel only</p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl animated-border space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="admin-user" className="block text-xs text-primary uppercase tracking-widest mb-2 font-label-sm">
              Username or Email
            </label>
            <input
              id="admin-user"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="admin-pass" className="block text-xs text-primary uppercase tracking-widest mb-2 font-label-sm">
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary-container font-label-sm text-xs font-bold px-8 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-on-surface-variant/30 text-xs mt-6">
          &copy; 2026 Party in Style — Admin Console
        </p>
      </div>
    </div>
  );
}
