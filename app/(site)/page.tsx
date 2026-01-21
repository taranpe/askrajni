import HeroBuyOne from "@/components/home/HeroBuyOne";
import ServicesSection from "@/components/home/ServicesSection";
import { db } from "@/lib/db"; // your MySQL connection

export default async function HomePage() {
  // Fetch banners
  const [banners]: any = await db.query(
    "SELECT * FROM banners WHERE is_active = 1 ORDER BY id DESC"
  );

  // Fetch services
  const [services]: any = await db.query(
    "SELECT * FROM services WHERE is_active = 1 ORDER BY id DESC"
  );

  return (
    <>
      <HeroBuyOne banners={banners || []} />
      <ServicesSection services={services || []} />
    </>
  );
}
