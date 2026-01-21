"use client";

import Slider from "react-slick";
import Image from "next/image";

interface Banner {
  id: number;
  image_url: string;
  banner_type: "desktop" | "mobile";
}

interface HeroBuyOneProps {
  banners: Banner[];
}

export default function HeroBuyOne({ banners }: HeroBuyOneProps) {
  const desktop = banners.filter((b) => b.banner_type === "desktop");
  const mobile = banners.filter((b) => b.banner_type === "mobile");

  if (!desktop.length && !mobile.length) return null;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block w-full overflow-hidden">
        <Slider {...settings}>
          {desktop.map((b) => (
            <div key={b.id} className="flex justify-center">
              <Image
                src={b.image_url}
                alt="Desktop Banner"
                width={1920}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden w-full overflow-hidden">
        {mobile[0] && (
          <Image
            src={mobile[0].image_url}
            alt="Mobile Banner"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        )}
      </div>
    </>
  );
}
