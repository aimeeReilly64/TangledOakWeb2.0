import React from "react";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const VendorInfo = () => {
  const vendors = [
    {
      name: "Bohemian Heart Crafts",
      owner: "Aimee Reilly",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/bohemianheartcrafts/",
      website: "https://bohemianheartcrafts.ca",
    },
    {
      name: "Knit with Love by Carol",
      owner: "Carol",
      location: "North Bay, ON",
    },
    {
      name: "Peddie Pieces",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "The Knotty Celt",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Candy's Dandy Crafts",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Mos Craftworks",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Spoons & Stuff",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Tags & Tropics",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Cosmically Connected",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Soap & Seed",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Knit's by Marsha Ann",
      owner: "Marsha Ann",
      location: "North Bay, ON",
    },
    {
      name: "Cheese & Stuffs",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Muddy Paws Raw",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "Top to Toe Knits",
      owner: "",
      location: "North Bay, ON",
    },
    {
      name: "She Keeps Bees",
      owner: "",
      location: "South River, ON",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Vendors | The Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Meet the vendors behind The Tangled Oak + Craft Collective. Discover local artisans from North Bay and beyond, and explore their handmade creations."
        />
        <meta
          name="keywords"
          content="handmade crafts, local artisans, North Bay, Ontario craft collective, artisan gifts, support local makers"
        />
      </Helmet>

      <div className="home-container">
        <div className="main-content">
          <div className="context-box">
            <h2>Meet Our Makers</h2>
            <p>
              These are the artisans who’ve brought their creations to Tangled
              Oak. Every piece you find here is handmade, local, and one-of-a-kind.
            </p>
          </div>

          {/* Grid container */}
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <div className="vendor-card" key={vendor.name}>
                <h3>{vendor.name}</h3>
                {vendor.owner && <p><strong>Maker:</strong> {vendor.owner}</p>}
                <p><strong>Location:</strong> {vendor.location}</p>
                <div className="vendor-links">
                  {vendor.instagram && (
                    <a
                      href={vendor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorInfo;
