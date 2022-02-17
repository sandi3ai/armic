import React from "react";
import { Button } from "react-bootstrap";
import "./Modal.css";

const Modal = ({ closeModal }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h4>{"ime"} - posodobi podatke</h4>
        </div>
        <div className="body">Ime: Form:</div>
        <div className="footer">
          <Button>Posodobi</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
