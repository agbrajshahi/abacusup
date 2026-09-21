import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    id: 1,
    title: "5 Reasons Every Child Should Learn Abacus",
    excerpt:
      "Discover how Abacus training boosts concentration, memory, and confidence in young learners — far beyond just math.",
    category: "Benefits",
    date: "March 15, 2025",
    readTime: "5 min read",
    color: "from-emerald-400 to-emerald-600",
    featured: true,
  },
  {
    id: 2,
    title: "Small Friends Formula: A Beginner's Guide",
    excerpt:
      "The Small Friends (5-complement) formula is the first big milestone. Here's how to teach it effectively.",
    category: "Tutorial",
    date: "March 10, 2025",
    readTime: "7 min read",
    color: "from-teal-400 to-teal-600",
  },
  {
    id: 3,
    title: "How Long Does It Take to Master Abacus?",
    excerpt:
      "A realistic breakdown of the timeline — from complete beginner to mental math pro.",
    category: "Guide",
    date: "March 5, 2025",
    readTime: "4 min read",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    id: 4,
    title: "Anzan Explained: Mental Math Without the Abacus",
    excerpt:
      "Anzan is the ultimate goal of Abacus training. Here's how students learn to calculate entirely in their minds.",
    category: "Advanced",
    date: "February 28, 2025",
    readTime: "6 min read",
    color: "from-sky-400 to-sky-600",
  },
  {
    id: 5,
    title: "Preparing for Your First Abacus Competition",
    excerpt:
      "Everything you need to know about competition formats, timing, and mental preparation.",
    category: "Competition",
    date: "February 20, 2025",
    readTime: "8 min read",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: 6,
    title: "Daily Practice Routine for Faster Progress",
    excerpt:
      "10 minutes a day is all it takes. Here's a proven routine that actually works.",
    category: "Practice",
    date: "February 15, 2025",
    readTime: "5 min read",
    color: "from-violet-400 to-violet-600",
  },
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

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
                ✍️ Insights & Tips
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Our <span className="text-emerald-600">Blog</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
                Articles, tips, and guides to help your child master Abacus.
              </p>
            </div>
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="pb-12">
            <div className="max-w-6xl mx-auto px-6">
              <Link
                href={`/blog/${featured.id}`}
                className="group grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`relative aspect-[4/3] md:aspect-auto bg-gradient-to-br ${featured.color} flex items-center justify-center`}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(white 1.5px, transparent 1.5px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <span className="relative text-6xl">📚</span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                  <span className="inline-block w-fit px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 mb-3">
                    ★ Featured · {featured.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Grid */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative h-40 bg-gradient-to-br ${post.color} flex items-center justify-center`}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(white 1.5px, transparent 1.5px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <span className="relative text-4xl">📖</span>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-gray-800">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
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