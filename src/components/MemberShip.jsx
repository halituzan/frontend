import React, { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import NavbarMenu from "./NavbarMenu";

const BankaBilgileri = () => {
  const [bankalar, setBanlalar] = useState([
    {
      bankaAdi: "Ziraat Bankası",
      name: "Halit Uzan",
      iban: "TR61 0001 0012 2558 9864 9250 01",
      hesapNo: "1225-5896649-5001",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Ziraat_Bankas%C4%B1_logo.png",
      aciklama: "Siteye üye olduğunuz isim soy isim yazılmalıdır",
    },
    {
      bankaAdi: "Enpara - QNB Finans Bank",
      name: "Halit Uzan",
      iban: "TR68 0011 1000 0000 0084 6309 11",
      hesapNo: "84630311",
      image:
        "https://internetsubesi.qnbfinansbank.enpara.com/Content/Images/logo.png",
      aciklama: "Siteye üye olduğunuz isim soy isim yazılmalıdır",
    },
    {
      bankaAdi: "Yapı Kredi Bankası",
      name: "Halit Uzan",
      iban: "TR20 0006 7010 0000 0055 9015 17",
      hesapNo: "55901517",
      image:
        "https://upload.wikimedia.org/wikipedia/tr/e/e4/Yap%C4%B1_Kredi_logo.png",
      aciklama: "Siteye üye olduğunuz isim soy isim yazılmalıdır",
    },
  ]);
  return bankalar?.map((bank, i) => {
    return (
      <div key={i} className="mb-5 border-bottom border-2 border-warning">
        <img src={bank.image} alt={bank.bankaAdi} className="img-fluid mb-5" />
        <p>
          <span className="fw-bold">Banka: </span> {bank.bankaAdi}
        </p>
        <p>
          <span className="fw-bold">IBAN: </span> {bank.iban}
        </p>
        <p>
          <span className="fw-bold">Hesap No:</span> {bank.hesapNo}
        </p>
        <p>
          <span className="fw-bold">Hesap Sahibi: </span>
          {bank.name}
        </p>
        <p>
          <span className="fw-bold">Açıklama: </span>{" "}
          {bank.aciklama}
        </p>
      </div>
    );
  });
};

function MemberShip() {
  return (
    <div>
      <NavbarMenu />
      <div className="container mt-5 border border-warning px-5 pb-5 pt-3">
        <h2> Ödeme Yöntemleri</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav
                variant="pills"
                //fill="true"

                className="flex-column pe-2 border-end border-4 border-dark"
              >
                <Nav.Item variant="warning">
                  <Nav.Link eventKey="first">Havale/EFT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="text-muted">
                    Kredi Kartı{" "}
                    <span
                      className="fw-bold text-dark"
                      style={{ fontSize: "14px", transform: "rotate(20deg)" }}
                    >
                      Yakında
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="havale">
                    <p className="fs-3">
                      Ödemeyi kendi adınıza olmayan bir hesaptan yaptıysanız
                      lütfen iletişim yolu ile bunu bize iletin.{" "}
                    </p>
                    <BankaBilgileri />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p>
                    Kredi Kartı ile ödeme yöntemi yakında hizmete girecektir.
                  </p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default MemberShip;
