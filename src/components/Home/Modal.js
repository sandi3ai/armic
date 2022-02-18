import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import "./Modal.css";

const Modal = ({ closeModal, passID }) => {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const [data, setData] = useState([]);

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl).then((response) => {
        setData(response.data.zaposleni);
        getZaposleniIme(response.data.zaposleni, passID);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getZaposleniIme = (data, passID) => {
    const ime = data
      .filter((data) => data.zaposleniID === passID)
      .map((filteredData) => filteredData.zaposleniIme);
    return ime[0];
  };

  useEffect(() => {
    getZaposleni();
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h4>{getZaposleniIme(data, passID)} - posodobi podatke</h4>
        </div>
        <div className="body">Ime: Form:</div>
        <div className="footer">
          <Button variant="outline-success">Posodobi</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
