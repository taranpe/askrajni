"use client";

import { useState, useEffect } from "react";

export default function ServiceForm({
  onSuccess,
  defaultData,
}: {
  onSuccess?: () => void;
  defaultData?: any; // For edit
}) {
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    old_price: "",
    description: "", // ✅ added description
  });
  const [loading, setLoading] = useState(false);

  // If defaultData exists, pre-fill the form
  useEffect(() => {
    if (defaultData) {
      setForm({
        title: defaultData.title || "",
        price: defaultData.price || "",
        old_price: defaultData.old_price || "",
        description: defaultData.description || "", // ✅ pre-fill description
      });
    }
  }, [defaultData]);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calculateDiscount() {
    const price = Number(form.price);
    const oldPrice = Number(form.old_price);
    if (!price || !oldPrice || oldPrice <= price) return "";
    return `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("price", form.price);
    fd.append("old_price", form.old_price);
    fd.append("discount", calculateDiscount());
    fd.append("description", form.description); // ✅ add description
    if (image) fd.append("image", image);

    let url = "/api/services";
    let method = "POST";

    // If defaultData exists, update existing service
    if (defaultData?.id) {
      url = `/api/services?id=${defaultData.id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: fd,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save service");
      return;
    }

    alert(defaultData ? "Service updated" : "Service added");
    setForm({ title: "", price: "", old_price: "", description: "" }); // ✅ reset description
    setImage(null);
    onSuccess?.();
  }

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        name="title"
        placeholder="Service Title"
        value={form.title}
        onChange={update}
        className="border p-2 rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border p-2 rounded"
        {...(!defaultData && { required: true })} // required only if new
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={update}
        className="border p-2 rounded"
        required
      />

      <input
        name="old_price"
        placeholder="Old Price"
        value={form.old_price}
        onChange={update}
        className="border p-2 rounded"
      />

      {/* ✅ Description textarea */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={update}
        className="border p-2 rounded md:col-span-2"
        rows={4}
      />

      <input
        value={calculateDiscount()}
        placeholder="Discount (auto)"
        disabled
        className="border p-2 rounded bg-gray-100"
      />

      <button
        disabled={loading}
        className="bg-black text-white py-2 rounded md:col-span-2"
      >
        {loading ? "Saving..." : defaultData ? "Update Service" : "Save Service"}
      </button>
    </form>
  );
}
