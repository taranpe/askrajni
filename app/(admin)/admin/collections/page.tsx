"use client";

import { useEffect, useState } from "react";
import CollectionForm from "@/components/admin/CollectionForm";
import CollectionTable from "@/components/admin/CollectionTable";

type Collection = {
  id: number;
  name: string;
  slug?: string;
  image_url?: string;
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editData, setEditData] = useState<Collection | null>(null);

  // Fetch all collections from API
  const loadCollections = async () => {
    try {
      const res = await fetch("/api/collections", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch collections");

      const data: Collection[] = await res.json();
      setCollections(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const deleteCollection = async (id: number) => {
    try {
      const res = await fetch(`/api/collections?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete collection");

      loadCollections();
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Collections</h1>

      <CollectionForm
        defaultData={editData}
        onSuccess={() => {
          setEditData(null);
          loadCollections();
        }}
      />

      <CollectionTable
        collections={collections}
        onEdit={setEditData}
        onDelete={deleteCollection}
      />
    </div>
  );
}
