"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  ArrowLeft,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

type Method = "email" | "phone";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "email") {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid email");
        return;
      }

      setLoading(true);

      try {
        // ✅ Firebase — send real password reset email
        await sendPasswordResetEmail(auth, email.trim(), {
          url: `${window.location.origin}/login`,
        });

        // Success — go to confirmation page
        router.push(
          `/forgot-password/sent?method=email&contact=${encodeURIComponent(
            email.trim()
          )}`
        );
      } catch (err: unknown) {
        const error = err as { code?: string };
        let message = "Failed to send reset email. Please try again.";

        switch (error.code) {
          case "auth/user-not-found":
            message =
              "No account found with this email. Please sign up first.";
            break;
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          case "auth/too-many-requests":
            message = "Too many attempts. Please try again in a few minutes.";
            break;
          case "auth/network-request-failed":
            message = "Network error. Check your internet.";
            break;
        }
        setError(message);
        console.error("Reset email error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      const cleanPhone = phone.replace(/\s/g, "");
      if (!cleanPhone) {
        setError("Phone number is required");
        return;
      }
      if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
        setError("Enter a valid BD number (e.g. 01712345678)");
        return;
      }

      setLoading(true);
      // TODO: Send OTP via SMS / WhatsApp — needs Blaze Plan
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
      router.push(
        `/forgot-password/verify?phone=${encodeURIComponent(cleanPhone)}`
      );
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-emerald-50 via-white to-white relative">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-1 mb-8">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-600">Abacus</span>
            <span className="text-gray-900">Up</span>
          </span>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Forgot password?
        </h1>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          No worries! Choose how you'd like to reset your password — we'll send
          you a reset link or code.
        </p>

        {/* Method tabs */}
        <div className="mt-6 flex p-1 rounded-xl bg-gray-100">
          <button
            type="button"
            onClick={() => {
              setMethod("email");
              setError("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              method === "email"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod("phone");
              setError("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              method === "phone"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {method === "email" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="you@example.com"
                  autoFocus
                  className={inputClass(!!error)}
                />
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-red-600">{error}</p>
              )}
              <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                We'll send a password reset link to this email address.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="01712345678"
                  autoFocus
                  className={inputClass(!!error)}
                />
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-red-600">{error}</p>
              )}

              {/* SMS info */}
              <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800">
                  Phone verification needs SMS OTP — coming soon. Please use
                  the Email method for now.
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-100">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-gray-700">
                    WhatsApp
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-100">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-gray-700">
                    SMS
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {method === "email" ? "Sending link..." : "Sending code..."}
              </>
            ) : (
              <>
                {method === "email"
                  ? "Send reset link"
                  : "Send verification code"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        <p className="mt-10 text-center text-xs text-gray-400">
          🔒 Your data is safe with us. We never share your information.
        </p>
      </div>
    </div>
  );
}