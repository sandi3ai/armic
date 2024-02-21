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
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-header">
                <h5>Nadure</h5>
              </Accordion.Header>
              <Accordion.Body>
                <Nadure />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5>Odsotnosti</h5>
              </Accordion.Header>
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
