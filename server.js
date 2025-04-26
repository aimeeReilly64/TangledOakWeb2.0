app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

    if (!response.ok) throw new Error(`Square API error! Status: ${response.status}`);

    const data = await response.json();
    const item = data.objects.find((obj) => obj.id === id);

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    const variation = item.item_data?.variations?.[0];
    const price = variation?.item_variation_data?.price_money;
    const imageUrl = item.item_data?.ecom_image_uris?.[0] || "https://via.placeholder.com/300x300?text=No+Image";

    const product = {
      id: item.id,
      name: item.item_data?.name || "Unnamed Product",
      description: item.item_data?.description || "",
      price: price?.amount ? price.amount / 100 : 0,
      currency: price?.currency || "CAD",
      image_url: imageUrl,
      product_url: item.item_data?.ecom_uri || "#",
      category_id: item.item_data?.category_id || null,
    };

    res.json({ product });
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});
