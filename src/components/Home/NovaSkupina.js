import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { post } from "../../Helper";
import PrikaziSkupine from "./PrikaziSkupine";

const NovaSkupina = () => {
  const postUrl =
    "http://localhost/reactProjects/armic/src/rest/novaSkupina.php";
  const [imeSkupine, setImeSkupine] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [showSeznam, setShowSeznam] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    console.log("sumbitForm triggered");
    console.log(imeSkupine);
    try {
      post(postUrl, {
        name: imeSkupine,
      }).then(() => {
        console.log("submitForm executed");
        if (imeSkupine !== "") {
          //prikaže success box, če so vsi podatki izpolnjeni
          setSuccessTxt(true);
          setTimeout(() => {
            setSuccessTxt(false);
          }, 4000);
        }

        setImeSkupine("");
      });
    } catch (error) {
      alert(error.message);
    }
  }

  function prikazi() {
    if (showSeznam === false) {
      setShowSeznam(true);
    } else {
      setShowSeznam(false);
    }
  }

  return (
    <div>
      <h3>Dodaj novo skupino</h3>
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3 inputForm">
          <Form.Label>Vpiši ime nove skupine: </Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setImeSkupine(e.target.value)}
            value={imeSkupine}
            type="text"
            placeholder="Naziv skupine ..."
          />
        </Form.Group>
        <div className="successBox">
          <Button variant="outline-success" type="submit">
            Ustvari novo skupino
          </Button>
          {successTxt && " Nova skupina ustvarjena!"}
          <br />
          <br />
          <Button variant="outline-primary" onClick={prikazi}>
            Prikaži seznam skupin
          </Button>
        </div>
        {showSeznam && <PrikaziSkupine />}
      </Form>
    </div>
  );
};

export default NovaSkupina;
