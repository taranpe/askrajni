import { notFound } from "next/navigation";
import ServicesSection from "@/components/home/ServicesSection";

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  // 🔥 ABSOLUTE URL (THIS FIXES THE ERROR)
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://askrajni.vercel.app";

  const res = await fetch(`${baseUrl}/api/collections/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const services = await res.json();

  // 🔒 Extra safety
  if (!services || services.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="pt-10">
      <ServicesSection services={services} />
    </div>
  );
}
