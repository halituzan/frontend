import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./components.css";
import {
  AiOutlineLogin,
  AiFillSetting,
  AiOutlineBlock,
  AiOutlineAppstore,
  AiOutlineAppstoreAdd,
  AiOutlineCalculator,
} from "react-icons/ai";
const Home = () => {
  const [cards,setCard] = useState(false)
  const [datas, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );
      setData(data);
    };

    getData();
  }, []);
  return (
    <div className="container d-flex">
      <div className="side d-flex mx-1 flex-column justify-content-center align-items-center bg-dark text-light mt-2">
        <div className="side-logo d-flex justify-content-center align-items-center bg-warning my-3">
          {datas?.name?.slice(0, 1)}
        </div>
        <p className="text-center">
          Merhabalar, Hoş Geldin {datas?.name} {datas?.surname}
        </p>
        <p className="text-center">
          Hemen <Link to="/settings">Ayarlar</Link> Bölümüne Giderek Mağaza
          Bilgilerinizi Güncelleyebilirsiniz.{" "}
        </p>
      </div>
      <div className="side d-flex mx-1 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
        <div className="home-card d-flex justify-content-center align-items-center bg-warning my-3">
          <AiOutlineBlock/>
        </div>
        <h3> Ürünler</h3>
        <hr className="text-warning w-100"/>
        <p className="text-center">
          Ürünlerinize Hızlıca Ulaşarak Kolaylıkla Düzenleyebilirsiniz.
        </p>
      </div>
      <div className="side d-flex mx-1 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
        <div className="home-card d-flex justify-content-center align-items-center bg-warning my-3">
          <AiOutlineAppstore/>
        </div>
        <h3> Ürün Grupları</h3>
        <hr className="text-warning w-100"/>
        <p className="text-center">
          Ürün grupları oluşturarak aynı ürünleri toplu bir şekilde fiyat güncellemesi yapabilir ya da stoklarını değiştirebilirsiniz.
        </p>
      </div>
      <div className="side d-flex mx-1 flex-column justify-content-start align-items-center bg-dark text-light mt-2">
        <div className="home-card d-flex justify-content-center align-items-center bg-warning my-3">
          <AiOutlineCalculator/>
        </div>
        <h3> Karlılık</h3>
        <hr className="text-warning w-100"/>
        <p className="text-center">
         Ürünlerinizin alış fiyatlarını tanımlayarak hangi üründen ne kadar kar elde ettiğinizi kolaylıkla görebilir ve karlılık oranına göre fiyat değişimini yapabilirsiniz. 
        </p>
      </div>
      
    </div>
  );
};

export default Home;
