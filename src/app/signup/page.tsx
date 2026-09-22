"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  Phone,
  School,
  MapPin,
  Building2,
  Globe,
} from "lucide-react";

// ===== Countries list =====
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const days = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 81 }, (_, i) =>
  String(currentYear - i)
);

// ✅ Generate unique student ID like ABU-2026-1234
function generateStudentId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ABU-${year}-${random}`;
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard/profile";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    password: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    upazila: "",
    city: "",
    country: "Bangladesh",
    gender: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^01[3-9]\d{8}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid BD number (e.g. 01712345678)";
    if (!form.school.trim()) e.school = "School name is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!form.dobDay || !form.dobMonth || !form.dobYear)
      e.dob = "Please select your full date of birth";
    if (!form.upazila.trim()) e.upazila = "Upazila/Thana is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.country.trim()) e.country = "Country is required";
    if (!form.gender) e.gender = "Please select your gender";
    if (!form.agree) e.agree = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // 1) Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const user = userCredential.user;

      // 2) Update display name
      await updateProfile(user, {
        displayName: form.name.trim(),
      });

      // 3) Generate unique student ID
      const studentId = generateStudentId();

      // 4) Save profile data in Firestore
      const dob = `${form.dobYear}-${form.dobMonth}-${form.dobDay}`;
      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        studentId,                      // ✅ Auto-generated
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        school: form.school.trim(),
        dob,
        upazila: form.upazila.trim(),
        city: form.city.trim(),
        country: form.country,
        gender: form.gender,
        photoURL: user.photoURL || "",
        level: 1,
        progress: 0,
        attendance: 0,
        certificates: [],
        createdAt: new Date().toISOString(),
      });

      // 5) Redirect
      router.push(redirect);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      let message = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered. Please sign in.";
          setErrors({ email: message });
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          setErrors({ email: message });
          break;
        case "auth/weak-password":
          message = "Password is too weak. Use at least 6 characters.";
          setErrors({ password: message });
          break;
        case "auth/network-request-failed":
          message = "Network error. Please check your internet.";
          setErrors({ email: message });
          break;
        default:
          setErrors({ email: message });
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setErrors({});

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Generate student ID for Google signup
      const studentId = generateStudentId();

      // Save / merge basic profile
      await setDoc(
        doc(db, "students", user.uid),
        {
          uid: user.uid,
          studentId,                    // ✅ Auto-generated
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          level: 1,
          progress: 0,
          attendance: 0,
          certificates: [],
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      router.push(redirect);
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (
        err.code !== "auth/popup-closed-by-user" &&
        err.code !== "auth/cancelled-popup-request"
      ) {
        setErrors({
          email: "Google sign-in failed. Please try again.",
        });
      }
      console.error("Google signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  const selectClass = (field: string) =>
    `w-full appearance-none pl-10 pr-8 py-2.5 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition cursor-pointer ${
      errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* LEFT: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-lg">
          <Link href="/" className="inline-flex items-center gap-1 mb-6">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-emerald-600">Abacus</span>
              <span className="text-gray-900">Up</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Start your Abacus journey today — it's free.
          </p>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium text-gray-700 text-sm transition disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ayaan Rahman"
                  className={inputClass("name")}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email *
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01712345678"
                  className={inputClass("phone")}
                />
              </div>
              {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of Birth *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="dobDay"
                  value={form.dobDay}
                  onChange={handleChange}
                  className={`appearance-none px-3 py-2.5 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition cursor-pointer text-sm ${
                    errors.dob
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                >
                  <option value="">Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  name="dobMonth"
                  value={form.dobMonth}
                  onChange={handleChange}
                  className={`appearance-none px-3 py-2.5 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition cursor-pointer text-sm ${
                    errors.dob
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>

                <select
                  name="dobYear"
                  value={form.dobYear}
                  onChange={handleChange}
                  className={`appearance-none px-3 py-2.5 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition cursor-pointer text-sm ${
                    errors.dob
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              {errors.dob && <p className="mt-1.5 text-xs text-red-600">{errors.dob}</p>}
            </div>

            {/* School */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                School Name *
              </label>
              <div className="relative">
                <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="school"
                  type="text"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka Residential Model College"
                  className={inputClass("school")}
                />
              </div>
              {errors.school && <p className="mt-1.5 text-xs text-red-600">{errors.school}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Gender *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, gender: g }));
                      if (errors.gender) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.gender;
                          return copy;
                        });
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition ${
                      form.gender === g
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="mt-1.5 text-xs text-red-600">{errors.gender}</p>}
            </div>

            {/* Upazila + City */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Upazila/Thana *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="upazila"
                    type="text"
                    value={form.upazila}
                    onChange={handleChange}
                    placeholder="e.g. Savar"
                    className={inputClass("upazila")}
                  />
                </div>
                {errors.upazila && <p className="mt-1.5 text-xs text-red-600">{errors.upazila}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  City *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka"
                    className={inputClass("city")}
                  />
                </div>
                {errors.city && <p className="mt-1.5 text-xs text-red-600">{errors.city}</p>}
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Country *
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={selectClass("country")}
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.country && <p className="mt-1.5 text-xs text-red-600">{errors.country}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  name="agree"
                  type="checkbox"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-emerald-600 font-medium hover:underline">Terms</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald-600 font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agree && <p className="mt-1.5 text-xs text-red-600">{errors.agree}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-shine w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT: Decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/10" />

        <div className="relative flex flex-col justify-between p-12 text-white w-full">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100/80 font-semibold">
              Join AbacusUp
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Master mental math, <br />
              one bead at a time.
            </h2>
            <p className="mt-5 text-emerald-50/90 text-lg leading-relaxed max-w-md">
              Join 5,000+ students across Bangladesh mastering Abacus — from
              Foundation to Grand Master.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Live classes with expert teachers",
                "Interactive virtual Abacus tool",
                "8 structured levels with certificates",
                "Practice anytime, anywhere",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                  <span className="text-emerald-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["AR", "PD", "SA", "KR"].map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur border-2 border-emerald-600 flex items-center justify-center text-xs font-bold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-emerald-50/90">
              <strong>5,000+</strong> students already learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignupForm />
    </Suspense>
  );
}