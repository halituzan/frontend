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
            spreadData.groupBarcode = spreadData?.groupBarcode?.filter(
              (y) => y !== barcode
            );
          }
          if (spreadData?.groupBarcode.length === 0) {
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
  // Bu noktada bir mantık hatası var düzenlenmesi gerekiyor.
  const updateGroupValues = (values, groups) => {
    updateGroupItems(values);
    let allItems = [];
    let onlyQuantity = [];
    let onlyPrice = [];

    groups.groupBarcode.forEach((item) => {
      allItems.push({
        barcode: item,
        quantity: groups.quantity,
        listPrice: groups.listPrice,
        salePrice: groups.salePrice,
      });
      onlyQuantity.push({
        barcode: item,
        quantity: groups.quantity,
      });
      onlyPrice.push({
        barcode: item,
        listPrice: groups.listPrice,
        salePrice: groups.salePrice,
      });
    });
  
    // Sadece Fiyat Değerleri Gönderilirse Çalışacak
    if (
      groups.listPrice === NaN ||
      groups.listPrice === null ||
      groups.salePrice === NaN ||
      groups.salePrice === null
    ) {
    } else {
      if (groups.listPrice >= groups.salePrice) {
        console.log("girmemeliydi");
        //sendData(values, onlyPrice);
      } else toast.error("Piyasa fiyatı, satış fiyatından düşük olamaz");
    }
    // Sadece Stok Değeri Gönderilirse Çalışacak
    if (groups.quantity === NaN || groups.quantity === null) {
    } else {
      if (groups.quantity < 0 || groups.quantity > 20000) {
        toast.error("Stok 0 dan küçük ve 20000 den büyük olamaz.");
      } else {
        //sendData(values, onlyQuantity);
      }
    }
    if (
      groups.listPrice === NaN ||
      groups.listPrice === null ||
      groups.salePrice === NaN ||
      groups.salePrice === null ||
      groups.quantity === NaN ||
      groups.quantity === null
    ) {
      console.log("hiçbiri yazılmadı.");
    } else {
      if (
        groups.quantity < 0 ||
        groups.quantity > 20000 ||
        groups.listPrice <= groups.salePrice
      ) {
        if (groups.quantity < 0 || groups.quantity > 20000) {
          toast.error("Stok 0 dan küçük ve 20000 den büyük olamaz. ");
        }
        if (groups.listPrice <= groups.salePrice) {
          toast.error("Piyasa fiyatı, satış fiyatından düşük olamaz");
        }
      } else {
        // sendData(values, allItems);
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
              <p className="d-flex justify-content-evenly align-items-center">
                <span className="text-warning rounded-circle shadow-sm fw-bold fs-1 me-2 bg-danger px-4">
                  !
                </span>
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
              </p>

              <div className="col-12 my-1 col-md-3">
                <Form.Group>
                  <FormLabel>Piyasa Fiyatı</FormLabel>
                  <Form.Control
                    type="number"
                    name="listPrice"
                    value={values.groups?.listPrice}
                    onChange={(e) => groupValueHandle(e, i)}
                    className="col-12 col-md-4"
                  />
                </Form.Group>
              </div>
              <div className="col-12 my-1 col-md-3">
                <Form.Group>
                  <FormLabel>Satış Fiyatı</FormLabel>
                  <Form.Control
                    className="col-12 col-md-4"
                    type="number"
                    name="salePrice"
                    value={values.groups?.salePrice}
                    onChange={(e) => groupValueHandle(e, i)}
                  />
                </Form.Group>
              </div>
              <div className="col-4 my-1 col-md-2">
                <Form.Group>
                  <FormLabel id="Stok">Stok</FormLabel>
                  <Form.Control
                    type="number"
                    name="quantity"
                    max="20000"
                    min="0"
                    className="col-12 col-md-4"
                    value={values.groups?.quantity}
                    onChange={(e) => groupValueHandle(e, i)}
                  />
                </Form.Group>
              </div>
              <div className="col-4 my-1 col-md-1 d-flex justify-content-center align-self-end">
                <Button
                  variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                  id="button-addon2"
                  onClick={() => updateGroupValues(values, g)}
                >
                  <AiFillSave className="text-dark fs-4" />
                </Button>
              </div>
              <div className="col-4 my-1 col-md-3 d-flex justify-content-center align-self-end">
                <OverlayTrigger
                  placement="bottom"
                  flip={true}
                  delay={{ show: 50, hide: 100 }}
                  overlay={renderTooltip}
                >
                  <Button
                    variant="outline-danger d-flex text-light align-items-center bg-danger fw-bold"
                    id="button-addon2"
                    onClick={() => handleShow(i)}
                  >
                    <AiFillDelete className="text-warning  fs-4" /> Grubu Sil
                  </Button>
                </OverlayTrigger>
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

                              <p className="pt-2">
                                Barkod:{" "}
                                <span className="text-wrap fw-bold ">
                                  {items.barcode}
                                </span>
                              </p>
                              <p className="text-wrap"> {items.title}</p>
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
