import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import checkMark from "../Images/checkMark.gif";

const Modal = ({ closeModal, passID }) => {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const getUrlSkupine =
    "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const urlImeSkupine =
    "http://localhost/reactProjects/armic/src/rest/getNameSkupina.php";
  const updateUrl =
    "http://localhost/reactProjects/armic/src/rest/updateZaposleni.php";
  const [data, setData] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [skupine, setSkupine] = useState([{ id: "", name: "" }]);
  const [updatedSkupina, setUpdatedSkupina] = useState("");
  const [imeSkupine, setImeSkupine] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [updatedPass, setUpdatedPass] = useState("");
  const [showPassErr, setShowPassErr] = useState(false);
  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl).then((response) => {
        setData(response.data.zaposleni);
        setUpdatedName(getZaposleniIme(response.data.zaposleni, passID));
        const idSkupine = getZaposleniSkupina(response.data.zaposleni, passID);
        idToName(idSkupine);
        setUpdatedSkupina(idSkupine);
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

  const getZaposleniSkupina = (data, passID) => {
    const zaposleni = getPassedZaposleni(data, passID);
    return zaposleni ? zaposleni.zaposleniSkupinaID : null;
  };

  useEffect(() => {
    getZaposleni();
  }, []);

  const getSkupine = () => {
    try {
      Axios.get(getUrlSkupine).then((response) => {
        setSkupine(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const idToName = (e) => {
    console.log(e);
    try {
      Axios.post(urlImeSkupine, { dropValue: e }).then((response) => {
        const res = response.data.skupinaIme;
        console.log(res);
        setImeSkupine(res);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  function checkIfName(name) {
    if (name === "" || name === null) {
      return "Izberi skupino";
    } else {
      return name;
    }
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(e);
    const postData = {
      passID,
      updatedName,
      updatedSkupina,
      updatedPass,
    };
    console.log(postData);
    if (postData.updatedPass !== "") {
      Axios.post(updateUrl, {
        id: postData.passID,
        updatedName: postData.updatedName,
        updatedSkupina: postData.updatedSkupina,
        updatedPass: postData.updatedPass,
      }).then(() => {
        console.log("updateZaposleni executed!");
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
          closeModal(false);
        }, 1400);

        //window.location.reload(); //reloada page
      });
    } else {
      setShowPassErr(true);
      setTimeout(() => {
        setShowPassErr(false);
      }, 4000);
    }
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h4>
            <strong>{getZaposleniIme(data, passID)}</strong> - posodobi podatke
          </h4>
        </div>
        <div className="body">
          <hr />
          <Form onSubmit={(e) => submitForm(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Spremeni ime in priimek zaposlenega: </Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => setUpdatedName(e.target.value)}
                value={updatedName}
                defaultValue={getZaposleniIme(data, passID)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Spremeni geslo zaposlenega: </Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => setUpdatedPass(e.target.value)}
                value={updatedPass}
                type="text"
              />{" "}
              {showPassErr && (
                <Form.Text className="reddish">Geslo je obvezno</Form.Text>
              )}
            </Form.Group>

            <Form.Label>Delavcu spremeni skupino: </Form.Label>
            <DropdownButton
              variant="outline-primary"
              title={checkIfName(imeSkupine)}
              onClick={(e) => getSkupine(e)}
              onSelect={(e) => {
                setUpdatedSkupina(e);
                idToName(e);
              }}
              value={updatedSkupina}
              drop="down"
            >
              {skupine.map((skupina, i) => (
                <Dropdown.Item key={i} eventKey={skupina.skupinaID}>
                  {skupina.skupinaIme}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <hr />
            <div className="successBox">
              <Button variant="outline-success" type="submit">
                Posodobi
              </Button>
              {successTxt && (
                <img
                  className="checkMark"
                  src={checkMark}
                  alt="Posodobljeno!"
                />
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
