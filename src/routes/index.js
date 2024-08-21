import { Fragment } from "react";
import Home from "../pages/Home/indexHome";
import Menu from "../pages/Menu/indexMenu.js";
import Order from "../pages/Order/indexOrder.js";
import Bill from "../pages/Bill/indexBill.js";
import AdminHomePage from "../admin/admin_pages/home/AdminHome.js";
import AdminLoginScreen from "../admin/admin_login_screen/index.js";
import Category from "../admin/admin_pages/category/index.js";
import TableManagement from "../admin/admin_pages/table_managament/index.js";
export const publicRoutes = [
  { path: "/home/:token", component: Home },
  { path: "/menu", component: Menu },
  { path: "/orderdetails", component: Order },
  { path: "/bill", component: Bill },
  //admin path
  { path: "/adminlogin", component: AdminLoginScreen },
  { path: "/adminhome", component: AdminHomePage },
  { path: "/adminhome", component: AdminHomePage },
  { path: "/adminhome/category", component: Category },
  { path: "/adminhome/table", component: TableManagement },
];
