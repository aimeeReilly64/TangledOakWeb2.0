import React, { useState } from "react";
import "../css/styles.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email, API request)
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="context-box">
          <h1>Contact Us</h1>
          <p>If you have any questions or comments, please don't hesitate to contact us.</p>
          <p>Tangled Oak Craft Collective</p>
          <p>150 Oak St W, North Bay, ON</p>
          <p>Phone: (705) 201-2300</p>
          <p>Email: <a href="mailto:store@tangledoak.ca">store@tangledoak.ca</a></p>
        </div>

        <div className="context-box">
          <h2>Want to be part of the Tangled Oak + Craft Collective?</h2>
          <p>
            The Tangled Oak + Craft Collective is a community-driven organization dedicated to fostering creativity,
            innovation, and community among the younger generations. Our mission is to create a space where young
            people can learn, grow, and connect with one another through their passion for crafting, DIY projects, and
            creative expression.
          </p>
          <p>
            We invite you to join us on our journey towards a brighter future, where every child can thrive and contribute
            to the world of crafting and creativity.
          </p>
          <p>Fill out this form and we will get back to you with more information</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdE19LHG3M9uilKeLxM3l8Xit1jqEb3hiP5PCqCd3merF6LHA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Vendor Form
          </a>
        </div>

        {/* Contact Form */}
        <div className="context-box">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="button">
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="context-box">
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
      {/* End of Main Content */}
      </div>
  );
};

export default Contact;
