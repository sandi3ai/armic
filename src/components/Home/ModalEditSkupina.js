import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Form, Modal } from "react-bootstrap";
import { post } from "../../Helper";

const ModalEditSkupina = ({ closeModal, skupinaData, refreshSkupine }) => {
  const [updatedGroupName, setUpdatedGroupName] = useState(
    skupinaData.skupinaIme
  );

  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateSkupina.php`;

  const submitForm = (e) => {
    console.log("submitForm, skupinaID(e):", e);
    post(updateUrl, {
      skupinaID: e,
      skupinaIme: updatedGroupName,
    }).then((response) => {
      refreshSkupine();
      closeModal(false);
    });
  };

  return (
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="blue-modal-header">
        <Modal.Title>
          <strong>{skupinaData.skupinaIme}</strong>
          <br />
          Preimenuj
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Spremeni ime skupine:</Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setUpdatedGroupName(e.target.value)}
            value={updatedGroupName}
            type="text"
          />
        </Form.Group>{" "}
        <Alert severity="info">
          <AlertTitle>Informacija</AlertTitle>Pripadajoči delavci ostanejo
          nespremenjeni, preimenuje se le skupina.
          <br />
          Dodelitev zaposlenih v skupine se izvaja v razdelku "Seznam
          zaposlenih"
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={(event) => submitForm(skupinaData.skupinaID, event)}
        >
          Potrdi spremembe
        </Button>
        <Button variant="outline-primary" onClick={() => closeModal()}>
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditSkupina;
