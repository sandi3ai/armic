import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Axios from "axios";

function ToggleButtonGroup() {
  const [radioValue, setRadioValue] = useState("1");
  const [data, setData] = useState([]);
  const [vodje, setVodje] = useState([{ name: "", value: "" }]);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.zaposleni);
        console.log(response.data.zaposleni);
        filterOAV(data); //mogoče napiši ali vstavi funkcijo tukaj --
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getZaposleni();
  }, []);

  const filterOAV = (data) => {
    console.log("filterOAV");
    console.log(data);
    data.map(function (data, idx) {
      if (data.zaposleniPozicija === "OA-vodja") {
        setVodje({ ...vodje, name: data.zaposleniIme, value: idx });
        console.log("vodje");
        console.log(vodje);
      }
    });
  };

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
            value={radio.name}
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
