import { headers } from "next/headers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

// ✅ Correct base URL (async headers)
async function getBaseUrlFromHeaders() {
  const headersList = await headers(); // 👈 FIX HERE
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

async function getService(id: string) {
  try {
    const baseUrl = await getBaseUrlFromHeaders();

    const res = await fetch(
      `${baseUrl}/api/services/${id}`,
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
    return (
      <main style={{ padding: 20 }}>
        <h2>Error fetching service</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>Price: ₹{service.price}</p>
    </main>
  );
}
