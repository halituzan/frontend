import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components.css";
import { FaMedal } from "react-icons/fa";

// import Profile from "./Profile";
import {
  AiOutlineBlock,
  AiOutlineAppstore,
  AiOutlineCalculator,
  AiFillRocket,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { getData } from "../../helpers/db.helpers";

const Home = () => {
  const [data, setData] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    getData(jwt_decode(token).id, setData);
  }, []);

  return (
    <>
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <div className="side-logo-1 d-flex justify-content-center align-items-center my-3">
            <p className="side-logo-p">
              {data.userRole !== "silver" ? (
                <h2
                  style={{
                    fontFamily: "Roboto Slab, serif",
                    fontSize: "1.9rem",
                  }}
                >
                  Gold Üye
                </h2>
              ) : (
                <h2
                  style={{
                    fontFamily: "Roboto Slab, serif",
                    color: "#212529",
                    fontSize: "1.9rem",
                  }}
                >
                  Silver Üye
                </h2>
              )}
              {data.userRole !== "silver" ? (
                <FaMedal style={{ fontSize: "10rem", color: "#ffa40b" }} />
              ) : (
                <FaMedal style={{ fontSize: "10rem", color: "#c0c0c0" }} />
              )}
            </p>
          </div>
          <p className="text-center">
            Hoş Geldin {data?.name?.toUpperCase()}{" "}
            {data?.surname?.toUpperCase()}
          </p>
          <p className="text-center">
            Hemen <Link to="/settings">Ayarlar</Link> Bölümüne Giderek Mağaza
            Bilgilerinizi Güncelleyebilirsiniz.{" "}
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link
            style={{ fontSize: "10rem", marginTop: "-60px" }}
            to="/products"
          >
            <AiOutlineBlock />
          </Link>

          <h3> Ürünler</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürünlerinize Hızlıca Ulaşarak Kolaylıkla Düzenleyebilirsiniz.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link
            style={{ fontSize: "10rem", marginTop: "-60px" }}
            to="/product-groups"
          >
            <AiOutlineAppstore />
          </Link>

          <h3> Ürün Grupları</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürün gruplarını tek bir alanda yönetebilir ve gruba ait ürünleri
            toplu bir şekilde güncelleyebilirsiniz.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link
            style={{ fontSize: "10rem", marginTop: "-60px" }}
            to="/create-group"
          >
            <AiOutlineAppstoreAdd />
          </Link>

          <h3> Grup Oluştur</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürünlerinizi toplu bir şekilde düzenlemeniz için ürün grupları
            oluşturabilirsiniz.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link
            style={{ fontSize: "10rem", marginTop: "-60px" }}
            to="/settings"
          >
            <AiFillRocket />
          </Link>

          <h3> Fiyat Rekabeti</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürünlerinizin Buybox sisteminde öne çıkarabilmeniz için
            tasarlanmıştır. Diğer mağazalar ile fiyatlarınızı karşılaştırarak
            otomatik fiyatlandırma yapmaktadır.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link
            style={{ fontSize: "10rem", marginTop: "-60px" }}
            to="/create-group"
          >
            <AiOutlineCalculator />
          </Link>

          <h3> Karlılık</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürünlerinizin alış fiyatlarını tanımlayarak hangi üründen ne kadar
            kar elde ettiğinizi kolaylıkla görebilir ve karlılık oranına göre
            fiyat değişimini yapabilirsiniz.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
