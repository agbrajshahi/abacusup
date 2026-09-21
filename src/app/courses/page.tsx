import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All Courses — Level 1 to Level 8",
  description:
    "Explore our 8-level Abacus curriculum. From Foundation to Grand Master — choose the right level for your child.",
};

const levels = [
  { id: 1, price: "৳3,000", duration: "3 months", accent: "#10b981", numColor: "text-emerald-600" },
  { id: 2, price: "৳3,000", duration: "3 months", accent: "#14b8a6", numColor: "text-teal-600" },
  { id: 3, price: "৳3,000", duration: "3 months", accent: "#06b6d4", numColor: "text-cyan-600" },
  { id: 4, price: "৳3,000", duration: "3 months", accent: "#0ea5e9", numColor: "text-sky-600" },
  { id: 5, price: "৳4,000", duration: "3 months", accent: "#6366f1", numColor: "text-indigo-600" },
  { id: 6, price: "৳4,000", duration: "3 months", accent: "#8b5cf6", numColor: "text-violet-600" },
  { id: 7, price: "৳4,000", duration: "3 months", accent: "#d946ef", numColor: "text-fuchsia-600" },
  { id: 8, price: "৳4,000", duration: "3 months", accent: "#f59e0b", numColor: "text-amber-500", featured: true },
];

export default function CoursesPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          {/* Decorative blurred blobs */}
          <div className="blob blob-1 w-72 h-72 bg-emerald-300/30 -top-10 -left-10" />
          <div className="blob blob-2 w-96 h-96 bg-teal-300/20 top-40 -right-20" />
          <div className="blob blob-3 w-80 h-80 bg-cyan-300/20 -bottom-20 left-1/3" />

          <div className="relative max-w-5xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-16 animate-fade-up">
              <p className="text-xs font-semibold text-emerald-600 mb-3 tracking-[0.2em]">
                LEVEL 1 — LEVEL 8
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Our <span className="text-emerald-600">Levels</span>
              </h2>
              <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
                Eight carefully-designed levels, complete syllabus step by step.
              </p>
            </div>

            {/* Levels Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {levels.map((l, index) => (
                <Link
                  key={l.id}
                  href={`/courses/${l.id}`}
                  className="course-card card-enter group relative bg-white/80 rounded-2xl border border-gray-200/80 p-7 flex flex-col items-center justify-center text-center transition-all duration-300"
                  style={
                    {
                      "--accent": l.accent,
                      animationDelay: `${index * 80}ms`,
                    } as React.CSSProperties
                  }
                >
                  {/* Featured badge */}
                  {l.featured && (
                    <span className="badge-float absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-white px-2.5 py-1 rounded-full shadow-md shadow-amber-200">
                      ★ Master
                    </span>
                  )}

                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.25em] mb-4">
                    Level
                  </p>

                  <p className={`level-number text-6xl font-bold leading-none ${l.numColor}`}>
                    {l.id}
                  </p>

                  {/* Divider */}
                  <div className="w-10 h-px bg-gray-200 my-6 transition-all duration-300 group-hover:w-16 group-hover:bg-gray-300" />

                  {/* Footer */}
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="text-gray-500 font-medium">{l.duration}</span>
                    <span className="font-bold text-gray-900">{l.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}