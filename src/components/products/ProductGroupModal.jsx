import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getData, updateGroupItems } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";
import { AiFillCheckCircle } from "react-icons/ai";
import { Flip, toast, ToastContainer } from "react-toastify";

const ProductGroupModal = (props) => {
  const [values, setValue] = useState({});
  const [deger, setDeger] = useState();
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  const { groups } = values;
  const { data, index } = props;
  /* HOOKS */
  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setValue);
    }
  }, []);

  useEffect(() => {
    setDeger(values.groups);
  }, [values]);
  /* end of HOOKS */

  /* Event Functions */
  const refreshPage = () => {
    window.location.reload();
  };

  const checkCheckbox = (e, index, barcode) => {
    let newArr = [...deger];

    if (!e?.currentTarget?.checked) {
      newArr[index].groupBarcode = newArr[index].groupBarcode.filter(
        (i) => i !== barcode
      );
      setDeger(newArr);
    } else {
      newArr[index].groupBarcode.push(barcode);
      setDeger(newArr);
    }
  };
  const addGroups = () => {
    updateGroupItems(values);
    refreshPage();
    toast.success("Grup Güncellendi.");
  };

  /* end of Event Functions */

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product d-flex justify-content-center align-items-center">
          <img
            src={data?.images[0]?.url ? data?.images[0]?.url : data?.images[1]?.url}
            alt={data?.title}
            style={{width:"64px"}}
            className="mx-4 align-self-baseline"
          />
          <p className="p-2">
            Daha önceden oluşturduğunuz ürün gruplarını aşağıda görebilirsiniz.{" "}
            <br />
            Eğer ürün grubu oluşturmadıysanız{" "}
            <Link to="/create-group">Ürün Grubu Oluştur</Link> sayfasından
            hızlıca oluşturabilirsiniz.
          </p>
        </div>
      </Modal.Body>
      <Modal.Body>
        <div className="row container">
          {groups?.map((g, i) => {
            const x = g?.groupBarcode?.map((item) => item);
            return (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex form-check form-switch"
                key={i}
              >
                <input
                  type="checkbox"
                  name={g.id}
                  id={g.id}
                  onChange={(e) => checkCheckbox(e, i, data.barcode)}
                  className={
                    x.includes(data.barcode)
                      ? "form-check-input form-check-input-check me-3"
                      : "form-check-input  me-3"
                  }
                  checked={x?.includes(data.barcode) ? true : false}
                />

                <label
                  htmlFor={g.id}
                  className={
                    x.includes(data.barcode)
                      ? "form-check-label text-success fw-bold"
                      : "form-check-label"
                  }
                >
                  {g.groupName}
                </label>
              </div>
            );
          })}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="warning" onClick={() => addGroups()}>
          Ürünleri Grupla / Çıkar
        </Button>
        <Button variant="dark" onClick={() => props.onHide(index)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductGroupModal;
