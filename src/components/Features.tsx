import {
  Video,
  Calculator,
  BarChart3,
  Award,
  Smartphone,
  Wallet,
} from "lucide-react";

const features = [
  {
    Icon: Video,
    title: "Live Classes",
    desc: "Direct online classes with experienced instructors.",
  },
  {
    Icon: Calculator,
    title: "Interactive Abacus",
    desc: "Drag the beads and see real-time results.",
  },
  {
    Icon: BarChart3,
    title: "Progress Tracking",
    desc: "Track daily progress on your dashboard.",
  },
  {
    Icon: Award,
    title: "Quiz & Certificate",
    desc: "Complete levels and earn certificates.",
  },
  {
    Icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Use on mobile, tablet, or desktop.",
  },
  {
    Icon: Wallet,
    title: "Affordable",
    desc: "Low fees with easy bKash/Nagad payment.",
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why <span className="text-emerald-600">AbacusUp</span>?
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Everything you get on our platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 hover:shadow-sm transition-all duration-300"
            >
              {/* Icon */}
              <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
                <f.Icon
                  className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-300"
                  strokeWidth={2}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}