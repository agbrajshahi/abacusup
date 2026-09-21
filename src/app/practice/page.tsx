import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Target, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VirtualAbacus from "@/components/VirtualAbacus";

export const metadata: Metadata = {
  title: "Practice Abacus Online — Free",
  description:
    "Practice Abacus online with our interactive virtual Abacus. Free, no signup needed.",
};

export default function PracticePage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white py-14 md:py-16">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#10b981 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
                🧮 Interactive Practice
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Practice <span className="text-emerald-600">Abacus</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Move the beads, learn the formulas, and master mental math — all
                in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Big Abacus */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="rounded-3xl shadow-2xl shadow-emerald-500/20 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
              }}
            >
              <div className="aspect-[16/10] sm:aspect-[16/9]">
                <VirtualAbacus />
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              How to <span className="text-emerald-600">use it</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  Icon: Sparkles,
                  title: "Tap the beads",
                  desc: "Click the upper bead for +5, and each lower bead for +1.",
                },
                {
                  Icon: Target,
                  title: "Watch the value",
                  desc: "The current number updates in real time as you move beads.",
                },
                {
                  Icon: Clock,
                  title: "Practice daily",
                  desc: "5–10 minutes a day builds strong mental math skills fast.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                    <item.Icon
                      className="w-5 h-5 text-emerald-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Ready to learn with a teacher?
            </h2>
            <p className="mt-3 text-gray-600">
              Join a live class and take your skills to the next level.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
              >
                View Courses
              </Link>
              <Link
                href="/admission"
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}