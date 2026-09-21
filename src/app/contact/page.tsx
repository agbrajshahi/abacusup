"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white py-16">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#10b981 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
                📬 Get in touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Contact <span className="text-emerald-600">Us</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
                Have a question? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="md:col-span-2 space-y-4">
              {[
                {
                  Icon: Mail,
                  label: "Email",
                  value: "hello@abacusup.com",
                  href: "mailto:hello@abacusup.com",
                },
                {
                  Icon: Phone,
                  label: "Phone",
                  value: "+880 1735 123463",
                  href: "tel:+8801735123463",
                },
                {
                  Icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+880 1735 123463",
                  href: "https://wa.me/8801735123463",
                },
                {
                  Icon: MapPin,
                  label: "Location",
                  value: "Dhaka, Bangladesh",
                  href: null,
                },
              ].map((item, i) => {
                const inner = (
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <item.Icon
                        className="w-5 h-5 text-emerald-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              })}
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-emerald-100/40 p-6 sm:p-8"
              >
                {submitted && (
                  <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-up">
                    <CheckCircle2 className="w-4 h-4" />
                    Thanks! We'll get back to you soon.
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ayaan Rahman"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                        errors.name
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                        errors.email
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition resize-none ${
                        errors.message
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-shine w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}