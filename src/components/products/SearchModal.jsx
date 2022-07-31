import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Modal, Button, InputGroup, Form, Table } from "react-bootstrap";
import { getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import {
  fetchData,
  fetchSingleData,
  sendData,
} from "../../helpers/restApi.helpers";
import ProductGroupModal from "./ProductGroupModal";
import { FaLayerGroup } from "react-icons/fa";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

const SearchModal = (props) => {
  const [searchValues, setSearchValues] = useState({
    searchTitle: "",
    searchBarcode: "",
  });
  const [datas, setDatas] = useState({});
  const [singleData, setSingleData] = useState({});
  const [allData, setAllData] = useState();
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setDatas);
    }
  }, []);
  useEffect(() => {
    if (searchValues.searchBarcode !== "") {
      fetchSingleData(datas, searchValues.searchBarcode, setSingleData);
    }
    if (searchValues.searchTitle !== "") {
      fetchData(datas, setAllData, 0, 2500);
    }
  }, [searchValues]);
  const handleSearchInputs = (e) => {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
  };

  const changePrice = (e, barcode) => {
    const value = e.value;
    setSingleData({
      ...singleData,
      content: singleData.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, [e.name]: parseFloat(value) };
        } else {
          return { ...d, [e.name]: d[e.name] };
        }
      }),
    });
  };

  const editedEnable = (barcode) => {
    setSingleData({
      ...singleData,
      content: singleData.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isEdited: true };
        } else {
          return { ...d, isEdited: false };
        }
      }),
    });
  };
  const isTheGroup = (barcode) => {
    setSingleData({
      ...singleData,
      content: singleData.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isTheGroup: true };
        } else {
          return { ...d, isTheGroup: false };
        }
      }),
    });
  };
  const isTheGroupClosed = (barcode) => {
    setSingleData({
      ...singleData,
      content: singleData.content.map((d) => {
        if (barcode === d.barcode) {
          return { ...d, isTheGroup: false };
        } else {
          return { ...d, isTheGroup: false };
        }
      }),
    });
  };

  const sendSingulerValue = (barcode, datas) => {
    singleData?.content.map((d) => {
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
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="m-auto">
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          Ürün Başlıklarına ve Barcodlarına Göre Arama Yapabilirsiniz
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <p className="text-center">Barkod ile aramada <span className="fw-bold"> Büyük Harf / Küçük Harf </span> dikkate alınarak aratılmalıdır.</p>
        <div className="row">
          <div className="col-12 col-sm-5">
            <InputGroup className="mb-3">
              <Form.Control
                
                disabled
                placeholder="Başlık İle Arama"
                name="searchTitle"
                aria-label="search"
                aria-describedby="basic-addon1"
                value={searchValues.searchTitle}
                onChange={(e) => handleSearchInputs(e)}
              />
            </InputGroup>
          </div>
          <div className="col-12 col-sm-5">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Barkod ile Arama"
                aria-label="search"
                name="searchBarcode"
                aria-describedby="basic-addon1"
                value={searchValues.searchBarcode}
                onChange={(e) => handleSearchInputs(e)}
              />
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Body>
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
            {
              // allData
              //   ? allData?.content
              //       ?.filter((st) => {
              //         if (searchValues.searchTitle !== "") {
              //           return st?.title
              //             .toLowerCase()
              //             .includes(searchValues.searchTitle.toLowerCase());
              //         }
              //         return st;
              //       })
              //       ?.map((p, index) => {
              //         return (
              //           <tr
              //             key={index}
              //             className="d-flex row flex-direction justify-content-center align-items-start p-0 text-center table-body"
              //           >
              //             <td className="col-12 col-lg-3 align-self-center text-break">
              //               {p.title}
              //             </td>
              //             <td className="col-4 col-lg-2 align-self-center text-break">
              //               <Button
              //                 variant="warning m-auto d-flex justify-content-center align-items-center"
              //                 onClick={() => isTheGroup(p.barcode)}
              //               >
              //                 <FaLayerGroup className="fs-4" /> Grupla
              //               </Button>
              //               <ProductGroupModal
              //                 show={p.isTheGroup}
              //                 data={p}
              //                 onHide={() => isTheGroupClosed(p.barcode)}
              //                 index={index}
              //               />
              //             </td>
              //             <td className="col-4 col-lg-2 align-self-center text-break">
              //               {p.barcode}
              //             </td>
              //             <td className="col-4 col-lg-1 align-self-center text-break p-3">
              //               <img
              //                 onError={({ currentTarget }) => {
              //                   currentTarget.onerror = null; // prevents looping
              //                   currentTarget.src =
              //                     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
              //                 }}
              //                 src={
              //                   p?.images[0]?.url
              //                     ? p?.images[0]?.url
              //                     : p?.images[1]?.url
              //                 }
              //                 alt={p.title}
              //                 className="w-100"
              //               />
              //             </td>
              //             <td className="col-4 col-lg-1 align-self-center text-break">
              //               <input
              //                 type="number"
              //                 name="quantity"
              //                 max="20000"
              //                 min="0"
              //                 id={singleData?.content[index]?.stockId}
              //                 value={
              //                   singleData?.content[index]?.quantity > 20000
              //                     ? 20000
              //                     : singleData?.content[index]?.quantity
              //                 }
              //                 onChange={(e) => changePrice(e.target, p.barcode)}
              //                 onClick={() => editedEnable(p.barcode)}
              //                 readOnly={
              //                   singleData?.content[index]?.isEdited
              //                     ? ""
              //                     : "readOnly"
              //                 }
              //                 className="form-control"
              //               />
              //             </td>
              //             <td className="col-4 col-lg-1 align-self-center text-break">
              //               <input
              //                 type="number"
              //                 name="listPrice"
              //                 id={singleData?.content[index]?.platformListingId}
              //                 value={singleData?.content[index]?.listPrice}
              //                 onChange={(e) => changePrice(e.target, p.barcode)}
              //                 onClick={() => editedEnable(p.barcode)}
              //                 readOnly={
              //                   singleData?.content[index]?.isEdited
              //                     ? ""
              //                     : "readOnly"
              //                 }
              //                 className="form-control"
              //                 style={
              //                   singleData?.content[index]?.listPrice >=
              //                   singleData?.content[index]?.salePrice
              //                     ? { borderColor: "" }
              //                     : { borderColor: "red" }
              //                 }
              //               />
              //             </td>
              //             <td className="col-4 col-lg-1 align-self-center text-break">
              //               <input
              //                 type="number"
              //                 name="salePrice"
              //                 id={singleData?.content[index]?.id}
              //                 value={singleData?.content[index]?.salePrice}
              //                 onChange={(e) => changePrice(e.target, p.barcode)}
              //                 onClick={() => editedEnable(p.barcode)}
              //                 readOnly={
              //                   singleData?.content[index]?.isEdited
              //                     ? ""
              //                     : "readOnly"
              //                 }
              //                 className="form-control"
              //                 style={
              //                   singleData?.content[index]?.listPrice >=
              //                   singleData?.content[index]?.salePrice
              //                     ? { borderColor: "" }
              //                     : { borderColor: "red" }
              //                 }
              //               />
              //             </td>
              //             <td className="col-12 col-lg-1 align-self-center text-break color-success">
              //               <Button
              //                 variant="success"
              //                 onClick={(e) => sendSingulerValue(p.barcode, datas)}
              //               >
              //                 <AiOutlineSave
              //                   className="icon-size-save"
              //                   style={{ cursor: "pointer" }}
              //                   onClick={(e) =>
              //                     sendSingulerValue(p.barcode, datas)
              //                   }
              //                 />
              //               </Button>
              //             </td>
              //           </tr>
              //         );
              //       })
              //   :
              singleData?.content
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
                          id={singleData?.content[index]?.stockId}
                          value={
                            singleData?.content[index]?.quantity > 20000
                              ? 20000
                              : singleData?.content[index]?.quantity
                          }
                          onChange={(e) => changePrice(e.target, p.barcode)}
                          onClick={() => editedEnable(p.barcode)}
                          readOnly={
                            singleData?.content[index]?.isEdited
                              ? ""
                              : "readOnly"
                          }
                          className="form-control"
                        />
                      </td>
                      <td className="col-4 col-lg-1 align-self-center text-break">
                        <input
                          type="number"
                          name="listPrice"
                          id={singleData?.content[index]?.platformListingId}
                          value={singleData?.content[index]?.listPrice}
                          onChange={(e) => changePrice(e.target, p.barcode)}
                          onClick={() => editedEnable(p.barcode)}
                          readOnly={
                            singleData?.content[index]?.isEdited
                              ? ""
                              : "readOnly"
                          }
                          className="form-control"
                          style={
                            singleData?.content[index]?.listPrice >=
                            singleData?.content[index]?.salePrice
                              ? { borderColor: "" }
                              : { borderColor: "red" }
                          }
                        />
                      </td>
                      <td className="col-4 col-lg-1 align-self-center text-break">
                        <input
                          type="number"
                          name="salePrice"
                          id={singleData?.content[index]?.id}
                          value={singleData?.content[index]?.salePrice}
                          onChange={(e) => changePrice(e.target, p.barcode)}
                          onClick={() => editedEnable(p.barcode)}
                          readOnly={
                            singleData?.content[index]?.isEdited
                              ? ""
                              : "readOnly"
                          }
                          className="form-control"
                          style={
                            singleData?.content[index]?.listPrice >=
                            singleData?.content[index]?.salePrice
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
                })
            }
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => props.onHide(false)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
