import React from "react";
import { Accordion } from "react-bootstrap";
import MerchantInfo from "./settings/MerchantInfo";
import UserInfo from "./settings/UserInfo";
export default function SettingForms() {
  return (
    <div className="d-flex flex-column">
      <Accordion className="w-100">
        <Accordion.Item eventKey="0">
          <MerchantInfo />
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <UserInfo />
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
