// server.js (older version before category mapping and created_at)

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

app.get("/products", async (req, res) => {
  try {
    const response = await fetch(SQUARE_API_URL, {
      method: "POST",
      headers: {
        "Square-Version": "2025-02-20",
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        object_types: ["ITEM", "IMAGE"],
      }),
    });

    if (!response.ok) {
      throw new Error(`Square API error! Status: ${response.status}`);
    }

    const data = await response.json();
    const objects = data.objects || [];

    const items = objects.filter((obj) => obj.type === "ITEM");
    const images = objects.filter((obj) => obj.type === "IMAGE");

    const enrichedProducts = items.map((item) => {
      const imageId = item.item_data?.image_ids?.[0];
      const image = images.find((img) => img.id === imageId);

      const variation = item.item_data?.variations?.[0];
      const price = variation?.item_variation_data?.price_money;

      return {
        id: item.id,
        name: item.item_data?.name || "Unnamed Product",
        description: item.item_data?.description || "",
        price: price?.amount ? price.amount / 100 : 0,
        currency: price?.currency || "CAD",
        image_url: image?.image_data?.url || "https://via.placeholder.com/300x300?text=No+Image",
        product_url: item.item_data?.ecom_uri || "#",
        category_id: item.item_data?.category_id || null,
      };
    });

    res.json({ products: enrichedProducts });
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
