import React, { useState } from "react";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationList(props) {
  const [page, setPage] = useState(props.totalPages);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(5);
  const [innerTxt, setInnerTxt] = useState();

  // let pageLimit = 5;
  let arr = [];
  const pager = (i = 0, pageLimit = 5) => {
    for (i; i < pageLimit; i++) {
      arr.push(i);
    }
  };
  useEffect(() => {
    pager(minLimit, maxLimit);
  }, []);
  //pager(minLimit, maxLimit);

  useEffect(() => {
    pager(minLimit, maxLimit);
  }, [minLimit, maxLimit]);

  const onSelected = (e, index) => {
    props.setPage(parseFloat(e.target.name));
    setInnerTxt(parseFloat(e.target.name));
  };
  const increase = () => {
    // setInnerTxt(parseFloat(innerTxt + 1));
    //props.setPage(parseFloat(innerTxt + 1));
    if (innerTxt % 3 === 0) {
      setMaxLimit(minLimit + 5);
      setMaxLimit(maxLimit + 5);
    }
  };
  const decrease = () => {
    //props.setPage(parseFloat(innerTxt - 1));

    //setInnerTxt(parseFloat(innerTxt - 1));
    if (innerTxt % 3 === 0) {
      setMaxLimit(minLimit - 5);
      setMaxLimit(maxLimit - 5);
    }
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
          setInnerTxt(props.totalPages - 1);
          props.setPage(props.totalPages - 1);
        }}
      />
    </Pagination>
  );
}
