"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";

const faqs = [
  {
    q: "What age should my child start learning Abacus?",
    a: "Children can start as early as 5 years old. We recommend ages 5–12 for best results.",
  },
  {
    q: "How do online Abacus classes work?",
    a: "All classes are live via video call. Each session is 45–60 minutes, with access to our interactive practice tool and quizzes.",
  },
  {
    q: "How much does the course cost?",
    a: "Fees start from ৳3,000 for Level 1. We accept bKash, Nagad, and bank transfer.",
  },
  {
    q: "Is the certificate recognized?",
    a: "Yes! After completing each level, students receive a verified AbacusUp certificate.",
  },
  {
    q: "What if my child misses a class?",
    a: "All live classes are recorded, and we offer free makeup sessions.",
  },
];

const testimonials = [
  {
    name: "Mrs. Rahima",
    role: "Parent",
    text: "আমার ছেলের মানসিক গণনা অনেক বেড়েছে। শিক্ষকরা অসাধারণ!",
    initials: "MR",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Tanvir Ahmed",
    role: "Student",
    text: "The interactive abacus tool is amazing. Practice করা এখন মজার!",
    initials: "TA",
    color: "from-teal-400 to-teal-600",
  },
  {
    name: "Nusrat Jahan",
    role: "Parent",
    text: "ঘরে বসেই ক্লাস করা যায়, খুব সুবিধাজনক।",
    initials: "NJ",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    name: "Arif Khan",
    role: "Student",
    text: "Level 5 শেষ করেছি। এখন অ্যাবাকাস ছাড়াই হিসাব করতে পারি!",
    initials: "AK",
    color: "from-blue-400 to-blue-600",
  },
];

export default function FAQTestimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ===== LEFT: FAQ ===== */}
          <div>
            {/* Heading */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-emerald-600 mb-2 tracking-[0.2em] uppercase">
                FAQ
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Frequently Asked{" "}
                <span className="text-emerald-600">Questions</span>
              </h2>
              <p className="mt-1.5 text-xs text-gray-500">
                Everything you need to know before getting started.
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-1.5">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-emerald-300 bg-emerald-50/60 shadow-sm shadow-emerald-100"
                        : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left"
                    >
                      <span
                        className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                          isOpen
                            ? "bg-emerald-600 text-white scale-110"
                            : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`flex-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          isOpen ? "text-emerald-700" : "text-gray-800"
                        }`}
                      >
                        {faq.q}
                      </span>

                      <span
                        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-emerald-600 text-white rotate-45 shadow-md shadow-emerald-200"
                            : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                        }`}
                      >
                        <Plus className="w-3 h-3" strokeWidth={2.8} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-12 pr-4 pb-3 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== RIGHT: Testimonials ===== */}
          <div>
            {/* Heading */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-emerald-600 mb-2 tracking-[0.2em] uppercase">
                Testimonials
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                What Our{" "}
                <span className="text-emerald-600">Students Say</span>
              </h2>
              <p className="mt-1.5 text-xs text-gray-500">
                Real stories from parents and students.
              </p>
            </div>

            {/* Testimonials List */}
            <div className="space-y-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-3.5 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}
                    >
                      {t.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Stars + name inline */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, s) => (
                            <Star
                              key={s}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-[11px] font-bold text-gray-900">
                          {t.name}
                        </p>
                      </div>

                      {/* Text */}
                      <p className="mt-1.5 text-[11px] sm:text-xs text-gray-600 italic leading-relaxed">
                        "{t.text}"
                      </p>

                      {/* Role */}
                      <p className="mt-1 text-[10px] text-gray-400 uppercase tracking-wider">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}