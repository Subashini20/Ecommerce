import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import WishList from "./Pages/WishList";
import Products from "./Pages/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/wishlist" element={<WishList />}></Route>
      <Route path="/products" element={<Products />}></Route>
    </Routes>
  );
};

export default AppRoutes;
