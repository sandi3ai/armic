import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import { post } from "../../Helper";

const ModalEditSkupina = ({
  closeModal,
  skupinaData,
  refreshSkupine,
  zaposleniData,
  isLoading,
  onConfirm,
}) => {
  const [updatedGroupName, setUpdatedGroupName] = useState(
    skupinaData.skupinaIme
  );
  const [vodjaData, setVodjaData] = useState({
    vodjaID: skupinaData.vodjaID,
    vodjaEmail: skupinaData.vodjaEmail,
    vodjaIme: skupinaData.vodjaIme,
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [formError, setFormError] = useState("");

  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateSkupina.php`;

  const submitForm = (e) => {
    console.log("submitForm, skupinaID(e):", e);
    console.log("skupinaData:", skupinaData);
    if (!updatedGroupName.trim()) {
      console.log("Updated group name is empty.");
      setFormError("Ime skupine je obvezno polje.");
      return;
    }
    setFormError("");
    post(updateUrl, {
      skupinaID: e,
      skupinaIme: updatedGroupName,
      skupinaEmail: vodjaData.vodjaEmail,
      vodjaID: vodjaData.vodjaID,
    }).then(() => {
      refreshSkupine();
      onConfirm("Skupina urejena.", "success");
      closeModal(false);
    });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setVodjaData((prevVodjaData) => ({
      ...prevVodjaData,
      vodjaEmail: newEmail,
    }));
    setIsEmailValid(isValid);
  };

  const handleSelectVodja = (selectedZaposleniID) => {
    // Find the zaposleni object that matches the selected ID
    const selectedZaposleni = zaposleniData.find(
      (z) => z.zaposleniID === Number(selectedZaposleniID)
    );
    console.log("handleSelectVodja selectedZaposleni:", selectedZaposleni);

    if (selectedZaposleni) {
      setVodjaData((prevVodjaData) => ({
        ...prevVodjaData,
        vodjaID: selectedZaposleni.zaposleniID,
        vodjaIme: selectedZaposleni.zaposleniIme,
      }));
    }
  };

  return (
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="blue-modal-header">
        <Modal.Title>
          <strong>{skupinaData.skupinaIme}</strong>
          <br />
          Uredi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Spremeni ime skupine:</Form.Label>
          <Form.Control
            isInvalid={formError} // Apply the 'isInvalid' prop if there's an error
            name="name"
            onChange={(e) => {
              setUpdatedGroupName(e.target.value);
              setFormError("");
            }}
            value={updatedGroupName}
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            {formError}
          </Form.Control.Feedback>
        </Form.Group>{" "}
        <Form.Label>Skupini dodaj/zamenjaj vodjo: </Form.Label>
        <DropdownButton
          size="sm"
          variant="outline-primary"
          title={vodjaData.vodjaIme || "Izberi vodjo"}
          onSelect={handleSelectVodja}
          value={vodjaData.vodjaIme || ""}
          drop="down"
        >
          {zaposleniData.map((z, i) => (
            <Dropdown.Item key={i} eventKey={z.zaposleniID}>
              {z.zaposleniIme}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <br />
        <Form.Group className="mb-3">
          <Form.Label>Spremeni email vodje skupine:</Form.Label>
          <Form.Control
            name="email"
            onChange={handleEmailChange}
            value={vodjaData.vodjaEmail || ""}
            type="email"
            isInvalid={!isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            Prosim vnesi veljaven e-mail naslov.
          </Form.Control.Feedback>
        </Form.Group>{" "}
        <Alert severity="info">
          <AlertTitle>Informacija</AlertTitle>Pripadajoči delavci ostanejo
          nespremenjeni, ureja se le skupina.
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
