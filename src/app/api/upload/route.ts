import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "abacusup";
    const publicId = (formData.get("publicId") as string) || undefined;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files allowed" },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 }
      );
    }

    // Get Cloudinary config
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary credentials missing" },
        { status: 500 }
      );
    }

    // Generate signature for Cloudinary
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign: Record<string, string> = {
      timestamp: timestamp.toString(),
      folder: folder,
    };
    if (publicId) paramsToSign.public_id = publicId;

    // Sort params alphabetically and create signature string
    const sortedParams = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");

    const signatureString = sortedParams + apiSecret;

    // Generate SHA-1 hash using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Prepare FormData for Cloudinary
    const cloudFormData = new FormData();
    cloudFormData.append("file", file);
    cloudFormData.append("api_key", apiKey);
    cloudFormData.append("timestamp", timestamp.toString());
    cloudFormData.append("signature", signature);
    cloudFormData.append("folder", folder);
    if (publicId) cloudFormData.append("public_id", publicId);

    // Upload to Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudFormData,
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Cloudinary upload failed:", errText);
      return NextResponse.json(
        { error: "Cloudinary upload failed: " + errText },
        { status: 500 }
      );
    }

    const result = await uploadRes.json();

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}