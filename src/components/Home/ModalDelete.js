import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { post } from "../../Helper";

const ModalDelete = ({ closeModal, passID }) => {
  const getZaposleniUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;
  const deleteUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteZaposleni.php`;

  const [data, setData] = useState([]);

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl, { withCredentials: true }).then((response) => {
        setData(response.data.zaposleni);
        console.log(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getPassedZaposleni = (data, passID) => {
    const zaposleni = data.find(
      (zaposleni) => zaposleni.zaposleniID === passID
    );
    return zaposleni;
  };

  const getZaposleniIme = (data, passID) => {
    const zaposleni = getPassedZaposleni(data, passID);
    return zaposleni ? zaposleni.zaposleniIme : "Ne najdem imena";
  };

  const deleteZaposleni = (id) => {
    post(deleteUrl, { id: id })
      .then(() => {
        console.log(id + " number sent on deleteZaposleni.php");
        closeModal(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getZaposleni();
  }, []);

  return (
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="red-modal-header">
        <Modal.Title>
          <strong>{getZaposleniIme(data, passID)}</strong>
          <br />
          Potrdi izbris
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ali res želite dokončno izbrisati izbranega zaposlenega?
        <Alert severity="error">
          <AlertTitle>Previdno</AlertTitle>
          S tem bodo dokončno izbrisani vsi podatki
          <br />
          (delovni čas, odsotnosti, ...).
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => deleteZaposleni(passID)}
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

export default ModalDelete;
