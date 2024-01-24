import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { post } from "../../Helper";

const DeleteModal = ({
  selectedDezurni,
  setSelectedDezurni,
  setOpenDeleteModal,
}) => {
  const delUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteDezurni.php";

  const deleteSelectedDezurni = () => {
    selectedDezurni.forEach((dezurniID) => {
      post(delUrl, {
        id: dezurniID,
      })
        .then(() => {
          console.log(`${dezurniID} deleted successfully`);
          setOpenDeleteModal(false);
          setSelectedDezurni(new Set());
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainerDelete">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenDeleteModal(false)}>X</button>
        </div>
        <div className="titleDelete">
          <h6>
            Izbrisanih vnosov: <strong>{selectedDezurni.size}</strong>
          </h6>
          Nadaljujem?
        </div>
        <div className="body">
          <Button
            variant="outline-danger"
            className="bodyBtns"
            onClick={() => {
              deleteSelectedDezurni();
            }}
          >
            Dokončno izbriši
          </Button>
          <Button
            variant="outline-primary"
            className="bodyBtns"
            onClick={() => setOpenDeleteModal(false)}
          >
            Prekliči
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
