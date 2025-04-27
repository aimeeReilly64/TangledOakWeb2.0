// server.js

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
dotenv.config();

// Setup globals
global.fetch = fetch;

const app = express();
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.use(cors());
app.use(express.json());

// ✅ Square API Setup
const SQUARE_API_URL = "https://connect.squareup.com/v2/catalog/search";
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

// ✅ Optional: Map category UUIDs to friendly names
const categoryMap = {
  "UUID_FOR_JEWELRY": "Jewelry",
  "UUID_FOR_CLOTHING": "Clothing",
  "UUID_FOR_ACCESSORIES": "Accessories",
  "UUID_FOR_CRYSTALS": "Crystals",
  // Add more mappings here
};

// ✅ API endpoint to fetch products
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
          object_types: ["ITEM"],
          ...(cursor && { cursor }),
        }),
      });

      if (!response.ok) {
        throw new Error(`Square API error! Status: ${response.status}`);
      }

      const data = await response.json();
      const items = data.objects || [];
      allItems = [...allItems, ...items];
      cursor = data.cursor;
    } while (cursor);

    const products = allItems
      .filter(
        (item) =>
          item.type === "ITEM" &&
          item.item_data &&
          !item.is_deleted &&
          item.item_data.variations?.some((v) => !v.is_deleted)
      )
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
          category_id: item.item_data.category_id || null,
          category_name: categoryMap[item.item_data.category_id] || "Uncategorized",
          created_at: item.created_at || new Date().toISOString(),
        };
      });

    res.json({ products });
  } catch (error) {
    console.error("🚨 Error fetching products:", error.message);
    res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
  }
});

// ✅ Catch-all route to serve React app for frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
