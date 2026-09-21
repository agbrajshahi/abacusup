"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  Mail,
  MapPin,
  Calendar,
  User,
  Award,
  Hash,
  Edit3,
  Save,
  X,
  Key,
  MessageCircle,
  Download,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

// Mock user data — will come from Firebase later
const initialUser = {
  name: "Ayaan Rahman",
  email: "ayaan.rahman@example.com",
  phone: "01712345678",
  studentId: "ABU-2025-00042",
  joinDate: "January 15, 2025",
  dob: "March 12, 2015",
  gender: "Male",
  religion: "Islam",
  school: "Dhaka Residential Model College",
  address: "House 12, Road 5, Savar, Dhaka, Bangladesh",
  upazila: "Savar",
  city: "Dhaka",
  country: "Bangladesh",
  level: "Level 3 — Small Friends",
  certificates: [] as { id: number; name: string; date: string }[],
};

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialUser);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = () => {
    setDraft(user);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = () => {
    setUser(draft);
    setEditing(false);
    // TODO: Firebase save
  };

  const updateField = (field: string, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const whatsappUrl = `https://wa.me/8801735123463?text=${encodeURIComponent(
    `Hi! I'm ${user.name} (ID: ${user.studentId}). I need help.`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* Simple Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">Abacus</span>
              <span className="text-gray-900">Up</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-emerald-600 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account information
            </p>
          </div>
          {!editing ? (
            <button
              onClick={startEdit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          )}
        </div>

        {/* Profile header card */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(white 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 active:scale-95 transition"
                aria-label="Change profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Name + meta */}
            <div className="text-center sm:text-left text-white flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{user.name}</h2>
              <p className="text-sm text-emerald-50/90 mt-1">{user.level}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-emerald-50/90 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  {user.studentId}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {user.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates strip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Certificates ({user.certificates.length})
            </h3>
          </div>

          {user.certificates.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-emerald-400" strokeWidth={1.8} />
              </div>
              <p className="text-sm font-semibold text-gray-900">
                No certificates yet
              </p>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Complete each level to earn a certificate. Keep learning — your
                first one is on the way! 🎯
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
              >
                Explore courses
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {user.certificates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-emerald-100"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-gray-500">{c.date}</p>
                  </div>
                  <button
                    className="shrink-0 w-8 h-8 rounded-lg bg-white hover:bg-emerald-50 flex items-center justify-center text-emerald-600 transition"
                    aria-label="Download certificate"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personal info */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              Personal Information
            </h3>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <Field
              label="Full Name"
              field="name"
              value={editing ? draft.name : user.name}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Email"
              field="email"
              value={editing ? draft.email : user.email}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Phone Number"
              field="phone"
              value={editing ? draft.phone : user.phone}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Date of Birth"
              field="dob"
              value={editing ? draft.dob : user.dob}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Gender"
              field="gender"
              value={editing ? draft.gender : user.gender}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Religion"
              field="religion"
              value={editing ? draft.religion : user.religion}
              editing={editing}
              onChange={updateField}
            />
          </div>
        </div>

        {/* School + Address */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              School & Address
            </h3>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <Field
              label="School"
              field="school"
              value={editing ? draft.school : user.school}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Upazila/Thana"
              field="upazila"
              value={editing ? draft.upazila : user.upazila}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="City"
              field="city"
              value={editing ? draft.city : user.city}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Country"
              field="country"
              value={editing ? draft.country : user.country}
              editing={editing}
              onChange={updateField}
            />
            <div className="sm:col-span-2">
              <Field
                label="Full Address"
                field="address"
                value={editing ? draft.address : user.address}
                editing={editing}
                onChange={updateField}
              />
            </div>
          </div>
        </div>

        {/* Security + Contact */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Password change */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <Key className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">
                  Password & Security
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Change your password to keep your account safe.
                </p>
                <Link
                  href="/dashboard/settings"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  <Key className="w-3.5 h-3.5" />
                  Change password
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">
                  Contact Support
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  We're here to help — reach out anytime.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:hello@abacusup.com"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable field component
function Field({
  label,
  field,
  value,
  editing,
  onChange,
}: {
  label: string;
  field: string;
  value: string;
  editing: boolean;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
        />
      ) : (
        <p className="text-sm text-gray-900 font-medium py-2">{value}</p>
      )}
    </div>
  );
}