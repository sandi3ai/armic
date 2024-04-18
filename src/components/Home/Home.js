import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import VnosZaposlenega from "./VnosZaposlenega";
import PrikaziZaposlene from "./PrikaziZaposlene";
import NovaSkupina from "./NovaSkupina";

const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;

export const Home = () => {
  const [novVnos, setNovVnos] = useState(false);
  const [novaSkupina, setNovaSkupina] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getZaposleni = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(getUrl, { withCredentials: true });
      console.log("ZAPOSLENI: ", response.data.zaposleni);
      setData(response.data.zaposleni || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

        {novVnos ? <VnosZaposlenega getZaposleni={getZaposleni} /> : null}
        <Button
          className="vnosBtn"
          variant="outline-primary"
          onClick={showNovaSkupina}
        >
          Uredi skupine
        </Button>
        {novaSkupina ? (
          <NovaSkupina zaposleniData={data} isLoading={isLoading} />
        ) : null}
        <hr />
        <h2>Seznam zaposlenih:</h2>
        <PrikaziZaposlene
          data={data}
          isLoading={isLoading}
          getZaposleni={getZaposleni}
        />
      </div>
    </div>
  );
};
export default Home;
