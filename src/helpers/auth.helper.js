import axios from "axios";
import { toast } from "react-toastify";

export const authHelpers = (cookies, removeCookies, navigate) => {
  const verifyUser = async () => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );
      if (!data.status) {
        removeCookies("jwt");
        navigate("/login");
      } else {
        toast.success(`Merhabalar ${data.name}`, { theme: "dark" });
      }
    }
  };
  verifyUser();
};

export const logOutHelpers = (removeCookies, navigate) => {
  removeCookies("jwt");
  navigate("/login");
};
