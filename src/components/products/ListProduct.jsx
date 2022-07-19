import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineSave } from "react-icons/ai";
import { fakeData } from "../../fakeData";
import "./products.css";
export default function ListProduct() {
  const content = fakeData.content;

  useEffect(() => {}, []);

  const [deger, setDeger] = useState(content);
  const [isWarn, setIsWarn] = useState(true);

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
  
  const sendData = (index) => {
    if (deger[index].listPrice < deger[index].salePrice) {
      setIsWarn(false);
      setTimeout(() => setIsWarn(true), 5000);
    } else {
      setIsWarn(true);
    }
  };

  return (
    <div className="container d-flex flex-column m-auto">
      <div
        className="warn justify-content-center bg-warning"
        style={isWarn ? { display: "none" } : { display: "block" }}
      >
        <p>Piyasa fiyatı, Satış Fiyatından düşük olamaz.</p>
      </div>
      <div className="pagination d-flex justify-content-between"></div>

      <Table>
        <thead>
          <tr className="row text-center table-title d-flex justify-content-center align-items-center">
            <th className="col-4">Başlık</th>
            <th className="col-1">Grupla</th>
            <th className="col-2">Barcode</th>
            {/* <th className="col-1">Brand</th> */}
            <th className="col-1">Stok</th>

            <th className="col-1">Piyasa Fiyatı</th>
            <th className="col-1">Satış Fiyatı</th>
            <th className="col-1">Save</th>
            <th className="col-1">Resim</th>
          </tr>
        </thead>
        <tbody>
          {deger?.map((p, index) => {
            return (
              <tr
                key={index}
                className="d-flex flex-direction justify-content-center align-items-center p-0 text-center table-body"
              >
                <td className="col-4">{p.title}</td>
                <td className="col-1">Gruba ekle</td>
                <td className="col-2">{p.barcode}</td>
                {/* <td className="col-1">{p.brand}</td> */}
                {/* <td className="col-1">{p.quantity}</td> */}
                <td className="col-1">
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

                <td className="col-1">
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
                <td className="col-1">
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
                <td className="col-1 color-success">
                  <AiOutlineSave
                    className="icon-size-save"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => sendData(index)}
                  />
                </td>
                <td className="col-1">
                  <img
                    src={p.images[0].url ? p.images[0].url : p.images[1].url}
                    alt={p.title}
                    className="product-image"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
