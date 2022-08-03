import React, { useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Paginations(props) {
  const [page, setPage] = useState(props.totalPages);
  const [sayfalandirma, setSayfalandirma] = useState([1, 2, 3, 4, 5]);
  const increase = () => {
    if (sayfalandirma[4] < props.totalPages) {
      setSayfalandirma((sayfalandir) => sayfalandir.map((s) => s + 1));
    }
  };
  const decrease = () => {
    if (sayfalandirma[0] > 1) {
      setSayfalandirma((sayfalandir) => sayfalandir.map((s) => s - 1));
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

      <Pagination className="px-2 fs-3 m-0 d-flex page-now" size="sm" >
        <Pagination.First onClick={() => setSayfalandirma([1, 2, 3, 4, 5])} />
        <Pagination.Prev onClick={() => decrease()} />
        {sayfalandirma.map((s, i) => (
          <Pagination.Item onClick={() => props.setPage(s - 1)}>
            {s}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => increase()} />

        <Pagination.Last
          onClick={() =>
            setSayfalandirma([
              props.totalPages - 4,
              props.totalPages - 3,
              props.totalPages - 2,
              props.totalPages - 1,
              props.totalPages,
            ])
          }
        />
      </Pagination>
    </div>
  );
}
