export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

// Helper to get absolute URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

// ✅ Fetch SINGLE service by ID
async function getService(id: string) {
  try {
    const res = await fetch(
      `${getBaseUrl()}/api/services/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error("Service fetch error:", err);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getService(params.id);

  if (!service) {
    return <p style={{ padding: 20 }}>Error fetching service</p>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>Price: ₹{service.price}</p>
    </main>
  );
}
