"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
      {/* Animated dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none animate-dot-pulse"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl animate-blob" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-200/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
          {/* LEFT: Heading + Text */}
          <div className="flex-1 text-center lg:text-left text-white min-w-0">
            <h2 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
              <span className="animate-gradient-text">Stay Updated</span>
            </h2>
            <p className="mt-1 text-emerald-50/90 text-xs sm:text-sm animate-fade-up delay-100">
              Course updates, tips, and exclusive offers — straight to your inbox.
            </p>
          </div>

          {/* MIDDLE: Form inline */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2 w-full lg:w-auto sm:min-w-[380px] animate-fade-up delay-200"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/20 transition-all duration-300 text-sm"
            />
            <button
              type="submit"
              className="btn-shine group inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-white text-emerald-700 font-semibold hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap text-sm"
            >
              Subscribe
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </form>

          {/* RIGHT: Success / Footer note */}
          <div className="flex-shrink-0 text-center lg:text-right animate-fade-up delay-300">
            {submitted ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] text-white animate-success-pop shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                <span className="font-medium">Thanks!</span>
              </div>
            ) : (
              <p className="text-[10px] text-emerald-50/70 tracking-wider uppercase whitespace-nowrap">
                No spam
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}