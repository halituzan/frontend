import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { AiFillSave, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function MerchantInfo() {
  const [eye, setEye] = useState(true);
  const [settingsValue, setSettingsValue] = useState({
    merchangId: "",
    apiKey: "",
    apiSecret: "",
  });

  const handleSettings = () => {
    console.log(settingsValue);
  };
  return (
    <div className="container-fluid">
      <div className="merchant-secret">
        <div className="forms container mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="my-1 fs-3">Mağaza Bilgilerini Girin</h2>

            <div className={!eye ? "mx-3 text-success" : "mx-3 text-dark"}>
              {!eye ? (
                <AiFillEye
                  style={{ fontSize: "40px" }}
                  onClick={() => setEye(true)}
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setEye(false)}
                  style={{ fontSize: "40px" }}
                />
              )}
            </div>
          </div>
          <hr />
          <div className="info d-flex">
            <div
              className={
                eye
                  ? "hideInfo row w-100 d-flex align-items-center"
                  : "d-flex align-items-center showInfo row w-100"
              }
            >
              <div className="col-12 my-1 col-md-3">
                <InputGroup className="d-flex align-items-center">
                  <Form.Control
                    placeholder="Merchant ID"
                    name="merchangId"
                    aria-label="Merchant ID"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
                    value={settingsValue.merchangId}
                    onChange={(e) =>
                      setSettingsValue({
                        ...settingsValue,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </div>
              <div className="col-12 my-1 col-md-4">
                <InputGroup className="d-flex align-items-center">
                  <Form.Control
                    name="apiKey"
                    placeholder="API Key"
                    aria-label="API Key"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
                    value={settingsValue.apiKey}
                    onChange={(e) =>
                      setSettingsValue({
                        ...settingsValue,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </div>
              <div className="col-12 my-1 col-md-4">
                <InputGroup className="d-flex align-items-center">
                  <Form.Control
                    name="apiSecret"
                    placeholder="API Secret"
                    aria-label="API Secret"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
                    value={settingsValue.apiSecret}
                    onChange={(e) =>
                      setSettingsValue({
                        ...settingsValue,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </div>
              <div className="col-12 col-md-1">
                <Button
                  variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                  id="button-addon2"
                >
                  <AiFillSave
                    onClick={() => handleSettings()}
                    className="text-dark fs-4"
                  />{" "}
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
