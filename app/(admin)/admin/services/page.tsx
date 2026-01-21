"use client";

import { useEffect, useState } from "react";
import ServiceForm from "@/components/admin/ServiceForm";
import ServiceTable from "@/components/admin/ServiceTable";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  async function loadServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  }

  useEffect(() => {
    loadServices();
  }, []);

  /* ---------- EDIT ---------- */
  const handleEdit = (service: any) => {
    setEditingService(service);
    setShowForm(true);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: number) => {
    await fetch(`/api/services?id=${id}`, {
      method: "DELETE",
    });

    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-1">
        Services / Energy Plates
      </h1>
      <p className="text-gray-500 mb-6">
        Add slider products for homepage
      </p>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          + Add Service
        </button>
      </div>

      {/* TABLE */}
      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative">

            {/* CLOSE */}
            <button
              onClick={() => {
                setShowForm(false);
                setEditingService(null);
              }}
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* FORM */}
            <ServiceForm
              defaultData={editingService}
              onSuccess={() => {
                setShowForm(false);
                setEditingService(null);
                loadServices(); // 🔥 refresh table
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
