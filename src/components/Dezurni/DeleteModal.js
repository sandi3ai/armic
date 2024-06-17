import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { post } from "../../Helper";
import CustomSnackbar from "../Elements/Snackbar";

const DeleteModal = ({
  selectedDezurni,
  setSelectedDezurni,
  onHide,
  onConfirm,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const delUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteDezurni.php`;

  const deleteSelectedDezurni = () => {
    const deletePromises = Array.from(selectedDezurni).map((dezurniID) =>
      post(delUrl, { id: dezurniID })
    );

    Promise.all(deletePromises)
      .then((results) => {
        console.log("All selected items deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting items", err);
      })
      .finally(() => {
        // Only do these actions once, after all operations are done
        onConfirm(`Izbrisanih vnosov: ${selectedDezurni.size}`, "error");
        setOpenSnackbar(true);
        onHide();
        setSelectedDezurni(new Set());
      });
  };

  return (
    <>
      <Modal show={true} onHide={onHide} centered>
        <Modal.Header className="red-modal-header">
          <Modal.Title>
            Izbrani vnosi: <strong>{selectedDezurni.size}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Nadaljujem?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteSelectedDezurni}>
            Dokončno izbriši
          </Button>
          <Button variant="outline-primary" onClick={onHide}>
            Prekliči
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        content={`Izbrisanih dežurstev: ${selectedDezurni.size}`}
      />
    </>
  );
};

export default DeleteModal;
