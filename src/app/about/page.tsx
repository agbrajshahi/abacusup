import Link from "next/link";
import { ArrowLeft, Target, Heart, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white py-16 md:py-20">
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
                🌱 Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                About <span className="text-emerald-600">AbacusUp</span>
              </h1>
              <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                We're on a mission to make mental math a superpower for every child in Bangladesh — one bead at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 prose prose-emerald">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AbacusUp was founded with a simple belief: every child can learn to calculate faster than a calculator — with the right guidance and the right tools.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Traditional Abacus classes are often expensive, inconvenient, or limited to a few cities. We built AbacusUp to change that. Our platform brings live classes, an interactive virtual Abacus, and structured levels directly to your home — anywhere in Bangladesh.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, thousands of students use AbacusUp to build confidence, focus, and speed in mathematics. And we're just getting started.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              What we <span className="text-emerald-600">believe</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  Icon: Target,
                  title: "Focus",
                  desc: "Abacus trains the mind to concentrate deeply.",
                },
                {
                  Icon: Heart,
                  title: "Confidence",
                  desc: "Fast calculation builds lifelong self-belief.",
                },
                {
                  Icon: Users,
                  title: "Community",
                  desc: "Students learn together, grow together.",
                },
                {
                  Icon: Award,
                  title: "Excellence",
                  desc: "Every level ends with a certificate of mastery.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                    <item.Icon
                      className="w-6 h-6 text-emerald-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: "5,000+", label: "Active Students" },
                { number: "10+", label: "Expert Teachers" },
                { number: "8", label: "Levels" },
                { number: "95%", label: "Happy Parents" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-bold text-emerald-600">
                    {s.number}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to start?
            </h2>
            <p className="mt-3 text-emerald-50/90">
              Join thousands of students already mastering mental math.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-xl bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View Courses
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}