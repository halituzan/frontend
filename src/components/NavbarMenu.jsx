import React, { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { authHelpers, logOutHelpers } from "../helpers/auth.helper";
import {
  AiOutlineLogin,
  AiFillSetting,
  AiOutlineBlock,
  AiOutlineAppstore,
  AiOutlineAppstoreAdd,
  AiOutlineCalculator,
} from "react-icons/ai";
import "./components.css"
export default function NavbarMenu() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    authHelpers(cookies, removeCookies, navigate);
  }, [cookies, navigate, removeCookies]);

  const logOut = () => {
    logOutHelpers(removeCookies, navigate);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="container">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand href="/" className="logoFont">Entegrenity</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto d-flex">
            <Nav.Link href="/settings" className="text-light">
              <AiOutlineBlock className="fs-3 text-warning" /> Ürünler
            </Nav.Link>
            <Nav.Link href="/settings" className="text-light">
              <AiOutlineAppstore className="fs-3 text-warning" /> Ürün Grupları
            </Nav.Link>
            <Nav.Link href="/settings" className="text-light">
              <AiOutlineAppstoreAdd className="fs-3 text-warning" /> Ürün Grubu
              Oluştur
            </Nav.Link>
            <Nav.Link href="/settings" className="text-light">
              <AiOutlineCalculator className="fs-3 text-warning" /> Karlılık
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
