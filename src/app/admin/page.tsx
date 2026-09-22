"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const studentsSnap = await getCountFromServer(collection(db, "students"));
        const teachersSnap = await getCountFromServer(collection(db, "teachers"));
        setStats({
          students: studentsSnap.data().count,
          teachers: teachersSnap.data().count,
          courses: 8, // static (Level 1-8)
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { title: "Total Students", value: stats.students, icon: Users, color: "emerald" },
    { title: "Total Teachers", value: stats.teachers, icon: GraduationCap, color: "blue" },
    { title: "Total Courses", value: stats.courses, icon: BookOpen, color: "purple" },
    { title: "Certificates Issued", value: 0, icon: Award, color: "orange" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, Admin!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-${card.color}-100`}
                >
                  <Icon size={24} className={`text-${card.color}-600`} />
                </div>
              </div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}