"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function TabFormOptions() {
  const [themes, setThemes] = useState({
    birthday: ["Premium Gold", "Midnight Black", "Rose Gold Elegance", "Tropical Luxe"],
    party: ["Neon Night", "Classic Elegance", "Festival Luxe", "Custom Theme"]
  });
  const [newTheme, setNewTheme] = useState({ birthday: "", party: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "content"));
        if (snap.exists() && snap.data().eventThemesNew) {
          setThemes(snap.data().eventThemesNew);
        } else if (snap.exists() && snap.data().eventThemes) {
          // Migration from old single array
          setThemes({
             birthday: snap.data().eventThemes,
             party: ["Neon Night", "Classic Elegance", "Festival Luxe", "Custom Theme"]
          });
        }
      } catch (err) {
        console.error("Load themes error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadThemes();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "content"), { eventThemesNew: themes }, { merge: true });
      setSuccess("Form themes saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addTheme = (type) => {
    const val = newTheme[type].trim();
    if (val && !themes[type].includes(val)) {
      setThemes({ ...themes, [type]: [...themes[type], val] });
      setNewTheme({ ...newTheme, [type]: "" });
    }
  };

  const removeTheme = (type, indexToRemove) => {
    setThemes({
      ...themes,
      [type]: themes[type].filter((_, index) => index !== indexToRemove)
    });
  };

  if (loading) return <div className="text-on-surface-variant/50 text-sm">Loading form options...</div>;

  const renderThemeList = (type, label) => (
    <div className="glass-panel p-6 rounded-xl border border-outline/10 space-y-6">
      <div>
        <h3 className="font-headline-md text-lg text-on-surface mb-4">{label}</h3>
        <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-3">Add New Theme</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={newTheme[type]}
            onChange={(e) => setNewTheme({ ...newTheme, [type]: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && addTheme(type)}
            className="flex-1 bg-surface-container-lowest border border-outline/30 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
            placeholder={`e.g. ${type === 'birthday' ? 'Vintage Glamour' : 'Disco Fever'}`}
          />
          <button
            onClick={() => addTheme(type)}
            disabled={!newTheme[type].trim()}
            className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-lg hover:bg-primary hover:text-on-primary-container transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-label-sm text-primary uppercase tracking-widest mb-3">Current {label}</label>
        {themes[type].length === 0 ? (
          <p className="text-sm text-on-surface-variant/50 italic">No themes added. The form will use default categories.</p>
        ) : (
          <ul className="space-y-3">
            {themes[type].map((theme, index) => (
              <li key={index} className="flex justify-between items-center bg-surface-container/50 px-4 py-3 rounded-lg border border-outline/10">
                <span className="text-sm text-on-surface">{theme}</span>
                <button 
                  onClick={() => removeTheme(type, index)}
                  className="text-red-400/70 hover:text-red-400 p-1 transition-colors"
                  title="Remove Theme"
                >
                  <span className="material-symbols-outlined lowercase normal-case text-lg">delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display-xl text-on-surface">Form Options</h2>
          <p className="text-sm text-on-surface-variant/70 mt-1">Manage the event themes available in the booking form.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary-container font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? <span className="material-symbols-outlined lowercase normal-case text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined lowercase normal-case text-sm">save</span>}
          Save Themes
        </button>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined lowercase normal-case text-base">check_circle</span>
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {renderThemeList("birthday", "Kids Birthday Themes")}
        {renderThemeList("party", "Themed Party Themes")}
      </div>
    </div>
  );
}
