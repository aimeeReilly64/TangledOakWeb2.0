import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/styles.css";

const About = () => {
  return (
    <Layout>
      <div className="context-box">
        <h2>Introduction</h2>
        <p>Welcome to The Tangled Oak + Craft Collective, located at 150 Oak St W, North Bay, Ontario...</p>
        <p>Our team is passionate about supporting local makers...</p>
      </div>

      <div className="context-box">
        <h2>Mission and Vision</h2>
        <p>The Tangled Oak + Craft Collective was born from a passion for supporting local artisans...</p>
        <p>Our vision is to foster a thriving creative community in North Bay...</p>
      </div>

      <div className="context-box">
        <h2>What We Offer</h2>
        <p>We offer a wide range of handmade goods crafted with love...</p>
        <p>Explore our ever-changing selection with new items added regularly...</p>
        <Link to="/shop" className="button">Shop Now</Link>
      </div>

      <div className="context-box">
        <h2>Community and Connection</h2>
        <p>We believe in the power of community and supporting local artisans...</p>
        <p>Whether you're browsing for a gift or looking for inspiration...</p>
        <Link to="/vendor" className="button">View Vendors</Link>
      </div>

      <div className="context-box">
        <h2>The Story Behind the Name</h2>
        <p>The name "The Tangled Oak" is inspired by both the natural world and our North Bay roots...</p>
      </div>

      <div className="context-box">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <img src="/views/images/team-member.jpg" alt="Aimee" className="team-image" />
          <h3>Aimee</h3>
          <p>Owner and Creator. Aimee’s passion for local craftsmanship drives the vision behind Tangled Oak.</p>
        </div>
        <div className="team-member">
          <img src="/views/images/team-member2.jpg" alt="Carol" className="team-image" />
          <h3>Carol</h3>
          <p>Manager and Curator. Carol brings expertise in handmade goods and customer experience.</p>
        </div>
        <div className="team-member">
          <img src="/views/images/charles-lavigne.jpg" alt="Charles" className="team-image" />
          <h3>Charles</h3>
          <p>Operations Coordinator. Charles ensures everything runs smoothly behind the scenes.</p>
        </div>
      </div>

      <div className="context-box">
        <h2>Our Values</h2>
        <p>We are guided by core values like craftsmanship, sustainability, and community connection...</p>
      </div>

      <div className="context-box">
        <h2>Hours of Operation</h2>
        <p>
          Monday: 10 AM - 1 PM<br />
          Tuesday: CLOSED<br />
          Wednesday: 11 AM - 3 PM<br />
          Thursday: 10 AM - 1 PM<br />
          Friday: 11 AM - 3 PM<br />
          Saturday: 10 AM - 3 PM<br />
          Sunday: 12 AM - 3 PM<br />
        </p>
        <h3>Where you can find us</h3>
        <p>150 Oak Street W<br />North Bay, ON</p>
        <p>Email: store@tangledoak.ca<br />Phone: (705) 201-2300</p>
        <iframe
          className="map"
          height="450"
          style={{ border: "2px solid #203a13", width: "100%", borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          title="Tangled Oak Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.934228632341!2d-79.46534059999999!3d46.311143699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d29aa9cbd52da61%3A0x5ba29b1fbf8394f9!2s150%20Oak%20St%20W%2C%20North%20Bay%2C%20ON%20P1B%202S7!5e0!3m2!1sen!2sca!4v1742343151470!5m2!1sen!2sca"
        ></iframe>
      </div>

      <div className="context-box">
        <h2>Get in Touch</h2>
        <p>If you have any questions or comments, we’re happy to help!</p>
        <Link to="/contact" className="button">Contact Us</Link>
      </div>
    </Layout>
  );
};

export default About;
