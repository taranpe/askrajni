import ServicesSection from "@/components/home/ServicesSection";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: PageProps) {
  // Correct fetch syntax
  const res = await fetch(`/api/collections/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-10 text-center text-gray-500">
        No products found
      </div>
    );
  }

  const services = await res.json();

  return (
    <div className="pt-10">
      <ServicesSection services={services} />
    </div>
  );
}
