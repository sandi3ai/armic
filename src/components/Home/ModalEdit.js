import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, Modal, DropdownButton, Dropdown } from "react-bootstrap";
import checkMark from "../Images/checkMark.gif";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { post } from "../../Helper";

const ModalEdit = ({ closeModal, passID }) => {
  const getZaposleniUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;
  const getUrlSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;
  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;
  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateZaposleni.php`;
  const [data, setData] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [skupine, setSkupine] = useState([{ id: "", name: "" }]);
  const [updatedSkupina, setUpdatedSkupina] = useState("");
  const [imeSkupine, setImeSkupine] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [updatedPass, setUpdatedPass] = useState("");
  const [showPassErr, setShowPassErr] = useState(false);

  const [ToggleIcon, PasswordInputType] = usePasswordToggle();

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl, { withCredentials: true }).then((response) => {
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
      Axios.get(getUrlSkupine, { withCredentials: true }).then((response) => {
        console.log("Response skupine:", response.data.skupine);
        setSkupine(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const idToName = (e) => {
    console.log(e);
    post(urlImeSkupine, { dropValue: e })
      .then((response) => {
        if (response.data && response.data.skupinaIme) {
          setImeSkupine(response.data.skupinaIme);
          console.log("Response skupinaIme:", response.data.skupinaIme);
        } else {
          console.log("No skupinaIme in response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching skupinaIme:", error);
      });
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
      Axios.post(
        updateUrl,
        {
          id: postData.passID,
          updatedName: postData.updatedName,
          updatedSkupina: postData.updatedSkupina,
          updatedPass: postData.updatedPass,
        },
        { withCredentials: true }
      ).then(() => {
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
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="blue-modal-header">
        <Modal.Title>
          <strong>{getZaposleniIme(data, passID)}</strong>
          <br />
          Posodobi podatke
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => submitForm(e)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Spremeni ime in priimek zaposlenega:</Form.Label>
            <Form.Control
              name="name"
              onChange={(e) => setUpdatedName(e.target.value)}
              value={updatedName}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Spremeni geslo zaposlenega:</Form.Label>
            <div className="gesloArea">
              <Form.Control
                name="password"
                onChange={(e) => setUpdatedPass(e.target.value)}
                value={updatedPass}
                type={PasswordInputType}
              />
              <span className="passToggleIcon">{ToggleIcon}</span>
            </div>
            {showPassErr && (
              <Form.Text className="reddish">Geslo je obvezno</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Delavcu spremeni skupino:</Form.Label>
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
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {successTxt && (
            <img className="checkMark" src={checkMark} alt="Posodobljeno!" />
          )}
          <Button variant="outline-success" type="submit">
            Posodobi
          </Button>
          <Button variant="outline-primary" onClick={() => closeModal()}>
            Prekliči
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
