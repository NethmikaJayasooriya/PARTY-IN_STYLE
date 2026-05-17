"use client";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  useEffect(() => {
    // Hide main site chrome (navbar, footer, cursor, whatsapp, etc.)
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  return children;
}
