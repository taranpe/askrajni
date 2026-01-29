"use client";

import { useRouter } from "next/navigation";

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  old_price?: number;
  sold_out?: boolean;
}

interface Props {
  services: Service[];
}

export default function ConsultationServiceCollection({ services }: Props) {
  const router = useRouter();

  if (!services || services.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No Consultation Services found
      </div>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-2">

        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-semibold">
            Consultation Services
          </h1>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {services.map((item) => {
            const discount =
              item.old_price && item.old_price > item.price
                ? Math.round(
                    ((item.old_price - item.price) / item.old_price) * 100
                  )
                : null;

            return (
              <div
                key={item.id}
                onClick={() =>
                  !item.sold_out && router.push(`/services/${item.id}`)
                }
                className={`group w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer ${
                  item.sold_out ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-[230px] object-cover group-hover:scale-105 transition"
                  />

                  {/* Badges */}
                  {item.sold_out ? (
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Sold Out
                    </span>
                  ) : discount ? (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      -{discount}%
                    </span>
                  ) : null}
                </div>

                {/* Content */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex justify-center gap-2 mt-1 items-center">
                    {item.old_price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.old_price}
                      </span>
                    )}
                    <span className="text-red-600 font-semibold">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
