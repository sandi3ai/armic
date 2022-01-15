import React from "react";
import { Button, Form } from "react-bootstrap";

const NovVnos = () => {
  return (
    <div>
      <br />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Datum dežurstva: </Form.Label>
          <Form.Control type="date" placeholder="dan/mesec/leto" />
          <Form.Text className="text-muted">
            Ob kliku na koledar se odpre koledar
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Izvajalec dežurstva: </Form.Label>
          <Form.Control type="text" placeholder="Ime in priimek izvajalca" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </div>
  );
};
export default NovVnos;
