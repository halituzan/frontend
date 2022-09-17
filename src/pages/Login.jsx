import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import axios from "axios";
import "./index.css";
import { secret } from "../helpers/keys";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => toast.error(err, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        secret.SELF_DB + "/login",
        {
          ...values,
        },
        {
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-container">
      <div className="container-auth">
        <h2>Login </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Şifre"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Giriş</button>
          <button type="button">
            <Link to="/register">Kayıt Ol</Link>
          </button>
        </form>
        <ToastContainer transition={Flip} autoClose={2000} />
      </div>
    </div>
  );
}
