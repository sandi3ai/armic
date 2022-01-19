import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Axios from "axios";

const NovVnos = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novDezurni.php";
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      date,
      name,
    };
    console.log(postData);
    Axios.post(postUrl, {
      date: postData.date, //preveri če je OK!, v bazo sicer vstavi, ampak NULL
      name: postData.name,
    }).then(() => {
      console.log("submitForm executed");
      setName("");
    });
  }

  return (
    <div>
      <br />
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Datum dežurstva: </Form.Label>
          <Form.Control
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
            placeholder="dan/mesec/leto"
          />
          <Form.Text className="text-muted">
            Ob kliku na koledar se odpre koledar
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Izvajalec dežurstva: </Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Ime in priimek izvajalca"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </div>
  );
};
export default NovVnos;
