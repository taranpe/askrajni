import HeroBuyOne from "@/components/home/HeroBuyOne";
import ServicesSection from "@/components/home/ServicesSection";

export const dynamic = "force-dynamic";

// Helper to get absolute URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    // Vercel deployment
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return "http://localhost:3000";
}

// Fetch banners
async function getBanners() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/banners`, { cache: "no-store" });
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

// Fetch services
async function getServices() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/services`, { cache: "no-store" });
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
    <main style={{ padding: "20px" }}>
      <HeroBuyOne banners={banners || []} />

      <h2>Services</h2>
      {(!services || services.length === 0) && <p>No services found</p>}

      {services?.map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
        </div>
      ))}

      <ServicesSection services={services || []} />
    </main>
  );
}
