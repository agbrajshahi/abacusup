import { NextResponse } from "next/server";

// Google OAuth token retrieve for Firebase REST API
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials missing");
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  // Base64URL encode header and payload
  const header = { alg: "RS256", typ: "JWT" };
  const base64UrlEncode = (obj: any) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Import private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${signingInput}.${encodedSignature}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error("Failed to get access token: " + err);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

export async function POST(request: Request) {
  try {
    const { uid, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return NextResponse.json({ error: "Project ID missing" }, { status: 500 });
    }

    const accessToken = await getAccessToken();

    // 1. Delete Firestore document using REST API
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/students/${uid}`;
    const firestoreRes = await fetch(firestoreUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!firestoreRes.ok && firestoreRes.status !== 404) {
      const err = await firestoreRes.text();
      console.warn("Firestore delete failed:", err);
    }

    // 2. Delete Firebase Auth user using REST API
    const authUrl = `https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:delete`;
    const authRes = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ localId: uid }),
    });

    if (!authRes.ok) {
      const err = await authRes.text();
      console.warn("Auth user delete failed:", err);
      // Continue even if Auth user not found
    }

    // 3. Delete Cloudinary image via REST API
    if (photoURL) {
      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const urlParts = photoURL.split("/upload/");
        if (urlParts.length > 1 && cloudName && apiKey && apiSecret) {
          const pathAfterUpload = urlParts[1];
          const publicIdWithVersion = pathAfterUpload.split(".")[0];
          const publicId = publicIdWithVersion.replace(/^v\d+\//, "");

          const timestamp = Math.floor(Date.now() / 1000);
          const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

          const hashBuffer = await crypto.subtle.digest(
            "SHA-1",
            new TextEncoder().encode(signatureString)
          );
          const signature = Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

          const formData = new FormData();
          formData.append("public_id", publicId);
          formData.append("api_key", apiKey);
          formData.append("timestamp", timestamp.toString());
          formData.append("signature", signature);

          await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
            { method: "POST", body: formData }
          );
        }
      } catch (cloudErr) {
        console.warn("Cloudinary delete failed:", cloudErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete student" },
      { status: 500 }
    );
  }
}