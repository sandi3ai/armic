import React, { useState } from "react";
import { Button } from "react-bootstrap";
import VnosZaposlenega from "./VnosZaposlenega";
import IzbrisZaposlenega from "./IzbrisZaposlenega";

export const Home = () => {
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
        <p>
          Tukaj lahko dodate ali izbrišete delavca in mu dodelite pozicijo
          delovnega mesta.
        </p>
        <Button variant="outline-primary" onClick={showNovVnos}>
          Dodaj delavca
        </Button>
        {novVnos ? <VnosZaposlenega /> : null}
        <IzbrisZaposlenega />
      </div>
    </div>
  );
};
export default Home;
