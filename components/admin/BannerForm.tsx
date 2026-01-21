"use client";

import { useState } from "react";

export default function BannerForm() {
  const [desktop1, setDesktop1] = useState<File | null>(null);
  const [desktop2, setDesktop2] = useState<File | null>(null);
  const [desktop3, setDesktop3] = useState<File | null>(null);
  const [mobile, setMobile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  async function upload(file: File, type: string, position: number) {
    const fd = new FormData();
    fd.append("image", file);
    fd.append("banner_type", type);
    fd.append("position", position.toString());

    await fetch("/api/banners", {
      method: "POST",
      body: fd,
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setUploading(true);

    try {
      if (desktop1) await upload(desktop1, "desktop", 1);
      if (desktop2) await upload(desktop2, "desktop", 2);
      if (desktop3) await upload(desktop3, "desktop", 3);
      if (mobile) await upload(mobile, "mobile", 1);

      alert("All banners uploaded successfully!");
      // Clear form
      setDesktop1(null);
      setDesktop2(null);
      setDesktop3(null);
      setMobile(null);
    } catch (err) {
      alert("Error uploading banners!");
    } finally {
      setUploading(false);
    }
  }

  function renderPreview(file: File | null) {
    if (!file) return null;
    return (
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="mt-2 w-full h-32 object-cover rounded-lg border"
      />
    );
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Upload Banners
      </h2>

      {/* Desktop 1 */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Desktop Banner 1
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDesktop1(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {renderPreview(desktop1)}
      </div>

      {/* Desktop 2 */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Desktop Banner 2
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDesktop2(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {renderPreview(desktop2)}
      </div>

      {/* Desktop 3 */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Desktop Banner 3
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDesktop3(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {renderPreview(desktop3)}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Mobile Banner
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMobile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {renderPreview(mobile)}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Save Banners"}
      </button>
    </form>
  );
}
