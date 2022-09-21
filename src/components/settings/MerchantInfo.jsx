import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Accordion } from "react-bootstrap";
import { AiFillSave, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { setMerchantData, getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { useCookies } from "react-cookie";
import "../components.css";
export default function MerchantInfo() {
  const [eye, setEye] = useState(true);
  const [lock, setLock] = useState(true);
  const [settingsValue, setSettingsValue] = useState({});

  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setSettingsValue);
    }
  }, []);

  const sendData = () => {
    setMerchantData(settingsValue);
  };

  const onLock = () => {
    if (lock) {
      setLock(false);
      setEye(false);
      setSettingsValue({
        ...settingsValue,
        ApiKey: parseJwt(settingsValue.ApiKey).id,
        ApiSecret: parseJwt(settingsValue.ApiSecret).id,
      });
    } else {
    }
  };
  return (
    <div className="container-fluid">
      <div className="merchant-secret">
        <div className="forms container mt-5">
          <div className="d-flex flex-column align-items-center justify-content-between">
            <Accordion.Header className="w-100 ">
              <h2 className="my-1 fs-3">Mağaza Bilgileri</h2>
            </Accordion.Header>
            <Accordion.Body>
              <hr />
              <p className="fs-5">
                - <span className="fw-bold">Api Key</span> ve{" "}
                <span className="fw-bold">Api Secret</span> bilgileri veri
                tanabında kriptolanmış bir şekilde tutulur.
                <br />- Mağaza bilgilerini güncellemek için lütfen kilit{" "}
                <AiFillLock className="text-dark fs-4" /> butonuna tıklayın.
                <br />- Kaydetmek için kaydetme butonuna{" "}
                <AiFillSave className="text-dark fs-4" /> tıklayabilirsiniz.
              </p>

              <div className="info d-flex">
                <div className="d-flex align-items-center row w-100">
                  <div
                    className={
                      eye
                        ? "col-12 my-1 col-md-2 hideInfo"
                        : "col-12 my-1 col-md-2 showInfo"
                    }
                  >
                    <InputGroup className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        placeholder="Merchant ID"
                        name="merchantID"
                        aria-label="Merchant ID"
                        aria-describedby="basic-addon2"
                        readOnly={lock ? "readOnly" : ""}
                        value={settingsValue.merchantID}
                        onChange={(e) =>
                          setSettingsValue({
                            ...settingsValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </div>
                  <div
                    className={
                      eye
                        ? "col-12 my-1 col-md-4 hideInfo"
                        : "col-12 my-1 col-md-4 showInfo"
                    }
                  >
                    <InputGroup className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        name="ApiKey"
                        placeholder="API Key"
                        aria-label="API Key"
                        aria-describedby="basic-addon2"
                        readOnly={lock ? "readOnly" : ""}
                        value={settingsValue.ApiKey}
                        onChange={(e) =>
                          setSettingsValue({
                            ...settingsValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </div>
                  <div
                    className={
                      eye
                        ? "col-12 my-1 col-md-4 hideInfo"
                        : "col-12 my-1 col-md-4 showInfo"
                    }
                  >
                    <InputGroup className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        name="ApiSecret"
                        placeholder="API Secret"
                        aria-label="API Secret"
                        aria-describedby="basic-addon2"
                        readOnly={lock ? "readOnly" : ""}
                        value={settingsValue.ApiSecret}
                        onChange={(e) =>
                          setSettingsValue({
                            ...settingsValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="col-12 col-md-2 d-flex justify-content-end">
                    <Button
                      className="me-2"
                      variant={
                        lock
                          ? "outline-secondary d-flex align-items-center bg-warning fw-bold"
                          : "outline-secondary d-flex align-items-center bg-danger fw-bold"
                      }
                      onClick={() => onLock()}
                    >
                      {lock ? (
                        <AiFillLock className="text-dark fs-4" />
                      ) : (
                        <AiFillUnlock className="text-dark fs-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                      id="button-addon2"
                      onClick={() => sendData()}
                    >
                      <AiFillSave
                        className="text-dark fs-4"
                        onClick={() => sendData()}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <img
                src="../../../merchant-info.png"
                alt="Mağaza Bilgileri"
                title="Trendyol Mağaza Bilgileri Nasıl Alınır"
                className="border border-warning mt-5 w-100"
              />
            </Accordion.Body>
          </div>
        </div>
      </div>
    </div>
  );
}
