import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
export default function UserRole({ role }) {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center fs-3 mt-5">
      <h2 className="membership p-2 text-dark fs-1">
        Üyelik tipiniz {role}
      </h2>
      <p>Lütfen Üyeliğinizi Yükseltin</p>
      <p>
        Paketinizi Yükseltmek İçin
        <Link to="/membership"> Tıklayın.</Link>
      </p>
    </div>
  );
}
