import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import "../css/styles.css";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const q = query(collection(db, "listings"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const myItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(myItems);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading your listings...</p>;

  return (
    <div className="home-container">
      <h2 className="home-title">My Listings</h2>
      {listings.length === 0 ? (
        <p className="home-subtitle">You haven’t added anything yet.</p>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
