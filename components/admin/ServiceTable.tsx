"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}: {
  services: any[];
  onEdit: (service: any) => void;
  onDelete: (id: number) => void;
}) {
  if (!services.length) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No services added yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-3 py-2 text-left">Image</th>
            <th className="border px-3 py-2 text-left">Title</th>
            <th className="border px-3 py-2 text-center">Price</th>
            <th className="border px-3 py-2 text-center">Old Price</th>
            <th className="border px-3 py-2 text-center">Discount</th>
            <th className="border px-3 py-2 text-center w-[120px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition"
            >
              {/* IMAGE */}
              <td className="border px-3 py-2">
                <img
                  src={
                    item.image_url?.startsWith("/")
                      ? item.image_url
                      : `/${item.image_url}`
                  }
                  alt={item.title}
                  className="w-16 h-12 object-cover rounded-md border"
                />
              </td>

              {/* TITLE */}
              <td className="border px-3 py-2 font-medium">
                {item.title}
              </td>

              {/* PRICE */}
              <td className="border px-3 py-2 text-center">
                ₹{item.price}
              </td>

              {/* OLD PRICE */}
              <td className="border px-3 py-2 text-center text-gray-500">
                {item.old_price ? `₹${item.old_price}` : "-"}
              </td>

              {/* DISCOUNT */}
              <td className="border px-3 py-2 text-center">
                {item.discount || "-"}
              </td>

              {/* ACTIONS */}
              <td className="border px-3 py-2">
                <div className="flex items-center justify-center gap-2">
                  {/* EDIT */}
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this service?"
                        )
                      ) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete"
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
