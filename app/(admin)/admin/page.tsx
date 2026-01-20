export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-6">
        Welcome to Admin Panel
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Banners</p>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Desktop Banners</p>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Mobile Banners</p>
          <p className="text-3xl font-bold mt-2">—</p>
        </div>
      </div>
    </div>
  );
}
