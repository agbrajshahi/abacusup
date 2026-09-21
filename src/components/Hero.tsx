import Link from "next/link";
import VirtualAbacus from "./VirtualAbacus";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT — shifted further left with less padding */}
        <div className="animate-fade-up md:pl-2 lg:pl-4">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
            🇧🇩 Bangladesh's #1 Online Abacus Platform
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900 tracking-tight">
            Master Mental Math <br />
            with <span className="text-emerald-600">Abacus</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
            An interactive online platform that boosts your child's mental
            math power. Live classes, practice tools, and quizzes — all from
            home.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="btn-shine animate-pulse-glow px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-200"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-600 hover:text-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              View Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8 text-sm">
            <div className="animate-fade-up delay-100">
              <p className="text-2xl font-bold text-gray-900">5000+</p>
              <p className="text-gray-500">Students</p>
            </div>
            <div className="animate-fade-up delay-200">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-gray-500">Levels</p>
            </div>
            <div className="animate-fade-up delay-300">
              <p className="text-2xl font-bold text-gray-900">4.9★</p>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Interactive Abacus */}
        <div className="relative animate-fade-up delay-200">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-2xl shadow-emerald-500/30 overflow-hidden">
            <VirtualAbacus />
          </div>

          {/* Floating practice card */}
          <div
            className="animate-float absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3"
            style={{ animationDelay: "1s" }}
          >
            <p className="text-xs text-gray-500">Today's practice</p>
            <p className="text-lg font-bold text-emerald-600">128 done ✅</p>
          </div>

          {/* Small hint */}
          <p className="absolute top-4 right-4 text-xs text-white/70 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
            👆 Try it yourself
          </p>
        </div>
      </div>
    </section>
  );
}