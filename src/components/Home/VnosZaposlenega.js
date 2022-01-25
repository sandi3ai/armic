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
      setName("");
      if (name && position !== "") {
        //prikaže success box, če so vsi podatki izpolnjeni
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
      }
    });
  }

  return (
    <div>
      <hr />
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Label>Izberi delovno mesto: </Form.Label>
        <DropdownButton
          variant="outline-primary"
          title={position}
          onSelect={(e) => setPosition(e)}
          value={position}
          drop="down"
        >
          <Dropdown.Item eventKey="OA">Oskrbovalec avtomatov</Dropdown.Item>
          <Dropdown.Item eventKey="OA-vodja">
            Oskrbovalec avtomatov - vodja
          </Dropdown.Item>
          <Dropdown.Item eventKey="Servis">Servis</Dropdown.Item>
          <Dropdown.Item eventKey="Voda">Voda </Dropdown.Item>
          <Dropdown.Item eventKey="Skladišče">Skladišče</Dropdown.Item>
          <Dropdown.Item eventKey="Administracija">
            Administracija
          </Dropdown.Item>
        </DropdownButton>
        <br />
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
