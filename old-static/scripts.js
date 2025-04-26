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
  
      const { objects } = await response.json();
  
      const items = objects.filter(obj => obj.type === "ITEM");
      const images = objects.filter(obj => obj.type === "IMAGE");
      const variations = objects.filter(obj => obj.type === "ITEM_VARIATION");
  
      // Attach image and price info to each item
      const enrichedItems = items.map(item => {
        const variationId = item.item_data?.variations?.[0]?.id;
        const variation = variations.find(v => v.id === variationId);
        const imageId = item.item_data?.image_ids?.[0];
        const image = images.find(img => img.id === imageId);
  
        return {
          id: item.id,
          name: item.item_data?.name,
          description: item.item_data?.description,
          price: variation?.item_variation_data?.price_money?.amount ?? null,
          currency: variation?.item_variation_data?.price_money?.currency ?? "CAD",
          image_url: image?.image_data?.url ?? null,
          category_id: item.category_id,
          vendor: item.item_data?.description || "", // Optional fallback
        };
      });
  
      res.json({ products: enrichedItems });
    } catch (error) {
      console.error("🚨 Error fetching products:", error.message);
      res.status(500).json({ error: "Failed to fetch products." });
    }
  });
  