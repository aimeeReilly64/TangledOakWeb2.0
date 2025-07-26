import React from "react";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const VendorInfo = () => {
  const vendors = [
    {
      name: "Bohemian Heart Crafts",
      craft: "Crochet, Leather Embroidery and Wood Crafts and Decor",
      owner: "Aimee",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/bohemian0heart/",
      facebook: "https://www.facebook.com/Bohemian0Heart",
      email: "bohemian0heart@gmail.com"
    },
    {
      name: "Knit with Love by Carol",
      owner: "Carol",
      location: "Callandar, ON",
      facebook: "https://www.facebook.com/knitbycarol",
    },
    {
      name: "Peddie Pieces",
      owner: "Christine",
      location: "Callandar, ON",
      instagram: "https://www.instagram.com/peddiepieces/",
      facebook: "https://www.facebook.com/profile.php?id=61572681103901&sk=about",
    },
    {
      name: "The Knotty Celt",
      owner: "Natalie",
      location: "North Bay, ON",
      facebook: "https://www.facebook.com/profile.php?id=100089279288493",
    },
    {
      name: "Candy's Dandy Crafts",
      owner: "Candy",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/candysdandycrafts/",
      facebook: "https://www.facebook.com/candysdandycrafts",
      website: "https://candysdandycrafts.square.site/",
    },
    {
      name: "Mo's Craftworks",
      owner: "Maureen",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/mos_craftworks/",
      facebook: "https://www.facebook.com/MosCraftworks",
    },
    {
      name: "Spoons & Stuff",
      owner: "Christine",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/spoonsandstuff/",
      facebook: "https://www.facebook.com/spoonsandstuff",
    },
    {
      name: "Tags & Tropics",
      owner: "Shawna",
      location: "Callandar, ON",
      instagram: "https://www.instagram.com/tagsandtropics/",
      facebook: "https://www.facebook.com/tagsandtropics",
    },
    {
      name: "Cosmically Connected",
      owner: "Shelby",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/cosmicallyconnected/",
      facebook: "https://www.facebook.com/cosmicallyconnected",
      website: "https://cosmicallyconnected.ca/",
    },
    {
      name: "Soap & Seed",
      owner: "Josee",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/soapandseed/",
      facebook: "https://www.facebook.com/soapandseed",
      website: "https://soapandseed.ca/",
    },
    {
      name: "Knit's by Marsha Ann",
      owner: "Marsha",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/knitsbymarshaann/",
      facebook: "https://www.facebook.com/knitsbymarshaann",
    },
    {
      name: "Cheese & Stuffs",
      owner: "Aura",
      location: "North Bay, ON",
      instagram: "https://www.instagram.com/cheeseandstuffs/",
      facebook: "https://www.facebook.com/cheeseandstuffs",
    },
    {
      name: "Muddy Paws Raw",
      owner: "",  
      location: "North Bay, ON",
    },
    {
      name: "Top to Toe Knits",
      owner: "Avril",
      location: "North Bay, ON",
    },
    {
      name: "She Keeps Bees",
      owner: "Megan",
      location: "South River, ON",
      instagram: "https://www.instagram.com/shekeepsbees/",
      facebook: "https://www.facebook.com/shekeepsbees",
      website: "https://shekeepsbees.ca/",
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

      {/* Page Header */}
      <div className="context-box">
        <h2>Meet Our Makers</h2>
        <p>
          These are the artisans who’ve brought their creations to The Tangled Oak.
          Every piece you find here is handmade, local, and one-of-a-kind.
        </p>
      </div>

      {/* Vendor Grid */}
    <div className="vendor-card" key={vendor.name}>
  <h3>{vendor.name}</h3>

  {/* Craft/Art Type */}
  {vendor.craft && <p><strong>Craft:</strong> {vendor.craft}</p>}

  {/* Maker Name */}
  {vendor.owner && <p><strong>Maker:</strong> {vendor.owner}</p>}

  {/* Location */}
  <p><strong>Location:</strong> {vendor.location}</p>

  {/* Email */}
  {vendor.email && (
    <p>
      <strong>Email:</strong>{" "}
      <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
    </p>
  )}

  {/* Social Links */}
  <div className="vendor-links">
    {vendor.instagram && (
      <a href={vendor.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    )}
    {vendor.facebook && (
      <a href={vendor.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
    )}
    {vendor.website && (
      <a href={vendor.website} target="_blank" rel="noopener noreferrer">
        Website
      </a>
    )}
  </div>
</div>

    </>
  );
};

export default VendorInfo;
