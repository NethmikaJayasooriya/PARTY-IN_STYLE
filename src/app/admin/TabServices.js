"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DEFAULT_SERVICES = [
  {
    id: "wedding",
    icon: "favorite", title: "Bespoke Weddings",
    desc: "Bespoke bridal experiences tailored to your unique love story. From intimate harbour-side ceremonies to grand ballroom celebrations, we handle every detail with grace.",
    features: ["Venue Selection", "Floral Design", "Catering Coordination", "Entertainment", "Day-of Coordination"],
    img: "/images/wedding.webp",
    stat: "Dream",
    statLabel: "Weddings",
    price: 1500
  },
  {
    id: "corporate",
    icon: "business_center", title: "Corporate Events & EOFY Celebrations",
    desc: "High-impact galas, Premium Chrissy Functions, EOFY Celebrations, and executive retreats that elevate your brand. We deliver polished, professional events that leave lasting impressions.",
    features: ["Brand Integration", "AV Production", "Keynote Setup", "VIP Hospitality", "Post-Event Analytics"],
    img: "/images/corporate.webp",
    stat: "50+",
    statLabel: "Corporate Clients",
    price: 2000
  },
  {
    id: "private",
    icon: "celebration", title: "Private Parties & Milestone Birthdays",
    desc: "Exclusive gatherings designed for maximum impact — Kids Theme Parties, Milestone Birthdays, Lux Hens Nights, and anniversaries tailored to your personal style.",
    features: ["Theme Development", "Custom Décor", "DJ & Live Music", "Bespoke Menus", "Photography"],
    img: "/images/kids-party.webp",
    stat: "300+",
    statLabel: "Parties Styled",
    price: 800
  },
  {
    id: "proposal",
    icon: "nightlife", title: "Marriage Proposals & Intimate Soirées",
    desc: "Breathtaking setups for the perfect moment. From private rooftop dinners to candlelit beach proposals, we manage everything to ensure an unforgettable \"Yes\".",
    features: ["Location Scouting", "Romantic Styling", "Hidden Photography", "Musicians", "Champagne Service"],
    img: "/images/proposal.webp",
    stat: "100%",
    statLabel: "Said Yes",
    price: 500
  },
];

export default function TabServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "content"));
        if (snap.exists() && snap.data().servicesList) {
          setServices(snap.data().servicesList);
        } else if (snap.exists() && snap.data().servicesPricing) {
          // Migration from old pricing
          const pricing = snap.data().servicesPricing;
          const merged = DEFAULT_SERVICES.map(s => ({
            ...s,
            price: pricing[s.id] !== undefined ? pricing[s.id] : s.price
          }));
          setServices(merged);
        }
      } catch (err) {
        console.error("Load services error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "content"), { servicesList: services }, { merge: true });
      setSuccess("Services saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateService = (index, field, value) => {
    const newServices = [...services];
    if (field === "features") {
      newServices[index][field] = value.split(",").map(s => s.trim()).filter(s => s);
    } else if (field === "price") {
      newServices[index][field] = Number(value);
    } else {
      newServices[index][field] = value;
    }
    setServices(newServices);
  };

  const addService = () => {
    const newId = "service_" + Date.now();
    setServices([...services, {
      id: newId,
      title: "New Service",
      desc: "Describe your new service here...",
      price: 0,
      features: ["Feature 1", "Feature 2"],
      icon: "star",
      img: "/images/wedding.webp",
      stat: "New",
      statLabel: "Service"
    }]);
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  if (loading) return <div className="text-on-surface-variant/50 text-sm">Loading services...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display-xl text-on-surface">Services Management</h2>
          <p className="text-sm text-on-surface-variant/70 mt-1">Update existing services or add new ones.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addService}
            className="bg-surface-container-highest text-on-surface font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-primary hover:text-on-primary-container transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined lowercase normal-case text-sm">add</span>
            Add Service
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary-container font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <span className="material-symbols-outlined lowercase normal-case text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined lowercase normal-case text-sm">save</span>}
            Save All
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined lowercase normal-case text-base">check_circle</span>
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {services.map((service, index) => (
          <div key={service.id} className="glass-panel p-6 rounded-xl border border-outline/10 relative">
            <button 
              onClick={() => removeService(index)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              title="Delete Service"
            >
              <span className="material-symbols-outlined lowercase normal-case text-sm">delete</span>
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-2">Service Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(index, "title", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline/30 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-2">Starting Price ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">$</span>
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) => updateService(index, "price", e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline/30 rounded-lg pl-8 pr-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-2">Description</label>
                <textarea
                  value={service.desc}
                  onChange={(e) => updateService(index, "desc", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline/30 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors min-h-[100px]"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-2">Features (comma separated)</label>
                <input
                  type="text"
                  value={(service.features || []).join(", ")}
                  onChange={(e) => updateService(index, "features", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline/30 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g. Venue Selection, Catering, DJ"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
