import axios from "axios";
import { secret } from "./keys";

export const authHelpers = (cookies, removeCookies, navigate) => {
  const verifyUser = async () => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const { data } = await axios.post(
        secret.END_POINT_SELF,
        {},
        { withCredentials: true }
      );
      if (!data.status) {
        removeCookies("jwt");
        navigate("/login");
      } else {
        //toast.success(`Merhabalar ${data.name}`, { theme: "dark" });
      }
    }
  };
  verifyUser();
};

export const logOutHelpers = (removeCookies, navigate) => {
  removeCookies("jwt");
  navigate("/login");
};
