// app/(site)/services/[id]/page.tsx
import { notFound } from "next/navigation";
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
    notFound();
  }

  // 🔥 ABSOLUTE URL (THIS FIXES THE ERROR)
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://askrajni.vercel.app";

  const res = await fetch(`${baseUrl}/api/services/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const service: Service = await res.json();

  // 🔥 SAFETY GUARD (old /uploads data ke liye)
  if (!service || !service.id) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
