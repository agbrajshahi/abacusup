import Link from "next/link";
import { ArrowLeft, Trophy, Medal, Award, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topStudents = [
  { rank: 1, name: "Ayaan Rahman", level: "Level 8", score: "9,850", initials: "AR", color: "from-amber-400 to-amber-600" },
  { rank: 2, name: "Priya Das", level: "Level 8", score: "9,420", initials: "PD", color: "from-slate-300 to-slate-500" },
  { rank: 3, name: "Rahul Roy", level: "Level 7", score: "9,100", initials: "RR", color: "from-orange-400 to-orange-600" },
];

const otherStudents = [
  { rank: 4, name: "Sneha Ahmed", level: "Level 7", score: "8,750" },
  { rank: 5, name: "Tanvir Hasan", level: "Level 7", score: "8,520" },
  { rank: 6, name: "Nusrat Jahan", level: "Level 6", score: "8,200" },
  { rank: 7, name: "Arif Khan", level: "Level 6", score: "7,980" },
  { rank: 8, name: "Fatima Noor", level: "Level 6", score: "7,650" },
  { rank: 9, name: "Samir Islam", level: "Level 5", score: "7,300" },
  { rank: 10, name: "Ayesha Siddiqui", level: "Level 5", score: "7,050" },
];

export default function LeaderboardPage() {
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
                🏆 Top Performers
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                <span className="text-emerald-600">Leaderboard</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
                Our top-performing students this month.
              </p>
            </div>
          </div>
        </section>

        {/* Podium */}
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-5 items-end">
              {/* 2nd */}
              <div className="order-1">
                <PodiumCard student={topStudents[1]} height="h-48 sm:h-56" />
              </div>
              {/* 1st */}
              <div className="order-2">
                <PodiumCard student={topStudents[0]} height="h-56 sm:h-64" isFirst />
              </div>
              {/* 3rd */}
              <div className="order-3">
                <PodiumCard student={topStudents[2]} height="h-40 sm:h-48" />
              </div>
            </div>
          </div>
        </section>

        {/* List */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg">
              {otherStudents.map((s, i) => (
                <div
                  key={s.rank}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-emerald-50/40 transition-colors ${
                    i !== otherStudents.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <span className="w-8 text-center font-bold text-gray-400 text-sm">
                    {s.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    {s.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {s.name}
                    </p>
                    <p className="text-xs text-gray-500">{s.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      {s.score}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                      pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PodiumCard({
  student,
  height,
  isFirst = false,
}: {
  student: (typeof topStudents)[number];
  height: string;
  isFirst?: boolean;
}) {
  const RankIcon = student.rank === 1 ? Trophy : student.rank === 2 ? Medal : Award;

  return (
    <div className="flex flex-col items-center">
      {/* Crown / medal */}
      <div
        className={`mb-3 flex items-center justify-center rounded-full shadow-lg ${
          isFirst ? "w-14 h-14" : "w-11 h-11"
        } ${
          student.rank === 1
            ? "bg-amber-100 text-amber-600"
            : student.rank === 2
            ? "bg-slate-100 text-slate-500"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        <RankIcon
          className={isFirst ? "w-7 h-7" : "w-5 h-5"}
          strokeWidth={2.2}
        />
      </div>

      {/* Avatar */}
      <div
        className={`rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center text-white font-bold border-4 border-white shadow-xl ${
          isFirst ? "w-20 h-20 text-2xl" : "w-16 h-16 text-lg"
        }`}
      >
        {student.initials}
      </div>

      {/* Name */}
      <p
        className={`mt-3 text-center font-bold text-gray-900 ${
          isFirst ? "text-base" : "text-sm"
        }`}
      >
        {student.name}
      </p>
      <p className="text-xs text-gray-500">{student.level}</p>

      {/* Podium base */}
      <div
        className={`w-full mt-3 rounded-t-xl bg-gradient-to-b ${student.color} flex items-center justify-center ${height}`}
      >
        <div className="text-center text-white">
          <p className={`font-bold ${isFirst ? "text-2xl" : "text-lg"}`}>
            {student.score}
          </p>
          <p className="text-[10px] uppercase tracking-wider opacity-80">
            points
          </p>
          <p className="text-xs font-bold mt-1 opacity-90">#{student.rank}</p>
        </div>
      </div>
    </div>
  );
}