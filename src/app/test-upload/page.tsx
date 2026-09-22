"use client";

import { useState } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("instructors");
  const [publicId, setPublicId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url?: string; error?: string }>({});

  const handleUpload = async () => {
    if (!file) {
      setResult({ error: "Please select a file first" });
      return;
    }

    setUploading(true);
    setResult({});

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (publicId) formData.append("publicId", publicId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setResult({ url: data.url });
    } catch (err) {
      setResult({
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Cloudinary Upload Test
          </h1>
          <p className="text-gray-600 mt-2">
            Test your Cloudinary integration
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-5">
            {/* Folder Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Folder (optional)
              </label>
              <input
                type="text"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                placeholder="instructors or students"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            {/* Public ID Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                File Name / Public ID (optional)
              </label>
              <input
                type="text"
                value={publicId}
                onChange={(e) => setPublicId(e.target.value)}
                placeholder="e.g. rahul (without extension)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
              <p className="mt-1 text-xs text-gray-500">
                If empty, Cloudinary generates a random name
              </p>
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Image (max 5MB)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl"
                />
              </div>
              {file && (
                <p className="mt-2 text-xs text-gray-600">
                  Selected: <strong>{file.name}</strong> (
                  {(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 transition-all duration-200"
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload to Cloudinary
                </>
              )}
            </button>
          </div>

          {/* Success */}
          {result.url && (
            <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl animate-fade-up">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3">
                <CheckCircle2 className="w-5 h-5" />
                Upload Successful!
              </div>

              <img
                src={result.url}
                alt="Uploaded"
                className="w-32 h-32 rounded-xl object-cover shadow-md mb-3"
              />

              <p className="text-xs text-emerald-700 font-mono break-all bg-white p-2 rounded-lg">
                {result.url}
              </p>

              <button
                onClick={() => navigator.clipboard.writeText(result.url!)}
                className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                Copy URL
              </button>
            </div>
          )}

          {/* Error */}
          {result.error && (
            <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-fade-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Upload Failed</p>
                <p className="text-sm mt-1">{result.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Help Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Your file goes to Cloudinary's secure servers
        </p>
      </div>
    </div>
  );
}