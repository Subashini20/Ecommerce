import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Favourites from "./Pages/Favourites";
import Products from "./Pages/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/AddtoFavourites" element={<Favourites />}></Route>
      <Route path="/" element={<Products />}></Route>
    </Routes>
  );
};

export default AppRoutes;
