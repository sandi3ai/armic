import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import { post } from "../../Helper";
import { Axios } from "axios";

const ModalEditSkupina = ({
  closeModal,
  skupinaData,
  refreshSkupine,
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
  const [zaposleniData, setZaposleniData] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateSkupina.php`;
  const getZaposleniUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;

  const submitForm = (e) => {
    console.log("submitForm, skupinaID(e):", e);
    console.log("skupinaData:", skupinaData);
    post(updateUrl, {
      skupinaID: e,
      skupinaIme: updatedGroupName,
      skupinaEmail: vodjaData.vodjaEmail,
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
    setVodjaData({ vodjaEmail: newEmail });
    setIsEmailValid(isValid);
  };

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl, { withCredentials: true }).then((response) => {
        setZaposleniData(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
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
        VODJA DATA <br />
        <strong>vodjaID: {skupinaData.vodjaID}</strong> <br />
        <strong>vodjaIme: {skupinaData.vodjaIme}</strong> <br />
        <strong>vodjaEmail: {skupinaData.vodjaEmail}</strong> <br />
        <br />
        <Form.Group className="mb-3">
          <Form.Label>Spremeni ime skupine:</Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setUpdatedGroupName(e.target.value)}
            value={updatedGroupName}
            type="text"
          />
        </Form.Group>{" "}
        <Form.Label>Skupini dodaj/zamenjaj vodjo: </Form.Label>
        <DropdownButton
          variant="outline-primary"
          title={vodjaData.vodjaIme || "Izberi vodjo"}
          onClick={(e) => console.log("e:", e)}
          onSelect={(e) => {
            setVodjaData({ vodjaID: e });
          }}
          value={vodjaData.vodjaID || ""}
          drop="down"
        >
          {zaposleniData.map((z, i) => (
            <Dropdown.Item key={i} eventKey={z.zaposleniID}>
              {z.zaposleniIme}
            </Dropdown.Item>
          ))}
        </DropdownButton>
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
