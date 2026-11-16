import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      const pageNames = {
        "/cart": "your cart",
        "/orders": "your orders",
        "/place-order": "checkout",
      };
      const page = pageNames[location.pathname] || "this page";
      toast.info(`Please log in to access ${page}`);
    }
  }, [token, location.pathname]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
