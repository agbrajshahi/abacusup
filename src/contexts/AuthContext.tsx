"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  userRole: string | null; // <-- Notun
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null, // <-- Notun
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // <-- Notun
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Prothome students collection theke role khujo
          const studentDoc = await getDoc(doc(db, "students", currentUser.uid));
          
          if (studentDoc.exists()) {
            setUserRole(studentDoc.data().role || "student");
          } else {
            // Jodi student na hoy, teacher collection theke khujo
            const teacherDoc = await getDoc(doc(db, "teachers", currentUser.uid));
            if (teacherDoc.exists()) {
              setUserRole(teacherDoc.data().role || "teacher");
            } else {
              setUserRole("student"); // Default
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("student");
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}