"use client";

import { useState, useEffect } from "react";

type Collection = {
  id: number;
  name: string;
  slug?: string;
  image_url?: string;
};

type CollectionFormProps = {
  defaultData?: Collection | null;
  onSuccess?: () => void;
};

export default function CollectionForm({
  defaultData = null,
  onSuccess,
}: CollectionFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (defaultData) {
      setName(defaultData.name);
    }
  }, [defaultData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = defaultData ? "PUT" : "POST";
    const idQuery = defaultData ? `?id=${defaultData.id}` : "";

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`/api/collections${idQuery}`, {
        method,
        body: formData, // ✅ JSON nahi, FormData
      });

      if (!res.ok) throw new Error("Failed to save collection");

      setName("");
      setImage(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Collection Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Collection Name"
        className="border px-3 py-2 rounded w-full"
        required
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border px-3 py-2 rounded w-full"
      />

      {/* Existing Image Preview (Edit Mode) */}
      {defaultData?.image_url && !image && (
        <img
          src={defaultData.image_url}
          alt="Collection"
          className="h-20 rounded border"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {defaultData ? "Update Collection" : "Add Collection"}
      </button>
    </form>
  );
}
