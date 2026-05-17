"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function TabSecurity() {
  const [currentUser, setCurrentUser] = useState("");
  const [form, setForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const loadCreds = async () => {
      try {
        const snap = await getDoc(doc(db, "admin", "credentials"));
        if (snap.exists()) {
          setCurrentUser(snap.data().username || "");
        }
      } catch (err) {
        console.error("Load credentials error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCreds();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validate
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (form.newPassword && form.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setSaving(true);
    try {
      // Verify current password
      const snap = await getDoc(doc(db, "admin", "credentials"));
      if (!snap.exists() || snap.data().password !== form.currentPassword) {
        setMessage({ type: "error", text: "Current password is incorrect." });
        setSaving(false);
        return;
      }

      // Build update
      const update = {};
      if (form.newUsername.trim()) update.username = form.newUsername.trim();
      if (form.newPassword) update.password = form.newPassword;

      if (Object.keys(update).length === 0) {
        setMessage({ type: "error", text: "No changes to save." });
        setSaving(false);
        return;
      }

      await setDoc(doc(db, "admin", "credentials"), update, { merge: true });

      if (update.username) setCurrentUser(update.username);
      setForm({ currentPassword: "", newUsername: "", newPassword: "", confirmPassword: "" });
      setMessage({ type: "success", text: "Credentials updated successfully!" });
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ type: "error", text: "Update failed: " + err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-on-surface-variant/40">
        <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-headline-md text-on-surface mb-1">Account Security</h2>
      <p className="text-on-surface-variant/60 text-sm mb-6">Update your admin login credentials</p>

      {message.text && (
        <div className={`${message.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"} border text-sm px-4 py-3 rounded-lg mb-6 flex items-center gap-2`}>
          <span className="material-symbols-outlined text-lg">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="glass-panel p-6 rounded-xl space-y-5">
        {/* Current Info */}
        <div className="bg-surface-container/40 rounded-lg p-4 border border-outline/10">
          <p className="text-xs text-on-surface-variant/50 uppercase tracking-widest font-label-sm mb-1">Current Username</p>
          <p className="text-on-surface font-medium">{currentUser}</p>
        </div>

        {/* Current Password (required for any change) */}
        <div>
          <label htmlFor="sec-current" className="block text-xs text-primary uppercase tracking-widest mb-2 font-label-sm">
            Current Password *
          </label>
          <input
            id="sec-current"
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            required
            className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="Required to verify identity"
            autoComplete="current-password"
          />
        </div>

        <div className="border-t border-outline/10 pt-5">
          <p className="text-xs text-on-surface-variant/50 mb-4">Leave fields empty to keep unchanged</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="sec-newuser" className="block text-xs text-on-surface-variant/70 mb-1">New Username</label>
              <input
                id="sec-newuser"
                type="text"
                value={form.newUsername}
                onChange={(e) => setForm({ ...form, newUsername: e.target.value })}
                className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Leave empty to keep current"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="sec-newpass" className="block text-xs text-on-surface-variant/70 mb-1">New Password</label>
              <input
                id="sec-newpass"
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="sec-confirm" className="block text-xs text-on-surface-variant/70 mb-1">Confirm New Password</label>
              <input
                id="sec-confirm"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-3 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Repeat new password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-on-primary-container font-label-sm text-xs font-bold px-8 py-4 rounded-lg uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Credentials"}
        </button>
      </form>
    </div>
  );
}
