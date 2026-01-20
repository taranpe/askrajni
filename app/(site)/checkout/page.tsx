"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const qty = searchParams.get("qty");

  return (
    <div style={{ maxWidth: "900px", margin: "60px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Checkout</h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <p><strong>Service ID:</strong> {serviceId}</p>
        <p><strong>Quantity:</strong> {qty}</p>

        <button
          style={{
            marginTop: "20px",
            background: "#1E88E5",
            color: "#fff",
            border: "none",
            padding: "14px 40px",
            borderRadius: "30px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
}
