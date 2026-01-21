// app/(site)/services/[id]/page.tsx
import ServiceDetailClient from "./ServiceDetailClient";

interface Params {
  id: string;
}

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  old_price?: number;
  discount?: string;
  description?: string;
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  if (!id) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Invalid service</h2>
      </div>
    );
  }

  try {
    // ✅ MUST use absolute URL on Vercel
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Service not found</h2>
        </div>
      );
    }

    const json = await res.json();
    const service: Service = json.data;

    if (!service || !service.image_url) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Service data is invalid</h2>
        </div>
      );
    }

    return <ServiceDetailClient service={service} />;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Error fetching service</h2>
      </div>
    );
  }
}
