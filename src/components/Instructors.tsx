import { Award, Users } from "lucide-react";

const instructors = [
  {
    name: "Rahul Sharma",
    role: "Senior Abacus Instructor",
    experience: "8 years",
    specialty: "Mental Math & Level 5-8",
    students: "1200+",
    color: "from-emerald-400 to-emerald-600",
    initials: "RS",
  },
  {
    name: "Priya Das",
    role: "Abacus Trainer",
    experience: "6 years",
    specialty: "Foundation & Small Friends",
    students: "950+",
    color: "from-teal-400 to-teal-600",
    initials: "PD",
  },
  {
    name: "Arjun Roy",
    role: "Grand Master Trainer",
    experience: "10 years",
    specialty: "Multiplication & Division",
    students: "1500+",
    color: "from-cyan-400 to-cyan-600",
    initials: "AR",
  },
  {
    name: "Sneha Ahmed",
    role: "Junior Instructor",
    experience: "4 years",
    specialty: "Kids Foundation",
    students: "600+",
    color: "from-blue-400 to-blue-600",
    initials: "SA",
  },
];

export default function Instructors() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-xs font-semibold text-emerald-600 mb-3 tracking-[0.2em] uppercase">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Meet Our <span className="text-emerald-600">Instructors</span>
          </h2>
          <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto">
            Experienced teachers dedicated to your child's success.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((t, i) => (
            <div
              key={t.name}
              className="instructor-card group bg-white rounded-2xl border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Top — Avatar area */}
              <div
                className={`relative h-40 bg-gradient-to-br ${t.color} flex items-center justify-center overflow-hidden`}
              >
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/10" />

                {/* Avatar circle — with avatar-circle class for hover scale */}
                <div className="avatar-circle relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {t.initials}
                  </span>
                </div>
              </div>

              {/* Bottom — Info */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5 uppercase tracking-wider">
                  {t.role}
                </p>

                <p className="text-sm text-gray-600 mt-3">{t.specialty}</p>

                {/* Stats row */}
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-gray-900">
                      {t.experience}
                    </span>
                    <span className="text-gray-500">Experience</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-gray-900">
                      {t.students}
                    </span>
                    <span className="text-gray-500">Students</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}