import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css"
import Settings from "./pages/Settings";
import ProductGroups from "./pages/ProductGroups";
import Products from "./pages/Products";
import CreateGroup from "./pages/CreateGroup";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/settings" element={ <Settings/> } />
        <Route exact path="/product-groups" element={ <ProductGroups/> } />
        <Route exact path="/create-group" element={ <CreateGroup/> } />
        <Route exact path="/products" element={ <Products/> } />
      </Routes>
    </BrowserRouter>
  );
}
