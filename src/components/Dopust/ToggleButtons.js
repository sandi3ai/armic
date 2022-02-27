import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";

function ToggleButtonGroup() {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const getSkupineUrl =
    "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const [radioValue, setRadioValue] = useState("/");
  const [vodje, setVodje] = useState([{ name: "", value: "", poz: "" }]);
  const [skupine, setSkupine] = useState([{ skupinaID: "", skupinaIme: "" }]);

  //getskupine

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

  const getZaposleni = (filterOAV) => {
    try {
      Axios.get(getZaposleniUrl).then((response) => {
        filterOAV(response.data.zaposleni);
        console.log(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const filterOAV = (data) => {
    setVodje(
      data
        .map(function (data) {
          return {
            name: data.zaposleniIme,
            value: data.zaposleniID,
            poz: data.zaposleniSkupinaID,
          };
        })
        .filter((zaposleni) => zaposleni.poz === "OA-vodja")
    );
  };

  const checkRadioValue = (radioValue) => {
    console.log(radioValue);
  };

  const getRadioValueName = (radioValue) => {
    console.log(radioValue);
    //tukaj dobiš ime iz IDja skupine ...(funkcija find())
  };

  useEffect(() => {
    getZaposleni(filterOAV);
    getSkupine(getSkupinaObject);
  }, []);

  checkRadioValue(radioValue);

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
      <br />
      Izbrana skupina: <strong>{radioValue} </strong>
    </div>
  );
}

export default ToggleButtonGroup;
