"use client";

import { useEffect, useState } from "react";

type CollectionFormProps = {
  defaultData?: any;
  onSuccess: () => void;
};

export default function CollectionForm({
  defaultData,
  onSuccess,
}: CollectionFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultData) {
      setName(defaultData.name);
      setPreview(defaultData.image_url || null);
    } else {
      setName("");
      setImage(null);
      setPreview(null);
    }
  }, [defaultData]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    if (defaultData?.id) {
      formData.append("id", defaultData.id);
    }

    await fetch("/api/collections", {
      method: "POST", // ✅ ALWAYS POST
      body: formData,
    });

    setName("");
    setImage(null);
    setPreview(null);
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4 border p-4 rounded bg-white">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Collection Name"
        className="border p-2 w-full"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setImage(file);
          if (file) setPreview(URL.createObjectURL(file));
        }}
        required={!defaultData}
      />

      {preview && (
        <img
          src={preview}
          className="w-20 h-20 object-cover rounded border"
        />
      )}

      <button className="bg-black text-white px-4 py-2 rounded">
        {defaultData ? "Update Collection" : "Save Collection"}
      </button>
    </form>
  );
}
