"use client";
import { useRouter } from "next/navigation"; 
import Slider from "react-slick";
import { Heart, Eye, Shuffle } from "lucide-react";

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  old_price?: number;
  discount?: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const router = useRouter();
  if (!services || !services.length) return null;

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Power-Packed Energy Plates
          </h2>
        </div>

        {/* MOBILE GRID */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {services.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => router.push(`/services/${item.id}`)}
            >
              <div className="relative rounded-xl overflow-hidden bg-black">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-[180px] object-cover group-hover:scale-105 transition"
                />
                {item.discount && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {item.discount}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex gap-2 mt-1 items-center">
                  {item.old_price && (
                    <span className="line-through text-xs text-gray-400">
                      ₹{item.old_price}
                    </span>
                  )}
                  <span className="text-red-600 text-sm font-semibold">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP SLIDER */}
        <div className="hidden md:block">
          <Slider {...settings}>
            {services.map((item) => (
              <div
                key={item.id}
                className="px-3 group cursor-pointer"
                onClick={() => router.push(`/services/${item.id}`)}
              >
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition"
                  />
                  {item.discount && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-black/70 p-2 rounded text-white">
                      <Eye size={16} />
                    </button>
                    <button className="bg-black/70 p-2 rounded text-white">
                      <Heart size={16} />
                    </button>
                    <button className="bg-black/70 p-2 rounded text-white">
                      <Shuffle size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  <div className="flex gap-2 mt-1 items-center">
                    {item.old_price && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹{item.old_price}
                      </span>
                    )}
                    <span className="text-red-600 font-semibold">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}
