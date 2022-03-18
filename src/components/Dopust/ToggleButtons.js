import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";
import DopustData from "./DopustData";

function ToggleButtonGroup() {
  const getSkupineUrl =
    "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const [radioValue, setRadioValue] = useState("");
  const [skupine, setSkupine] = useState([{ skupinaID: "", skupinaIme: "" }]);

  const getSkupine = (getSkupinaObject) => {
    try {
      Axios.get(getSkupineUrl, { withCredentials: true }).then((response) => {
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

  const getRadioValueName = (radioValue) => {
    if (radioValue === "") {
      return radioValue;
    }
    const ime = skupine.find(
      ({ skupinaID }) => skupinaID === radioValue
    ).skupinaIme;
    return ime;
  };

  useEffect(() => {
    getSkupine(getSkupinaObject);
  }, []);

  return (
    <div>
      <div className="content">
        <h2>Izberi skupino</h2>
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
      </div>
      <DopustData
        radioValueName={getRadioValueName(radioValue)}
        radioValueID={radioValue}
      />
    </div>
  );
}

export default ToggleButtonGroup;
