import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import logo from "../Images/armicLogo.jpg";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };

  return (
    <div className="loginForm">
      <Card style={{ width: "28rem" }}>
        <Card.Img variant="left" src={logo} />
        <Card.Body>
          <Card.Title>Prijava</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Vpiši email"
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

            <Button type="submit" variant="outline-success">
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
