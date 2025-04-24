const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.approveVendor = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "Missing UID" });
    }

    try {
      // Set the custom claim "role": "vendor"
      await admin.auth().setCustomUserClaims(uid, { role: "vendor" });

      // Optional: update Firestore to indicate they’ve been approved
      await admin.firestore().collection("vendorRequests").doc(uid).update({
        approved: true,
        approvedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ message: "Vendor approved." });
    } catch (error) {
      console.error("Error setting custom claims:", error);
      return res.status(500).json({ error: "Failed to approve vendor." });
    }
  });
});
