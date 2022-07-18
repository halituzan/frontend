import axios from "axios";
import React, { useState, useEffect } from "react";

export default function UserInfo() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getId = async () => {
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );
      setData(data);
    };
    getId();
  }, []);

//   useEffect(() => {
//     const getValue = async () => {
//       const { data } = await axios.get(`http://localhost:4000/info/${id}`);
//       setValues(data);
//     };
//     if (id === "") {
//     } else {
//       getValue();
//     }
//   }, [change]);


  return (
    <div className="container mt-5">
      <h2 className="my-1 fs-3">Kullanıcı Bilgileri</h2>
      <hr />
    </div>
  );
}
