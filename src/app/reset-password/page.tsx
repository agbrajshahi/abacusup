"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Key } from "lucide-react";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const phone = searchParams.get("phone");

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ newPass: false, confirm: false });
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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.newPassword) e.newPassword = "New password is required";
    else if (form.newPassword.length < 6)
      e.newPassword = "Password must be at least 6 characters";
    if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: Update password via backend
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-11 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  if (!token || !phone) {
    return (
      <div className="relative w-full max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 mx-auto">
          <Key className="w-7 h-7 text-red-500" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Invalid reset link
        </h1>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          This password reset link is invalid or has expired. Please start
          again.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
        >
          Start over
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <Link href="/" className="inline-flex items-center gap-1 mb-8">
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-emerald-600">Abacus</span>
          <span className="text-gray-900">Up</span>
        </span>
      </Link>

      {!success ? (
        <>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
            <Lock className="w-7 h-7 text-emerald-600" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Set new password
          </h1>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            Verified for <strong className="text-gray-900">{phone}</strong>.
            Enter a new password for your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
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
                  onClick={() =>
                    setShow((prev) => ({ ...prev, newPass: !prev.newPass }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="confirmPassword"
                  type={show.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={inputClass("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-shine w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Reset password
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 animate-fade-up">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Password reset! 🎉
          </h1>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Your password has been successfully updated. Redirecting to sign
            in...
          </p>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-emerald-50 via-white to-white relative">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Suspense
        fallback={<div className="text-gray-500 text-sm">Loading...</div>}
      >
        <ResetForm />
      </Suspense>
    </div>
  );
}