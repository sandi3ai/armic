import React, { useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Axios from "axios";
import ErrorBoundary from "../../hooks/errorBoundaries";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/sl"; // Import the Slovenian locale
import CasData from "./CasData";
import { post } from "../../Helper";

export const Cas = () => {
  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;
  const getCasUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getCas.php`;
  const getNameUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getName.php`;
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
  const [vTeku, setVTeku] = useState(false);

  function preglejBtn(e) {
    try {
      e.preventDefault();
      post(getCasUrl, { startDate, endDate, dropValue }).then((response) => {
        checkForData(response.data.cas);
        const formattedData = createFormattedTwins(response.data.cas);
        const finalData = formattedData;
        checkIfVTeku(finalData);
        setCasData(finalData);
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
      post(getNameUrl, { dropValue: newValue }).then((response) => {
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

  function createFormattedTwins(data) {
    dayjs.locale("sl");

    data.forEach((item) => {
      item.formattedCasKonec = dayjs(item.casKonec).format(
        "D. MMMM YYYY HH:mm"
      );
      item.formattedCasZacetek = dayjs(item.casZacetek).format(
        "D. MMMM YYYY HH:mm"
      );
    });
    console.log("FORMATED TWINS: ", data);

    return data;
  }

  function checkIfVTeku(data) {
    //Check if any of the items in the data array have the status "V teku"
    const vTeku = data.some((item) => item.status === "V teku");
    setVTeku(vTeku);
  }

  useEffect(() => {
    getZaposleni();
  }, []);

  return (
    <div>
      <div className="content">
        <h2>DELOVNI ČAS ZAPOSLENIH:</h2>
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

          <Col lg="3" md="4" sm="5">
            <Form.Label>Obdobje od: </Form.Label>
            <Form.Control
              name="date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              type="date"
              placeholder="dan/mesec/leto"
            />
            <Form.Text className="text-muted">
              Za lažje izbiranje klikni koledar
            </Form.Text>
          </Col>

          <Col lg="3" md="4" sm="5">
            <Form.Label>Obdobje do: </Form.Label>
            <Form.Control
              name="date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              type="date"
              placeholder="dan/mesec/leto"
            />
            <Form.Text className="text-muted">
              Za lažje izbiranje klikni koledar
            </Form.Text>
          </Col>
          <div className="spacer"></div>
          <div className="successBox">
            <br />
            <Button variant="outline-success" type="submit">
              Preglej
            </Button>
          </div>
        </Form>
      </div>

      {thereIsData ? (
        <ErrorBoundary>
          <CasData data={casData} vTeku={vTeku} />
        </ErrorBoundary>
      ) : (
        <div className="divine">
          Za izbran vnos ni informacij o delovnem času
        </div>
      )}
    </div>
  );
};
