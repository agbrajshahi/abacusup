import Link from "next/link";
import {
  Users,
  Calendar,
  ClipboardList,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "48",
    sub: "+3 this month",
    Icon: Users,
    color: "blue",
  },
  {
    label: "Classes Today",
    value: "3",
    sub: "Next: 6:00 PM",
    Icon: Calendar,
    color: "emerald",
  },
  {
    label: "Pending Reviews",
    value: "12",
    sub: "Assignments",
    Icon: FileText,
    color: "amber",
  },
  {
    label: "Attendance Rate",
    value: "92%",
    sub: "This week",
    Icon: TrendingUp,
    color: "violet",
  },
];

const todayClasses = [
  {
    id: 1,
    level: "Level 3",
    title: "Small Friends Formula",
    time: "6:00 PM",
    duration: "60 min",
    students: 12,
    status: "upcoming",
  },
  {
    id: 2,
    level: "Level 5",
    title: "Multiplication Basics",
    time: "7:30 PM",
    duration: "60 min",
    students: 8,
    status: "upcoming",
  },
  {
    id: 3,
    level: "Level 1",
    title: "Introduction to Abacus",
    time: "10:00 AM",
    duration: "45 min",
    students: 15,
    status: "completed",
  },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Good evening, Rahul! 👋
        </h1>
        <p className="mt-1 text-gray-600 text-sm">
          Here's your teaching summary for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const colors: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600",
            emerald: "bg-emerald-50 text-emerald-600",
            amber: "bg-amber-50 text-amber-600",
            violet: "bg-violet-50 text-violet-600",
          };
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors[s.color]}`}
              >
                <s.Icon className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                {s.value}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Today's classes */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Today's Classes
          </h2>
          <Link
            href="/teacher/classes"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {todayClasses.map((c) => (
            <div
              key={c.id}
              className="p-5 flex items-center gap-4 hover:bg-gray-50/50 transition"
            >
              <div
                className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                  c.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {c.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {c.level}
                </p>
                <p className="text-sm font-bold text-gray-900 truncate">
                  {c.title}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1">
                  <span>🕐 {c.time}</span>
                  <span>⏱ {c.duration}</span>
                  <span>👥 {c.students} students</span>
                </div>
              </div>

              {c.status === "upcoming" ? (
                <button className="shrink-0 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition">
                  Start Class
                </button>
              ) : (
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                  Done
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/teacher/students"
          className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
            Manage Students
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            View all 48 students and their progress.
          </p>
        </Link>

        <Link
          href="/teacher/attendance"
          className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition">
            Mark Attendance
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Take today's attendance in one click.
          </p>
        </Link>

        <Link
          href="/teacher/assignments"
          className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition">
            Review Assignments
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            12 assignments waiting for review.
          </p>
        </Link>
      </div>
    </div>
  );
}