import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav } from "react-bootstrap";

function NavigationBar({ Logout }) {
  return (
    <div className="NavBar">
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#cas">Delovni čas</Nav.Link>
          <Nav.Link href="#dopust">Dopust</Nav.Link>
          <Nav.Link href="#dezurstva">Dežurni</Nav.Link>
        </Nav>

        <Button id="odjavaBtn" variant="outline-danger" onClick={Logout}>
          Odjava
        </Button>
      </Navbar>
    </div>
  );
}
export default NavigationBar;
