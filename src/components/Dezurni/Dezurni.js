import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NovVnos from "./NovVnos";
import ReadDezurni from "./ReadDezurni";

export const Dezurni = () => {
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
        <h2>SEZNAM DEŽURNIH:</h2>
      </div>
      <div className="content">
        <Button variant="outline-primary" onClick={showNovVnos}>
          Skrij / prikaži nov vnos
        </Button>
        {novVnos ? <NovVnos /> : null}
      </div>
      <div className="content">
        <ReadDezurni />
      </div>
    </div>
  );
};
