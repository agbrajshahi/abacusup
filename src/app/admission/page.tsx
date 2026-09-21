"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

// ===== FORM COMPONENT =====
function AdmissionForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("course") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: preselected,
    studentAge: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselected) {
      setFormData((prev) => ({ ...prev, courseId: preselected }));
    }
  }, [preselected]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid BD number (e.g. 01712345678)";
    }
    if (!formData.courseId) newErrors.courseId = "Please select a course";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: Connect to backend / Firebase
    setSubmitted(true);
  };

  // ===== SUCCESS SCREEN =====
  if (submitted) {
    const selectedCourse = courses.find(
      (c) => c.id === parseInt(formData.courseId, 10)
    );

    return (
      <section className="py-24 bg-gradient-to-b from-emerald-50 via-white to-white min-h-[60vh] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center animate-fade-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <CheckCircle2
              className="w-10 h-10 text-emerald-600"
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Thank you, {formData.name.split(" ")[0]}! 🎉
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Your admission request has been received. Our team will contact you
            within <strong className="text-emerald-600">24 hours</strong> at{" "}
            <strong className="text-gray-900">{formData.phone}</strong>.
          </p>

          {selectedCourse && (
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-emerald-200 shadow-md">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Selected course</p>
                <p className="text-sm font-bold text-gray-900">
                  {selectedCourse.level} — {selectedCourse.title}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Browse More Courses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ===== FORM SCREEN =====
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-emerald-50/50 via-white to-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </Link>

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
            📝 Admission
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Enroll Your <span className="text-emerald-600">Child</span>
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-xl mx-auto">
            Fill in the form below and our team will contact you within 24 hours.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-emerald-100/40 p-6 sm:p-9"
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Student's Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ayaan Rahman"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.email
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01712345678"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Course + Age */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="courseId"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Select Course *
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                  <select
                    id="courseId"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    className={`w-full appearance-none pl-11 pr-10 py-3 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition cursor-pointer ${
                      errors.courseId
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                    }`}
                  >
                    <option value="">Choose a level...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.level} — {c.title} ({c.price})
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {errors.courseId && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.courseId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="studentAge"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Student's Age
                </label>
                <input
                  id="studentAge"
                  name="studentAge"
                  type="number"
                  min="4"
                  max="99"
                  value={formData.studentAge}
                  onChange={handleChange}
                  placeholder="e.g. 7"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Additional Message{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any questions or special requirements?"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-shine w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to be contacted by our team.
              </p>
            </div>
          </div>
        </form>

        {/* Help note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Need help? Call us at{" "}
          <a
            href="tel:+8801735123463"
            className="text-emerald-600 font-semibold hover:underline"
          >
            +880 1735 123463
          </a>
        </p>
      </div>
    </section>
  );
}

// ===== PAGE WRAPPER (Suspense needed for useSearchParams) =====
export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense
          fallback={
            <div className="py-24 text-center text-gray-500">Loading...</div>
          }
        >
          <AdmissionForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}