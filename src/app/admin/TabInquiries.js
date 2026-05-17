"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function TabInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error("Inquiries error:", err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await deleteDoc(doc(db, "inquiries", id));
  };

  const filtered = inquiries.filter((inq) =>
    [inq.name, inq.contact, inq.eventType, inq.location, inq.message]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (ts) => {
    if (!ts) return "—";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("en-AU", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-headline-md text-on-surface">Inquiries</h2>
          <p className="text-on-surface-variant/60 text-sm mt-1">
            {inquiries.length} total lead{inquiries.length !== 1 ? "s" : ""}
          </p>
        </div>
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-surface-container/50 border border-outline/30 rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-primary focus:outline-none transition-colors w-full sm:w-64"
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
          <p className="mt-3 text-sm">Loading inquiries...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-4xl">inbox</span>
          <p className="mt-3 text-sm">{search ? "No matching results" : "No inquiries yet"}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container/60 border-b border-outline/20">
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest">Name</th>
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest">Contact</th>
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest hidden md:table-cell">Event</th>
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest hidden xl:table-cell">Message</th>
                <th className="text-left px-4 py-3 text-primary font-label-sm text-[10px] uppercase tracking-widest">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq.id} className="border-b border-outline/10 hover:bg-surface-container/30 transition-colors">
                  <td className="px-4 py-3.5 text-on-surface font-medium">{inq.name || "—"}</td>
                  <td className="px-4 py-3.5 text-on-surface-variant">{inq.contact || "—"}</td>
                  <td className="px-4 py-3.5 text-on-surface-variant hidden md:table-cell">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{inq.eventType || "—"}</span>
                  </td>
                  <td className="px-4 py-3.5 text-on-surface-variant hidden lg:table-cell">{inq.location || "—"}</td>
                  <td className="px-4 py-3.5 text-on-surface-variant hidden xl:table-cell max-w-[200px] truncate">{inq.message || "—"}</td>
                  <td className="px-4 py-3.5 text-on-surface-variant/60 text-xs whitespace-nowrap">{formatDate(inq.timestamp)}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => handleDelete(inq.id)} className="text-red-400/60 hover:text-red-400 transition-colors" aria-label="Delete inquiry">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
