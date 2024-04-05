import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { post } from "../../Helper";
import PrikaziSkupine from "./PrikaziSkupine";

const NovaSkupina = () => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novaSkupina.php`;
  const [imeSkupine, setImeSkupine] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [showSeznam, setShowSeznam] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  function submitForm(e) {
    e.preventDefault();
    console.log("sumbitForm triggered");
    console.log(imeSkupine);
    try {
      post(postUrl, {
        name: imeSkupine,
        email: email,
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
        setEmail("");
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setEmail(newEmail);
    setIsEmailValid(isValid);
  };

  return (
    <div>
      <h3>Dodaj novo skupino</h3>
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3 inputForm">
          <Form.Label>Vpiši ime nove skupine: </Form.Label>
          <Col xl="3" lg="5" md="6" sm="7">
            <Form.Control
              name="name"
              onChange={(e) => setImeSkupine(e.target.value)}
              value={imeSkupine}
              type="text"
              placeholder="Naziv skupine ..."
            />
          </Col>
          <Form.Label>Vpiši e-mail vodje skupine: </Form.Label>
          <Col xl="3" lg="5" md="6" sm="7">
            <Form.Control
              name="email"
              onChange={handleEmailChange}
              value={email}
              type="email"
              placeholder="primer.emaila@armic-sp.si"
              isInvalid={!isEmailValid}
            />
            <Form.Control.Feedback type="invalid">
              Prosim vnesi veljaven e-mail naslov.
            </Form.Control.Feedback>
          </Col>
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
