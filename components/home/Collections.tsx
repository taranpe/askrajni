"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Collection {
  id: number;
  name: string;
  image_url: string;
  slug: string;
}

interface CollectionsProps {
  collections: Collection[];
}

const Collections: React.FC<CollectionsProps> = ({ collections }) => {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
          Shop by Collection
        </h2>

        {/* Mobile Slider */}
        <div className="flex justify-center md:hidden">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {collections.map((item) => (
              <Link
                key={item.id}
                href={`/collections/${item.slug}`}
                className="flex-shrink-0 w-24 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-gray-700">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Perfect Center */}
        <div className="hidden md:flex flex-wrap justify-center gap-x-14 gap-y-10">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={`/collections/${item.slug}`}
              className="w-[140px] flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              <p className="mt-3 text-sm font-medium text-gray-800">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
