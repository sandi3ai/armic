import React from "react";
import { Alert, CloseButton, DropdownButton, Dropdown } from "react-bootstrap";

const OdsotnostFiltri = ({ setTip, tip, setStatus, status }) => {
  return (
    <div>
      <div className="stackHorizontally">
        <DropdownButton
          variant="outline-primary"
          title="Tip odsotnosti"
          value="value"
          drop="down"
          onSelect={(e) => {
            setTip(e);
          }}
        >
          <Dropdown.Item eventKey="Dopust">Dopust</Dropdown.Item>
          <Dropdown.Item eventKey="Bolniška">Bolniška</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          variant="outline-primary"
          title="Status"
          value="value"
          drop="down"
          onSelect={(e) => {
            setStatus(e);
          }}
        >
          <Dropdown.Item eventKey="Pregled">Pregled</Dropdown.Item>
          <Dropdown.Item eventKey="Odobreno">Odobreno</Dropdown.Item>
        </DropdownButton>
      </div>

      {(tip !== "Brez filtra" || status !== "Brez filtra") && (
        <div>
          <div className="spacer"></div>
          <Alert key="secondary" variant="secondary">
            <div className="stackHorizontally">
              Izbrani filtri:
              {tip !== "Brez filtra" && (
                <div className="filterElement">
                  Tip odsotnosti: {tip}
                  <CloseButton onClick={() => setTip("Brez filtra")} />
                </div>
              )}
              {status !== "Brez filtra" && (
                <div className="filterElement">
                  Status odsotnosti: {status}
                  <CloseButton onClick={() => setStatus("Brez filtra")} />
                </div>
              )}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default OdsotnostFiltri;
