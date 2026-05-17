"use client";
import { useState } from "react";
import TabInquiries from "./TabInquiries";
import TabGallery from "./TabGallery";
import TabContent from "./TabContent";
import TabServices from "./TabServices";
import TabFormOptions from "./TabFormOptions";
import TabSecurity from "./TabSecurity";

const TABS = [
  { id: "inquiries", label: "Inquiries", icon: "forum" },
  { id: "gallery", label: "Gallery", icon: "photo_library" },
  { id: "content", label: "Content", icon: "settings" },
  { id: "services", label: "Services", icon: "business_center" },
  { id: "form_options", label: "Form Options", icon: "tune" },
  { id: "security", label: "Security", icon: "shield" },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "inquiries": return <TabInquiries />;
      case "gallery": return <TabGallery />;
      case "content": return <TabContent />;
      case "services": return <TabServices />;
      case "form_options": return <TabFormOptions />;
      case "security": return <TabSecurity />;
      default: return <TabInquiries />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] flex admin-cursor-restore">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface-container-lowest/95 backdrop-blur-xl border-r border-outline/10 z-50 transition-transform duration-300 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Brand */}
        <div className="p-6 border-b border-outline/10">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Party in Style" className="h-10 w-auto" width={40} height={40} />
            <div>
              <p className="text-on-surface text-sm font-medium">Party in Style</p>
              <p className="text-primary text-[10px] uppercase tracking-widest font-label-sm">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-on-surface-variant/60 hover:bg-surface-container/50 hover:text-on-surface border border-transparent"
              }`}
            >
              <span className="material-symbols-outlined lowercase normal-case text-xl">{tab.icon}</span>
              <span className="font-label-sm text-xs uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-outline/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-label-sm text-xs uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0c0d0e]/90 backdrop-blur-md border-b border-outline/10 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <h1 className="text-lg font-headline-md text-on-surface capitalize">{activeTab}</h1>
        </header>

        {/* Tab Content */}
        <div className="p-6 lg:p-8 max-w-6xl">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
