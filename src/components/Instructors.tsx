import Image from "next/image";
import { Award, Users } from "lucide-react";

const instructors = [
  {
    name: "Somrat Hossain",
    role: "Main Trainer",
    experience: "14 years",
    specialty: "Level 1-10",
    color: "from-emerald-400 to-emerald-600",
    initials: "SH",
    photo:
      "https://res.cloudinary.com/fcghqg0m/image/upload/v1790060437/instructors/Somrat-Hossain.jpg",
  },
  {
    name: "Faiza Khatun",
    role: "Abacus Trainer",
    experience: "6 years",
    specialty: "Foundation & Small Friends",
    students: "950+",
    color: "from-teal-400 to-teal-600",
    initials: "FK",
    photo: "",
  },
  {
    name: "Nusrat Jahan",
    role: "Senior Trainer",
    experience: "9 years",
    specialty: "Mental Math & Competition",
    students: "1300+",
    color: "from-fuchsia-400 to-fuchsia-600",
    initials: "NJ",
    photo: "",
  },
  {
    name: "Rakib Ali",
    role: "Abacus Instructor",
    experience: "5 years",
    specialty: "Foundation & Level 1-4",
    students: "800+",
    color: "from-orange-400 to-orange-600",
    initials: "RA",
    photo:
      "https://res.cloudinary.com/fcghqg0m/image/upload/v1790059415/instructors/Rakib-Ali.png",
  },
  {
    name: "Ayesha Siddiqui",
    role: "Junior Trainer",
    experience: "3 years",
    specialty: "Kids Batch & Practice",
    students: "450+",
    color: "from-pink-400 to-pink-600",
    initials: "AS",
    photo: "",
  },
];

function InstructorCard({
  instructor: t,
}: {
  instructor: (typeof instructors)[number];
}) {
  return (
    <div className="instructor-card group bg-white rounded-2xl border border-gray-100 overflow-hidden w-[260px] sm:w-[280px] shrink-0">
      {/* Top — Avatar area */}
      <div
        className={`relative h-44 sm:h-48 bg-gradient-to-br ${t.color} flex items-center justify-center overflow-hidden`}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/10" />

        {/* Avatar wrapper — with animated rings */}
        <div className="relative">
          {/* Pulsing rings — appear on hover */}
          <span className="avatar-ring-1 absolute inset-0 rounded-full border-2 border-white/60 pointer-events-none" />
          <span className="avatar-ring-2 absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none" />

          {/* Avatar circle — bigger */}
          <div className="avatar-circle relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center shadow-xl overflow-hidden">
            {t.photo ? (
              <Image
                src={t.photo}
                alt={t.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-white tracking-tight">
                {t.initials}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom — Info */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
          {t.name}
        </h3>
        <p className="text-xs text-emerald-600 font-semibold mt-0.5 uppercase tracking-wider">
          {t.role}
        </p>

        <p className="text-sm text-gray-600 mt-3">{t.specialty}</p>

        {/* Stats row */}
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col items-center gap-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-gray-900">{t.experience}</span>
            <span className="text-gray-500">Experience</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-gray-900">
              {t.students || "—"}
            </span>
            <span className="text-gray-500">Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Instructors() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
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
        <div className="text-center mb-12 animate-fade-up">
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
      </div>

      {/* ===== Marquee Slider ===== */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 marquee-track py-4">
          {instructors.map((t, i) => (
            <InstructorCard key={`a-${i}`} instructor={t} />
          ))}
          {instructors.map((t, i) => (
            <InstructorCard key={`b-${i}`} instructor={t} />
          ))}
        </div>
      </div>
    </section>
  );
}