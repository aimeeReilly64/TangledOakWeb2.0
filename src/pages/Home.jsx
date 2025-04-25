import React from "react";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Discover locally made artisanal goods, unique crafts, and one-of-a-kind finds at Tangled Oak + Craft Collective in North Bay, Ontario."
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
            <a href="/shop" className="button">
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
              Monday: 11 AM - 4 PM<br />
              Tuesday: 11 AM -4 PM<br />
              Wednesday: 11 AM - 4 PM<br />
              Thursday: 11 AM - 4 PM<br />
              Friday: 11 AM - 4 PM<br />
              Saturday: 10 AM - 3 PM<br />
              Sunday: CLOSED <br/>
            </p>
          </div> 

          <div className="context-box">
            <h2>Where You Can Find Us</h2>
            <p>
              150 Oak Street W, North Bay, ON<br />
              Email: store@tangledoak.ca<br />
              Phone: (705) 201-2300
            </p>
            <br />
            <div className="map-container">
              <h2>Find Us on the Map</h2>
              <iframe
                className="map"
                width="80%"
                style={{ border: "2px solid #203a13" }}
                loading="lazy"
                allowFullScreen
                title="Tangled Oak Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.934228632341!2d-79.46534059999999!3d46.311143699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d29aa9cbd52da61%3A0x5ba29b1fbf8394f9!2s150%20Oak%20St%20W%2C%20North%20Bay%2C%20ON%20P1B%202S7!5e0!3m2!1sen!2sca!4v1742343151470!5m2!1sen!2sca"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
