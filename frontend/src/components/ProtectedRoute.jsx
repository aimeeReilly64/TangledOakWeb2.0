// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthorized(false);
        return;
      }

      const token = await user.getIdTokenResult(true);
      const role = token.claims.role;

      if (!requiredRole || role === requiredRole) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, [requiredRole]);

  if (authorized === null) return <p>Loading...</p>;
  if (authorized === false) return <Navigate to="/vendor-login" replace />;
  return children;
};

export default ProtectedRoute;
