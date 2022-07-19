import React, { useEffect } from "react";
import { Nav, Navbar,NavDropdown } from "react-bootstrap";
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
            <Nav.Link href="/products" className="text-light">
              <AiOutlineBlock className="fs-3 text-warning" /> Ürünler
            </Nav.Link>
            <Nav.Link href="/product-groups" className="text-light">
             
            </Nav.Link>
            <NavDropdown title={<div  style={{display: "inline-block"}}><AiOutlineAppstore className="fs-3 text-warning"/> Ürün Grupları</div>} id="basic-nav-dropdown" className="bg-dark">
              <NavDropdown.Item href="/create-group" className="text-dark"><AiOutlineAppstoreAdd className="fs-3 text-dark " /> Ürün Grubu
              Oluştur</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/product-groups" className="text-dark">
              <AiOutlineAppstore className="fs-3 text-dark" /> Ürün Grupları
              </NavDropdown.Item>
              
            </NavDropdown>
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
