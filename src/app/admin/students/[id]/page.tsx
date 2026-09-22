"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  School,
  Calendar,
  Award,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";

interface Student {
  name?: string;
  email?: string;
  phone?: string;
  studentId?: string;
  photoURL?: string;
  level?: number | string;
  progress?: number;
  dob?: string;
  gender?: string;
  school?: string;
  upazila?: string;
  city?: string;
  country?: string;
  religion?: string;
  createdAt?: string;
  attendance?: number;
  certificates?: number;
}

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data() as Student);
        } else {
          console.log("Student not found!");
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Student not found.</p>
        <Link
          href="/admin/students"
          className="text-emerald-600 hover:underline"
        >
          ← Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/students"
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600"
        >
          <ArrowLeft size={20} />
          <span>Back to Students</span>
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/admin/students/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <Pencil size={18} />
            <span>Edit</span>
          </Link>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this student?")) {
                // Delete logic will come later
                alert("Delete feature coming soon!");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
            <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
              {student.photoURL ? (
                <img
                  src={student.photoURL}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-emerald-600 text-5xl font-bold">
                  {student.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {student.name || "N/A"}
              </h1>
              <p className="text-gray-500">{student.email}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {student.studentId || "N/A"}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Level {student.level || 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <InfoCard icon={Mail} label="Email" value={student.email} />
        <InfoCard icon={Phone} label="Phone" value={student.phone} />
        <InfoCard icon={School} label="School" value={student.school} />
        <InfoCard
          icon={MapPin}
          label="Location"
          value={`${student.upazila || ""}, ${student.city || ""}, ${
            student.country || ""
          }`}
        />
        <InfoCard icon={Calendar} label="Date of Birth" value={student.dob} />
        <InfoCard icon={Award} label="Gender" value={student.gender} />
      </div>

      {/* Progress & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-emerald-500" size={24} />
            <h3 className="font-semibold text-gray-700">Progress</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {student.progress || 0}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${student.progress || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-700">Attendance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {student.attendance || 0} days
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-orange-500" size={24} />
            <h3 className="font-semibold text-gray-700">Certificates</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {student.certificates || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg flex items-start gap-4">
      <div className="p-3 bg-emerald-100 rounded-xl">
        <Icon className="text-emerald-600" size={20} />
      </div>
      <div className="overflow-hidden">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 truncate">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}