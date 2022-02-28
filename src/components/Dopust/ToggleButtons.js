import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";

function ToggleButtonGroup() {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const getSkupineUrl =
    "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const [radioValue, setRadioValue] = useState("/");
  const [skupine, setSkupine] = useState([{ skupinaID: "", skupinaIme: "" }]);
  const [zaposleni, setZaposleni] = useState([
    { ID: "", ime: "", skupinaID: "" },
  ]);

  const getSkupine = (getSkupinaObject) => {
    try {
      Axios.get(getSkupineUrl).then((response) => {
        getSkupinaObject(response.data.skupine);
        console.log(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl).then((response) => {
        getZaposleniObject(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getSkupinaObject = (data) => {
    setSkupine(
      data.map((data) => {
        return {
          skupinaIme: data.skupinaIme,
          skupinaID: data.skupinaID,
        };
      })
    );
  };

  const getZaposleniObject = (data) => {
    setZaposleni(
      data.map((data) => {
        return {
          ID: data.zaposleniID,
          ime: data.zaposleniIme,
          skupinaID: data.zaposleniSkupinaID,
        };
      })
    );
  };

  const getRadioValueName = (radioValue) => {
    const ime = skupine.find(({ skupinaID }) => skupinaID === radioValue);
    return ime;
  };

  useEffect(() => {
    getZaposleni();
    getSkupine(getSkupinaObject);
  }, []);

  console.log(zaposleni);

  //getRadioValueName(radioValue);

  return (
    <div>
      <ButtonGroup className="buttonGroup">
        {skupine.map((skupina, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-primary"}
            name="radio"
            value={skupina.skupinaID}
            checked={radioValue === skupina.skupinaID}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {skupina.skupinaIme}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <hr />
      Izbrana skupina: <strong>{/*getRadioValueName(radioValue)*/}</strong>
    </div>
  );
}

export default ToggleButtonGroup;
