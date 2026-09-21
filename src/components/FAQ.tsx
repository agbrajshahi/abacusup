"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What age should my child start learning Abacus?",
    a: "Children can start as early as 5 years old. Our Foundation level is designed for young beginners. We recommend ages 5–12 for best results.",
  },
  {
    q: "How do online Abacus classes work?",
    a: "All classes are live via video call. Each session is 45–60 minutes, and students get access to our interactive practice tool and quizzes.",
  },
  {
    q: "How much does the course cost?",
    a: "Fees start from ৳1,200 for Level 1. We accept bKash, Nagad, and bank transfer. Full-course enrollment gets a discount.",
  },
  {
    q: "Is the certificate recognized?",
    a: "Yes! After completing each level, students receive a verified AbacusUp certificate — great for your child's portfolio.",
  },
  {
    q: "What if my child misses a class?",
    a: "All live classes are recorded. You can watch them anytime, and we offer free makeup sessions.",
  },
  {
    q: "Do I need to buy a physical Abacus?",
    a: "Not mandatory — our platform has a fully interactive virtual Abacus. But a physical one helps for offline practice.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading — compact */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-semibold text-emerald-600 mb-2 tracking-[0.2em] uppercase">
            FAQ
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
        </div>

        {/* FAQ List — compact */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-lg border transition-colors duration-200 ${
                  isOpen
                    ? "border-emerald-300 bg-emerald-50/40"
                    : "border-gray-200 bg-white hover:border-emerald-200"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isOpen ? "text-emerald-700" : "text-gray-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "bg-emerald-600 text-white rotate-45"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-3 text-xs text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}