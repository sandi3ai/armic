import Axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const IzbrisZaposlenega = () => {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState(false);
  const [izbrisiVnos, setIzbrisiVnos] = useState(false);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.zaposleni);
        setReceived(true);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  function showIzbrisVnosa() {
    if (izbrisiVnos === false && received) {
      setIzbrisiVnos(true);
    } else {
      setIzbrisiVnos(false);
    }
  }

  return (
    <div>
      <Button variant="outline-danger" onClick={getZaposleni}>
        Izbriši delavca
      </Button>
      {showIzbrisVnosa &&
        data.map((data) => (
          <div key={data.zaposleniID}>
            <div className="child">{data.zaposleniIme}</div>
          </div>
        ))}
    </div>
  );
};
export default IzbrisZaposlenega;
