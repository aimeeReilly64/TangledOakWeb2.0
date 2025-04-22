import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "../input.css";

const SupplySwap = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTradeListings = async () => {
      try {
        const q = query(collection(db, "listings"), where("trade", "==", true));
        const querySnapshot = await getDocs(q);
        const tradeableItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(tradeableItems);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load trade listings:", err);
        setLoading(false);
      }
    };

    fetchTradeListings();
  }, []);

  if (loading) return <p>Loading tradeable listings...</p>;

  return (
    <div className="home-container">
      <h2 className="home-title">Supply Swap</h2>
      <p className="home-subtitle">Items available for barter or trade</p>

      {listings.length === 0 ? (
        <p>No listings available for trade at the moment.</p>
      ) : (
        <div className="home-grid">
          {listings.map((listing) => (
            <Link to={`/listing/${listing.id}`} key={listing.id} className="card">
              {listing.imageUrl && (
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                />
              )}
              <h3>{listing.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#6B5F52" }}>
                {listing.price !== null ? `$${listing.price.toFixed(2)}` : "Trade Only"}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#888" }}>
                {listing.location}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplySwap;
