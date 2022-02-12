import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const NovaSkupina = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novaSkupina.php";
  const [imeSkupine, setImeSkupine] = useState("");

  function submitForm(e) {
    e.preventDefault();
    console.log("sumbitForm triggered");
  }

  return (
    <div>
      <h3>Dodaj novo skupino</h3>
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Vpiši ime nove skupine: </Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setImeSkupine(e.target.value)}
            value={imeSkupine}
            type="text"
            placeholder="Ime in priimek zaposlenega"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default NovaSkupina;
