import React from "react";
import { Accordion } from "react-bootstrap";
import ProductGroupList from "./ProductGroupList";
export default function ProductGroup() {
  return (
    <div className="container d-flex flex-column">
      <Accordion className="w-100">
        <ProductGroupList/>
      </Accordion>
    </div>
  );
}