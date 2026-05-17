"use client";
import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check session
    const session = sessionStorage.getItem("pis_admin");
    setIsAuthenticated(session === "true");
    setChecking(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("pis_admin");
    setIsAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0d0e]">
        <div className="text-center">
          <img src="/logo.webp" alt="Loading" className="h-16 mx-auto mb-4 animate-pulse" width={64} height={64} />
          <p className="text-on-surface-variant/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
