import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Axios from "axios";

const NovVnos = () => {
  const url = "";
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  console.log(date);
  console.log(name);

  return (
    <div>
      <br />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Datum dežurstva: </Form.Label>
          <Form.Control
            name="date"
            onChange={handleDateChange}
            value={date}
            type="date"
            placeholder="dan/mesec/leto"
          />
          <Form.Text className="text-muted">
            Ob kliku na koledar se odpre koledar
          </Form.Text>
        </Form.Group>
        {date}

        <Form.Group className="mb-3">
          <Form.Label>Izvajalec dežurstva: </Form.Label>
          <Form.Control
            name="name"
            onChange={handleNameChange}
            value={name}
            type="text"
            placeholder="Ime in priimek izvajalca"
          />
          {name}
        </Form.Group>
        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </div>
  );
};
export default NovVnos;
