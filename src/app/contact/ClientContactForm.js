"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ClientContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    eventType: "",
    date: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const { name, email, phone, location, eventType, date, message } = formData;
    
    // Save inquiry to Firestore
    try {
      await addDoc(collection(db, "inquiries"), {
        name: name.trim(),
        contact: `${email.trim()} / ${phone.trim()}`,
        location: location.trim(),
        eventType,
        date,
        message: message || "",
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      // Continue to WhatsApp even if Firestore fails
    }

    const text = `Hello Party in Style! 🎉
I would like to inquire about an event booking.

*Full Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Suburb:* ${location}
*Event Type:* ${eventType}
*Estimated Date:* ${date}
*Brief Details:* ${message || "N/A"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/61494334934?text=${encodedText}`;
    
    // Redirect to WhatsApp
    if (typeof window !== "undefined" && window.gtag) window.gtag("event", "generate_lead", { event_category: "enquiry", event_label: eventType, value: 1 });
    window.open(whatsappUrl, "_blank");

    setIsSending(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      eventType: "",
      date: "",
      message: "",
    });
  };

  return (
    <form className="relative z-10 flex flex-col gap-6" onSubmit={handleSubmit}>
      {[
        { id: "name", label: "Full Name", type: "text" },
        { id: "email", label: "Email Address", type: "email" },
        { id: "phone", label: "Phone Number", type: "tel" },
        { id: "location", label: "Suburb (Melbourne Only)", type: "text" },
        { id: "eventType", label: "Event Type", type: "text" },
      ].map((f) => (
        <div key={f.id} className="relative group">
          <input
            className="w-full bg-white/5 border border-[#C9A24B]/30 rounded-xl focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 text-white font-body-md text-sm py-4 px-4 transition-all duration-300 peer placeholder-transparent"
            id={f.id}
            placeholder={f.label}
            required
            type={f.type}
            value={formData[f.id]}
            onChange={handleChange}
          />
          <label
            className="absolute left-4 top-4 text-[#C8BDA5] font-body-md text-sm transition-all peer-focus:-top-3 peer-focus:left-2 peer-focus:bg-[#0C0805] peer-focus:px-2 peer-focus:text-[11px] peer-focus:text-[#EAD08A] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-[#0C0805] peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-[#C8BDA5] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
            htmlFor={f.id}
          >
            {f.label}
          </label>
        </div>
      ))}

      <div className="relative group">
        <label className="font-body-md text-sm text-[#C8BDA5] mb-2 block ml-1" htmlFor="date">Estimated Date</label>
        <input
          className="w-full bg-white/5 border border-[#C9A24B]/30 rounded-xl focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 text-white font-body-md text-sm py-4 px-4 transition-all duration-300 [color-scheme:dark]"
          id="date"
          required
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="relative group mt-2">
        <textarea
          className="w-full bg-white/5 border border-[#C9A24B]/30 rounded-xl focus:border-[#EAD08A] focus:ring-4 focus:ring-[#C9A24B]/20 focus:bg-white/10 text-white font-body-md text-sm py-4 px-4 transition-all duration-300 resize-none peer placeholder-transparent"
          id="message"
          rows={4}
          placeholder="Brief details about your event..."
          value={formData.message}
          onChange={handleChange}
        />
        <label
          className="absolute left-4 top-4 text-[#C8BDA5] font-body-md text-sm transition-all peer-focus:-top-3 peer-focus:left-2 peer-focus:bg-[#0C0805] peer-focus:px-2 peer-focus:text-[11px] peer-focus:text-[#EAD08A] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-[#0C0805] peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-[#C8BDA5] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
          htmlFor="message"
        >
          Brief details about your event...
        </label>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-4 bg-gradient-to-r from-[#C9A24B] to-[#EAD08A] text-[#140E08] font-label-sm text-[13px] font-bold px-8 py-5 rounded-xl uppercase tracking-[0.2em] hover:brightness-110 hover:shadow-[0_15px_30px_rgba(201,162,75,0.4)] transition-all duration-300 flex justify-center items-center gap-3 w-full disabled:opacity-60 relative overflow-hidden"
      >
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] hover:animate-[sheen_2s_ease-in-out_infinite]" />
        {isSending ? (<><span className="hero-spinner border-[#140E08] border-t-transparent" />CONNECTING...</>) : (<><span className="material-symbols-outlined text-base">send</span>CONTACT US VIA WHATSAPP</>)}
      </button>

      <div className="flex items-center justify-center gap-2 mt-2">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <p className="font-label-sm text-[10.5px] text-[#C8BDA5] font-medium">Instant reply from our styling team.</p>
      </div>
    </form>
  );
}
