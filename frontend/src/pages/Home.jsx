import React from "react";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const Home = () => {
  return (
    <>
      <Helmet>
       <title>Local Artisans & Handmade Goods | Tangled Oak + Craft Collective</title>
        <meta name="p:domain_verify" content="6452806078603ed37e07237d4002c6ef"/>
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
          
          {/* Featured Vendors */}
          <div className="context-box">
            <h2>Featured Vendors</h2>
            <img
              src="/views/images/feature.png"
              alt="Featured Vendors in the store"
              className="feature-img"
            />
            <br />
            <a href="https://the-tangled-oak-craft-collective.square.site" className="button">
              Browse All Products
            </a>
          </div>

          {/* About Section */}
          <div className="context-box">
            <h2>About Us</h2>
            <p>
              Founded with a passion for craftsmanship,<br />
              The Tangled Oak + Craft Collective brings together talented artisans
              from North Bay and beyond.<br />
              Every product tells a story, celebrating the artistry and dedication of
              makers.
            </p>
            <a href="/about" className="button">
              Learn More
            </a>
          </div>

          {/* Hero Section with Two Images */}
          <div className="context-box">
            
            <h2>Discover Handmade Treasures, Crafted with Heart</h2>
          
              <img
                src="/views/images/shopFront2.jpg"
                alt="Storefront from sidewalk"
                className="hero-img"
              />
          
            <div className="hero-text">
              Locally made artisanal goods, unique crafts, and one-of-a-kind finds.
            </div>
            <br />
            <a
              href="https://the-tangled-oak-craft-collective.square.site"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop Now
            </a>
          </div>

          {/* Hours & Location */}
          <div className="context-box">
            <h2>Hours of Operation</h2>
            <p className="hours-text">
            We are permanently closed. If you would like information about one of our past vendors, check out the 'Vendor Info' section.
            Feel free reach out to us on social media or via email at store@tangledoak.ca if you have any questions.
            </p>
          </div> 

          <div className="context-box">
            <h2>Where You Can Find Us</h2>
            <p>
              Email: store@tangledoak.ca<br />
            </p>
            <br />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
