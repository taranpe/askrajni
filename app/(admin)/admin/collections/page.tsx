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

  const loadCollections = async () => {
    const res = await fetch("/api/collections");
    setCollections(await res.json());
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const deleteCollection = async (id: number) => {
    await fetch(`/api/collections?id=${id}`, { method: "DELETE" });
    loadCollections();
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
