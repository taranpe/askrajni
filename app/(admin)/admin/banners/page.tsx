import BannerForm from "@/components/admin/BannerForm";
export const dynamic = "force-dynamic";

export default function BannerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Banner Management
      </h1>

      <BannerForm />
    </div>
  );
}
