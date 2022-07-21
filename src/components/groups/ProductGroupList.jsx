import React, { useEffect, useState } from "react";
import { Accordion, Form, Button, FormLabel } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { fakeData } from "../../fakeData";
import { getData, updateGroupData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { AiFillSave, AiFillCloseCircle } from "react-icons/ai";

const { content } = fakeData;

export default function ProductGroupList() {
  const [values, setValue] = useState({});
  const { groups } = values;

  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;

  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setValue);
    }
  }, []);
  const removeBarcode = (barcode, id) => {
    console.log(barcode, id);

    setValue((data) => {
      console.log(data);
      
      return {
        ...data,
        groups: data.groups.map((item) => {
          let spreadData = { ...item };
          console.log(spreadData);

          if (id === item.id) {
            spreadData.groupBarcode = spreadData?.groupBarcode?.filter(
              (y) => y !== barcode
            );
          }
          return spreadData;
        }),
      };
    });
    console.log(values);
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
  console.log(values);
  const updateGroupValues = (values, id,i) => {
    // console.log(groups[i].quantity);
    // console.log(groups[i].listPrice);
    // console.log(groups[i].salePrice);
    console.log(id);
    console.log(values);


    updateGroupData(values,id,i)

    // groups tüm grupların barkod bilgilerini getiriyor.
    // gelen barkodlara göre apiden gelen bilgiler map() lanip fake datadaki o barkodlu ürünlerin verileri güncellenecek ve api ye güncellenmiş veri gönderilecek
    // const filteredData = groups.filter((f, i) => f.id === id); // tüm grupları inceleyip tıkladğımız grubun verisini id'ye göre getiriyor.
    // filteredData[0]?.groupBarcode?.map((i) => console.log(i)); // filtrelenmiş veriyi map() leyerek yazdırıyor.
  };

  return (
    <div className="row">
      {groups
        ?.map((g, i) => (
          <Accordion.Item key={g?.id} eventKey={i} className="col-12 col-xl-6">
            <Accordion.Header className="w-100">
              <p className="my-1 fs-3 text-warning">{g?.groupName}</p>
            </Accordion.Header>
            <Accordion.Body className="w-100 row d-flex my-2">
              <p className="d-flex justify-content-evenly align-items-center">
                <span className="text-warning rounded-circle shadow-sm fw-bold fs-1 me-2 bg-danger px-4">
                  !
                </span>
                - Burada yapcağınız fiyat ve stok değişikliği grup altında
                bulunan tüm ürünlere uygulanacaktır.
                <br />- Lütfen bunu göz önüne alarak işlem yapın.
                <br />- Gruba eklenmiş yanlış ürün varsa güncelleme işlemini
                ürünü kaldırdıktan sonra yapın.
              </p>
              <div className="col-12 my-1 col-md-4">
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
              <div className="col-12 my-1 col-md-4">
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
              <div className="col-6 my-1 col-md-3">
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
              <div className="col-6 my-1 col-md-1 align-self-end">
                <Button
                  variant="outline-secondary d-flex align-items-center bg-warning fw-bold"
                  id="button-addon2"
                  onClick={() => updateGroupValues(values, groups[i].id,i)}
                >
                  <AiFillSave className="text-dark fs-4" />
                </Button>
              </div>
              <hr className="my-2" />
              <div className="row">
                {g?.groupBarcode?.map((b, i) => (
                  <div
                    className="col-12 col-md-6 col-xl-6 d-flex flex-column justify-content-between"
                    key={i}
                  >
                    {content
                      ?.filter((p, i) => p.barcode === b)
                      ?.map((items, ind) => (
                        <div
                          key={ind}
                          className="d-flex justify-content-between align-items-center text-wrap position-relative"
                        >
                          <div className="d-flex justify-content-start align-items-start">
                            <div className="image-info align-self-center">
                              <img
                                src={items?.images[0].url}
                                alt={items.title}
                                className="align-self-baseline"
                              />
                            </div>

                            <div className="title-info pt-2 d-flex flex-column justify-content-between ms-4 mt-1">
                              <Button
                                variant="dark d-flex justify-content-center align-items-center"
                                onClick={() =>
                                  removeBarcode(items.barcode,g.id)
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
        ))}
    </div>
  );
}
