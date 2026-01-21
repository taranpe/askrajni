"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: number;
  title: string;
  image_url: string;
  price: number;
  old_price?: number;
  discount?: string;
  description?: string;
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => quantity > 1 && setQuantity((q) => q - 1);

  // 👉 BUY NOW FUNCTION
  const handleBuyNow = () => {
    router.push(`/checkout?serviceId=${service.id}&qty=${quantity}`);
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        gap: "60px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
      }}
    >
      {/* ================= LEFT IMAGE ================= */}
      <div style={{ flex: "0 0 460px" }}>
        <img
          src={service.image_url}
          alt={service.title}
          style={{
            width: "100%",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div style={{ flex: "1 1 auto", maxWidth: "700px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "10px" }}>
          {service.title}
        </h1>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#F9A825" }}>
            ₹{service.price}
          </span>

          {service.old_price && (
            <span
              style={{
                fontSize: "18px",
                textDecoration: "line-through",
                color: "#9E9E9E",
              }}
            >
              ₹{service.old_price}
            </span>
          )}

          {service.discount && (
            <span
              style={{
                background: "#FFE082",
                color: "#5D4037",
                fontSize: "13px",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: "20px",
              }}
            >
              {service.discount} OFF
            </span>
          )}
        </div>

        {/* Rating */}
        <div style={{ margin: "12px 0", color: "#FFC107" }}>
          ★★★★★ <span style={{ color: "#777" }}>(3 Reviews)</span>
        </div>

        {/* Description */}
        {service.description && (
          <p
            style={{
              fontSize: "16px",
              color: "#555",
              lineHeight: 1.7,
              marginBottom: "22px",
            }}
          >
            {service.description}
          </p>
        )}

        {/* Quantity */}
        <div
          style={{
            background: "#E3F2FD",
            padding: "14px 18px",
            borderRadius: "30px",
            width: "fit-content",
            marginBottom: "26px",
          }}
        >
          <strong style={{ marginRight: "14px" }}>QUANTITY</strong>
          <button onClick={decreaseQty} style={qtyBtn}>
            −
          </button>
          <span style={{ margin: "0 14px", fontWeight: 600 }}>{quantity}</span>
          <button onClick={increaseQty} style={qtyBtn}>
            +
          </button>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "18px" }}>
          <button style={cartBtn}>ADD TO CART</button>
          <button style={buyNowBtn} onClick={handleBuyNow}>
            BUY NOW
          </button>
        </div>

        {/* ================= INFO BAR ================= */}
        <div
          style={{
            marginTop: "36px",
            background: "#1E3A5F",
            borderRadius: "16px",
            padding: "28px 26px",
            display: "flex",
            gap: "20px",
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
        >
          <InfoItem
            img="https://cdn.shopify.com/s/files/1/0732/4637/6250/files/free_shipping_product_key_points_image_6.webp"
            title="Free Shipping"
            text="Free Shipping on all Products"
          />
          <InfoItem
            img="https://cdn.shopify.com/s/files/1/0732/4637/6250/files/free_shipping_product_key_points_image_6.webp"
            title="COD Available"
            text="Cash on Delivery"
          />
          <InfoItem
            img="https://cdn.shopify.com/s/files/1/0732/4637/6250/files/prepaid_product_key_points_image_6.webp"
            title="Prepaid"
            text="2 Free Rudraksha"
          />
          <InfoItem
            img="https://cdn.shopify.com/s/files/1/0732/4637/6250/files/fast_delivery_product_key_points_image_6.webp"
            title="Fast Delivery"
            text="Within 4–6 working days"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const qtyBtn: React.CSSProperties = {
  border: "none",
  background: "#fff",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  cursor: "pointer",
  fontWeight: 700,
};

const cartBtn: React.CSSProperties = {
  background: "#FBC02D",
  border: "none",
  padding: "14px 36px",
  borderRadius: "30px",
  fontWeight: 700,
  cursor: "pointer",
};

const buyNowBtn: React.CSSProperties = {
  background: "#1E88E5",
  color: "#fff",
  border: "none",
  padding: "14px 40px",
  borderRadius: "30px",
  fontWeight: 700,
  cursor: "pointer",
};

function InfoItem({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: "140px",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "14px",
        padding: "20px 14px",
        textAlign: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <img
        src={img}
        alt={title}
        style={{
          width: "42px",
          height: "42px",
          marginBottom: "10px",
          objectFit: "contain",
        }}
      />
      <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>
        {title}
      </div>
      <div style={{ fontSize: "13px", opacity: 0.9 }}>{text}</div>
    </div>
  );
}
