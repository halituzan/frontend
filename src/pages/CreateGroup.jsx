import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { getData, setGroupData } from "../helpers/db.helpers";
import { parseJwt } from "../helpers/jwt.helpers";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function CreateGroup() {
  const refreshPage = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    id: uuid(),
    groupName: "",
    groupBarcode: "",
    listPrice: "",
    salePrice: "",
    quantity: "",
  });
  const [settingsValue, setSettingsValue] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setSettingsValue);
    }
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    if (e.currentTarget[0].value === "")
      return toast.error("Ürün grubu ismi girmelisiniz.");
    else if (e.currentTarget[1].value === "")
      toast.error("En az 1 Barkod girmeniz gerekiyor");
    else {
      setGroupData(parseJwt(token).id, group);
      refreshPage();
    }
  };
  return (
    <div>
      <NavbarMenu />
      <div className="container mt-3 w-100 h-100">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "75vh" }}
        >
          <h2 className="text-dark">Ürün Grubu Oluştur</h2>
          <hr className="w-50 bg-dark" />
          <Form className="w-50 mt-0 m-auto" onSubmit={(e) => sendData(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="groupName"
                placeholder="Grup İsmi Girin"
                value={group.groupName}
                onChange={(e) =>
                  setGroup({ ...group, [e.target.name]: e.target.value })
                }
              />
              <Form.Text className="text-dark text-center">
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
            <h2 className="text-center mb-0 text-dark">Barkod Girişi</h2>
            <hr className="w-100 bg-dark my-0" />

            <Form.Group className="mb-3 mt-0">
              <Form.Control
                as="textarea"
                rows={3}
                name="groupBarcode"
                placeholder="Barkod Girin"
                value={group.groupBarcode}
                onChange={(e) => {
                  setGroup({ ...group, [e.target.name]: e.target.value });
                }}
              />
              <Form.Text className="text-dark text-center">
                En az 1 Barkod gilmelisiniz. Her bir barkodu virgül ile ayırarak
                ve boşluk olmadan giriniz.
              </Form.Text>
              <Form.Text className="text-muted">
                <span className="fw-bold">Örnek:</span>{" "}
                <span style={{ fontStyle: "italic" }}>
                  BARCODE1,BARCODE2,BARCODE3
                </span>
              </Form.Text>
            </Form.Group>

            <Button variant="warning" type="submit">
              Oluştur
            </Button>
          </Form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}
