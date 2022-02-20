import React, { useState } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";

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

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      name,
      izbranaSkupina,
    };
    console.log(postData);
    Axios.post(postUrl, {
      name: postData.name,
      group: postData.izbranaSkupina,
    }).then(() => {
      console.log("submitForm executed");
      setName("");
      if (name && izbranaSkupina !== "") {
        //prikaže success box, če so vsi podatki izpolnjeni
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
      }
    });
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
    <div>
      <hr />

      <h3>Dodaj novega zaposlenega</h3>
      <Form onSubmit={(e) => submitForm(e)}>
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
        </div>
      </Form>
    </div>
  );
};

export default VnosZaposlenega;
