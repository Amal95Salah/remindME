import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute() {
  const currentUser = localStorage.getItem("token");
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
