import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getData } from "../../helpers/db.helpers";
import { parseJwt } from "../../helpers/jwt.helpers";


const ProductGroupModal = (props) => {

  const [values, setValue] = useState({});
  const [cookies, setCookie] = useCookies();
  const token = cookies.jwt;
  const { groups } = values;

  useEffect(() => {
    if (token) {
      getData(parseJwt(token).id, setValue);
    }
  }, []);

  const { data, index } = props;
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
            src={data.images[0].url ? data.images[0].url : data.images[1].url}
            alt={data.title}
            width="64px"
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
          {groups?.map((g, i) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex form-check form-switch" key={i}>
              <input
                type="checkbox"
                name={g.id}
                id={g.id}
                className="form-check-input me-3"
               
              />
              <label htmlFor={g.id} className="form-check-label">
                {g.groupName}
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="warning">Gruplara Ekle</Button>
        <Button variant="dark" onClick={() => props.onHide(index)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductGroupModal;
