"use client";

import { Pencil, Trash2 } from "lucide-react";

type Collection = {
  id: number;
  name: string;
  slug?: string;
  image_url?: string;
};

type Props = {
  collections: Collection[];
  onEdit: (item: Collection) => void;
  onDelete: (id: number) => void;
};

export default function CollectionTable({
  collections,
  onEdit,
  onDelete,
}: Props) {
  if (!collections.length) {
    return <p className="text-gray-500 text-sm mt-4">No collections added yet.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Image</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Slug</th>
            <th className="border px-3 py-2 w-[120px] text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {collections.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </td>

              <td className="border px-3 py-2 font-medium">{item.name}</td>
              <td className="border px-3 py-2 text-gray-500">
                {item.slug || "-"}
              </td>

              <td className="border px-3 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-blue-50 text-blue-600 rounded"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      confirm("Delete this collection?") &&
                      onDelete(item.id)
                    }
                    className="p-2 bg-red-50 text-red-600 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
