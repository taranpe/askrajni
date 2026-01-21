import HeroBuyOne from "@/components/home/HeroBuyOne";
import ServicesSection from "@/components/home/ServicesSection";

export const dynamic = "force-dynamic";

// Helper to get absolute URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

// Fetch banners
async function getBanners() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/banners`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error("Banner fetch error:", err);
    return [];
  }
}

// ✅ Fetch ALL services (NO HARDCODE)
async function getServices() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/services`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();

    // Ensure array
    return Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error("Services fetch error:", err);
    return [];
  }
}

export default async function HomePage() {
  const banners = await getBanners();
  const services = await getServices();

  return (
    <main style={{ padding: "20px" }}>
      <HeroBuyOne banners={banners} />

      <h2>Services</h2>

      {services.length === 0 && <p>No services found</p>}

      {services.map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <ServicesSection services={services} />
    </main>
  );
}
