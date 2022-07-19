import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { authHelpers } from "../helpers/auth.helper";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";

export default function ProductGroups() {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    authHelpers(cookies, removeCookies, navigate);
  }, [cookies, navigate, removeCookies]);
  return (
    <div className="d-flex flex-column">
      <NavbarMenu />
      ProductGroups
    </div>
  );
}
