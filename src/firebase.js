import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ for image uploads

const firebaseConfig = {
  apiKey: "AIzaSyDhdfarzymyr-UCwASM8nrVsz3EC8iQGZQ",
  authDomain: "tangledoak-8d36f.firebaseapp.com",
  projectId: "tangledoak-8d36f",
  storageBucket: "tangledoak-8d36f.firebasestorage.app",
  messagingSenderId: "144819822531",
  appId: "1:144819822531:web:108d19707a17aa5827e776",
  measurementId: "G-J5LX00LFE4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Add this

export { app, analytics, auth, db, storage }; // ✅ Export storage
