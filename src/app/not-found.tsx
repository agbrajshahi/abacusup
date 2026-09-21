import Link from "next/link";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-emerald-50 via-white to-white relative overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="relative max-w-xl w-full text-center">
        {/* 404 big number */}
        <div className="relative">
          <p className="text-[120px] sm:text-[160px] font-black leading-none tracking-tight bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            404
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-2xl shadow-emerald-200/60 flex items-center justify-center text-4xl sm:text-5xl">
            🧮
          </div>
        </div>

        {/* Text */}
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
          Looks like this page is counting on a different abacus. The page
          you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4" />
            View Courses
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
            Or try these
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/practice"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Practice
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Contact
            </Link>
            <Link
              href="/admission"
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}