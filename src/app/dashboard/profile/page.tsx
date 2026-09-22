"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  LogOut,
} from "lucide-react";

type UserData = {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  joinDate: string;
  dob: string;
  gender: string;
  religion?: string;
  school: string;
  address?: string;
  upazila: string;
  city: string;
  country: string;
  level: string;
  photoURL?: string;
  certificates: { id: number; name: string; date: string }[];
};

const emptyUser: UserData = {
  name: "",
  email: "",
  phone: "",
  studentId: "",
  joinDate: "",
  dob: "",
  gender: "",
  religion: "",
  school: "",
  address: "",
  upazila: "",
  city: "",
  country: "",
  level: "Level 1",
  photoURL: "",
  certificates: [],
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [userData, setUserData] = useState<UserData>(emptyUser);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserData>(emptyUser);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== Fetch from Firestore =====
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "students", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const joinDate = data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Recently";

          const profile: UserData = {
            name: data.name || user.displayName || "Student",
            email: data.email || user.email || "",
            phone: data.phone || "",
            studentId:
              data.studentId || `ABU-${user.uid.slice(0, 8).toUpperCase()}`,
            joinDate,
            dob: data.dob || "",
            gender: data.gender || "",
            religion: data.religion || "",
            school: data.school || "",
            address: data.address || "",
            upazila: data.upazila || "",
            city: data.city || "",
            country: data.country || "",
            level: data.level ? `Level ${data.level}` : "Level 1",
            photoURL: data.photoURL || user.photoURL || "",
            certificates: data.certificates || [],
          };

          setUserData(profile);
          setAvatar(profile.photoURL || null);
        } else {
          const fallback: UserData = {
            ...emptyUser,
            name: user.displayName || "Student",
            email: user.email || "",
            studentId: `ABU-${user.uid.slice(0, 8).toUpperCase()}`,
            joinDate: "Recently",
            photoURL: user.photoURL || "",
          };
          setUserData(fallback);
          setAvatar(fallback.photoURL || null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]);

  // ===== Upload avatar to Cloudinary =====
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    // Instant preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploadingAvatar(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "students");
      formData.append("publicId", user.uid); // Same ID → auto-replace on re-upload

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Save URL to Firestore
      await updateDoc(doc(db, "students", user.uid), {
        photoURL: data.url,
      });

      setAvatar(data.url);
      setUserData((prev) => ({ ...prev, photoURL: data.url }));
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError("Failed to upload photo. Please try again.");
      setAvatar(userData.photoURL || null);
    } finally {
      setUploadingAvatar(false);
      // Reset file input so user can select the same file again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const startEdit = () => {
    setDraft({ ...userData });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(userData);
  };

  const saveEdit = async () => {
    if (!user) return;
    setSaving(true);
    setError("");

    try {
      await updateDoc(doc(db, "students", user.uid), {
        name: draft.name,
        phone: draft.phone,
        school: draft.school,
        dob: draft.dob,
        gender: draft.gender,
        religion: draft.religion || "",
        address: draft.address || "",
        upazila: draft.upazila,
        city: draft.city,
        country: draft.country,
      });

      setUserData(draft);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const whatsappUrl = `https://wa.me/8801735123463?text=${encodeURIComponent(
    `Hi! I'm ${userData.name} (ID: ${userData.studentId}). I need help.`
  )}`;

  // ===== Loading =====
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ===== Not logged in =====
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Not logged in
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const data = editing ? draft : userData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* Top header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">Abacus</span>
              <span className="text-gray-900">Up</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-emerald-600 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
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
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-60"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

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
            <div className="relative">
              {/* Avatar circle */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {data.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )}

                {/* Uploading overlay */}
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-3 border-white/40 border-t-white rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-[10px] font-medium">Uploading...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Change profile picture"
              >
                {uploadingAvatar ? (
                  <div className="w-4 h-4 border-2 border-emerald-600/40 border-t-emerald-600 rounded-full animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="text-center sm:text-left text-white flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{data.name}</h2>
              <p className="text-sm text-emerald-50/90 mt-1">{data.level}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-emerald-50/90 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  {data.studentId}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {data.joinDate}
                </span>
              </div>
              {/* Upload hint */}
              <p className="mt-3 text-[11px] text-emerald-50/70 flex items-center gap-1 justify-center sm:justify-start">
                <Camera className="w-3 h-3" />
                Click the camera icon to change your photo
              </p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            Certificates ({data.certificates.length})
          </h3>

          {data.certificates.length === 0 ? (
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
              {data.certificates.map((c) => (
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
              value={data.name}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Email"
              field="email"
              value={data.email}
              editing={false}
              onChange={updateField}
            />
            <Field
              label="Phone Number"
              field="phone"
              value={data.phone}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Date of Birth"
              field="dob"
              value={data.dob}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Gender"
              field="gender"
              value={data.gender}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Religion"
              field="religion"
              value={data.religion || ""}
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
              value={data.school}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Upazila/Thana"
              field="upazila"
              value={data.upazila}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="City"
              field="city"
              value={data.city}
              editing={editing}
              onChange={updateField}
            />
            <Field
              label="Country"
              field="country"
              value={data.country}
              editing={editing}
              onChange={updateField}
            />
            <div className="sm:col-span-2">
              <Field
                label="Full Address"
                field="address"
                value={data.address || ""}
                editing={editing}
                onChange={updateField}
              />
            </div>
          </div>
        </div>

        {/* Password + Contact */}
        <div className="grid sm:grid-cols-2 gap-5">
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
        <p className="text-sm text-gray-900 font-medium py-2">
          {value || "—"}
        </p>
      )}
    </div>
  );
}