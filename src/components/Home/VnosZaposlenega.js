import React, { useState } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";

export const VnosZaposlenega = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novZaposleni.php";
  const getUrlSkupine =
    "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const urlImeSkupine =
    "http://localhost/reactProjects/armic/src/rest/getNameSkupina.php";

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
      Axios.post(postUrl, {
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

  return (
    <div className="addNew">
      <h3>Dodaj novega zaposlenega</h3>
      <Form onSubmit={(e) => submitForm(e)}>
        <br />
        <div>
          <Form.Group className="mb-3 inputForm">
            <Form.Label>Ime in priimek zaposlenega:</Form.Label>
            <Form.Control
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Ime in priimek"
            />
            <Form.Text className="text-muted">
              Ime in priimek sta hkrati tudi uporabiško ime za prijavo
              uporabnika.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 inputForm">
            <Form.Label>Geslo za prijavo uporabnika: </Form.Label>
            <div className="gesloArea">
              <Form.Control
                name="pass"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type={PasswordInputType}
                placeholder="Vpiši geslo"
              />
              <span className="newPassToggleIcon">{ToggleIcon}</span>
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
