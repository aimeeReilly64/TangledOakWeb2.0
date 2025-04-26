// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

global.fetch = fetch;

const app = express();
const port = process.env.PORT || 5001;

const SQUARE_API_URL = "https://connect.squareup.com/v2/catalog/search";
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

app.use(cors());
app.use(express.json());

// Helper to format a product object
const formatProduct = (item) => {
  const variation = item.item_data?.variations?.[0];
  const price = variation?.item_variation_data?.price_money;
  const imageUrl = item.item_data?.ecom_image_uris?.[0] || "https://via.placeholder.com/300x300?text=No+Image";

  return {
    id: item.id,
    name: item.item_data?.name || "Unnamed Product",
    description: item.item_data?.description || "",
    price: price?.amount ? price.amount / 100 : 0,
    currency: price?.currency || "CAD",
    image_url: imageUrl,
    product_url: item.item_data?.ecom_uri || "#",
    category_id: item.item_data?.category_id || null,
    created_at: item.created_at || new Date().toISOString(),
  };
};

// Fetch all products
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
      .filter((item) => item.type === "ITEM" && !item.is_deleted)
      .map(formatProduct);

    res.json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Fetch single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

    const item = allItems.find((obj) => obj.id === id);

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = formatProduct(item);

    res.json({ product });
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
