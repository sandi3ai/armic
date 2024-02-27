import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { post } from "../../Helper";

const DeleteModal = ({ show, onHide, clickedItem }) => {
  const deleteOdsotnostUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteOdsotnost.php`;

  const submitHandler = async () => {
    console.log("submitHandler triggered");
    post(deleteOdsotnostUrl, { dopustID: clickedItem?.dopustID })
      .then((response) => {
        console.log("Status uspešno spremenjen! \nRESPONSE: ", response);
        onHide();
      })
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation (DeleteModal.js)",
          error
        );
      });
  };

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
      <Modal.Header className="red-modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          {clickedItem?.zaposleniIme}
          <br />
          Dokončen Izbris
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ste prepričani, da zavrnjeno odsotnost izbrisati?
          <br />
          Tip: <strong>{clickedItem?.tip}</strong>
          <br />
          <strong>
            {clickedItem?.formattedCasZacetek} -{" "}
            {clickedItem?.formattedCasKonec}
          </strong>
          <br />
          Trajanje: <strong>{clickedItem?.trajanje}</strong>
          <br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={submitHandler}>
          Izbriši
        </Button>
        <Button variant="outline-dark" onClick={onHide}>
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
