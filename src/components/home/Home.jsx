import React, { useState, useEffect } from "react";
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
  const [cookies, setCookie] = useCookies(["jwt"]);
  const token = cookies.jwt;

  useEffect(() => {
    getData(jwt_decode(token).id, setData);
  }, []);

  return (
    <>
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <div className="side-logo-1 d-flex justify-content-center align-items-center my-3">
            <div className="side-logo-p text-center">
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
            </div>
          </div>
          <div className="text-center">
            {data.name && data.surname ? (
              <p>
                Hoş Geldin {data.name} {data.surname}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="text-center">
            Hemen <Link to="/settings">Ayarlar</Link> Bölümüne Giderek Mağaza
            Bilgilerinizi Güncelleyebilirsiniz.{" "}
          </div>
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
          <div className="text-center">
            Ürünlerinize Hızlıca Ulaşarak Kolaylıkla Düzenleyebilirsiniz.
          </div>
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
          <div className="text-center">
            Ürün gruplarını tek bir alanda yönetebilir ve gruba ait ürünleri
            toplu bir şekilde güncelleyebilirsiniz.
          </div>
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
          <div className="text-center">
            Ürünlerinizi toplu bir şekilde düzenlemeniz için ürün grupları
            oluşturabilirsiniz.
          </div>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-4 col-xl-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link className="side-a" to="/settings">
            <AiFillRocket />
          </Link>

          <h3> Fiyat Rekabeti</h3>
          <hr className="text-warning w-100" />
          <div className="text-center">
            Ürünlerinizin Buybox sisteminde öne çıkarabilmeniz için
            tasarlanmıştır. Diğer mağazalar ile fiyatlarınızı karşılaştırarak
            otomatik fiyatlandırma yapmaktadır.
          </div>
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
          <div className="text-center">
            Ürünlerinizin alış fiyatlarını tanımlayarak hangi üründen ne kadar
            kar elde ettiğinizi kolaylıkla görebilir ve karlılık oranına göre
            fiyat değişimini yapabilirsiniz.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
