import React, { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import NavbarMenu from "../components/NavbarMenu";
import "./pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../components/home/Home";
import { getData } from "../helpers/db.helpers";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import UserRole from "../components/home/UserRole";

export default function Dashboard() {
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  const [data, setData] = useState({});
  const [isGold, setIsGold] = useState(false);
  useEffect(() => {
    if (token) {
      getData(jwt_decode(token).id, setData);
    }
  }, []);
  useEffect(() => {
    if (token) {
      if (data.userRole === "silver") {
        setIsGold(false);
      }
      if (data.userRole === "gold") {
        setIsGold(true);
      }
    }
  }, [data]);
  return (
    <>
      <div className="d-flex flex-column">
        <NavbarMenu role={data.userRole} />
        {!isGold ? <UserRole role={data.userRole} /> : <Home />}
      </div>
      <ToastContainer transition={Flip} autoClose={1000} />
    </>
  );
}
