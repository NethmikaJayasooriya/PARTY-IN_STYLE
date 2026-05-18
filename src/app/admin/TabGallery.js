"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { optimizeImage } from "@/lib/imageOptimization";

const CATEGORIES = ["Weddings", "Corporate", "Private", "Proposals"];

export default function TabGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ alt: "", cat: "Weddings", aspect: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Check video size limit immediately
    for (let f of files) {
      if (f.type.startsWith('video/') && f.size > 10 * 1024 * 1024) {
        alert(`File ${f.name} is too large. Videos must be strictly under 10MB.`);
        e.target.value = "";
        return;
      }
    }

    setFile(files);
    setPreview(files.length === 1 ? (files[0].type.startsWith('video/') ? "Video Selected" : URL.createObjectURL(files[0])) : `${files.length} files selected`);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || file.length === 0 || !form.alt) return;
    setUploading(true);

    try {
      const uploadPromises = file.map(async (rawFile) => {
        // Optimize images before upload, ignore videos (they pass through)
        const f = rawFile.type.startsWith('image/') ? await optimizeImage(rawFile) : rawFile;

        const isVideo = f.type.startsWith('video/');
        const fileName = `gallery/${Date.now()}_${Math.random().toString(36).substring(7)}_${f.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, f);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "gallery"), {
          src: url,
          storagePath: fileName,
          alt: form.alt,
          cat: form.cat,
          type: isVideo ? "video" : "image",
          aspect: form.aspect || "",
          createdAt: serverTimestamp(),
        });
      });

      await Promise.all(uploadPromises);

      setForm({ alt: "", cat: "Weddings", aspect: "" });
      setFile(null);
      setPreview(null);
      // Reset input
      const fileInput = document.getElementById("gallery-upload");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.alt}"?`)) return;
    try {
      if (item.storagePath) {
        await deleteObject(ref(storage, item.storagePath));
      }
      await deleteDoc(doc(db, "gallery", item.id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-headline-md text-on-surface mb-1">Gallery Manager</h2>
      <p className="text-on-surface-variant/60 text-sm mb-6">Upload and manage gallery photos</p>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="glass-panel p-6 rounded-xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File Upload */}
          <div>
            <label className="block text-xs text-primary uppercase tracking-widest mb-2 font-label-sm">Image</label>
            <label className="flex items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-outline/30 rounded-xl cursor-pointer hover:border-primary/50 transition-colors overflow-hidden">
              {preview ? (
                typeof preview === "string" && preview.includes("files selected") ? (
                  <div className="text-center font-bold text-primary">{preview}</div>
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                )
              ) : (
                <div className="text-center text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                  <p className="text-xs mt-1">Click to select</p>
                </div>
              )}
              <input id="gallery-upload" type="file" accept="image/*,video/*" multiple onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <div>
              <label htmlFor="gallery-alt" className="block text-xs text-primary uppercase tracking-widest mb-1 font-label-sm">Description (Alt Text)</label>
              <input
                id="gallery-alt"
                type="text"
                value={form.alt}
                onChange={(e) => setForm({ ...form, alt: e.target.value })}
                required
                placeholder="E.g. Luxury wedding setup in Melbourne"
                className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-3 py-2.5 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="gallery-cat" className="block text-xs text-primary uppercase tracking-widest mb-1 font-label-sm">Category</label>
                <select
                  id="gallery-cat"
                  value={form.cat}
                  onChange={(e) => setForm({ ...form, cat: e.target.value })}
                  className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-3 py-2.5 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="gallery-aspect" className="block text-xs text-primary uppercase tracking-widest mb-1 font-label-sm">Aspect</label>
                <select
                  id="gallery-aspect"
                  value={form.aspect}
                  onChange={(e) => setForm({ ...form, aspect: e.target.value })}
                  className="w-full bg-surface-container/50 border border-outline/30 rounded-lg px-3 py-2.5 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Standard</option>
                  <option value="tall">Tall</option>
                  <option value="wide">Wide</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="bg-primary text-on-primary-container font-label-sm text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-[0.15em] hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Photo"}
        </button>
      </form>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-4xl">photo_library</span>
          <p className="mt-3 text-sm">No gallery items yet. Upload your first photo above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-outline/20 aspect-square">
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-on-surface text-xs text-center line-clamp-2">{item.alt}</p>
                <span className="text-primary text-[10px] uppercase tracking-wider">{item.cat}</span>
                <button
                  onClick={() => handleDelete(item)}
                  className="mt-1 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
