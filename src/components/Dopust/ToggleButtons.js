import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";

const getZaposleni = (filterOAV) => {
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  try {
    Axios.get(getUrl).then((response) => {
      filterOAV(response.data.zaposleni);
    });
  } catch (error) {
    alert(error.message);
  }
};

function ToggleButtonGroup() {
  const [radioValue, setRadioValue] = useState("/");
  const [vodje, setVodje] = useState([{ name: "", value: "", poz: "" }]);

  const filterOAV = (data) => {
    setVodje(
      data
        .map(function (data) {
          return {
            name: data.zaposleniIme,
            value: data.zaposleniID,
            poz: data.zaposleniPozicija,
          };
        })
        .filter((zaposleni) => zaposleni.poz === "OA-vodja")
    );
  };

  useEffect(() => {
    getZaposleni(filterOAV);
  }, []);

  return (
    <div>
      <ButtonGroup className="buttonGroup">
        {vodje.map((vodja, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-primary"}
            name="radio"
            value={vodja.name}
            checked={radioValue === vodja.name}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {vodja.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <br />
      Izbrana skupina: <strong>{radioValue} </strong>
    </div>
  );
}

export default ToggleButtonGroup;
