import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const IzbrisZaposlenega = () => {
  const [data, setData] = useState([]);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const deleteUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteZaposleni.php";

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getZaposleni();
  }, []);

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
    <div className="parent">
      {data.map((data) => (
        <div key={data.zaposleniID} className="child">
          {data.zaposleniIme} - {data.zaposleniPozicija}
          <FaRegTrashAlt
            className="deleteBtn" //trash icon
            onClick={(event) => deleteZaposleni(data.zaposleniID, event)}
          />
        </div>
      ))}
    </div>
  );
};
export default IzbrisZaposlenega;