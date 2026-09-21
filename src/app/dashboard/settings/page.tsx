"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.currentPassword)
      e.currentPassword = "Current password is required";
    if (!form.newPassword) e.newPassword = "New password is required";
    else if (form.newPassword.length < 6)
      e.newPassword = "Password must be at least 6 characters";
    else if (form.newPassword === form.currentPassword)
      e.newPassword = "New password must be different from current";
    if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: Firebase password change
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-11 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to profile
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Key className="w-6 h-6 text-emerald-600" />
          Password & Security
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update your password to keep your account safe.
        </p>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-up">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold">Password updated successfully!</p>
            <p className="text-xs text-emerald-600 mt-0.5">
              (UI test — Firebase যোগ হলে আসল পরিবর্তন হবে)
            </p>
          </div>
        </div>
      )}

      {/* Info notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <p className="font-semibold">Security tip</p>
          <p className="mt-0.5">
            Use a strong password with at least 6 characters — mix letters,
            numbers, and symbols.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4"
      >
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Current Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="currentPassword"
              type={show.current ? "text" : "password"}
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className={inputClass("currentPassword")}
            />
            <button
              type="button"
              onClick={() => toggleShow("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle visibility"
            >
              {show.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            New Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="newPassword"
              type={show.newPass ? "text" : "password"}
              value={form.newPassword}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={inputClass("newPassword")}
            />
            <button
              type="button"
              onClick={() => toggleShow("newPass")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle visibility"
            >
              {show.newPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirm New Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="confirmPassword"
              type={show.confirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className={inputClass("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => toggleShow("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle visibility"
            >
              {show.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>

      {/* Additional security options */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Other Security Options
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of security
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">
              Coming soon
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Active Sessions
              </p>
              <p className="text-xs text-gray-500">
                Manage devices you're logged in on
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}