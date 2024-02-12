import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, type, clickedItem, buttonData }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      show={show}
      onHide={onHide}
      className="custom-modal"
    >
      <Modal.Header
        className={
          buttonData?.action === "approve"
            ? "modal-green-header"
            : "modal-red-header"
        }
      >
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
          <p>
            <strong>{clickedItem?.tip}:</strong>{" "}
            {clickedItem?.formattedCasZacetek} -{" "}
            {clickedItem?.formattedCasKonec}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={
            buttonData?.action === "approve"
              ? "outline-success"
              : "outline-danger"
          }
          onClick={onHide}
        >
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
