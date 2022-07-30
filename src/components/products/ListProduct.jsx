import React, { useState, useEffect } from "react";
import { AiOutlineSave, AiOutlineSearch } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Flip, toast, ToastContainer } from "react-toastify";
import "./products.css";
import { Button, Table, Form, InputGroup } from "react-bootstrap";
import ProductGroupModal from "./ProductGroupModal";
import PaginationList from "../PaginationList";
import { Puff } from "react-loading-icons";
import { fetchData, sendData } from "../../helpers/restApi.helpers";
import { getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { useCookies } from "react-cookie";
import Paginations from "../Paginations";
export default function ListProduct() {
  const [cookies, setCookie] = useCookies();
  const [searchBarcode, setSearchBarcode] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [datas, setDatas] = useState({});
  const [searchData, setSearchData] = useState(null);
  const [deger, setDeger] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setDatas);
    }
    fetchData(datas, setDeger, page, size);
  }, []);
  useEffect(() => {
    fetchData(datas, setDeger, page, size);
  }, [datas, page, size]);
  // useEffect(() => {
  //   fetchData(datas, setSearchData, 0, 2500);
  // }, [searchBarcode, searchTitle]);
  useEffect(() => {
    setLoading(false);
  }, [datas, deger]);

  const changePrice = (e, barcode) => {
    const value = e.value;
    setDeger({
      ...deger,
      content: deger.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, [e.name]: parseFloat(value) };
        } else {
          return { ...d, [e.name]: d[e.name] };
        }
      }),
    });
  };

  const editedEnable = (barcode) => {
    setDeger({
      ...deger,
      content: deger.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isEdited: true };
        } else {
          return { ...d, isEdited: false };
        }
      }),
    });
  };
  const isTheGroup = (barcode) => {
    setDeger({
      ...deger,
      content: deger.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isTheGroup: true };
        } else {
          return { ...d, isTheGroup: false };
        }
      }),
    });
  };
  const isTheGroupClosed = (barcode) => {
    setDeger({
      ...deger,
      content: deger.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isTheGroup: false };
        } else {
          return { ...d, isTheGroup: false };
        }
      }),
    });
  };

  const sendSingulerValue = (barcode, datas) => {
    deger?.content.map((d) => {
      if (barcode === d.barcode) {
        let items = [
          {
            barcode: barcode,
            listPrice: d.listPrice,
            salePrice: d.salePrice,
            quantity: d.quantity,
          },
        ];
        if (d?.listPrice < d?.salePrice) {
          toast.warning("Piyasa fiyatı, Satış Fiyatından düşük olamaz.");
        } else {
          sendData(datas, items);
          toast.success("İşlem Başarılı");
        }
      }
    });
  };

  return (
    <div className="container d-flex flex-column m-auto">
      {/* 
      <div className="row mt-5">
        <div className="col-12 col-sm-5">
          <InputGroup className="mb-3">
            <Form.Control
              readOnly
              placeholder="Başlık İle Arama"
              name="searchTitle"
              aria-label="search"
              aria-describedby="basic-addon1"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value.toLowerCase())}
            />
          </InputGroup>
        </div>
        <div className="col-12 col-sm-5">
          <InputGroup className="mb-3">
            <Form.Control
              readOnly
              placeholder="Barkod ile Arama"
              aria-label="search"
              name="searchBarcode"
              aria-describedby="basic-addon1"
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value.toLowerCase())}
            />
          </InputGroup>
        </div>
        
      </div> */}
      <div className="row pagination-list d-flex justify-content-between align-items-center mt-2">
        <div className="col-2 align-self-end">
          <Button variant="warning" className="bg-warning">
            <AiOutlineSearch
              className="icon-size-save fs-3"
              style={{ cursor: "pointer" }}
            />
          </Button>
        </div>
        <div className="col-6 d-flex flex-column">
          <span className="align-self-end">
            Sayfa Sayısı:{deger.totalPages}{" "}
          </span>
          <Paginations
            totalPages={deger.totalPages}
            setPage={setPage}
            pages={page}
            setSize={setSize}
            size={size}
          />
        </div>
      </div>

      {loading ? (
        <p className="d-flex justify-content-center align-items-center">
          <Puff stroke="#ffc107" fill="#2a2a2a" /> Yükleniyor...
        </p>
      ) : (
        <Table className="mt-3">
          <thead className="products-thead">
            <tr className="row text-center table-title d-flex justify-content-center align-items-center">
              <th className="col-12 col-sm-3">Başlık</th>
              <th className="col-12 col-sm-2">Grupla</th>
              <th className="col-12 col-sm-2">Barkod</th>
              <th className="col-12 col-sm-1">Resim</th>
              <th className="col-12 col-sm-1">Stok</th>
              <th className="col-12 col-sm-1">Piyasa Fiyatı</th>
              <th className="col-12 col-sm-1">Satış Fiyatı</th>
              <th className="col-12 col-sm-1">Kaydet</th>
            </tr>
          </thead>

          <tbody>
            {deger?.content
              // ?.filter((st) => {
              //     if (searchTitle !== "") {
              //       return st?.title.toLowerCase().includes(searchTitle);
              //     }
              //     return st;
              //   })
              //   .filter((sb) => {
              //     if (searchBarcode !== "") {
              //       return sb?.barcode.toLowerCase().includes(searchBarcode);
              //     }
              //     return sb;
              //   })
              ?.map((p, index) => {
                return (
                  <tr
                    key={index}
                    className="d-flex row flex-direction justify-content-center align-items-start p-0 text-center table-body"
                  >
                    <td className="col-12 col-lg-3 align-self-center text-break">
                      {p.title}
                    </td>
                    <td className="col-4 col-lg-2 align-self-center text-break">
                      <Button
                        variant="warning m-auto d-flex justify-content-center align-items-center"
                        onClick={() => isTheGroup(p.barcode)}
                      >
                        <FaLayerGroup className="fs-4" /> Grupla
                      </Button>
                      <ProductGroupModal
                        show={p.isTheGroup}
                        data={p}
                        onHide={() => isTheGroupClosed(p.barcode)}
                        index={index}
                      />
                    </td>
                    <td className="col-4 col-lg-2 align-self-center text-break">
                      {p.barcode}
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break p-3">
                      <img
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
                        }}
                        src={
                          p?.images[0]?.url
                            ? p?.images[0]?.url
                            : p?.images[1]?.url
                        }
                        alt={p.title}
                        className="w-100"
                      />
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break">
                      <input
                        type="number"
                        name="quantity"
                        max="20000"
                        min="0"
                        id={deger?.content[index]?.stockId}
                        value={
                          deger?.content[index]?.quantity > 20000
                            ? 20000
                            : deger?.content[index]?.quantity
                        }
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index]?.isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                      />
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break">
                      <input
                        type="number"
                        name="listPrice"
                        id={deger?.content[index]?.platformListingId}
                        value={deger?.content[index]?.listPrice}
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index]?.isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                        style={
                          deger?.content[index]?.listPrice >=
                          deger?.content[index]?.salePrice
                            ? { borderColor: "" }
                            : { borderColor: "red" }
                        }
                      />
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break">
                      <input
                        type="number"
                        name="salePrice"
                        id={deger?.content[index]?.id}
                        value={deger?.content[index]?.salePrice}
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index]?.isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                        style={
                          deger?.content[index]?.listPrice >=
                          deger?.content[index]?.salePrice
                            ? { borderColor: "" }
                            : { borderColor: "red" }
                        }
                      />
                    </td>
                    <td className="col-12 col-lg-1 align-self-center text-break color-success">
                      <Button
                        variant="success"
                        onClick={(e) => sendSingulerValue(p.barcode, datas)}
                      >
                        <AiOutlineSave
                          className="icon-size-save"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => sendSingulerValue(p.barcode, datas)}
                        />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      <div className="col-12 mb-5 d-flex flex-column bottom-pagination">
        <p className="align-self-end">Sayfa Sayısı:{deger.totalPages - 1} </p>
        <Paginations
          totalPages={deger.totalPages}
          setPage={setPage}
          pages={page}
          setSize={setSize}
          size={size}
        />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}
