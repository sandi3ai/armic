import React, { useState } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { post } from "../../Helper";

export const VnosZaposlenega = () => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novZaposleni.php`;
  const getUrlSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;
  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;

  const [name, setName] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [izbranaSkupina, setIzbranaSkupina] = useState("");
  const [skupine, setSkupine] = useState([{ id: "", name: "" }]);
  const [imeSkupine, setImeSkupine] = useState("");
  const [pass, setPass] = useState("");
  const [emptyTxt, setEmptyTxt] = useState(false);

  const [ToggleIcon, PasswordInputType] = usePasswordToggle();

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      name,
      izbranaSkupina,
      pass,
    };
    console.log(postData);
    if (name && izbranaSkupina && pass !== "") {
      post(postUrl, {
        name: postData.name,
        group: postData.izbranaSkupina,
        pass: postData.pass,
      }).then(() => {
        console.log("submitForm executed");
        setName("");
        //prikaže success box
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
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

        <br />
        <div className="successBox">
          <Button variant="outline-success" type="submit">
            Dodaj novega zaposlenega
          </Button>
          {successTxt && " Nov zaposleni uspešno dodan!"}
          {emptyTxt && " Vsa polja so obvezna!"}
        </div>
      </Form>
    </div>
  );
};

export default VnosZaposlenega;
