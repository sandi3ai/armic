import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import VnosZaposlenega from "./VnosZaposlenega";
import PrikaziZaposlene from "./PrikaziZaposlene";
import NovaSkupina from "./NovaSkupina";
import { Button } from "react-bootstrap";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
  //Button,
  Tooltip,
} from "antd";

const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;

export const Home = () => {
  const [novVnos, setNovVnos] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function showNovVnos() {
    if (novVnos === false) {
      setNovVnos(true);
    } else {
      setNovVnos(false);
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

  const createNewButton = (buttonText, onCLick) => {
    <Tooltip title="search">
      <Button type="primary" shape="circle" onClick={onCLick}>
        {buttonText}
      </Button>
    </Tooltip>;
  };

  return (
    <div>
      <div className="content">
        <h2>ZAPOSLENI V PODJETJU:</h2>
        <p>
          Tukaj lahko dodate ali izbrišete delavca, mu dodelite skupino, ali pa
          skupino ustvarite
        </p>
        <NovaSkupina zaposleniData={data} isLoading={isLoading} />
        <div className="addNew">
          <div className="rowDiv">
            <h2>Seznam zaposlenih: </h2>
            <Button
              variant={novVnos ? "danger" : "outline-primary"}
              onClick={showNovVnos}
            >
              {novVnos ? (
                "Zapri vnos zaposlenega"
              ) : (
                <>
                  Dodaj zaposlenega <PersonAddAltOutlinedIcon />
                </>
              )}
            </Button>{" "}
          </div>

          {novVnos ? <VnosZaposlenega getZaposleni={getZaposleni} /> : null}
          <PrikaziZaposlene
            data={data}
            isLoading={isLoading}
            getZaposleni={getZaposleni}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
