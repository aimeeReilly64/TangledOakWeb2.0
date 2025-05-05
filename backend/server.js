// server.js

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
global.fetch = fetch;

const app = express();
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(cors({
  origin: ['https://www.tangledoak.ca', 'https://tangledoak.ca'],
  methods: ['GET', 'POST'],
  credentials: false
}));
app.use(express.json());

// Square API Setup
const SQUARE_API_URL = "https://connect.squareup.com/v2/catalog/search";
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

// Category mapping (update UUIDs)
const categoryMap = {
  "UUID_FOR_JEWELRY": "Jewelry",
  "UUID_FOR_CLOTHING": "Clothing",
  "UUID_FOR_ACCESSORIES": "Accessories",
  "UUID_FOR_CRYSTALS": "Crystals",
};

// ✅ Fetch all products including variations
app.get("/products", async (req, res) => {
  try {
    let allItems = [];
    let cursor = null;

    do {
      const response = await fetch(SQUARE_API_URL, {
        method: "POST",
        headers: {
          "Square-Version": "2025-02-20",
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object_types: ["ITEM", "ITEM_VARIATION", "IMAGE"],
          ...(cursor && { cursor }),
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error: ${response.status}`);
      }

      const data = await response.json();
      allItems = [...allItems, ...(data.objects || [])];
      cursor = data.cursor;
    } while (cursor);

    const products = allItems
      .filter(item => item.type === "ITEM" && item.item_data && !item.is_deleted)
      .map(item => {
        const variations = (item.item_data.variations || []).map(v => {
          const vData = v.item_variation_data;
          return {
            id: v.id,
            name: vData.name || "Default",
            sku: vData.sku || null,
            price: (vData.price_money?.amount || 0) / 100,
            currency: vData.price_money?.currency || "CAD",
            stock: vData.inventory_alert_type || null,
          };
        });

        const defaultPrice = variations[0] || { price: 0, currency: "CAD" };
        const imageUrl =
          item.item_data.ecom_image_uris?.[0] ||
          "https://via.placeholder.com/300x300?text=No+Image";

        return {
          id: item.id,
          name: item.item_data.name || "Unnamed",
          description: item.item_data.description || "",
          price: defaultPrice.price,
          currency: defaultPrice.currency,
          image_url: imageUrl,
          product_url: item.item_data.ecom_uri || "#",
          category_id: item.item_data.category_id || null,
          category_name: categoryMap[item.item_data.category_id] || "Uncategorized",
          created_at: item.created_at || new Date().toISOString(),
          variations, // ✅ Include all variation data
        };
      });

    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
  }
});

// ✅ Checkout route
app.post("/checkout", async (req, res) => {
  const { cart, fulfillmentMethod } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  const lineItems = cart.map((item) => ({
    name: item.name + (item.variation ? ` (${item.variation})` : ""),
    quantity: item.quantity.toString(),
    base_price_money: {
      amount: Math.round(item.price * 100),
      currency: item.currency || "CAD",
    },
  }));

  try {
    const response = await fetch("https://connect.squareup.com/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        "Square-Version": "2025-02-20",
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: process.env.SQUARE_LOCATION_ID,
          line_items: lineItems,
          note: `Fulfillment: ${fulfillmentMethod || "Not specified"}`,
        },
        checkout_options: {
          redirect_url: "https://www.tangledoak.ca/thank-you",
        },
      }),
    });

    const data = await response.json();

    if (response.ok && data.payment_link?.url) {
      res.json({ checkout_url: data.payment_link.url });
    } else {
      console.error("Square checkout error:", data);
      res.status(500).json({ error: "Failed to create checkout session." });
    }
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Server error during checkout." });
  }
});

// Catch-all for frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
