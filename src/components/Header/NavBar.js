import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Cas } from "../Cas/Cas";
import { Dezurni } from "../Dezurni/Dezurni";
import { Dopust } from "../Dopust/Dopust";

function NavigationBar({ Logout }) {
  return (
    <BrowserRouter>
      <div>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Avtomati Armič</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/cas">
                  Delovni čas
                </Nav.Link>
                <Nav.Link as={Link} to="/dezurni">
                  Dežurstva
                </Nav.Link>
                <Nav.Link as={Link} to="/dopust">
                  Dopust
                </Nav.Link>
                <Button
                  id="odjavaBtn"
                  variant="outline-danger"
                  onClick={Logout}
                >
                  Odjava
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path="/cas" element={<Cas />} />
            <Route path="/dezurni" element={<Dezurni />} />
            <Route path="/dopust" element={<Dopust />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

    /*<BrowserRouter>
      <Routes>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link as={Link} to="/">
                  Delovni čas
                </Nav.Link>
                <Nav.Link as={Link} to="/dezurni">
                  Dežurstva
                </Nav.Link>
                <Nav.Link as={Link} to="/dopust">
                  Dopust
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Routes>
      <Routes>
        <Route path="/cas" element={<Cas />} />
        <Route path="/dezurni" element={<Dezurni />} />
        <Route path="/dopust" element={<Dopust />} />
      </Routes>
    </BrowserRouter>*/
  );
}
export default NavigationBar;
