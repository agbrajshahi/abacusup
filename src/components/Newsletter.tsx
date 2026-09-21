"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to real API / Firebase
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 mb-5">
          <Mail className="w-6 h-6 text-white" strokeWidth={2} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
          Stay Updated
        </h2>
        <p className="mt-3 text-emerald-50/90 text-base max-w-md mx-auto">
          Get course updates, tips, and exclusive offers — straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
          <button
            type="submit"
            className="btn-shine px-7 py-3 rounded-full bg-white text-emerald-700 font-semibold hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {/* Success message */}
        {submitted && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sm animate-fade-up">
            <CheckCircle2 className="w-4 h-4" />
            Thanks for subscribing!
          </div>
        )}

        <p className="mt-4 text-xs text-emerald-50/70">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}