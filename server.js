// server.js (ESM-compatible with fetch working)

import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
global.fetch = fetch;

const app = express();
const port = process.env.PORT || 5001;

const SQUARE_API_URL = "https://connect.squareup.com/v2/catalog/list";
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

app.use(cors());
app.use(express.json());

// Category ID to readable name mapping
const categoryMap = {
  "UUID_FOR_JEWELRY": "Jewelry",
  "UUID_FOR_CLOTHING": "Clothing",
  "UUID_FOR_ACCESSORIES": "Accessories",
  "UUID_FOR_CRYSTALS": "Crystals",
  // Add the rest of your actual Square category_ids here
};

app.get("/products", async (req, res) => {
  try {
    const response = await fetch(SQUARE_API_URL, {
      method: "GET",
      headers: {
        "Square-Version": "2025-02-20",
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Square API error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.objects || !Array.isArray(data.objects)) {
      return res.json({ products: [] });
    }

    const products = data.objects
      .filter((item) => item.type === "ITEM" && item.item_data && !item.is_deleted)
      .map((item) => {
        const variation = item.item_data.variations?.[0];
        const priceData = variation?.item_variation_data?.price_money || {
          amount: 0,
          currency: "CAD",
        };
        const imageUrl =
          item.item_data.ecom_image_uris?.[0] ||
          "https://via.placeholder.com/300x300?text=No+Image";

        return {
          id: item.id,
          name: item.item_data.name || "Unnamed",
          description: item.item_data.description || "",
          price: priceData.amount / 100,
          currency: priceData.currency || "CAD",
          image_url: imageUrl,
          product_url: item.item_data.ecom_uri || "#",
          category_id: item.category_id || null,
          category_name: categoryMap[item.category_id] || "Uncategorized",
        };
      });

    res.json({ products });
  } catch (error) {
    console.error("🚨 Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

