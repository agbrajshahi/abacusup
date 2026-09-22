"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // DEBUG LOGS
    console.log("=== Admin Protected Route Debug ===");
    console.log("User Email:", user?.email);
    console.log("User UID:", user?.uid);
    console.log("User Role:", userRole);
    console.log("Loading:", loading);
    console.log("===================================");

    if (!loading) {
      if (!user) {
        console.log("❌ No user logged in → redirecting to /login");
        router.push("/login");
      } else if (userRole !== "admin") {
        console.log(`❌ Role is "${userRole}", not "admin" → redirecting to /dashboard`);
        router.push("/dashboard");
      } else {
        console.log("✅ Access granted! Welcome Admin.");
      }
    }
  }, [user, userRole, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user || userRole !== "admin") return null;

  return <>{children}</>;
}