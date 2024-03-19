import React, { useState } from "react";
import { Button, Col, DropdownButton, Dropdown, Form } from "react-bootstrap";
import Axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { post } from "../../Helper";
import InfoTooltip from "../Elements/InfoTooltip";

export const VnosZaposlenega = ({ getZaposleni }) => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novZaposleni.php`;
  const getUrlSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;
  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;

  const [name, setName] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [izbranaSkupina, setIzbranaSkupina] = useState("");
  const [dniDopusta, setDniDopusta] = useState("");
  const [casZacetka, setCasZacetka] = useState("");
  const [skupine, setSkupine] = useState([{ id: "", name: "" }]);
  const [imeSkupine, setImeSkupine] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [pass, setPass] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const [ToggleIcon, PasswordInputType] = usePasswordToggle();

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      name,
      izbranaSkupina,
      pass,
      email,
      dniDopusta,
      casZacetka,
    };
    console.log(postData);
    if (
      name &&
      izbranaSkupina &&
      pass &&
      dniDopusta &&
      casZacetka !== "" &&
      isEmailValid
    ) {
      post(postUrl, {
        name: postData.name,
        group: postData.izbranaSkupina,
        pass: postData.pass,
        email: postData.email,
        preostanekDopusta: postData.dniDopusta,
        predvidenZacetek: postData.casZacetka,
      }).then(() => {
        console.log("submitForm executed");
        setName("");
        setPass("");
        setEmail("");
        //prikaže success box
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
        getZaposleni();
      });
    } else {
      setEmptyTxt(true);
      setTimeout(() => {
        setEmptyTxt(false);
      }, 4000);
    }
  }

  const getSkupine = () => {
    try {
      Axios.get(getUrlSkupine, { withCredentials: true }).then((response) => {
        setSkupine(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const idToName = (e) => {
    console.log(e);
    try {
      post(urlImeSkupine, { dropValue: e }).then((response) => {
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setEmail(newEmail);
    setIsEmailValid(isValid);
  };

  return (
    <div className="addNew">
      <h3>Dodaj novega zaposlenega</h3>
      <Form onSubmit={(e) => submitForm(e)}>
        <br />
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Ime in priimek zaposlenega:</Form.Label>
            <div className="inputForm">
              <Form.Control
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Ime in priimek"
              />
            </div>

            <Form.Text className="text-muted">
              Ime in priimek sta hkrati tudi uporabiško ime za prijavo
              uporabnika.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Geslo za prijavo uporabnika: </Form.Label>
            <div className="gesloArea">
              <Form.Control
                name="pass"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type={PasswordInputType}
                placeholder="Vpiši geslo"
              />
              <span className="passToggleIcon">{ToggleIcon}</span>
            </div>{" "}
          </Form.Group>
        </div>
        <Form.Label>Delavcu dodaj skupino: </Form.Label>
        <DropdownButton
          variant="outline-primary"
          title={checkIfName(imeSkupine)}
          onClick={(e) => getSkupine(e)}
          onSelect={(e) => {
            setIzbranaSkupina(e);
            idToName(e);
          }}
          value={izbranaSkupina}
          drop="down"
        >
          {skupine.map((skupina, i) => (
            <Dropdown.Item key={i} eventKey={skupina.skupinaID}>
              {skupina.skupinaIme}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div className="spacer"></div>
        <Form.Group className="mb-3">
          <div className="inputForm">
            <Form.Label>
              <InfoTooltip
                placement="right"
                sourceTitle="Email"
                content={
                  <>
                    Email ni obvezen, vendar je priporočljiv za obveščanje.
                    <br />
                    Format mora biti veljaven.
                  </>
                }
              />
            </Form.Label>
            <Col lg="12" md="12" sm="12">
              <Form.Control
                name="email"
                onChange={handleEmailChange}
                value={email}
                type="email"
                placeholder="primer.emaila@armic-sp.si"
                isInvalid={!isEmailValid}
              />
              <Form.Control.Feedback type="invalid">
                Prosim vnesi veljaven e-mail naslov.
              </Form.Control.Feedback>
            </Col>
          </div>
        </Form.Group>{" "}
        <div className="spacer"></div>
        <Form.Group className="mb-3">
          <div className="inputForm">
            <Form.Label>Število dni dopusta:</Form.Label>
            <Col lg="4" md="5" sm="6">
              <Form.Control
                name="dniDopusta"
                onChange={(e) => setDniDopusta(e.target.value)}
                value={dniDopusta}
                type="number"
                placeholder="Dopust"
              />
            </Col>
          </div>
        </Form.Group>
        <div className="spacer"></div>
        <Form.Group className="mb-3">
          <div className="inputForm">
            <Form.Label>Predviden čas začetka:</Form.Label>
            <Col lg="4" md="5" sm="6">
              <Form.Control
                name="casZacetka"
                onChange={(e) => setCasZacetka(e.target.value)}
                value={casZacetka}
                type="time"
                placeholder="Vnesi predviden čas začetka z delom"
              />
            </Col>
          </div>
        </Form.Group>
        <br />
        <div className="successBox">
          <Button variant="outline-success" type="submit">
            Dodaj novega zaposlenega
          </Button>
          {successTxt && " Nov zaposleni uspešno dodan!"}
          {emptyTxt && " Izpolni obvezna polja!"}
        </div>
      </Form>
    </div>
  );
};

export default VnosZaposlenega;
