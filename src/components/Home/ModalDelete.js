import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ModalDelete = ({ closeModal, passID }) => {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const deleteUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteZaposleni.php";

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
    /*.filter((data) => data.zaposleniID === passID)
    .map((filteredData) => filteredData.zaposleniIme);
    console.log(ime[0]);
    return ime[0];*/
  };

  const deleteZaposleni = (id) => {
    Axios.post(deleteUrl, { id: id }, { withCredentials: true })
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
    <div className="modalBackground">
      <div className="modalContainerDelete">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="titleDelete">
          <h6>
            <strong>{getZaposleniIme(data, passID)}</strong> - potrdi izbris
          </h6>
        </div>
        <div className="body">
          <Button
            onClick={() => {
              deleteZaposleni(passID);
            }}
            variant="outline-danger"
            className="bodyBtns"
          >
            Dokončno izbriši
          </Button>
          <Button
            onClick={() => closeModal(false)}
            variant="outline-primary"
            className="bodyBtns"
          >
            Prekliči
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
