import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | The Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Learn about The Tangled Oak + Craft Collective in North Bay, Ontario. Discover our mission to support local artisans, explore handmade goods, and connect with a creative community."
        />
        <meta
          name="keywords"
          content="handmade crafts, local artisans, North Bay, craft collective, Ontario handmade gifts, support local makers"
        />
      </Helmet>

      {/* Introduction Section */}
      <div className="context-box">
        <h2>Introduction</h2>
        <p>
          Welcome to <strong>The Tangled Oak + Craft Collective</strong>, located at 150 Oak St W, North Bay, Ontario. We are a community-focused store dedicated to offering a unique selection of handmade treasures, crafted with love by local artisans. Our collective brings together a variety of products, from beautifully crafted pottery and jewelry to hand-knit items and wooden decor. Each piece tells its own story, making it the perfect place to find something special, whether for yourself or as a gift.
        </p>
        <p>
          Our team is passionate about supporting local makers and providing a space for creativity and connection. Whether you're a visitor or a regular, we invite you to explore and discover the artistry behind every item we carry. We’re here to celebrate handmade craft and community spirit.
        </p>
        <p>We hope you'll join us on this exciting journey and discover something special in our store. We look forward to welcoming you to our community-focused store.</p>
      </div>

      {/* Mission and Vision Section */}
      <div className="context-box">
        <h2>Mission and Vision</h2>
        <p>
          The Tangled Oak + Craft Collective was born from a passion for supporting local artisans and celebrating the beauty of handmade creations. Our mission is to provide a space where craft, creativity, and community come together. We are dedicated to showcasing a diverse range of high-quality, handcrafted products made by talented local makers. Each item we offer tells a unique story, reflecting the love and care put into its creation.
        </p>
        <p>
          Our vision is to foster a thriving creative community in North Bay by providing a platform for artisans to share their work and for customers to discover one-of-a-kind treasures. We believe in the power of handmade craftsmanship to bring joy, inspiration, and connection to everyone who experiences it.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className="context-box">
        <h2>What We Offer</h2>
        <p>
          At The Tangled Oak + Craft Collective, we offer a wide range of handmade goods crafted with love and care by local artisans. Our collection includes everything from custom pottery and beautifully crafted knives to unique home decor, jewelry, and gourmet products like locally made honeys and jams.
        </p>
        <p>
          Each piece in our store is carefully selected for its quality and artistry. Whether you're looking for functional items or decorative treasures, you'll find something that speaks to your heart and adds a touch of craftsmanship to your home or collection.
        </p>
        <p>Explore our ever-changing selection, with new items added regularly, and find that perfect, one-of-a-kind piece that makes your day a little brighter.</p>
        <Link to="/shop" className="button">Shop Now</Link>
      </div>

      {/* Community and Connection Section */}
      <div className="context-box">
        <h2>Community and Connection</h2>
        <p>
          At The Tangled Oak + Craft Collective, we believe in the power of community and the importance of supporting local artisans and makers. Our mission is to create a welcoming space where creativity flourishes, bringing together a diverse group of talented individuals who share a passion for craftsmanship.
        </p>
        <p>
          We are committed to fostering connections between artists and customers, creating an environment where both can grow and thrive. By supporting local makers, we help ensure that their work is recognized and celebrated, and we provide our customers with unique, high-quality pieces that reflect the creativity and spirit of our community.
        </p>
        <p>
          Whether you're browsing for a one-of-a-kind gift or looking for inspiration, The Tangled Oak is a place where creativity, collaboration, and community come together to create something truly special.
        </p>
      </div>

      {/* The Story Behind the Name Section */}
      <div className="context-box">
        <h2>The Story Behind the Name</h2>
        <p>
          The name "The Tangled Oak" is inspired by both the natural world and our roots here in North Bay. The oak tree, known for its strength and enduring presence, symbolizes stability, growth, and deep roots. The "tangled" part of the name reflects the creative, interconnected community we’ve fostered with local artisans and makers. It also pays homage to our location on Oak Street, where we bring together a variety of talents and passions to create something unique and beautiful.
        </p>
        <p>
          At The Tangled Oak + Craft Collective, we embrace the beauty of diversity and collaboration, much like the intertwining branches of an oak tree, and we strive to create a space where creativity and community thrive together.
        </p>
      </div>

      {/* Meet the Team Section */}
      <div className="context-box">
        <h2>Meet the Team</h2>
        <p>
          At The Tangled Oak + Craft Collective, we are a team of passionate individuals dedicated to supporting local artisans and fostering a creative community. We work together to provide a welcoming space where artists and customers can connect and thrive.
        </p>
        <p>
          Our team is made up of owners, managers, and key individuals who bring their unique skills and vision to the collective. From curating the products in our store to offering personalized service, each member of our team plays an integral role in making The Tangled Oak a vibrant part of the North Bay community.
        </p>
        <p>Get to know the people behind the collective:</p>
       
          <h3>Aimee</h3>
          <p>Owner and Creator. Aimee's passion for local craftsmanship and community drives the vision behind The Tangled Oak.</p>
       
        
          <h3>Carol</h3>
          <p>Manager and Curator. Carol brings her expertise in handmade goods and customer experience to the collective.</p>
      
       
          <h3>Charles</h3>
          <p>Operations Coordinator. Charles ensures that everything runs smoothly behind the scenes, managing logistics and day-to-day operations.</p>
        
      </div>

      {/* Our Values Section */}
      <div className="context-box">
        <h2>Our Values</h2>
        <p>
          At The Tangled Oak + Craft Collective, we are guided by a set of core values that define our mission and the way we interact with our community. We believe in the power of craftsmanship, sustainability, and connection. Our products are thoughtfully created by artisans who value quality and authenticity, and we are committed to supporting local makers while promoting eco-friendly practices.
        </p>
        <p>
          We strive to create a space where creativity, collaboration, and sustainability can flourish together, benefiting both our makers and our customers.
        </p>
      </div>

      {/* Business Hours Section */}
      <div className="context-box">
        <h2>Hours of Operation</h2>
        <p>Monday: 10 AM - 1 PM<br />Tuesday: CLOSED<br />Wednesday: 11 AM - 3 PM<br />Thursday: 10 AM - 1 PM<br />Friday: 11 AM - 3 PM<br />Saturday: 10 AM - 3 PM<br />Sunday: 12 PM - 3 PM</p>
        <h3>Where you can find us</h3>
        <p>150 Oak Street W<br />North Bay, ON</p>
        <p>Email: store@tangledoak.ca<br />Phone: (705) 201-2300</p>
      </div>

      {/* Google Maps Embed */}
      <div className="context-box">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.934228632341!2d-79.46534059999999!3d46.311143699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d29aa9cbd52da61%3A0x5ba29b1fbf8394f9!2s150%20Oak%20St%20W%2C%20North%20Bay%2C%20ON%20P1B%202S7!5e0!3m2!1sen!2sca!4v1691078701919!5m2!1sen!2sca"
          width="100%"
          height="450"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
      </div>
    </>
  );
};

export default About;
