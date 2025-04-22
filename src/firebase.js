// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Add this

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

// ✅ Add this line
const auth = getAuth(app);

// ✅ Export what you're using
export { app, analytics, auth };
