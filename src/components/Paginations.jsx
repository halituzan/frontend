import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Paginations(props) {
  const [page, setPage] = useState(props.totalPages);
  const increase = () => {
    if (props.pages < props.totalPages) {
      props.setPage(props.pages + 1);
    }
  };
  const decrease = () => {
    if (props.pages > 0) {
      props.setPage(props.pages - 1);
    }
  };
  const handleSelect = (e) => {
    props.setSize(parseFloat(e.target.value));
  };
  return (
    <div className="d-flex justify-content-end">
      <select
        className="bg-warning border-0 fw-bold"
        value={props.size}
        onChange={(e) => handleSelect(e)}
      >
        <option className="fw-bold" value="10">
          10
        </option>
        <option className="fw-bold" value="20">
          20
        </option>
        <option className="fw-bold" value="50">
          50
        </option>
        <option className="fw-bold" value="100">
          100
        </option>
      </select>
      <Button variant="warning p-0 mx-1 double-arrow" onClick={() => props.setPage(0)}>
        <AiOutlineCaretLeft className="fs-3 text-dark " />
        <AiOutlineCaretLeft className="fs-3 text-dark double-left" />
      </Button>
      <Button variant="warning p-1 mx-1" onClick={() => decrease()}>
        <AiOutlineCaretLeft className="fs-3 text-dark" />
      </Button>
      <p className="px-2 fs-3 m-0 border-2 border border-warning page-now"> {props.pages+1}</p>
      <Button variant="warning p-1 mx-1" onClick={() => increase()}>
        <AiOutlineCaretRight className="fs-3 text-dark" />
      </Button>
      <Button
        variant="warning p-0 mx-1 double-arrow"
        onClick={() => props.setPage(props.totalPages - 1)}
      >
        <AiOutlineCaretRight className="fs-3 text-dark double-right" />
        <AiOutlineCaretRight className="fs-3 text-dark" />
      </Button>
    </div>
  );
}
