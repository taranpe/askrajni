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

export default function CollectionForm({ defaultData = null, onSuccess }: CollectionFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (defaultData) {
      setName(defaultData.name);
    }
  }, [defaultData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = defaultData ? "PUT" : "POST";
    const idQuery = defaultData ? `?id=${defaultData.id}` : "";

    try {
      const res = await fetch(`/api/collections${idQuery}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to save collection");

      setName("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Collection Name"
        className="border px-2 py-1 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {defaultData ? "Update Collection" : "Add Collection"}
      </button>
    </form>
  );
}
