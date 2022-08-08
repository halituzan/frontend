import React from "react";
import "./components.css";
import NavbarMenu from "./NavbarMenu";
import Nav from "react-bootstrap/Nav";

export default function NotFound() {
  return (
    <div>
      <NavbarMenu />
      <div className="container d-flex justify-content-between flex-column align-items-center h-100">
        <h1 className="notfound-message d-flex flex-column justify-content-center align-items-center">
          <span className="fw-bold">404! Error</span>
          Üzgünüz Bu Sayfa Bulunamadı.
        </h1>
        <div className="menu d-flex flex-column justify-content-center align-items-center mt-5">
          <h3 className="notfound-message fs-3 mt-5">
            Aşağıdaki Bağlantıları Deneyebilirsiniz.
          </h3>
          <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/">Anasayfa</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/products">Ürünler</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/product-groups">Ürün Grupları</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
}
