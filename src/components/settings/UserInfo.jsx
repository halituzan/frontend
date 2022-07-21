import React, { useState, useEffect } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import "../components.css";
import { FaMedal } from "react-icons/fa";

export default function UserInfo() {
  const [data, setData] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;

  useEffect(() => {
    getData(parseJwt(token).id, setData);
  }, []);

  console.log(data);
  return (
    <div className="container-fluid">
      <div className="merchant-secret">
        <div className="forms container mt-5">
          <div className="d-flex flex-column align-items-center justify-content-between">
            <Accordion.Header className="w-100">
              <h2 className="my-1 fs-3">Kullanıcı Bilgileri</h2>
            </Accordion.Header>
            <Accordion.Body className="w-100">
              <hr />
              <div className="userInfo">
                <div className="row">
                  <div className="col-12 col-md-6 user-key d-flex flex-column">
                    <div className="user-role align-self-center my-3 d-flex justify-content-center flex-column align-items-center">
                      <h2
                        style={{
                          fontFamily: "Roboto Slab, serif",
                          color: "#212529",
                          fontSize: "1.9rem",
                        }}
                      >
                        Silver Üye
                      </h2>
                      {data.userRole !== "silver" ? (
                        <FaMedal
                          style={{ fontSize: "10rem", color: "#ffa40b" }}
                        />
                      ) : (
                        <FaMedal
                          style={{ fontSize: "10rem", color: "#c0c0c0" }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form>
                      <Form.Text className="text-dark fs-5 text-center">
                        Aşağıdaki Formdan Şifrenizi Yenileyebilirsiniz.
                      </Form.Text>
                      <Form.Group className="mb-3 d-flex">
                        <input
                          type="password"
                          placeholder="Mevcut Şifrenizi Girin"
                        />
                        <input type="password" placeholder="Yeni Şifre Girin" />
                        <input
                          type="password"
                          placeholder="Yeni Şifrenizi Tekrar Girin"
                        />
                      </Form.Group>

                      <Button variant="warning" type="submit">
                        Yenile
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </div>
        </div>
      </div>
    </div>
  );
}
