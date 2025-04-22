import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../input.css";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
        } else {
          setError("Listing not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch listing.");
      }
    };

    fetchListing();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!listing) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <button className="logout-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="login-title">{listing.title}</h2>
      {listing.imageUrl && (
        <img
          src={listing.imageUrl}
          alt={listing.title}
          style={{
            maxWidth: "100%",
            borderRadius: "1rem",
            margin: "1rem 0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />
      )}

      <p style={{ marginBottom: "1rem" }}>{listing.description}</p>
      <p><strong>Type:</strong> {listing.type === "supply" ? "Supply" : "Product"}</p>

      {listing.price !== null && (
        <p><strong>Price:</strong> ${listing.price.toFixed(2)}</p>
      )}
      {listing.trade && (
        <p><strong>Open to Trade</strong> ✅</p>
      )}

      <p><strong>Location:</strong> {listing.location}</p>
    </div>
  );
};

export default ListingDetails;
