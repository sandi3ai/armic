import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "@mui/material";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useCounts } from "../../hooks/CountsContext";
import { Home } from "../Home/Home";
import { Cas } from "../Cas/Cas";
import { Dezurni } from "../Dezurni/Dezurni";
import { Dopust } from "../Dopust/Dopust";
import { Prosnje } from "../Prosnje/Prosnje";
import logo from "../Images/armicLogo_textOnly.png";

function NavigationBar({ Logout }) {
  const { counts } = useCounts();

  useEffect(() => {
    console.log("Counts: ", counts);
  }, [counts]);

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
              <Nav className="me-auto" style={{ position: " relative" }}>
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
                <Nav.Link
                  as={Link}
                  to="/prosnje"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    Prošnje
                    <Badge
                      invisible={counts.countNadure <= 0}
                      badgeContent={
                        counts.countNadure > 99 ? "99+" : counts.countNadure
                      }
                      sx={{
                        bgcolor: "text.primary",
                        color: "gray",
                        position: "absolute",
                        top: 7,
                        right: -7,
                      }}
                    />
                    <Badge
                      invisible={counts.countOdsotnost <= 0}
                      badgeContent={
                        counts.countOdsotnost > 99
                          ? "99+"
                          : counts.countOdsotnost
                      }
                      sx={{
                        bgcolor: "gold",
                        color: "gray",
                        position: "absolute",
                        top: 28,
                        right: -7,
                      }}
                    />
                  </div>
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  onClick={Logout}
                  style={{ marginLeft: "20px" }}
                >
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
