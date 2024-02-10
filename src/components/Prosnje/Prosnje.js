import React from "react";
import { Accordion } from "react-bootstrap";
import ErrorBoundary from "../../hooks/errorBoundaries";
import Nadure from "./Nadure";
import Odsotnost from "./Odsotnost";

export const Prosnje = () => {
  return (
    <div>
      <ErrorBoundary>
        <div className="content">
          <h2>PROŠNJE:</h2>
          <Accordion
            defaultActiveKey="0"
            alwaysOpen
            className="accordion-custom"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Nadure</Accordion.Header>
              <Accordion.Body>
                <Nadure />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Odsotnosti</Accordion.Header>
              <Accordion.Body>
                <Odsotnost />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Prosnje;
