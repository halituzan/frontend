import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./index.css";
import { secret } from "../helpers/keys";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [phone, setPhone] = useState();

  const generateError = (err) => toast.error(err, { position: "bottom-right" });
  const generateSuccess = (message) =>
    toast.success(message, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const onjectAssign = Object.assign(values, { phone });
      const { data } = await axios.post(
        secret.SELF_DB + "/register",
        { ...onjectAssign },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data) {
        if (data.errors) {
          const { email, password, phone, name, surname } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (phone) generateError(phone);
          else if (name) generateError(name);
          else if (surname) generateError(surname);
        } else {
          navigate("/login");
          generateSuccess("Kayıt Başarılı");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-container">
      <div className="container-auth">
        <h2>Kayıt Formu</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Ad"
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="surname"
              name="surname"
              id="surname"
              placeholder="Soy Ad"
              value={values.surname}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div>
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
            <PhoneInput
              international
              className="phoneDiv"
              defaultCountry="TR"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <div>
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
          <button type="submit">Gönder</button>
          <span>
            Zaten bir hesabınız var mı? <Link to="/login">Giriş</Link>
          </span>
        </form>
        <ToastContainer transition={Flip} autoClose={2000} />
      </div>
    </div>
  );
}
