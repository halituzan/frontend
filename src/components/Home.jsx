import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./components.css";
import {
  AiOutlineBlock,
  AiOutlineAppstore,
  AiOutlineCalculator,
  AiFillRocket,
} from "react-icons/ai";
import { parseJwt } from "../helpers/jwt.helpers";
import { useCookies } from "react-cookie";
import { getId } from "../helpers/db.helpers";

const Home = () => {
  const [cards, setCard] = useState(false);
  const [data, setData] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    getId(parseJwt(token).id, setData);
  }, []);

  return (
    <>
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-center align-items-center bg-dark text-light mt-2">
          <div className="side-logo d-flex justify-content-center align-items-center bg-warning my-3">
            <p className="side-logo-p">
              {data?.name?.slice(0, 1).toUpperCase()}
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
          <Link style={{fontSize:"10rem",marginTop:"-60px"}} to="/products">
            <AiOutlineBlock />
          </Link>

          <h3> Ürünler</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürünlerinize Hızlıca Ulaşarak Kolaylıkla Düzenleyebilirsiniz.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link style={{fontSize:"10rem",marginTop:"-60px"}} to="/product-groups">
            <AiOutlineAppstore />
          </Link>

          <h3> Ürün Grupları</h3>
          <hr className="text-warning w-100" />
          <p className="text-center">
            Ürün grupları oluşturarak aynı ürünleri toplu bir şekilde fiyat
            güncellemesi yapabilir ya da stoklarını değiştirebilirsiniz.
          </p>
        </div>
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link style={{fontSize:"10rem",marginTop:"-60px"}} to="/settings">
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
      <div className="row container m-auto">
        <div className="side d-flex col-12 col-sm-6 col-lg-3 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
          <Link style={{fontSize:"10rem",marginTop:"-60px"}} to="/settings">
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
      </div>
    </>
  );
};

export default Home;
