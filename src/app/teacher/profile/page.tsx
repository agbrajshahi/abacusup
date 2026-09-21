import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Star,
  Edit3,
} from "lucide-react";

const teacher = {
  name: "Rahul Sharma",
  role: "Senior Abacus Instructor",
  email: "rahul.sharma@abacusup.com",
  phone: "01712345678",
  location: "Dhaka, Bangladesh",
  joinDate: "March 2022",
  initials: "RS",
  bio: "Passionate Abacus instructor with 8+ years of experience teaching mental math to children. Specialized in Small Friends and Big Friends formulas, and competition-level training.",
  stats: [
    { label: "Students", value: "1500+", Icon: Users },
    { label: "Experience", value: "8 years", Icon: Award },
    { label: "Classes", value: "2400+", Icon: BookOpen },
    { label: "Rating", value: "4.9★", Icon: Star },
  ],
  specialties: [
    "Small Friends Formula",
    "Big Friends Formula",
    "Mental Math (Anzan)",
    "Competition Training",
    "Multiplication & Division",
  ],
  certifications: [
    { id: 1, name: "Certified Soroban Instructor — Level 3", org: "World Abacus Federation", year: "2020" },
    { id: 2, name: "Advanced Mental Math Trainer", org: "AbacusUp Academy", year: "2022" },
  ],
};

export default function TeacherProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Your teaching profile information
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shrink-0">
              {teacher.initials}
            </div>

            <div className="text-center sm:text-left text-white flex-1">
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-sm text-blue-50/90 mt-1">{teacher.role}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-blue-50/90 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {teacher.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {teacher.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {teacher.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {teacher.stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-2">
              <s.Icon className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-[11px] text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          About
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{teacher.bio}</p>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Specialties
        </h3>
        <div className="flex flex-wrap gap-2">
          {teacher.specialties.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          Certifications
        </h3>
        <div className="space-y-3">
          {teacher.certifications.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {c.org} · {c.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}