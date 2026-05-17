"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const IMAGE_ZONES = [
  { key: "heroImage", label: "Hero Section Background", desc: "Main homepage hero image (1920×1080 recommended)" },
  { key: "aboutImage", label: "About Section Feature", desc: "About page hero/feature image" },
  { key: "servicesImage", label: "Services Section Card", desc: "Services page background image" },
];

export default function TabContent() {
  const [settings, setSettings] = useState({
    phone: "+61 494 334 934",
    email: "concierge@partyinstyle.com.au",
    facebook: "https://www.facebook.com/share/18SWJEeoe5/",
    instagram: "https://www.instagram.com/partyinstyle111",
    whatsapp: "61494334934",
    heroImage: "",
    aboutImage: "",
    servicesImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "content"));
        if (snap.exists()) {
          setSettings((prev) => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.error("Load settings error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "content"), settings, { merge: true });
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key, file) => {
    if (!file) return;
    setUploadingKey(key);
    try {
      const path = `admin-uploads/${key}_${Date.now()}.${file.name.split(".").pop()}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const updated = { ...settings, [key]: url };
      setSettings(updated);
      await setDoc(doc(db, "settings", "content"), updated, { merge: true });
      setSuccess(`${key} image updated!`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingKey(null);
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
    <div>
      <h2 className="text-xl font-headline-md text-on-surface mb-1">Content Settings</h2>
      <p className="text-on-surface-variant/60 text-sm mb-6">Manage contact info and section images</p>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {success}
        </div>
      )}

      {/* Contact Info */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "phone", label: "Phone", type: "tel" },
            { id: "email", label: "Email", type: "email" },
            { id: "facebook", label: "Facebook URL", type: "url" },
            { id: "instagram", label: "Instagram URL", type: "url" },
            { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={`content-${field.id}`} className="block text-xs text-on-surface-variant/70 mb-1">{field.label}</label>
              <input
                id={`content-${field.id}`}
                type={field.type}
                value={settings[field.id] || ""}
                onChange={(e) => setSettings({ ...settings, [field.id]: e.target.value })}
                className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-3 py-2.5 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-primary text-on-primary-container font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-[0.15em] hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Contact Info"}
        </button>
      </div>

      {/* Image Zones */}
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest mb-4">Section Images</h3>
        <div className="space-y-6">
          {IMAGE_ZONES.map((zone) => (
            <div key={zone.key} className="flex flex-col sm:flex-row gap-4 items-start pb-6 border-b border-outline/10 last:border-0 last:pb-0">
              {/* Preview */}
              <div className="w-full sm:w-40 h-24 rounded-lg overflow-hidden border border-outline/20 bg-surface-container/50 flex-shrink-0">
                {settings[zone.key] ? (
                  <img src={settings[zone.key]} alt={zone.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
                    <span className="material-symbols-outlined text-2xl">image</span>
                  </div>
                )}
              </div>

              {/* Info + Upload */}
              <div className="flex-1">
                <p className="text-on-surface text-sm font-medium">{zone.label}</p>
                <p className="text-on-surface-variant/50 text-xs mt-0.5 mb-3">{zone.desc}</p>
                <label className="inline-flex items-center gap-2 bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-2 cursor-pointer hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-sm text-primary">
                    {uploadingKey === zone.key ? "progress_activity" : "upload"}
                  </span>
                  <span className="text-on-surface text-xs">
                    {uploadingKey === zone.key ? "Uploading..." : "Choose Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingKey === zone.key}
                    onChange={(e) => handleImageUpload(zone.key, e.target.files?.[0])}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
