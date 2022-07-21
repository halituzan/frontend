import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineSave } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Flip, toast, ToastContainer } from "react-toastify";
import { fakeData } from "../../fakeData";
import "./products.css";


import { Button } from "react-bootstrap";
import ProductGroupModal from "./ProductGroupModal";

export default function ListProduct() {
  const content = fakeData.content;
  const [deger, setDeger] = useState(content);

  const [groupValue, setGroupValue] = useState();


  const changePrice = (e, index) => {
    const value = e.value;

    setDeger((datas) =>
      datas.map((d, i) => {
        if (index === i) {
          return { ...d, [e.name]: parseFloat(value) };
        } else {
          return { ...d, [e.name]: d[e.name] };
        }
      })
    );
  };
  const editedEnable = (index) => {
    setDeger((datas) =>
      datas.map((d, i) => {
        if (index === i) {
          return { ...d, isEdited: true };
        } else {
          return { ...d, isEdited: false };
        }
      })
    );
  };
  const isTheGroup = (index) => {
    setDeger((datas) =>
      datas.map((d, i) => {
        if (index === i) {
          return { ...d, isTheGroup: true };
        } else {
          return { ...d, isTheGroup: false };
        }
      })
    );
  };
  const isTheGroupClosed = (index) => {
    setDeger((datas) =>
      datas.map((d, i) => {
        
        if (index === i) {
          console.log(d);
          return { ...d, isTheGroup: false };
        } else {
          return { ...d, isTheGroup: false };
        }
      })
    );
  };
  const groupHandle = (e) => {
    setGroupValue(e.target.value);
  };

  const sendData = (index) => {
    if (deger[index].listPrice < deger[index].salePrice) {
      toast.warning("Piyasa fiyatı, Satış Fiyatından düşük olamaz.");
    } else {
      console.log("Data Gönderildi");
      console.log(deger);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column m-auto">
      <div className="pagination d-flex justify-content-between"></div>

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
          {deger?.map((p, index) => {
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
                    onClick={() => isTheGroup(index)}
                  >
                    <FaLayerGroup className="fs-4" /> Grupla
                  </Button>
                  <ProductGroupModal
                    show={deger[index].isTheGroup}
                    data={deger[index]}
                    onHide={() => isTheGroupClosed(index)}
                    index={index}
                  />
                </td>
                <td className="col-4 col-lg-2 align-self-center text-break">
                  {p.barcode}
                </td>
                <td className="col-4 col-lg-1 align-self-center text-break">
                  <img
                    src={p.images[0].url ? p.images[0].url : p.images[1].url}
                    alt={p.title}
                    className="product-image"
                  />
                </td>
                <td className="col-4 col-lg-1 align-self-center text-break">
                  <input
                    type="number"
                    name="quantity"
                    max="20000"
                    min="0"
                    id={deger[index].stockId}
                    value={
                      deger[index].quantity > 20000
                        ? 20000
                        : deger[index].quantity
                    }
                    onChange={(e) => changePrice(e.target, index)}
                    onClick={() => editedEnable(index)}
                    readOnly={deger[index].isEdited ? "" : "readOnly"}
                    className="form-control"
                  />
                </td>
                <td className="col-4 col-lg-1 align-self-center text-break">
                  <input
                    type="number"
                    name="listPrice"
                    id={deger[index].platformListingId}
                    value={deger[index].listPrice}
                    onChange={(e) => changePrice(e.target, index)}
                    onClick={() => editedEnable(index)}
                    readOnly={deger[index].isEdited ? "" : "readOnly"}
                    className="form-control"
                    style={
                      deger[index].listPrice >= deger[index].salePrice
                        ? { borderColor: "" }
                        : { borderColor: "red" }
                    }
                  />
                </td>
                <td className="col-4 col-lg-1 align-self-center text-break">
                  <input
                    type="number"
                    name="salePrice"
                    id={deger[index].id}
                    value={deger[index].salePrice}
                    onChange={(e) => changePrice(e.target, index)}
                    onClick={() => editedEnable(index)}
                    readOnly={deger[index].isEdited ? "" : "readOnly"}
                    className="form-control"
                    style={
                      deger[index].listPrice >= deger[index].salePrice
                        ? { borderColor: "" }
                        : { borderColor: "red" }
                    }
                  />
                </td>
                <td className="col-12 col-lg-1 align-self-center text-break color-success">
                  <AiOutlineSave
                    className="icon-size-save"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => sendData(index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
