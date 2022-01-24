import Axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";

const IzbrisZaposlenega = () => {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState(false);
  const [izbrisiVnos, setIzbrisiVnos] = useState(false);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const deleteUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteZaposleni.php";

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.zaposleni);
        setReceived(true);
        showIzbrisVnosa();
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
  const deleteZaposleni = (id, event) => {
    event.preventDefault();
    Axios.post(deleteUrl, { id: id })
      .then(() => {
        console.log(id + " number sent on deleteZaposleni.php");
        getZaposleni();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button variant="outline-danger" onClick={getZaposleni}>
        Seznam zaposlenih
      </Button>
      <div className="parent">
        {izbrisiVnos &&
          data.map((data) => (
            <div key={data.zaposleniID} className="child">
              {data.zaposleniIme}
              <FaRegTrashAlt
                className="deleteBtn" //trash icon
                onClick={(event) => deleteZaposleni(data.zaposleniID, event)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default IzbrisZaposlenega;
