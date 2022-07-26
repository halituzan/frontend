import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationList() {
  const [page, setPage] = useState(5);
  const [innerTxt, setInnerTxt] = useState();

  let arr = [];
  const pager = () => {
    for (let i = 0; i < page; i++) {
      arr.push(i);
    }
  };
  const onSelected = (e, index) => {
    setInnerTxt(parseFloat(e.target.name));
  };
  const increase = () => {
    setInnerTxt(parseFloat(innerTxt + 1));
  };
  const decrease = () => {
    setInnerTxt(parseFloat(innerTxt - 1));
  };

  pager();
  return (
    <Pagination>
      <Pagination.First onClick={() => setInnerTxt(0)} />
      <Pagination.Prev onClick={() => decrease()} />
      {arr.map((i) => (
        <Pagination.Item
          key={i}
          active={parseFloat(innerTxt) === i ? true : false}
          onClick={(e) => onSelected(e, i)}
          name={i}
        >
          {++i}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => increase()} />
      <Pagination.Last onClick={() => setInnerTxt(4)} />
    </Pagination>
  );
}
