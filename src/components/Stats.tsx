import { Users, GraduationCap, Heart, Trophy } from "lucide-react";

export default function Stats() {
  const stats = [
    { number: "5,000+", label: "Active Students", Icon: Users },
    { number: "10+", label: "Expert Teachers", Icon: GraduationCap },
    { number: "95%", label: "Happy Parents", Icon: Heart },
    { number: "8", label: "Levels", Icon: Trophy },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Floating card */}
        <div className="relative -mt-16 md:-mt-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 rounded-3xl shadow-2xl shadow-emerald-500/30 px-6 md:px-10 py-6 md:py-8">
          <div
            className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2 border border-white/20">
                  <s.Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <p className="text-2xl font-bold">{s.number}</p>
                <p className="text-xs text-emerald-50/90 font-medium mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}