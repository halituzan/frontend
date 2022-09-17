import React, { useEffect, useState } from "react";
import {
  Accordion,
  Form,
  Button,
  FormLabel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { getData, updateGroupItems } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { AiFillSave, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import GroupDeleteModal from "./GroupDeleteModal";
import GroupsNotFound from "./GroupsNotFound";
import { fetchData, sendData } from "../../helpers/restApi.helpers";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function ProductGroupList() {
  /* -------- Statets -------- */

  const [values, setValue] = useState({});
  const [datas, setDatas] = useState([]);
  const [runRemove, setRunRemove] = useState(true);
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies();
  const { groups } = values;
  /* -------- End of Statets -------- */

  /* -------- Hooks -------- */

  const token = cookies.jwt;
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setValue);
    }
    fetchData(values, setDatas, 0, 2500);
  }, []);
  useEffect(() => {
    fetchData(values, setDatas, 0, 2500);
  }, [values]);
  useEffect(() => {
    updateGroupItems(values);
  }, [runRemove, groups, values]);

  /* -------- End of Hooks -------- */

  /* -------- Event Functions --------*/
  const handleClose = (groups, index) => {
    let newGroup = [...groups];

    newGroup[index].isTheGroup = false;
    setShow(false);
    setValue({
      ...values,
      groups: newGroup,
    });
  };
  const handleShow = (index) => {
    let newGroup = [...groups];
    newGroup[index].isTheGroup = true;
    console.log(newGroup[index]);
    if (newGroup[index].groupBarcode.length === 0) {
      setShow(true);
    }
    setValue({
      ...values,
      groups: newGroup,
    });
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Lütfen dikkatli kullanın Bu buton tüm grubu siler
    </Tooltip>
  );

  const removeGroup = (groups, index) => {
    let newGroup = [...groups];
    newGroup = newGroup.filter((i) => i !== groups[index]);
    setValue({
      ...values,
      groups: newGroup,
    });
    handleClose();
  };
  const removeBarcode = (barcode, id, values, index) => {
    setValue((data) => {
      return {
        ...data,
        groups: data.groups.map((item) => {
          let spreadData = { ...item };

          if (id === item.id) {
            spreadData.groupBarcode = spreadData.groupBarcode.filter(
              (y) => y !== barcode
            );
          }
          if (spreadData.groupBarcode.length === 0) {
            removeGroup(data.groups, index);
          }
          return spreadData;
        }),
      };
    });

    setRunRemove(runRemove ? false : true);
  };
  const groupValueHandle = (e, i) => {
    setValue((data) => {
      return {
        ...data,
        groups: data.groups.map((item, ind) => {
          let spreadData = { ...item };
          if (i === ind) {
            if (e.target.name === "quantity") {
              spreadData[e.target.name] = parseInt(e.target.value);
            } else spreadData[e.target.name] = parseFloat(e.target.value);
          }
          return spreadData;
        }),
      };
    });
  };
 
  const updateGroupPrice = (values, groups) => {
    let onlyPrice = [];

    groups.groupBarcode.forEach((item) => {
      onlyPrice.push({
        barcode: item,
        listPrice: groups.listPrice,
        salePrice: groups.salePrice,
      });
    });

    if (!groups.listPrice || !groups.salePrice || !groups.quantity) {
      //sendData(values, onlyQuantity);
      if (!groups.listPrice) {
        toast.error("Piyasa Fiyatı Girmelisiniz.");
      } else if (!groups.salePrice) {
        toast.error("Satış Fiyatı Girmelisiniz.");
      }
    } else {
      if (groups.salePrice > groups.listPrice) {
        toast.error("Piyasa fiyatı satış fiyatından küçük olamaz");
      } else {
        console.log("Hepsi doğru şekilde Girildi");
        console.log(onlyPrice);
        sendData(values, onlyPrice);
      }
    }
  };
  const updateGroupQuantity = (values, groups) => {
    let onlyQuantity = [];

    groups.groupBarcode.forEach((item) => {
      onlyQuantity.push({
        barcode: item,
        quantity: groups.quantity,
      });
    });

    if (!groups.quantity) {
      toast.error("Stok Girmelisiniz.");
    } else {
      if (groups.quantity < 0 || groups.quantity > 20000) {
        toast.error("Stok 0 dan küçük ve 20bin den büyük olamaz");
      } else {
        console.log("Hepsi doğru şekilde Girildi");
        console.log(onlyQuantity);
        sendData(values, onlyQuantity);
      }
    }
  };

  /* -------- End Of Event Functions --------*/

  /* -------- Render -------- */
  return (
    <div className="row">
      {groups?.length === 0 ? (
        <GroupsNotFound />
      ) : (
        groups?.map((g, i) => (
          <Accordion.Item key={g?.id} eventKey={i} className="col-12 col-xl-6">
            <Accordion.Header className="w-100">
              <p className="my-1 fs-3 text-warning">{g?.groupName}</p>
            </Accordion.Header>
            <Accordion.Body className="w-100 row d-flex my-2">
              <div className="header-acordion d-flex">
                <div className="d-flex flex-column justify-content-center align-items-center mx-1 ">
                  <div className="col-12 mb-3 d-flex justify-content-start">
                    <OverlayTrigger
                      placement="bottom"
                      flip={true}
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        variant="outline-danger fw-bold d-flex flex-column text-light align-items-center bg-danger fw-bold h-100"
                        id="button-addon2"
                        onClick={() => handleShow(i)}
                      >
                        <AiFillDelete className="text-warning  fs-1 " /> Grubu
                        Sil
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
                <p>
                  - Burada yapcağınız fiyat ve stok değişikliği grup altında
                  bulunan tüm ürünlere uygulanacaktır.
                  <br />- Lütfen bunu göz önüne alarak işlem yapın.
                  <br />- Gruba eklenmiş yanlış ürün varsa güncelleme işlemini
                  ürünü kaldırdıktan sonra yapın.
                  <br />{" "}
                  <span className="fw-bold text-danger fs-5">
                    - Gruptaki son ürünü gruptan çıkartırsanız ürün grubu
                    otomatik olarak silinir.
                  </span>
                </p>
              </div>
              <div className="row">
                <div className="col-5 my-1 col-md-5">
                  <Form.Group>
                    <FormLabel>Piyasa Fiyatı</FormLabel>
                    <Form.Control
                      type="number"
                      name="listPrice"
                      value={g?.listPrice}
                      onChange={(e) => groupValueHandle(e, i)}
                      className="col-12 col-md-4"
                    />
                  </Form.Group>
                </div>
                <div className="col-5 my-1 col-md-5">
                  <Form.Group>
                    <FormLabel>Satış Fiyatı</FormLabel>
                    <Form.Control
                      className="col-12 col-md-4"
                      type="number"
                      name="salePrice"
                      value={g?.salePrice}
                      onChange={(e) => groupValueHandle(e, i)}
                    />
                  </Form.Group>
                </div>
                <div className="col-2 my-1 col-md-2 d-flex justify-content-center align-self-end">
                  <Button
                    variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                    id="button-addon2"
                    onClick={() => updateGroupPrice(values, g)}
                  >
                    <AiFillSave className="text-dark fs-4" />
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-10 my-1 col-md-10 col-xl-10 col-lg-10">
                  <Form.Group>
                    <FormLabel id="Stok">Stok</FormLabel>
                    <Form.Control
                      type="number"
                      name="quantity"
                      max="20000"
                      min="0"
                      className="col-12 col-md-4"
                      value={g?.quantity}
                      onChange={(e) => groupValueHandle(e, i)}
                    />
                  </Form.Group>
                </div>
                <div className="col-2 my-1 col-md-2  col-xl-2 col-lg-2 d-flex justify-content-center align-self-end">
                  <Button
                    variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                    id="button-addon2"
                    onClick={() => updateGroupQuantity(values, g)}
                  >
                    <AiFillSave className="text-dark fs-4" />
                  </Button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="row">
                {g?.groupBarcode?.map((b, indi) => (
                  <div
                    className="col-12 d-flex flex-column justify-content-between"
                    key={indi}
                  >
                    {datas?.content
                      ?.filter((p, i) => p.barcode === b)
                      ?.map((items, ind) => (
                        <div
                          key={ind}
                          className="d-flex justify-content-between align-items-center text-wrap w-100 position-relative"
                        >
                          <GroupDeleteModal
                            show={show}
                            isTheGroup={g.isTheGroup}
                            handleClose={handleClose}
                            groups={groups}
                            index={i}
                            removeGroup={removeGroup}
                          ></GroupDeleteModal>
                          <div className="d-flex justify-content-start w-100 align-items-start">
                            <div className="image-info align-self-center">
                              <img
                                src={items?.images[0].url}
                                alt={items.title}
                                className="align-self-baseline product-image"
                              />
                            </div>

                            <div className="title-info w-100 pt-2 d-flex flex-column justify-content-between ms-4 mt-1">
                              <Button
                                variant="dark d-flex justify-content-center align-items-center"
                                onClick={() =>
                                  removeBarcode(items.barcode, g.id, values, i)
                                }
                              >
                                <AiFillCloseCircle className="remove-group-item text-warning fs-4 align-self-baseline me-3" />{" "}
                                Gruptan Çıkar
                              </Button>

                              <div className="barcodes d-flex row justify-content-center">
                                <p className="px-1 text-center mb-0 col-12 col-lg-4">
                                  Barkod:{" "}
                                  <span className="text-wrap fw-bold ">
                                    {items.barcode}
                                  </span>
                                </p>
                                <p className="px-1 text-center mb-0 col-12 col-lg-4">
                                  Piyasa Fiyatı:{" "}
                                  <span className="text-wrap fw-bold ">
                                    {items.listPrice}
                                  </span>
                                </p>
                                <p className="px-1 text-center mb-0 col-12 col-lg-4">
                                  Satış Fiyatı:{" "}
                                  <span className="text-wrap fw-bold ">
                                    {items.salePrice}
                                  </span>
                                </p>
                                <p className="px-1 text-center mb-0 col-12 col-lg-4">
                                  Stok:{" "}
                                  <span className="text-wrap fw-bold ">
                                    {items.quantity}
                                  </span>
                                </p>
                              </div>
                              <p className="text-wrap mt-2 text-center">
                                {" "}
                                {items.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    <hr className="w-100" />
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))
      )}
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