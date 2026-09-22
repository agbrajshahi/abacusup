"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireTeacher?: boolean;
}

export default function ProtectedRoute({
  children,
  requireTeacher = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // Not logged in → redirect to login
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Teacher-only pages (optional — for now we skip role check)
    if (requireTeacher) {
      // TODO: Check if user is teacher from Firestore
      // For now, allow any logged-in user
    }
  }, [user, loading, router, pathname, requireTeacher]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not logged in → don't render (redirect happens)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Logged in → render children
  return <>{children}</>;
}