import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function ToggleButtonGroup() {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Venčeslav Starc", value: "1" },
    { name: "Jan Šoštarič", value: "2" },
    { name: "Gabrijel Devrenič", value: "3" },
    { name: "Mitja Uršič", value: "4" },
  ];

  return (
    <div>
      <ButtonGroup className="buttonGroup">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-primary"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <br />
      Izbrani radio gumb je : {radioValue}
    </div>
  );
}

export default ToggleButtonGroup;
