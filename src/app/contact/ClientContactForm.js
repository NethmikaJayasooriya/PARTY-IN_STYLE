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
    <form className="flex flex-col gap-7 relative z-10" onSubmit={handleSubmit}>
      {[
        { id: "name", label: "Full Name", type: "text" },
        { id: "email", label: "Email Address", type: "email" },
        { id: "phone", label: "Phone Number", type: "tel" },
        { id: "location", label: "Suburb (Melbourne Only)", type: "text" },
        { id: "eventType", label: "Event Type", type: "text" },
      ].map((f) => (
        <div key={f.id} className="relative group">
          <input
            className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors peer placeholder-transparent"
            id={f.id}
            placeholder={f.label}
            required
            type={f.type}
            value={formData[f.id]}
            onChange={handleChange}
          />
          <label
            className="absolute left-0 top-3 text-on-surface-variant/60 font-body-md text-sm transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
            htmlFor={f.id}
          >
            {f.label}
          </label>
        </div>
      ))}
      <div className="relative group">
        <input
          className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors [color-scheme:dark]"
          id="date"
          required
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label className="absolute left-0 -top-4 text-[11px] text-on-surface-variant/60 uppercase tracking-widest pointer-events-none" htmlFor="date">
          Estimated Date
        </label>
      </div>
      <div className="relative group">
        <textarea
          className="w-full bg-transparent border-0 border-b border-outline/40 focus:border-primary focus:outline-none text-on-surface font-body-md text-sm py-3 px-0 transition-colors resize-none peer placeholder-transparent"
          id="message"
          placeholder="Tell us about your vision"
          rows="3"
          value={formData.message}
          onChange={handleChange}
        />
        <label
          className="absolute left-0 top-3 text-on-surface-variant/60 font-body-md text-sm transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest pointer-events-none"
          htmlFor="message"
        >
          Tell Us About Your Vision
        </label>
      </div>
      <button
        className="mt-2 bg-primary text-on-primary-container font-label-sm text-xs font-bold px-8 py-4 rounded-sm uppercase tracking-[0.2em] metallic-sheen hover:bg-primary-light transition-colors flex justify-center items-center gap-3 w-full disabled:opacity-60"
        type="submit"
        disabled={isSending}
      >
        {isSending ? (
          <>
            <span className="hero-spinner" />
            Sending...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">send</span>
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
