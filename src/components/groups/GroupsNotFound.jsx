import React from "react";
import { Link } from "react-router-dom";
import { FaNotEqual } from "react-icons/fa";
import "../components.css";

export default function GroupsNotFound() {
  return (
    <div className="w-100 mt-5 d-flex flex-column justify-conten-center align-items-center text-center">
      <h1 className="not-found-title mb-5">
        <FaNotEqual /> Opps.!!!
      </h1>
      <p className="fs-3 mt-5">
        Oluşturulmuş bir grup bulunamadı. <br /> Lütfen
        <Link to="/create-group"> Grup Oluşturma </Link> sayfasına giderek bir
        grup oluşturun.
      </p>
    </div>
  );
}
