import React from "react";
import "./components.css";
import { Nav, Navbar } from "react-bootstrap";
// import { ReactComponent as Logo } from "../logo.svg";
export default function Sidebar() {
  return (
    <div className="sidebar d-flex ">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="flex-column w-100 h-100 justify-content-start align-items-start">
        <Navbar.Brand href="#home">Entegrenity</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey="/" className="flex-column ">
            <Nav.Link href="/" className="text-light">
              Ana Sayfa
            </Nav.Link>
            <Nav.Link className="text-light" eventKey="link-1">
              Link
            </Nav.Link>
            <Nav.Link className="text-light" eventKey="link-2">
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
