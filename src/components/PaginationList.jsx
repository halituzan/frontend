import React, { useState } from "react";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationList(props) {
  console.log(props);

  const [page, setPage] = useState(props.totalPages);
  const [innerTxt, setInnerTxt] = useState();

  let pageLimit = 5;
  let arr = [];
  const pager = (i = 0) => {
    console.log(i);
    for (i; i < pageLimit; i++) {
      arr.push(i);
    }
  };
  pager();

  useEffect(() => {}, []);

  const onSelected = (e, index) => {
    props.setPage(parseFloat(e.target.name));
    setInnerTxt(parseFloat(e.target.name));
  };
  const increase = () => {
    setInnerTxt(parseFloat(innerTxt + 1));
    props.setPage(parseFloat(innerTxt + 1));
  };
  const decrease = () => {
    props.setPage(parseFloat(innerTxt - 1));

    setInnerTxt(parseFloat(innerTxt - 1));
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => props.setPage(0)} />
      <Pagination.Prev onClick={() => decrease()} />
      {arr?.map((i) => (
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
      <Pagination.Last
        onClick={() => {
          setInnerTxt(props.totalPages-1);
          props.setPage(props.totalPages-1);
        }}
      />
    </Pagination>
  );
}
