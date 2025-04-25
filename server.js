// server.js (Express + Square Checkout + Product Listing)

f3433f7
server.js
@@ -1,9 +1,10 @@
// server.js (Express + Square Checkout + Product Listing)

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import { Client, Environment } from "square";
dotenv.config();

global.fetch = fetch;

@@ -13,6 +14,14 @@ const port = process.env.PORT || 5001;

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

@@ -26,6 +35,7 @@ const categoryMap = {
  // Add more actual category mappings here
};

// ✅ GET /products – fetch product list from Square
app.get("/products", async (req, res) => {
  try {
    let allItems = [];


@@ -86,17 +96,50 @@ app.get("/products", async (req, res) => {
          category_id: item.item_data.category_id || null,
          category_name:
            categoryMap[item.item_data.category_id] || "Uncategorized",
          created_at: item.created_at || new Date().toISOString(),
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