"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (value && index === 5 && newOtp.every((d) => d)) {
      submitOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const digits = pasted.split("");
      setOtp(digits);
      submitOtp(pasted);
    }
  };

  const submitOtp = async (code: string) => {
    setLoading(true);
    setError("");
    // TODO: Verify OTP via backend
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    // For UI demo: accept any 6-digit code
    if (code.length === 6) {
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?token=verified&phone=${phone}`);
      }, 1500);
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setResendTimer(30);
    setError("");
    // TODO: Resend OTP
    await new Promise((r) => setTimeout(r, 500));
  };

  // Redirect if no phone
  if (!phone) {
    return (
      <div className="relative w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900">Invalid access</h1>
        <p className="mt-3 text-gray-600 text-sm">
          Please start the password reset process again.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-flex px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold"
        >
          Go back
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
            <ShieldCheck className="w-7 h-7 text-emerald-600" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Verify your number
          </h1>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            We've sent a 6-digit code to{" "}
            <strong className="text-gray-900">{phone}</strong>. Enter it below
            to continue.
          </p>

          {/* OTP inputs */}
          <div className="mt-8 flex items-center justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                disabled={loading}
                autoFocus={i === 0}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border-2 bg-white text-gray-900 focus:outline-none focus:ring-4 transition-all ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : digit
                    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100"
                    : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-600 text-center">{error}</p>
          )}

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="w-4 h-4 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
              Verifying...
            </div>
          )}

          {/* Resend */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Didn't receive a code?</p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resend code
              </button>
            ) : (
              <p className="mt-2 text-sm text-gray-400">
                Resend available in{" "}
                <span className="font-semibold text-emerald-600">
                  {resendTimer}s
                </span>
              </p>
            )}
          </div>

          {/* Change number */}
          <Link
            href="/forgot-password"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Use a different number
          </Link>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 animate-fade-up">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Verified! ✅
          </h1>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Your phone number is verified. Redirecting to reset your
            password...
          </p>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
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
        <VerifyForm />
      </Suspense>
    </div>
  );
}