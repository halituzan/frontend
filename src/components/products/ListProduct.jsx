import React, { useState, useEffect } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Flip, toast, ToastContainer } from "react-toastify";
import "./products.css";
import { Button, Table, Form, InputGroup } from "react-bootstrap";
import ProductGroupModal from "./ProductGroupModal";
import PaginationList from "../PaginationList";
import { Puff } from "react-loading-icons";
import { fetchData } from "../../helpers/restApi.helpers";
import { secret } from "../../helpers/keys";
import { getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { useCookies } from "react-cookie";
export default function ListProduct() {
  const [searchBarcode, setSearchBarcode] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [datas, setDatas] = useState({});
  const [deger, setDeger] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [cookies, setCookie] = useCookies();

  console.log(page);
  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setDatas);
    }
    fetchData(datas, setDeger, page);
  }, []);
  useEffect(() => {
    fetchData(datas, setDeger, page);
  }, [datas, page]);

  useEffect(() => {
    setLoading(false);
    console.log(datas);
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

    // setDeger((datas) =>
    //   datas?.content.map((d, i) => {
    //     if (index === i) {
    //       return { ...d, [e.name]: parseFloat(value) };
    //     } else {
    //       return { ...d, [e.name]: d[e.name] };
    //     }
    //   })
    // );
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

    // setDeger((datas) =>
    //   datas?.content.map((d, i) => {
    //     if (barcode === d.barcode) {
    //       return { ...d, isEdited: true };
    //     } else {
    //       return { ...d, isEdited: false };
    //     }
    //   })
    // );
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
          return { ...d, isTheGroup: true };
        } else {
          return { ...d, isTheGroup: false };
        }
      }),
    });
  };

  const sendData = (barcode, index) => {
    deger?.content.map((d) => {
      if (barcode === d.barcode) {
        if (deger?.content[index].listPrice < deger?.content[index].salePrice) {
          toast.warning("Piyasa fiyatı, Satış Fiyatından düşük olamaz.");
        } else {
          console.log("Data Gönderildi");
          console.log(d);
        }
      }
    });
    // old version
    // if (deger[index].listPrice < deger[index].salePrice) {
    //   toast.warning("Piyasa fiyatı, Satış Fiyatından düşük olamaz.");
    // } else {
    //   console.log("Data Gönderildi");
    //   console.log(deger);
    // }
  };

  return (
    <div className="container d-flex flex-column m-auto">
      <div className="pagination-list d-flex justify-content-center align-items-center mt-5">
        <PaginationList
          totalPages={deger.totalPages}
          nowPage={deger.page}
          setPage={setPage}
        />
      </div>

      {loading ? (
        <p className="d-flex justify-content-center align-items-center">
          <Puff stroke="#ffc107" fill="#2a2a2a" /> Yükleniyor...
        </p>
      ) : (
        <Table className="mt-3">
          <thead className="row">
            <tr className="col-12 col-sm-6">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Başlık İle Arama"
                  name="search"
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value.toLowerCase())}
                />
              </InputGroup>
            </tr>
            <tr className="col-12 col-sm-6">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Barkod ile Arama"
                  name="search"
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  value={searchBarcode}
                  onChange={(e) =>
                    setSearchBarcode(e.target.value.toLowerCase())
                  }
                />
              </InputGroup>
            </tr>
          </thead>
          <tbody className="products-thead">
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
          </tbody>

          <tbody>
            {deger?.content
              ?.filter((st) => {
                if (searchTitle !== "") {
                  return st?.title.toLowerCase().includes(searchTitle);
                }
                return st;
              })
              .filter((sb) => {
                if (searchBarcode !== "") {
                  return sb?.barcode.toLowerCase().includes(searchBarcode);
                }
                return sb;
              })
              .map((p, index) => {
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
                        id={deger?.content[index].stockId}
                        value={
                          deger?.content[index].quantity > 20000
                            ? 20000
                            : deger?.content[index].quantity
                        }
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index].isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                      />
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break">
                      <input
                        type="number"
                        name="listPrice"
                        id={deger?.content[index].platformListingId}
                        value={deger?.content[index].listPrice}
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index].isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                        style={
                          deger?.content[index].listPrice >=
                          deger?.content[index].salePrice
                            ? { borderColor: "" }
                            : { borderColor: "red" }
                        }
                      />
                    </td>
                    <td className="col-4 col-lg-1 align-self-center text-break">
                      <input
                        type="number"
                        name="salePrice"
                        id={deger?.content[index].id}
                        value={deger?.content[index].salePrice}
                        onChange={(e) => changePrice(e.target, p.barcode)}
                        onClick={() => editedEnable(p.barcode)}
                        readOnly={
                          deger?.content[index].isEdited ? "" : "readOnly"
                        }
                        className="form-control"
                        style={
                          deger?.content[index].listPrice >=
                          deger?.content[index].salePrice
                            ? { borderColor: "" }
                            : { borderColor: "red" }
                        }
                      />
                    </td>
                    <td className="col-12 col-lg-1 align-self-center text-break color-success">
                      <Button
                        variant="success"
                        onClick={(e) => sendData(p.barcode, index)}
                      >
                        <AiOutlineSave
                          className="icon-size-save"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => sendData(p.barcode, index)}
                        />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        type="error"
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}
