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
import OptionCategory from "../admin/admin_pages/option_category/option_category.js";
import CreateProduct from "../admin/admin_pages/create_product/create_product.js";
import ListProduct from "../admin/admin_pages/list_product/list_product.js";
import Evaluate from "../admin/admin_pages/evaluate/evaluate.js";
import QrView from "../pages/QrView/indexQrView.js";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home/:token" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orderdetails" element={<Order />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/adminlogin" element={<AdminLoginScreen />} />
        <Route path="/qrview" element={<QrView />} />
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

        <Route
          path="/adminhome/option"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <OptionCategory />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/createproduct"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <CreateProduct />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/listproduct"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <ListProduct />
            </RequireAuth>
          }
        />

        <Route
          path="/adminhome/evaluate"
          element={
            <RequireAuth fallbackPath="/adminlogin">
              <Evaluate />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
