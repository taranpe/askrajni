import HeroBuyOne from "@/components/home/HeroBuyOne";
import ServicesSection from "@/components/home/ServicesSection";

export const dynamic = "force-dynamic";

// fetch from API route instead of direct DB
async function getBanners() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/banners`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Failed to fetch banners:", err);
    return [];
  }
}

async function getServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return [];
  }
}

export default async function HomePage() {
  const banners = await getBanners();
  const services = await getServices();

  return (
    <>
      <HeroBuyOne banners={banners || []} />
      <ServicesSection services={services || []} />
    </>
  );
}
