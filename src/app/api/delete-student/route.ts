import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { uid, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    // 1. Delete Firestore document
    const db = getFirestore();
    await db.collection("students").doc(uid).delete();

    // 2. Delete Firebase Auth user
    try {
      await getAuth().deleteUser(uid);
    } catch (authErr) {
      console.warn("Auth user delete failed:", authErr);
      // Continue even if Auth user not found
    }

    // 3. Delete Cloudinary image (if exists)
    if (photoURL) {
      try {
        // Extract public_id from URL
        // Example URL: https://res.cloudinary.com/fcghqg0m/image/upload/v1234/students/abc.jpg
        const urlParts = photoURL.split("/upload/");
        if (urlParts.length > 1) {
          const pathAfterUpload = urlParts[1]; // "v1234/students/abc.jpg"
          const publicIdWithVersion = pathAfterUpload.split(".")[0]; // "v1234/students/abc"
          const publicId = publicIdWithVersion.replace(/^v\d+\//, ""); // "students/abc"
          
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudErr) {
        console.warn("Cloudinary delete failed:", cloudErr);
        // Continue even if Cloudinary fails
      }
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete student" },
      { status: 500 }
    );
  }
}