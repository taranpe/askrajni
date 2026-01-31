import HeroBuyOne from "@/components/home/HeroBuyOne";
import Collections, { Collection } from "@/components/home/Collections";
import RudrakshaCollection from "@/components/home/RudrakshaCollection";
import BraceletCollection from "@/components/home/BraceletCollection";
import VastuRemediesCollection from "@/components/home/VastuRemediesCollection";
import ConsultationServiceCollection from "@/components/home/ConsultationServiceCollection";
import GemstonesCollection from "@/components/home/GemstonesCollection";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    /* ===================== BANNERS ===================== */
    const [banners]: any = await db.query(
      "SELECT * FROM banners WHERE is_active=1 ORDER BY banner_type, position ASC"
    );

    /* ===================== COLLECTIONS ===================== */
    const [collectionsResult]: any = await db.query(
      "SELECT * FROM collections ORDER BY id DESC"
    );

    const collections: Collection[] = (collectionsResult || []).map(
      (c: any) => ({
        id: c.id,
        name: c.name,
        image_url: c.image_url || "",
        slug: c.slug,
      })
    );

    /* ===================== RUDRAKSHA ===================== */
    const [rudrakshaServices]: any = await db.query(`
      SELECT s.*
      FROM services s
      JOIN collections c ON s.collection_id = c.id
      WHERE c.slug = 'rudraksha'
        AND s.is_active = 1
      ORDER BY s.id DESC
    `);

    /* ===================== BRACELET ===================== */
    const [braceletServices]: any = await db.query(`
      SELECT s.*
      FROM services s
      JOIN collections c ON s.collection_id = c.id
      WHERE c.slug = 'bracelet'
        AND s.is_active = 1
      ORDER BY s.id DESC
    `);

    /* ===================== VASTU REMEDIES ===================== */
    const [vastuRemediesServices]: any = await db.query(`
      SELECT s.*
      FROM services s
      JOIN collections c ON s.collection_id = c.id
      WHERE c.slug = 'vastu-remedies'
        AND s.is_active = 1
      ORDER BY s.id DESC
    `);

    /* ===================== CONSULTATION ===================== */
    const [consultationServices]: any = await db.query(`
      SELECT s.*
      FROM services s
      JOIN collections c ON s.collection_id = c.id
      WHERE c.slug = 'consultation-service'
        AND s.is_active = 1
      ORDER BY s.id DESC
    `);

    /* ===================== GEMSTONES ===================== */
    const [gemstonesServices]: any = await db.query(`
      SELECT s.*
      FROM services s
      JOIN collections c ON s.collection_id = c.id
      WHERE c.slug = 'gemstones'
        AND s.is_active = 1
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
  } catch (error) {
    console.error("Homepage error:", error);

    /* 🔥 NEVER crash homepage */
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Something went wrong</h2>
        <p>Please refresh or try again later.</p>
      </div>
    );
  }
}
