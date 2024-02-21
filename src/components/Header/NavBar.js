import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "../Home/Home";
import { Cas } from "../Cas/Cas";
import { Dezurni } from "../Dezurni/Dezurni";
import { Dopust } from "../Dopust/Dopust";
import { Prosnje } from "../Prosnje/Prosnje";
import logo from "../Images/armicLogo_textOnly.png";

function NavigationBar({ Logout }) {
  return (
    <BrowserRouter>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="justify-content-end"
        >
          <Container>
            <Navbar.Brand>
              <img className="navBarLogo" src={logo} alt="Avtomati Armič" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="theNavBar">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Zaposleni
                </Nav.Link>
                <Nav.Link as={Link} to="/cas">
                  Delovni čas
                </Nav.Link>
                <Nav.Link as={Link} to="/dezurni">
                  Dežurstva
                </Nav.Link>
                <Nav.Link as={Link} to="/odsotnost">
                  Odsotnost
                </Nav.Link>
                <Nav.Link as={Link} to="/prosnje">
                  Prošnje
                </Nav.Link>
                <Button variant="outline-danger" onClick={Logout}>
                  Odjava
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cas" element={<Cas />} />
            <Route path="/dezurni" element={<Dezurni />} />
            <Route path="/odsotnost" element={<Dopust />} />
            <Route path="/prosnje" element={<Prosnje />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default NavigationBar;
