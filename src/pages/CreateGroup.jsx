import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authHelpers } from "../helpers/auth.helper";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";
import { Button, Form } from "react-bootstrap";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [group, setGroup] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    authHelpers(cookies, removeCookies, navigate);
  }, [cookies, navigate, removeCookies]);
  return (
    <div>
      <NavbarMenu />
      <div className="container mt-3 w-100 h-100">
        <div className="d-flex justify-content-center align-items-center" style={{"height": "75vh" }}>
          <Form className="w-50 m-auto">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Grup İsmi Girin"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
              <Form.Text className="text-dark">
                Lütfen bir Grup İsmi Oluşturun. Oluşturacağınız grup ismi
                ürünleriniz ile bağlantılı olursa düzenlemesi ve takibi daha
                kolay olur.
              </Form.Text>
              <Form.Text className="text-muted">
                <span className="fw-bold">Örnek:</span>{" "}
                <span style={{ fontStyle: "italic" }}>
                  Batman Çocuk Kostümü XL Beden
                </span>
              </Form.Text>
            </Form.Group>

            <Button variant="warning" type="submit">
              Oluştur
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
