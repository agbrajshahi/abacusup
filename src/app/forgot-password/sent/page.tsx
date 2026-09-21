"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

function SentContent() {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact") || "";
  const method = searchParams.get("method") || "email";

  return (
    <div className="relative w-full max-w-md">
      <Link href="/" className="inline-flex items-center gap-1 mb-8">
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-emerald-600">Abacus</span>
          <span className="text-gray-900">Up</span>
        </span>
      </Link>

      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 animate-fade-up">
        <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Check your {method === "email" ? "email" : "inbox"} 📬
      </h1>
      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
        We've sent a password reset link to{" "}
        <strong className="text-gray-900">{contact}</strong>. Click the link in
        the message to reset your password.
      </p>

      {/* Info notice */}
      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <p className="font-semibold">Didn't receive it?</p>
          <ul className="mt-1.5 space-y-1 list-disc list-inside">
            <li>Check your spam / junk folder</li>
            <li>Make sure the address is correct</li>
            <li>Wait a few minutes and try again</li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/forgot-password"
          className="flex-1 text-center px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all text-sm"
        >
          Try another method
        </Link>
        <Link
          href="/login"
          className="flex-1 text-center px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
        >
          Back to sign in
        </Link>
      </div>

      <Link
        href="/forgot-password"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
    </div>
  );
}

export default function SentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-b from-emerald-50 via-white to-white relative">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
        <SentContent />
      </Suspense>
    </div>
  );
}