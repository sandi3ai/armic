import React, { useState, useEffect } from "react";
import { Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";
import moment from "moment";
import CasData from "./CasData";

export const Cas = () => {
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const getCasUrl = "http://localhost/reactProjects/armic/src/rest/getCas.php";
  const [data, setData] = useState([]);
  const [dropValue, setDropValue] = useState("");
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().subtract(1, "months").endOf("month").format("yyyy-MM-DD")
  );
  const [casData, setCasData] = useState([]);

  function preglejBtn(e) {
    try {
      e.preventDefault();
      Axios.post(getCasUrl, { startDate, endDate, dropValue }).then(
        (response) => {
          setCasData(response.data.cas);
          console.log(response.data.cas);
        }
      );
    } catch (error) {
      alert(error.message);
    }
  }

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
            title={dropValue}
            onClick={(e) => getZaposleni(e)}
            onSelect={(e) => setDropValue(e)}
            value={dropValue}
            drop="down"
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
            {/*successTxt && " Nov zaposleni uspešno dodan!"*/}
          </div>
        </Form>
      </div>
      <CasData data={casData} />
    </div>
  );
};
