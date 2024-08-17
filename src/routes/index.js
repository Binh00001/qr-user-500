import { Fragment } from "react";
import Home from "../pages/Home/indexHome";
import Menu from "../pages/Menu/indexMenu.js";
import Order from "../pages/Order/indexOrder.js";
import Bill from "../pages/Bill/indexBill.js";
export const publicRoutes = [
  { path: "/home/:token", component: Home },
  { path: "/menu", component: Menu },
  { path: "/orderdetails", component: Order },
  { path: "/bill", component: Bill },
];
