import HeroBuyOne from "@/components/home/HeroBuyOne";
import Collections, { Collection } from "@/components/home/Collections";
import RudrakshaCollection from "@/components/home/RudrakshaCollection";
import BraceletCollection from "@/components/home/BraceletCollection";
import VastuRemediesCollection from "@/components/home/VastuRemediesCollection";
import ConsultationServiceCollection from "@/components/home/ConsultationServiceCollection";
import GemstonesCollection from "@/components/home/GemstonesCollection";
import { db } from "@/lib/db";

export default async function HomePage() {
  // 🔹 Fetch banners
  const [banners]: any = await db.query(
    "SELECT * FROM banners ORDER BY id DESC"
  );

  // 🔹 Fetch collections
  const [collectionsResult]: any = await db.query(
    "SELECT * FROM collections ORDER BY id DESC"
  );

  const collections: Collection[] = collectionsResult.map((c: any) => ({
    id: c.id,
    name: c.name,
    image_url: c.image_url || "",
    slug: c.slug,
  }));

  // 🔹 Rudraksha
  const [rudrakshaServices]: any = await db.query(`
    SELECT s.*
    FROM services s
    JOIN collections c ON s.collection_id = c.id
    WHERE c.slug = 'rudraksha'
    ORDER BY s.id DESC
  `);

  // 🔹 Bracelet
  const [braceletServices]: any = await db.query(`
    SELECT s.*
    FROM services s
    JOIN collections c ON s.collection_id = c.id
    WHERE c.slug = 'bracelet'
    ORDER BY s.id DESC
  `);

  // 🔹 Vastu Remedies
  const [vastuRemediesServices]: any = await db.query(`
    SELECT s.*
    FROM services s
    JOIN collections c ON s.collection_id = c.id
    WHERE c.slug = 'vastu-remedies'
    ORDER BY s.id DESC
  `);

  // 🔹 Consultation Service
  const [consultationServices]: any = await db.query(`
    SELECT s.*
    FROM services s
    JOIN collections c ON s.collection_id = c.id
    WHERE c.slug = 'consultation-service'
    ORDER BY s.id DESC
  `);

  // 🔹 Gemstones
  const [gemstonesServices]: any = await db.query(`
    SELECT s.*
    FROM services s
    JOIN collections c ON s.collection_id = c.id
    WHERE c.slug = 'gemstones'
    ORDER BY s.id DESC
  `);

  return (
    <>
      {/* 🔹 Hero banner */}
      <HeroBuyOne banners={banners || []} />

      {/* 🔹 Collections overview */}
      <Collections collections={collections} />

      {/* 🔹 Product sections */}
      <RudrakshaCollection services={rudrakshaServices || []} />
      <BraceletCollection services={braceletServices || []} />
      <VastuRemediesCollection services={vastuRemediesServices || []} />
      <ConsultationServiceCollection services={consultationServices || []} />
      <GemstonesCollection services={gemstonesServices || []} />
    </>
  );
}
