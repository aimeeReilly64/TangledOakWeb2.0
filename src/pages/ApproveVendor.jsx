// src/pages/AdminVendorApprovals.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const AdminVendorApprovals = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const fetchVendorRequests = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "vendorRequests"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    } catch (error) {
      console.error("Error fetching vendor requests:", error);
    }
    setLoading(false);
  };

  const handleApprove = async (vendor) => {
    try {
      // Update the document to mark as approved
      await updateDoc(doc(db, "vendorRequests", vendor.id), { approved: true });

      // Call your cloud function or backend to assign the custom claim
      const res = await fetch("/approveVendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: vendor.id }),
      });

      if (res.ok) {
        setActionMessage(`Approved ${vendor.businessName}`);
      } else {
        setActionMessage(`Failed to approve ${vendor.businessName}`);
      }

      await fetchVendorRequests();
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleReject = async (vendorId) => {
    try {
      await deleteDoc(doc(db, "vendorRequests", vendorId));
      setActionMessage("Rejected vendor registration.");
      await fetchVendorRequests();
    } catch (error) {
      console.error("Error deleting vendor request:", error);
    }
  };

  useEffect(() => {
    fetchVendorRequests();
  }, []);

  return (
    <div className="admin-container" style={{ padding: "2rem" }}>
      <h2>Pending Vendor Requests</h2>
      {actionMessage && <p style={{ color: "#4A3F35" }}>{actionMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending vendor requests.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {requests.map((vendor) => (
            <li key={vendor.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
              <p><strong>Business:</strong> {vendor.businessName}</p>
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Approved:</strong> {vendor.approved ? "Yes" : "No"}</p>
              {!vendor.approved && (
                <>
                  <button onClick={() => handleApprove(vendor)} style={{ marginRight: "1rem" }}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(vendor.id)} style={{ color: "red" }}>
                    Reject
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminVendorApprovals;
