import React, { useState } from "react";
import { Button } from "react-bootstrap";
import VnosZaposlenega from "./VnosZaposlenega";
import PrikaziZaposlene from "./PrikaziZaposlene";
import NovaSkupina from "./NovaSkupina";

export const Home = () => {
  const [novVnos, setNovVnos] = useState(false);
  const [novaSkupina, setNovaSkupina] = useState(false);

  function showNovVnos() {
    if (novVnos === false) {
      setNovVnos(true);
    } else {
      setNovVnos(false);
    }
  }

  function showNovaSkupina() {
    if (novaSkupina === false) {
      setNovaSkupina(true);
    } else {
      setNovaSkupina(false);
    }
  }
  return (
    <div>
      <div className="content">
        <h2>ZAPOSLENI V PODJETJU:</h2>
        <p>
          Tukaj lahko dodate ali izbrišete delavca, mu dodelite skupino, ali pa
          skupino ustvarite
        </p>
        <Button
          className="vnosBtn"
          variant="outline-primary"
          onClick={showNovVnos}
        >
          Dodaj delavca
        </Button>

        {novVnos ? <VnosZaposlenega /> : null}
        <Button
          className="vnosBtn"
          variant="outline-primary"
          onClick={showNovaSkupina}
        >
          Uredi skupine
        </Button>
        {novaSkupina ? <NovaSkupina /> : null}
        <hr />
        <h2>Seznam zaposlenih:</h2>
        <PrikaziZaposlene />
      </div>
    </div>
  );
};
export default Home;
