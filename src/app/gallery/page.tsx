import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const galleryItems = [
  { id: 1, title: "Class Session", tag: "Live Class", color: "from-emerald-400 to-emerald-600" },
  { id: 2, title: "Award Ceremony", tag: "Event", color: "from-teal-400 to-teal-600" },
  { id: 3, title: "Practice Time", tag: "Practice", color: "from-cyan-400 to-cyan-600" },
  { id: 4, title: "Competition Day", tag: "Competition", color: "from-sky-400 to-sky-600" },
  { id: 5, title: "Team Meetup", tag: "Team", color: "from-indigo-400 to-indigo-600" },
  { id: 6, title: "Certificate Distribution", tag: "Event", color: "from-violet-400 to-violet-600" },
  { id: 7, title: "Workshop", tag: "Workshop", color: "from-fuchsia-400 to-fuchsia-600" },
  { id: 8, title: "Annual Meetup", tag: "Event", color: "from-amber-400 to-amber-600" },
];

export default function GalleryPage() {
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
                📸 Moments
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Our <span className="text-emerald-600">Gallery</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
                Snapshots from our classes, events, and competitions.
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color}`}
                  />

                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(white 1.5px, transparent 1.5px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon
                      className="w-10 h-10 text-white/40"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/80">
                      {item.tag}
                    </span>
                    <p className="text-sm font-bold text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
              More photos coming soon — follow us on social media to stay
              updated.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}