import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ToggleButtonGroup from "./ToggleButtons";
import VnosZaposlenega from "./VnosZaposlenega";

export const Dopust = () => {
  const [novVnos, setNovVnos] = useState(false);

  function showNovVnos() {
    if (novVnos === false) {
      setNovVnos(true);
    } else {
      setNovVnos(false);
    }
  }

  return (
    <div>
      <div className="content">
        <h2>DOPUSTI:</h2>
      </div>

      <div className="content">
        <p>
          Tukaj lahko dodate ali izbrišete delavca in mu dodelite pozicijo
          delovnega mesta.
        </p>
        <Button variant="outline-primary" onClick={showNovVnos}>
          Dodaj / izbriši delavca
        </Button>
        {novVnos ? <VnosZaposlenega /> : null}
      </div>
      <div className="content">
        <h2>Izberi skupino</h2>
        <ToggleButtonGroup />
      </div>
    </div>
  );
};
