//Prejšnja verzija VnosZaposlenega.js

import React, { useState } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";

export const VnosZaposlenega = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novZaposleni.php";
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [vodje, setVodje] = useState([{ name: "", id: "" }]);
  const [leader, setLeader] = useState("");

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      name,
      position,
      leader,
    };
    console.log(postData);
    Axios.post(postUrl, {
      name: postData.name,
      position: postData.position,
      leader: postData.leader,
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

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        console.log(response.data.zaposleni);
        getVodje(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getVodje = (data) => {
    setVodje(
      data
        .map(function (data) {
          return {
            name: data.zaposleniIme,
            id: data.zaposleniID,
            poz: data.zaposleniPozicija,
          };
        })
        .filter((zaposleni) => zaposleni.poz === "OA-vodja")
    );
  };

  return (
    <div>
      <hr />

      <h3>Dodaj novega zaposlenega</h3>
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

        <Form.Label>Delavcu dodaj skupino: </Form.Label>
        <DropdownButton
          variant="outline-primary"
          title={leader}
          onClick={(e) => getZaposleni(e)}
          onSelect={(e) => setLeader(e)}
          value={leader}
          drop="down"
        >
          <Dropdown.Item eventKey="NULL">Zaposleni nima vodje</Dropdown.Item>
          {vodje.map((vodja) => (
            <Dropdown.Item key={vodja.id} eventKey={vodja.name}>
              {vodja.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <br />

        <div className="successBox">
          <Button variant="outline-success" type="submit">
            Dodaj novega zaposlenega
          </Button>
          {successTxt && " Nov zaposleni uspešno dodan!"}
        </div>
      </Form>
    </div>
  );
};

export default VnosZaposlenega;
