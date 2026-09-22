"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    upazila: "",
    city: "",
    level: 1,
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            school: data.school || "",
            upazila: data.upazila || "",
            city: data.city || "",
            level: data.level || 1,
            progress: data.progress || 0,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchStudent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "students", id), {
        ...form,
        level: Number(form.level),
        progress: Number(form.progress),
      });
      alert("Student updated successfully!");
      router.push(`/admin/students/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating student.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/admin/students/${id}`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Student</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Student Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <InputField
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              type="email"
            />
            <InputField
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <InputField
              label="School"
              value={form.school}
              onChange={(v) => setForm({ ...form, school: v })}
            />
            <InputField
              label="Upazila"
              value={form.upazila}
              onChange={(v) => setForm({ ...form, upazila: v })}
            />
            <InputField
              label="City"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
            />
            <InputField
              label="Level"
              value={String(form.level)}
              onChange={(v) => setForm({ ...form, level: Number(v) })}
              type="number"
            />
            <InputField
              label="Progress (%)"
              value={String(form.progress)}
              onChange={(v) => setForm({ ...form, progress: Number(v) })}
              type="number"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
    </div>
  );
}