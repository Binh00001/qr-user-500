import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
//user
import HomePage from "../pages/Home/indexHome";
import Menu from "../pages/Menu/indexMenu.js";
import Order from "../pages/Order/indexOrder.js";
import Bill from "../pages/Bill/indexBill.js";
//admin
import AdminLoginScreen from "../admin/admin_login_screen/index.js";
import AdminHomePage from "../admin/admin_pages/home/AdminHome.js";
import Category from "../admin/admin_pages/category/index.js";
import TableManagement from "../admin/admin_pages/table_management/index.js";
import OrderManagement from "../admin/admin_pages/order_management/order_management.js";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home/:token" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orderdetails" element={<Order />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/adminlogin" element={<AdminLoginScreen />} />
        {/* Bảo vệ các đường dẫn quản trị sử dụng RequireAuth */}
        <Route
          path="/adminhome"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <AdminHomePage />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/category"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <Category />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/table"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <TableManagement />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/order"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <OrderManagement />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
