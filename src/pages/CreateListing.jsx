import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "../input.css";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("product");
  const [price, setPrice] = useState("");
  const [trade, setTrade] = useState(false);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToast("");

    if (!title || !description || !location || (!price && !trade)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `listings/${uuid()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "listings"), {
        title,
        description,
        type,
        price: trade ? null : Number(price),
        trade,
        location,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setToast("Listing submitted! Redirecting...");
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to create listing.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="login-title">Create a New Listing</h2>
      <p className="login-subtitle">Showcase your handmade product or trade supplies</p>

      <form onSubmit={handleSubmit} className="listing-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="product">Product</option>
          <option value="supply">Supply</option>
        </select>
        <input
          type="number"
          placeholder="Price (optional if trading)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={trade}
            onChange={(e) => setTrade(e.target.checked)}
          />
          Open to Trade
        </label>
        <input
          type="text"
          placeholder="Location (City, Province)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {error && <p className="error-message">{error}</p>}
        {toast && <p style={{ color: "#4A3F35", marginTop: "1rem" }}>{toast}</p>}

        <button type="submit" className="login-button">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
