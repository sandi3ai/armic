import React, { useState, useEffect } from "react";
import { ButtonGroup, Form, ToggleButton } from "react-bootstrap";
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

  /**
   * Vzame radioValue, preveri če se radioValue ujema s skupinaID in vrne ime te skupine
   * @param radioValue = skupinaID
   * @returns
   */
  const getRadioValueName = (radioValue) => {
    if (radioValue === "") {
      return radioValue;
    }
    const foundItem = skupine.find(({ skupinaID }) => {
      return skupinaID === Number(radioValue);
    });

    if (foundItem) {
      return foundItem.skupinaIme;
    } else {
      return "Skupina ni najdena";
    }
  };

  useEffect(() => {
    getSkupine(getSkupinaObject);
  }, []);

  return (
    <div>
      <div className="spacer"></div>
      <Form.Label>Izberi skupino:</Form.Label>
      <div className="centered">
        <ButtonGroup className="buttonGroup">
          {skupine.map((skupina, idx) => (
            <ToggleButton
              className="singleButtonGroup"
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="light"
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
