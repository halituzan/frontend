import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function GroupDeleteModal({
  show,
  handleClose,
  groups,
  index,
  removeGroup,
  isTheGroup,
}) {
  return (
    <>
      <Modal
        show={isTheGroup ? isTheGroup : show}
        onHide={() => handleClose(groups, index)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {" "}
            <p className="text-danger"> {groups[index].groupName} </p>Grubunu
            Silmek İstediğinizden Emin Misiniz?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bu işlem tüm grubu silecektir.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleClose(groups, index)}>
            Kapat
          </Button>
          <Button variant="danger" onClick={() => removeGroup(groups, index)}>
            Grubu Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
