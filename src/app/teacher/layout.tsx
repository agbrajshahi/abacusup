"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const navItems = [
  { href: "/teacher", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/teacher/students", label: "My Students", Icon: Users },
  { href: "/teacher/classes", label: "My Classes", Icon: Calendar },
  { href: "/teacher/attendance", label: "Attendance", Icon: ClipboardList },
  { href: "/teacher/assignments", label: "Assignments", Icon: FileText },
  { href: "/teacher/profile", label: "My Profile", Icon: User },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===== Sign out with Firebase =====
  const handleSignOut = async () => {
    setSidebarOpen(false);
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // ===== Get user display info =====
  const getInitials = () => {
    if (!user) return "T";
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "T";
  };

  const getDisplayName = () => {
    if (!user) return "Teacher";
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split("@")[0];
    return "Teacher";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ===== Sidebar ===== */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex flex-col">
              <Link href="/" className="flex items-center">
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-emerald-600">Abacus</span>
                  <span className="text-gray-900">Up</span>
                </span>
              </Link>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mt-0.5">
                👨‍🏫 Teacher Panel
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-700"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active =
                item.href === "/teacher"
                  ? pathname === "/teacher"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.Icon
                    className={`w-4 h-4 ${
                      active ? "text-emerald-600" : "text-gray-400"
                    }`}
                    strokeWidth={2.2}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-100 space-y-1">
            {/* User info */}
            <Link
              href="/teacher/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {getDisplayName()}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  Teacher
                </p>
              </div>
            </Link>

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut className="w-4 h-4" strokeWidth={2.2} />
              Sign out
            </button>
          </div>
        </aside>

        {/* ===== Main content ===== */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-600 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Welcome back, teacher 👋
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {getDisplayName()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
                <Link
                  href="/teacher/profile"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition"
                >
                  {getInitials()}
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}