import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Form, Modal } from "react-bootstrap";
import { post } from "../../Helper";

const ModalEditSkupina = ({
  closeModal,
  skupinaData,
  refreshSkupine,
  onConfirm,
}) => {
  const [updatedGroupName, setUpdatedGroupName] = useState(
    skupinaData.skupinaIme
  );
  const [updatedGroupEmail, setUpdatedGroupEmail] = useState(
    skupinaData.vodjaEmail
  );
  const [isEmailValid, setIsEmailValid] = useState(true);

  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateSkupina.php`;

  const submitForm = (e) => {
    console.log("submitForm, skupinaID(e):", e);
    post(updateUrl, {
      skupinaID: e,
      skupinaIme: updatedGroupName,
      skupinaEmail: updatedGroupEmail,
    }).then((response) => {
      refreshSkupine();
      onConfirm("Skupina urejena.", "success");
      closeModal(false);
    });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setUpdatedGroupEmail(newEmail);
    setIsEmailValid(isValid);
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
        <Form.Group className="mb-3">
          <Form.Label>Spremeni email vodje skupine:</Form.Label>
          <Form.Control
            name="email"
            onChange={handleEmailChange}
            value={updatedGroupEmail || ""}
            type="email"
            isInvalid={!isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            Prosim vnesi veljaven e-mail naslov.
          </Form.Control.Feedback>
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
