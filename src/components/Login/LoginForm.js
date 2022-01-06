import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import logo from "../Images/armicLogo.png";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };

  return (
    <div className="loginForm">
      <Card style={{ width: "28rem" }}>
        <Card.Img className="armic-logo" variant="left" src={logo} />
        <Card.Body>
          <Card.Title className="PrijavaH1">Prijava</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Uporabniško ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vpiši uporabniško ime"
                id="loginInputEmail"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Geslo</Form.Label>
              <Form.Control
                type="password"
                placeholder="Vpiši geslo"
                name="password"
                id="loginInputPassword"
                autoComplete="on"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
            </Form.Group>

            <Button
              className="PrijavaBtn"
              type="submit"
              variant="outline-success"
            >
              PRIJAVA
            </Button>
            {error !== "" ? <div className="LoginError">{error}</div> : ""}
          </Form>
        </Card.Body>
      </Card>
      <div className="circle1"></div>
    </div>
  );
}

export default LoginForm;
