import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, type, clickedItem, buttonData }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {clickedItem?.zaposleniIme} -{" "}
          {buttonData?.action === "approve" ? "Odobritev" : "Zavrnitev"}{" "}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {type === "nadure" ? (
          <p>
            {buttonData?.action === "approve" ? "Odobritev" : "Zavrnitev"}{" "}
            delovnega časa - {type}:{" "}
            <strong>{clickedItem?.durationHHMM}</strong>
          </p>
        ) : (
          <div>odsotnost</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>
          Potrdi
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
