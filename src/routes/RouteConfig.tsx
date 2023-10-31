import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/login/Login";

import ProtectedRoutes from "./ProtectedRoutes";
const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouterConfig;
