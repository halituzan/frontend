import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components.css";
import Profile from "./Profile"
import {
  AiOutlineBlock,
  AiOutlineAppstore,
  AiOutlineCalculator,
  AiFillRocket,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";

import { parseJwt } from "../../helpers/jwt.helpers";
import { useCookies } from "react-cookie";
import { getData } from "../../helpers/db.helpers";

const Home = () => {
  const [cards, setCard] = useState(false);
  const [data, setData] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    getData(parseJwt(token).id, setData);
  }, []);

  return (
    <>
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-center align-items-center bg-dark text-light mt-2">
          <div className="side-logo-1 d-flex justify-content-center align-items-center my-3">
            <p className="side-logo-p">
              <Profile/>
            </p>
          </div>
          <p className="text-center">
            Merhabalar, Hoş Geldin {data?.name} {data?.surname}
          </p>
          <p className="text-center">
            Hemen <Link to="/settings">Ayarlar</Link> Bölümüne Giderek Mağaza
            Bilgilerinizi Güncelleyebilirsiniz.{" "}
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
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
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
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
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
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
      </div>
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
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
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
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
