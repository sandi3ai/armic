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
        <h2>Zaposleni v podjetju:</h2>
        <p>
          Tukaj lahko dodate ali izbrišete delavca in mu dodelite pozicijo
          delovnega mesta.
        </p>
        <Button variant="outline-primary" onClick={showNovVnos}>
          Dodaj delavca
        </Button>
        {novVnos ? <VnosZaposlenega /> : null}
        <hr />
        <IzbrisZaposlenega />
      </div>
    </div>
  );
};
export default Home;