import React from "react";
import { Alert, Button, DropdownButton, Dropdown } from "react-bootstrap";

const OdsotnostFiltri = ({
  setTip,
  tip,
  setStatus,
  status,
  vpisanaLeta,
  setLeto,
  leto,
}) => {
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
          <Dropdown.Item eventKey="Zavrnjeno">Zavrnjeno</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          variant="outline-primary"
          title={leto}
          value="value"
          drop="down"
          onSelect={(e) => {
            setLeto(e);
          }}
        >
          {vpisanaLeta.map((leto, index) => (
            <Dropdown.Item eventKey={leto} key={index}>
              {leto}
            </Dropdown.Item>
          ))}
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
                  <Button
                    className="close-btn"
                    onClick={() => setTip("Brez filtra")}
                  >
                    X
                  </Button>
                </div>
              )}
              {status !== "Brez filtra" && (
                <div className="filterElement">
                  Status odsotnosti: {status}
                  <Button
                    className="close-btn"
                    onClick={() => setStatus("Brez filtra")}
                  >
                    X
                  </Button>
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
