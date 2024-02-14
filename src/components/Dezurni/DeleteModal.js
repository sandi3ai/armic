import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { post } from "../../Helper";

const DeleteModal = ({
  selectedDezurni,
  setSelectedDezurni,
  setOpenDeleteModal,
}) => {
  const delUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteDezurni.php`;

  const deleteSelectedDezurni = () => {
    selectedDezurni.forEach((dezurniID) => {
      post(delUrl, {
        id: dezurniID,
      })
        .then(() => {
          console.log(`${dezurniID} deleted successfully`);
        })
        .catch((err) => console.log(err));
    });
    setOpenDeleteModal(false);
    setSelectedDezurni(new Set());
  };

  return (
    <Modal show={true} onHide={() => setOpenDeleteModal(false)} centered>
      <Modal.Header>
        <Modal.Title>
          Izbrisanih vnosov: <strong>{selectedDezurni.size}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Nadaljujem?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={deleteSelectedDezurni}>
          Dokončno izbriši
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => setOpenDeleteModal(false)}
        >
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
