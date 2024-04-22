import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Button,
  Col,
  Form,
  Modal,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import checkMark from "../Images/checkMark.gif";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import { post } from "../../Helper";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import InfoTooltip from "../Elements/InfoTooltip";

const ModalEdit = ({ closeModal, passID }) => {
  const getZaposleniUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;
  const getUrlSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;
  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;
  const updateUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/updateZaposleni.php`;
  const [data, setData] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [skupine, setSkupine] = useState([{ id: "", name: "" }]);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [updatedSkupina, setUpdatedSkupina] = useState("");
  const [updatedDopust, setUpdatedDopust] = useState("");
  const [updatedCasZacetka, setUpdatedCasZacetka] = useState("");
  const [imeSkupine, setImeSkupine] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [updatedPass, setUpdatedPass] = useState("");
  const [showPassErr, setShowPassErr] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  const [ToggleIcon, PasswordInputType] = usePasswordToggle();

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl, { withCredentials: true }).then((response) => {
        console.log("Response zaposleni:", response.data.zaposleni);
        setData(response.data.zaposleni);
        const zaposleniData = getZaposleniData(
          response.data.zaposleni,
          passID,
          idToName
        );
        setUpdatedName(zaposleniData.ime);
        setUpdatedSkupina(zaposleniData.skupina);
        setUpdatedEmail(zaposleniData.email);
        setUpdatedDopust(zaposleniData.dopust);
        setUpdatedCasZacetka(zaposleniData.casZacetka);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getZaposleniData = (data, passID, idToNameFn) => {
    const zaposleni = data.find((item) => item.zaposleniID === passID);

    if (!zaposleni) {
      return {
        ime: "Ni podatka o imenu",
        skupina: "Ni podatka o skupini",
        email: "Ni podatka o e-mailu",
        dopust: "Ni podatka o dopustu",
        casZacetka: "Ni podatka o času začetka",
      };
    }

    return {
      ime: zaposleni.zaposleniIme,
      skupina: idToNameFn(zaposleni.zaposleniSkupinaID),
      email: zaposleni.email,
      dopust: zaposleni.preostanekDopusta,
      casZacetka: zaposleni.predvidenZacetek,
    };
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

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  function submitForm(e) {
    e.preventDefault();
    console.log(e);
    const postData = {
      passID,
      updatedName,
      updatedSkupina,
      updatedEmail,
      updatedPass,
      updatedDopust,
      updatedCasZacetka,
    };
    console.log(postData);
    if (postData.updatedPass !== "" || !switchChecked) {
      Axios.post(
        updateUrl,
        {
          id: postData.passID,
          updatedName: postData.updatedName,
          updatedSkupina: postData.updatedSkupina,
          updatedEmail: postData.updatedEmail,
          updatedPass: postData.updatedPass,
          updatedDopust: postData.updatedDopust,
          updatedCasZacetka: postData.updatedCasZacetka,
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setUpdatedEmail(newEmail);
    setIsEmailValid(isValid);
  };

  return (
    <Modal show={true} onHide={() => closeModal()} centered>
      <Modal.Header className="blue-modal-header">
        <Modal.Title>
          <strong>{updatedName}</strong>
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
          <label>
            <Switch checked={switchChecked} onChange={handleSwitchChange} />
            Uredi tudi geslo
          </label>
          {switchChecked && (
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
          )}
          <Form.Group className="mb-3">
            <Form.Label>Delavcu spremeni skupino:</Form.Label>
            <DropdownButton
              size="sm"
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
          <Form.Group className="mb-3">
            <div className="inputForm">
              <Form.Label>
                <InfoTooltip
                  placement="right"
                  sourceTitle="Spremeni e-mail:"
                  content={`
                      Email ni obvezen, vendar je priporočljiv za obveščanje.
                      Format mora biti veljaven.
                    `}
                />
              </Form.Label>
              <Form.Control
                name="email"
                onChange={handleEmailChange}
                value={updatedEmail}
                type="email"
                isInvalid={!isEmailValid}
                placeholder="primer.emaila@armic-sp.si"
              />
              <Form.Control.Feedback type="invalid">
                Prosim vnesi veljaven e-mail naslov.
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          <Divider />
          <Form.Group className="mb-3">
            <div className="inputForm">
              <Form.Label>Spremeni število dni dopusta:</Form.Label>
              <Col lg="4" md="5" sm="6">
                <Form.Control
                  name="dniDopusta"
                  onChange={(e) => setUpdatedDopust(e.target.value)}
                  value={updatedDopust}
                  type="number"
                  placeholder="Dopust"
                />
              </Col>
            </div>
          </Form.Group>
          <div className="spacer"></div>
          <Form.Group className="mb-3">
            <div className="inputForm">
              <Form.Label>Spremeni predviden čas začetka:</Form.Label>
              <Col lg="4" md="5" sm="6">
                <Form.Control
                  name="casZacetka"
                  onChange={(e) => setUpdatedCasZacetka(e.target.value)}
                  value={updatedCasZacetka}
                  type="time"
                  placeholder="Vnesi predviden čas začetka z delom"
                />
              </Col>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {successTxt && (
            <img className="checkMark" src={checkMark} alt="Posodobljeno!" />
          )}
          <Button
            variant="outline-success"
            type="submit"
            disabled={!isEmailValid}
            className="successBtn"
          >
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
