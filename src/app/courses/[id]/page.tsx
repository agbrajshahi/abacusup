import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Tag,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, getCourseById } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id.toString() }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourseById(parseInt(id, 10));

  if (!course) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section
          className="relative overflow-hidden py-16 md:py-20"
          style={{
            background: `linear-gradient(135deg, ${course.accent}15 0%, #ffffff 60%, ${course.accent}08 100%)`,
          }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${course.accent} 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6">
            {/* Back */}
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All courses
            </Link>

            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* LEFT */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                    style={{
                      background: `${course.accent}15`,
                      color: course.accent,
                    }}
                  >
                    {course.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {course.title}
                </h1>

                <p className="mt-3 text-lg text-gray-600">{course.tagline}</p>

                <p className="mt-6 text-gray-700 leading-relaxed">
                  {course.description}
                </p>

                {/* Meta row */}
                <div className="mt-8 flex flex-wrap gap-5 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Certificate included</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Live classes</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Enroll card */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-emerald-100/40 p-6 sticky top-24">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Course fee
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">
                    {course.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    for {course.duration}
                  </p>

                  <Link
                    href={`/admission?course=${course.id}`}
                    className="btn-shine mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-gray-500 text-center mt-3">
                    💰 bKash / Nagad / Bank accepted
                  </p>

                  {/* Features list */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">
                      What's included
                    </p>
                    <ul className="space-y-2.5">
                      {course.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT YOU'LL LEARN ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              What you'll <span className="text-emerald-600">learn</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {course.whatYouLearn.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== REQUIREMENTS ===== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Requirements
            </h2>
            <ul className="space-y-3">
              {course.requirements.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full mt-2.5"
                    style={{ background: course.accent }}
                  />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== OTHER COURSES ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Explore <span className="text-emerald-600">other levels</span>
              </h2>
              <Link
                href="/courses"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {courses
                .filter((c) => c.id !== course.id)
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.id}`}
                    className={`group ${c.cardBg} ${c.hoverBg} rounded-2xl border-2 p-5 flex flex-col transition-all duration-300`}
                    style={{ "--accent": c.accent } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                        {c.level}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${c.tagColor}`}
                      >
                        {c.tag}
                      </span>
                    </div>
                    <h3
                      className={`text-lg font-bold tracking-tight ${c.numColor}`}
                    >
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3 flex-1">
                      {c.tagline}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-200/60">
                      <span className="text-gray-600">{c.duration}</span>
                      <span className="font-bold text-gray-900">
                        {c.price}
                      </span>
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