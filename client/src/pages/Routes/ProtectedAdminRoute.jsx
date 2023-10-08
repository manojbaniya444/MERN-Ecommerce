import React from "react";
import { useAuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminVerified, auth } = useAuthContext();
  if (auth?.user?.role === 1) {
    return isAdminVerified ? children : <Navigate to="/login" />;
  }
};

export default ProtectedAdminRoute;
