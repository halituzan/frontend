import React, { useEffect } from "react";
import { Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  AiOutlineLogin,
  AiFillSetting,
  AiFillSignal,
  AiFillRocket,
  AiOutlineUser,
} from "react-icons/ai";
import "../components.css";
import { authHelpers, logOutHelpers } from "../../helpers/auth.helper";
export default function AdminNav() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    authHelpers(cookies, removeCookies, navigate);
  }, [cookies, navigate, removeCookies]);

  const logOut = () => {
    logOutHelpers(removeCookies, navigate);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="nav-menu"
    >
      <div className="container">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand href="/admin" className="logoFont d-flex">
          Entegrenity
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto d-flex">
            <Nav.Link
              href="/admin/users"
              className="text-light d-flex justify-content-center align-items-center "
            >
              <AiOutlineUser className="fs-3 nav-icon text-warning" /> Kullanıcılar
            </Nav.Link>
            <Nav.Link
              href="/product-groups"
              className="text-light d-flex justify-content-center align-items-center "
            ></Nav.Link>

            <Nav.Link
              href="/settings"
              className="text-light d-flex justify-content-center align-items-center "
            >
              <AiFillSignal className="fs-3 text-warning nav-icon" />{" "}
              Kullanıcı İstatistikleri
            </Nav.Link>
            <Nav.Link
              href="/settings"
              className="text-light d-flex justify-content-center align-items-center "
            >
              <AiFillRocket className="fs-3 text-warning nav-icon" /> Fiyat
              Rekabeti
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="setting-buttons d-flex justify-content-between">
          <button className="btn btn-warning me-2">
            <Link to="/settings">
              <AiFillSetting className="fs-4 text-dark" />
            </Link>
          </button>
          <button className="btn btn-warning" onClick={logOut}>
            <AiOutlineLogin className="fs-4 text-dark" />
          </button>
        </div>
      </div>
    </Navbar>
  );
}
