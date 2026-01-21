import HeroBuyOne from "@/components/home/HeroBuyOne";
import ServicesSection from "@/components/home/ServicesSection";

export const dynamic = "force-dynamic";

// fetch from API route using relative URL (works both locally & on Vercel)
async function getBanners() {
  try {
    const res = await fetch("/api/banners", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch banners, status:", res.status);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Failed to fetch banners:", err);
    return [];
  }
}

async function getServices() {
  try {
    const res = await fetch("/api/services", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch services, status:", res.status);
      return [];
    }
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
