import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Modal } from "react-bootstrap";
import { post } from "../../Helper";
import React from "react";

const ModalDeleteSkupina = ({ closeModal, skupinaData, refreshSkupine }) => {
  const deleteUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteSkupina.php`;

  const deleteSkupina = (id, event) => {
    console.log(id);
    console.log(event);
    event.preventDefault();
    post(deleteUrl, { id: id })
      .then(() => {
        console.log(id + " number sent on deleteSkupina.php");
        refreshSkupine();
        closeModal(false);
      })
      .catch((error) => alert(error));
  };
  return (
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="red-modal-header">
        <Modal.Title>
          <strong>{skupinaData.skupinaIme}</strong>
          <br />
          Potrdi izbris
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ali res želite dokončno izbrisati izbrano skupino?
        <Alert severity="error">
          <AlertTitle>Previdno</AlertTitle>S tem bodo pripadajoči delavci ostali
          brez skupine.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={(event) => deleteSkupina(skupinaData.skupinaID, event)}
        >
          Dokončno izbriši
        </Button>
        <Button variant="outline-primary" onClick={() => closeModal()}>
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteSkupina;
