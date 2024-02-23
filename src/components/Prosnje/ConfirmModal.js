import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { post } from "../../Helper";

const ConfirmModal = ({ show, onHide, type, clickedItem, buttonData }) => {
  const updateNadureUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateNadure.php`;
  const updateOdsotnostUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateOdsotnost.php`;

  const submitHandler = async () => {
    let url = "";
    let passedID = "";
    let status = "";
    let newVacationValue = null;
    let odsotenUserID = null;

    buttonData?.action === "approve"
      ? (status = "Odobreno")
      : (status = "Zavrnjeno");

    if (type === "nadure") {
      url = updateNadureUrl;
      passedID = clickedItem?.casID;
    } else if (type === "odsotnost") {
      url = updateOdsotnostUrl;
      passedID = clickedItem?.dopustID;
      if (clickedItem?.tip === "Dopust") {
        console.log("CLICKED ITEM JE DOPUST");
        newVacationValue =
          clickedItem?.preostanekDopusta - clickedItem?.trajanje;
        console.log("newVacationValue: ", newVacationValue);
        odsotenUserID = clickedItem?.odsotenUserID;
        console.log("odsotenUserID: ", odsotenUserID);
      }
    }

    post(url, { passedID, status, newVacationValue, odsotenUserID })
      .then((response) => {
        console.log("RESPONSE: ", response);
      })
      .then(() => {
        console.log("Status uspešno spremenjen");
        onHide();
      })
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation (ConfirmModal.js)",
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
      <Modal.Header
        className={
          buttonData?.action === "approve"
            ? "green-modal-header"
            : "red-modal-header"
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
            <br />
            {clickedItem?.tip === "Bolniška" ? (
              <>Trajanje: {clickedItem?.trajanje} dni</>
            ) : (
              <>
                {clickedItem?.zaposleniIme} ima na voljo{" "}
                {clickedItem?.preostanekDopusta} dni dopusta
                <br />
                Trajanje tega dopusta je {clickedItem?.trajanje} dni
                <br />
                Ostane: {clickedItem?.preostanekDopusta -
                  clickedItem?.trajanje}{" "}
                dni
              </>
            )}
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
          onClick={submitHandler}
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
