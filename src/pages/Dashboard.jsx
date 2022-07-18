import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import NavbarMenu from "../components/NavbarMenu";
import Home from "../components/Home";
import "./pages.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column">
        <NavbarMenu />
        <Home />
      </div>
      <ToastContainer transition={Flip} autoClose={1000} />
    </>
  );
}
