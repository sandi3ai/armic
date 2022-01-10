import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import logo from "../Images/armicLogo.png";

function NavigationBar({ Logout }) {
  return (
    <div className="NavBar">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#delovniCas">Delovni čas</Nav.Link>
              <Nav.Link href="#dopust">Dopust</Nav.Link>
              <Nav.Link href="#dezurstva">Dežurstva</Nav.Link>
              <Button id="odjavaBtn" variant="outline-danger" onClick={Logout}>
                Odjava
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavigationBar;
