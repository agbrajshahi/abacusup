"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Your WhatsApp number — Bangladesh country code (880) + number without leading 0
  const phoneNumber = "8801735123463";
  const message = "Hi! I want to know more about AbacusUp courses.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 px-4 py-3 max-w-[240px] mb-1 animate-fade-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-semibold text-gray-900">
            👋 Need help?
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Chat with us on WhatsApp — we usually reply in 5 minutes!
          </p>
        </div>
      )}

      {/* Button */}
      <div className="relative">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onClick={() => setShowTooltip(false)}
          aria-label="Chat on WhatsApp"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <MessageCircle
            className="w-7 h-7 text-white"
            strokeWidth={2.2}
            fill="white"
            fillOpacity={0.15}
          />
        </a>
      </div>
    </div>
  );
}