import React, { useState } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";

export const VnosZaposlenega = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novZaposleni.php";
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      name,
      position,
    };
    console.log(postData);
    Axios.post(postUrl, {
      name: postData.name,
      position: postData.position,
    }).then(() => {
      console.log("submitForm executed");
      if (name || position !== "") {
        //prikaže success box, le če sta oba podatka izpolnjena
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
      }
    });
  }

  return (
    <div>
      <br />
      <Form className="novVnos" onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Pozicija zaposlenega: </Form.Label>
          <Form.Control
            name="position"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
            type="text"
            placeholder="Pozicija delovnega mesta"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pozicija zaposlenega: </Form.Label>
          <DropdownButton
            id="dropdown-variant-secondary"
            title="Izberi s seznama"
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ime in priimek zaposlenega: </Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Ime in priimek zaposlenega"
          />
        </Form.Group>

        <div className="successBox">
          <Button variant="outline-success" type="submit">
            Dodaj
          </Button>
          {successTxt && " Nov zaposleni uspešno dodan!"}
        </div>
      </Form>
    </div>
  );
};

export default VnosZaposlenega;
