import React, { useState, useEffect } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";
import CasData from "./CasData";

export const Cas = () => {
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const getCasUrl = "http://localhost/reactProjects/armic/src/rest/getCas.php";
  const getNameUrl =
    "http://localhost/reactProjects/armic/src/rest/getName.php";
  const [data, setData] = useState([]);
  const [dropValue, setDropValue] = useState("");
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().subtract(1, "months").endOf("month").format("yyyy-MM-DD")
  );
  const [casData, setCasData] = useState([]);
  const [thereIsData, setThereIsData] = useState(false);
  const [name, setName] = useState("");

  function preglejBtn(e) {
    try {
      e.preventDefault();
      Axios.post(
        getCasUrl,
        { startDate, endDate, dropValue },
        { withCredentials: true }
      ).then((response) => {
        setCasData(response.data.cas);
        checkForData(response.data.cas);
      });
    } catch (error) {
      alert(error.message);
    }
  }

  function checkForData(data) {
    if (data.length > 0) {
      console.log(data.length + " - this the data length");
      setThereIsData(true);
    } else {
      console.log("There no data length.");
      setThereIsData(false);
    }
  }

  const getZaposleni = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
        setData(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const idToName = (newValue) => {
    console.log(newValue);
    try {
      Axios.post(
        getNameUrl,
        { dropValue: newValue },
        { withCredentials: true }
      ).then((response) => {
        const res = response.data.zaposleniIme;
        console.log(res);
        setName(res);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  function checkIfName(name) {
    if (name === "" || name === null) {
      return "Izberi zaposlenega";
    } else {
      return name;
    }
  }

  useEffect(() => {
    getZaposleni();
  }, []);

  return (
    <div>
      <div className="content">
        <h2>DELOVNI ČAS ZAPOSLENIH:</h2>
      </div>
      <div className="content">
        <Form onSubmit={(e) => preglejBtn(e)}>
          <Form.Label>
            Izberi zaposlenega in časovno obdobje za pregled delovnega časa:
          </Form.Label>

          <DropdownButton
            variant="outline-primary"
            onClick={(e) => getZaposleni(e)}
            onSelect={(e) => {
              setDropValue(e);
              idToName(e);
            }}
            drop="down"
            title={checkIfName(name)}
          >
            {data.map((data) => (
              <Dropdown.Item key={data.zaposleniID} eventKey={data.zaposleniID}>
                {data.zaposleniIme}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <br />
          <Form.Label>Obdobje od: </Form.Label>
          <Form.Control
            name="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            placeholder="dan/mesec/leto"
          />
          <Form.Text className="text-muted">
            Ob kliku na ikono koledarja se odpre koledar
          </Form.Text>
          <Form.Label>Obdobje do: </Form.Label>
          <Form.Control
            name="date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            placeholder="dan/mesec/leto"
          />
          <Form.Text className="text-muted">
            Ob kliku na ikono koledarja se odpre koledar
          </Form.Text>

          <div className="successBox">
            <br />
            <Button variant="outline-success" type="submit">
              Preglej
            </Button>
          </div>
        </Form>
      </div>
      {thereIsData ? (
        <CasData data={casData} />
      ) : (
        <div className="divine">
          Za izbran vnos ni informacij o delovnem času
        </div>
      )}
    </div>
  );
};
