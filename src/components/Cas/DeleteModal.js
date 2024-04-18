import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import { post } from "../../Helper";

const DeleteModal = ({
  filteredData,
  open,
  setOpen,
  selectedCas,
  setSelectedCas,
  name,
  dataToDelete,
  setDataToDelete,
  startDate,
  endDate,
  preglejBtn,
}) => {
  const [includesApproved, setIncludesApproved] = useState(false);
  const deleteUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteCas.php`;

  const closeModal = () => {
    setOpen(false);
    setDataToDelete([]);
    console.log("Closing modal.");
  };

  const handleDeleteButton = async () => {
    console.log("Deleting data: ", dataToDelete);
    const casIDs = dataToDelete.map((cas) => cas.casID);
    console.log("casIds: ", casIDs);

    try {
      post(deleteUrl, { casIDs }).then((response) => {
        console.log("Response from delete:", response);
        setSelectedCas(new Set());
        console.log("Drop value: " + filteredData[0].userID);
        console.log("Start date: ", startDate, " End date: ", endDate);
        preglejBtn({ startDate, endDate, dropValue: filteredData[0].userID });
        //Add a snackbar here
      });
    } catch (error) {
      console.error("Error deleting cases:", error);
    }
  };

  useEffect(() => {
    const checkApproved = dataToDelete.some((cas) => cas.status === "Odobreno");
    setIncludesApproved(checkApproved);
  }, [dataToDelete]);

  return (
    <Modal show={open} onHide={() => closeModal()} centered>
      <Modal.Header className="red-modal-header">
        <Modal.Title>
          <strong>{name}</strong>
          <br />
          Izbriši
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          Izbriši izbrane case:<strong> {dataToDelete.length}</strong>
        </Form.Label>
        <br />
        {dataToDelete.map((cas) => (
          <div key={cas.casID + cas.status}>
            {cas.casID}:<br />
            {cas.formattedCasZacetek} - {cas.formattedCasKonec}
            <br />
            Status: {cas.status}
            <br />
            Vsebuje odobrene čase: {includesApproved ? "Da" : "Ne"}
            <br />
          </div>
        ))}
        {includesApproved && (
          <div>
            <Alert severity="info">
              <strong>Opomba:</strong> Izbrani vnosi vsebujejo odobrene čase.
            </Alert>
          </div>
        )}
        <Alert severity="error">
          Izbrani časi bodo izbrisani, vključno s pripadajočimi malicami.
          <br />
          Priporočeno je, da pred brisanjem podatke izvozite.
        </Alert>
        <br />
        <br />{" "}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            handleDeleteButton();
            closeModal();
          }}
        >
          Izbriši
        </Button>
        <Button variant="secondary" onClick={() => closeModal()}>
          Prekliči
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
