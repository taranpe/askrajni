"use client";

import { useRouter } from "next/navigation";
import Slider from "react-slick";

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  discount?: string;
  category_slug?: string; // rudraksha, gemstones etc
}

interface ServicesSectionProps {
  services: Service[];
  collectionSlug?: string; // rudraksha
  heading?: string;
}

export default function ServicesSection({
  services,
  collectionSlug,
  heading,
}: ServicesSectionProps) {
  const router = useRouter();

  // 🔹 normalize function (VERY IMPORTANT)
  const normalize = (val?: string) =>
    val ? val.toLowerCase().trim().replace(/\s+/g, "-") : "";

  const normalizedCollection = normalize(collectionSlug);

  // 🔹 STRICT FILTERING (NO MIX PRODUCTS)
  const filteredServices = collectionSlug
    ? services.filter(
        (item) =>
          normalize(item.category_slug) === normalizedCollection
      )
    : services;

  // ❌ if collection exists but no product → don't show section
  if (collectionSlug && filteredServices.length === 0) return null;

  // 🔹 heading
  const finalHeading =
    collectionSlug
      ? collectionSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : heading;

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

        {finalHeading && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold">
              {finalHeading}
            </h2>
          </div>
        )}

        {/* 📱 MOBILE */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {filteredServices.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/services/${item.id}`)}
              className="cursor-pointer"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="h-[180px] w-full object-cover rounded-xl"
              />
              <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                {item.title}
              </h3>
              <span className="text-red-600 font-semibold">
                ₹{item.price}
              </span>
            </div>
          ))}
        </div>

        {/* 🖥 DESKTOP */}
        <div className="hidden md:block">
          <Slider {...settings}>
            {filteredServices.map((item) => (
              <div
                key={item.id}
                className="px-3 cursor-pointer"
                onClick={() => router.push(`/services/${item.id}`)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-[260px] w-full object-cover rounded-xl"
                />
                <h3 className="mt-3 font-semibold line-clamp-2">
                  {item.title}
                </h3>
                <span className="text-red-600 font-semibold">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}
