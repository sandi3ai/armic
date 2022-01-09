import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function NavigationBar({ Logout }) {
  return (
    <div className="NavBar">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Avtomati Armič</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#delovniCas">Delovni čas</Nav.Link>
              <Nav.Link href="#dopust">Dopust</Nav.Link>
              <Nav.Link href="#dezurstva">Dezurstva</Nav.Link>
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

{
  /*<div className="NavBar">
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#cas">Delovni čas</Nav.Link>
        <Nav.Link href="#dopust">Dopust</Nav.Link>
        <Nav.Link href="#dezurstva">Dežurni</Nav.Link>
        <Nav.Link href="#registracija">Registracija</Nav.Link>
      </Nav>

      <Button id="odjavaBtn" variant="outline-danger" onClick={Logout}>
        Odjava
      </Button>
    </Navbar>
  </div>*/
}
export default NavigationBar;
