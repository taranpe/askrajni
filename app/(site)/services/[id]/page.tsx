// app/(site)/services/[id]/page.tsx
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  old_price?: number;
  discount?: string;
  description?: string;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    return <h2 style={{ textAlign: "center" }}>Invalid service</h2>;
  }

  const res = await fetch(`/api/services/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h2 style={{ textAlign: "center" }}>Service not found</h2>;
  }

  const service: Service = await res.json();

  return <ServiceDetailClient service={service} />;
}
