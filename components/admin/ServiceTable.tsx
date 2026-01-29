"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}: {
  services: any[];
  onEdit: (service: any) => void;
  onDelete: (id: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState("all");

  /* 🔹 Unique collections for filter */
  const collections = useMemo(() => {
    const cols = services
      .map((s) => s.collection_name)
      .filter(Boolean);
    return Array.from(new Set(cols));
  }, [services]);

  /* 🔹 Filtered data */
  const filteredServices = useMemo(() => {
    if (selectedCollection === "all") return services;
    return services.filter(
      (s) => s.collection_name === selectedCollection
    );
  }, [services, selectedCollection]);

  /* 🔹 Pagination logic */
  const totalPages = Math.ceil(
    filteredServices.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (!services.length) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No products added yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Products
        </h2>

        {/* 🔍 FILTER */}
        <select
          value={selectedCollection}
          onChange={(e) => {
            setSelectedCollection(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm w-full md:w-64"
        >
          <option value="all">All Collections</option>
          {collections.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-3 py-2 text-left">Image</th>
              <th className="border px-3 py-2 text-left">Title</th>
              <th className="border px-3 py-2 text-left">Collection</th>
              <th className="border px-3 py-2 text-center">Price</th>
              <th className="border px-3 py-2 text-center">
                Old Price
              </th>
              <th className="border px-3 py-2 text-center">
                Discount
              </th>
              <th className="border px-3 py-2 text-center w-[120px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedServices.length ? (
              paginatedServices.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
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

                  <td className="border px-3 py-2 font-medium">
                    {item.title}
                  </td>

                  <td className="border px-3 py-2">
                    {item.collection_name || "—"}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    ₹{item.price}
                  </td>

                  <td className="border px-3 py-2 text-center text-gray-500">
                    {item.old_price ? `₹${item.old_price}` : "-"}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {item.discount || "-"}
                  </td>

                  <td className="border px-3 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            onDelete(item.id);
                          }
                        }}
                        className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + ITEMS_PER_PAGE,
              filteredServices.length
            )}{" "}
            of {filteredServices.length}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => p - 1)
              }
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-3 py-1 border rounded bg-gray-50">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => p + 1)
              }
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
