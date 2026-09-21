import { UserPlus, Target, MonitorPlay, Award } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Sign Up",
    desc: "Create your free account in just 30 seconds.",
    Icon: UserPlus,
  },
  {
    num: "02",
    title: "Choose a Level",
    desc: "Pick the right level based on your child's age and skill.",
    Icon: Target,
  },
  {
    num: "03",
    title: "Join Live Class",
    desc: "Learn directly from experienced instructors online.",
    Icon: MonitorPlay,
  },
  {
    num: "04",
    title: "Practice & Get Certified",
    desc: "Practice with our interactive tool and earn your certificate.",
    Icon: Award,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-xs font-semibold text-emerald-600 mb-3 tracking-[0.2em] uppercase">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto">
            Start learning in just 4 easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

          {steps.map((s, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative z-10 w-24 h-24 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:border-emerald-500 group-hover:shadow-emerald-200 group-hover:scale-110 transition-all duration-300">
                <s.Icon
                  className="w-9 h-9 text-emerald-600"
                  strokeWidth={1.8}
                />
                <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {s.num}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-[220px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}