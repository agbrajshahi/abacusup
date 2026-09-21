"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Save, Users } from "lucide-react";

const initialStudents = [
  { id: 1, name: "Ayaan Rahman", level: "Level 3", status: "present" },
  { id: 2, name: "Priya Das", level: "Level 3", status: "present" },
  { id: 3, name: "Arjun Roy", level: "Level 3", status: "present" },
  { id: 4, name: "Sneha Ahmed", level: "Level 3", status: "absent" },
  { id: 5, name: "Tanvir Hasan", level: "Level 3", status: "late" },
  { id: 6, name: "Nusrat Jahan", level: "Level 3", status: "present" },
  { id: 7, name: "Samir Islam", level: "Level 3", status: "present" },
  { id: 8, name: "Ayesha Siddiqui", level: "Level 3", status: "present" },
];

type Status = "present" | "absent" | "late";

export default function AttendancePage() {
  const [students, setStudents] = useState(initialStudents);
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const setStatus = (id: number, status: Status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const counts = {
    present: students.filter((s) => s.status === "present").length,
    absent: students.filter((s) => s.status === "absent").length,
    late: students.filter((s) => s.status === "late").length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Attendance
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Mark attendance for Level 3 — {date}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
          <Save className="w-4 h-4" />
          Save Attendance
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="text-xs text-emerald-700 font-medium">Present</p>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{counts.present}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-amber-700 font-medium">Late</p>
          </div>
          <p className="text-2xl font-bold text-amber-700">{counts.late}</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-rose-600" />
            <p className="text-xs text-rose-700 font-medium">Absent</p>
          </div>
          <p className="text-2xl font-bold text-rose-700">{counts.absent}</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-gray-900">
            Students ({students.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {students.map((s) => (
            <div key={s.id} className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {s.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {s.name}
                </p>
                <p className="text-xs text-gray-500">{s.level}</p>
              </div>

              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => setStatus(s.id, "present")}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                    s.status === "present"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600"
                  }`}
                  aria-label="Present"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setStatus(s.id, "late")}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                    s.status === "late"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-600"
                  }`}
                  aria-label="Late"
                >
                  <Clock className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setStatus(s.id, "absent")}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                    s.status === "absent"
                      ? "bg-rose-600 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-rose-100 hover:text-rose-600"
                  }`}
                  aria-label="Absent"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}