import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { authState } = React.useContext(AuthContext);
  return authState.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoutes;
