// server.js (Express + Square Checkout + Product Listing)

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import { Client, Environment } from "@square/square";

dotenv.config();

global.fetch = fetch;

const app = express();
const port = process.env.PORT || 5001;

const SQUARE_API_URL = "https://connect.squareup.com/v2/catalog/search";
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

const squareClient = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Production, // change to Environment.Sandbox for testing
});

const { checkoutApi } = squareClient;

app.use(cors());
app.use(express.json());

// Replace these with your actual Square category UUIDs
const categoryMap = {
  "UUID_FOR_JEWELRY": "Jewelry",
  "UUID_FOR_CLOTHING": "Clothing",
  "UUID_FOR_ACCESSORIES": "Accessories",
  "UUID_FOR_CRYSTALS": "Crystals",
  // Add more actual category mappings here
};

// ✅ GET /products – fetch product list from Square
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
        const variation =
          item.item_data.variations.find((v) => !v.is_deleted) || {};
        const priceData = variation.item_variation_data?.price_money || {
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
          created_at: item.created_at ?? null, // ✅ Don't fallback to new Date()
        };
      });

    res.json({ products });
  } catch (error) {
    console.error("🚨 Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ POST /checkout – create Square checkout link
app.post("/checkout", async (req, res) => {
  const { cart } = req.body;

  try {
    const lineItems = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: Math.round(item.price * 100), // convert dollars to cents
        currency: item.currency || "CAD",
      },
    }));

    const response = await checkoutApi.createCheckout(SQUARE_LOCATION_ID, {
      idempotencyKey: `${Date.now()}-${Math.random()}`,
      order: {
        order: {
          locationId: SQUARE_LOCATION_ID,
          lineItems,
        },
      },
      redirectUrl: "https://tangledoak.ca/order-confirmation", // ✅ Update this to your live confirmation page
    });

    res.json({ checkout_url: response.result.checkout.checkoutPageUrl });
  } catch (error) {
    console.error("❌ Square Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
