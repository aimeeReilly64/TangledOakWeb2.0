import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
        <title>Local Art, Crafts & Gifts | Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Discover locally made artisanal goods, unique crafts, and one-of-a-kind gifts at Tangled Oak + Craft Collective in North Bay, Ontario."
        />
        <meta
          name="keywords"
          content="handmade crafts, local artisans, North Bay, Ontario, home decor, jewelry, pottery, woodworking, Canadian artisans"
        />
      </Helmet>

      <div className="home-container">
        <div className="main-content">
          <div className="context-box">
            <h2>Featured Vendors</h2>
            <p>
              Here's a list of the vendors we have had in the shop, a little
              information about what they make, and where to find/contact them.
            </p>
          </div>

          {vendors.map((vendor) => (
            <div className="context-box" key={vendor.name}>
              <h2>{vendor.name}</h2>
              <p>
                {vendor.owner && <>{vendor.owner}<br /></>}
                {vendor.location}<br />
                {vendor.instagram && (
                  <>
                    <a
                      href={vendor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <br />
                  </>
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
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorInfo;
