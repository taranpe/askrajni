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
export default async function ServiceDetailPage(props: { params: Promise<Params> }) {
  // ✅ Unwrap the async params
  const { id } = await props.params;

  if (!id) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Invalid service</h2>
      </div>
    );
  }

  try {
    // ✅ Use relative URL instead of localhost
    const res = await fetch(`/api/services/${id}`, { cache: "no-store" });

    if (!res.ok) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Service not found</h2>
        </div>
      );
    }

    const service: Service = await res.json();

    if (!service || !service.image_url) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Service data is invalid</h2>
        </div>
      );
    }

    return <ServiceDetailClient service={service} />;
  } catch (err) {
    console.error("Failed to fetch service:", err);
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Error fetching service</h2>
      </div>
    );
  }
}
