import ServiceDetailClient from "./ServiceDetailClient";

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
  params: { id: string };
}) {
  const id = params.id;

  if (!id) {
    return <h2 style={{ padding: 40 }}>Invalid service</h2>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h2 style={{ padding: 40 }}>Service not found</h2>;
  }

  const json = await res.json();
  const service: Service = json.data;

  return <ServiceDetailClient service={service} />;
}
