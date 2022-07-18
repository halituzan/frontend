import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AiFillSave, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getData } from "../../helpers/db.helpers";

export default function MerchantInfo() {
  const [eye, setEye] = useState(true);
  const [settingsValue, setSettingsValue] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );

      setSettingsValue(data);
    };
    getData();
  }, []);

  const handleSettings = () => {
    console.log(settingsValue);
    getData(settingsValue);
  };
  return (
    <div className="container-fluid">
      <div className="merchant-secret">
        <div className="forms container mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="my-1 fs-3">Mağaza Bilgileri</h2>

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
          <p>
            <span className="fw-bold">Api Key</span> ve{" "}
            <span className="fw-bold">Api Secret</span> değerleri veri tanabında
            kriptolanmış bir şekilde tutulur.
          </p>
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
                    type="number"
                    placeholder="Merchant ID"
                    name="merchantID"
                    aria-label="Merchant ID"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
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
              <div className="col-12 my-1 col-md-4">
                <InputGroup className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    name="ApiKey"
                    placeholder="API Key"
                    aria-label="API Key"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
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
              <div className="col-12 my-1 col-md-4">
                <InputGroup className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    name="ApiSecret"
                    placeholder="API Secret"
                    aria-label="API Secret"
                    aria-describedby="basic-addon2"
                    readOnly={eye ? "readOnly" : ""}
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
              <div className="col-12 col-md-1">
                <Button
                  variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                  id="button-addon2"
                  onClick={() => handleSettings()}
                >
                  <AiFillSave
                    className="text-dark fs-4"
                    onClick={() => handleSettings()}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
