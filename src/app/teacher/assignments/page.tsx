import { FileText, Clock, CheckCircle2, Users, Plus, Eye } from "lucide-react";

const assignments = [
  { id: 1, title: "Small Friends — Practice Sheet 5", level: "Level 3", due: "March 20, 2025", submitted: 10, total: 12, status: "active" },
  { id: 2, title: "Multiplication Tables 1-10", level: "Level 5", due: "March 22, 2025", submitted: 5, total: 8, status: "active" },
  { id: 3, title: "Basic Addition Worksheet", level: "Level 1", due: "March 15, 2025", submitted: 15, total: 15, status: "completed" },
  { id: 4, title: "Mental Math — 50 Questions", level: "Level 7", due: "March 25, 2025", submitted: 2, total: 6, status: "active" },
  { id: 5, title: "Big Friends Formula Practice", level: "Level 4", due: "March 10, 2025", submitted: 11, total: 11, status: "completed" },
];

export default function AssignmentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, review, and grade student assignments
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </div>

      {/* Assignment cards */}
      <div className="space-y-3">
        {assignments.map((a) => {
          const percent = Math.round((a.submitted / a.total) * 100);
          return (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    a.status === "completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {a.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {a.level}
                    </span>
                    {a.status === "completed" ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1">
                    {a.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1.5">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {a.due}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3" /> {a.submitted} / {a.total} submitted
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          a.status === "completed"
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                            : "bg-gradient-to-r from-blue-400 to-blue-600"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-900 shrink-0">
                      {percent}%
                    </span>
                  </div>
                </div>

                <button className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 text-xs font-semibold transition">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Review</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}