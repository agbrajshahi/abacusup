"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Image as ImageIcon,
  Trophy,
  PenTool,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
  GraduationCap,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const moreLinks = [
  {
    href: "/gallery",
    label: "Gallery",
    desc: "Moments from our classes",
    Icon: ImageIcon,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    desc: "Top performing students",
    Icon: Trophy,
  },
  {
    href: "/blog",
    label: "Blog",
    desc: "Tips, articles & updates",
    Icon: PenTool,
  },
];

// Mock user data (Firebase যোগ হলে dynamic হবে)
const MOCK_USER = {
  name: "Ayaan Rahman",
  initials: "AR",
  level: "Level 3 Student",
  email: "ayaan.rahman@example.com",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const moreRef = useRef<HTMLLIElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close all on route change
  useEffect(() => {
    setMoreOpen(false);
    setUserOpen(false);
    setMobileOpen(false);
    setMobileMoreOpen(false);
  }, [pathname]);

  // Sign out handler
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserOpen(false);
    setMobileOpen(false);
    setMobileMoreOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 nav-fade-in transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-emerald-100/60 shadow-sm shadow-emerald-100/40"
          : "bg-white/60 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* ===== Logo ===== */}
        <Link href="/" className="group flex items-center gap-1.5">
          <span className="relative">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-emerald-600">Abacus</span>
              <span className="text-gray-900">Up</span>
            </span>
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </span>
        </Link>

        {/* ===== Desktop Nav ===== */}
        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                    active
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {/* More dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 ${
                moreOpen
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/70"
              }`}
            >
              More
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-emerald-100/50 overflow-hidden animate-fade-up">
                <div className="p-2">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                    >
                      <span className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center transition-colors">
                        <item.Icon
                          className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors"
                          strokeWidth={2}
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 p-2">
                  <Link
                    href="/teacher"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                      <GraduationCap
                        className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors"
                        strokeWidth={2}
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        Teacher Panel
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        Manage students & classes
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* ===== Right: Auth / User ===== */}
        {isLoggedIn ? (
          <div className="hidden md:block relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full transition ${
                userOpen ? "bg-emerald-50" : "hover:bg-gray-50"
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {MOCK_USER.initials}
              </span>
              <span className="text-sm font-medium text-gray-800 max-w-[100px] truncate">
                {MOCK_USER.name.split(" ")[0]}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                  userOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>

            {userOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-emerald-100/50 overflow-hidden animate-fade-up">
                {/* User info */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
                    {MOCK_USER.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {MOCK_USER.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {MOCK_USER.level}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="p-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    <LayoutDashboard className="w-4 h-4" strokeWidth={2.2} />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    <User className="w-4 h-4" strokeWidth={2.2} />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    <Settings className="w-4 h-4" strokeWidth={2.2} />
                    Settings
                  </Link>
                  <Link
                    href="/teacher"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                  >
                    <GraduationCap className="w-4 h-4" strokeWidth={2.2} />
                    Teacher Panel
                  </Link>
                </div>

                {/* Sign out */}
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2.2} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
            >
              Sign Up →
            </Link>
          </div>
        )}

        {/* ===== Mobile Hamburger ===== */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-emerald-50 transition"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* ===== Mobile Menu ===== */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[700px] border-t border-emerald-50" : "max-h-0"
        }`}
      >
        <ul className="px-4 py-4 space-y-1 bg-white">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Mobile More toggle */}
          <li>
            <button
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition"
            >
              More
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileMoreOpen ? "max-h-96 mt-1" : "max-h-0"
              }`}
            >
              <ul className="pl-4 space-y-1">
                {moreLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition"
                    >
                      <item.Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/teacher"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Teacher Panel
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Mobile auth / user */}
          <li className="pt-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                {/* User info row */}
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-50">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    {MOCK_USER.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {MOCK_USER.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {MOCK_USER.level}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 text-sm font-medium transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 text-sm font-medium transition"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 text-sm font-medium transition"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <Link
                  href="/teacher"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-blue-600 hover:bg-blue-50 text-sm font-medium transition"
                >
                  <GraduationCap className="w-4 h-4" />
                  Teacher Panel
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 text-sm font-semibold transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}