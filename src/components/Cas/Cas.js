import React, { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Axios from "axios";
import ErrorBoundary from "../../hooks/errorBoundaries";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/sl"; // Import the Slovenian locale
import CasData from "./CasData";
import { post } from "../../Helper";
import EmailLog from "./EmailLog";

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

  function preglejBtn(eOrParams) {
    if (eOrParams && typeof eOrParams.preventDefault === "function") {
      eOrParams.preventDefault();
    }

    // Determine if eOrParams is event object or params based on the presence of preventDefault
    const params =
      eOrParams && typeof eOrParams.preventDefault === "function"
        ? { startDate, endDate, dropValue } // Use existing state if eOrParams is an event
        : eOrParams; // Use passed params directly if not
    try {
      post(getCasUrl, { startDate, endDate, dropValue }).then((response) => {
        checkForData(response.data.cas);
        console.log("DROOOOOOOOOOOOOOOOOOOOOP VALUE::: ", dropValue);
        const formattedData = createFormattedTwins(response.data.cas);
        const finalData = formattedData;
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

  return (
    <div>
      <div className="content">
        <div className="rowDiv">
          <h2>DELOVNI ČAS ZAPOSLENIH:</h2>
          <EmailLog />
        </div>
        <Form onSubmit={(e) => preglejBtn(e)}>
          Izberi zaposlenega in časovno obdobje za pregled delovnega časa:
          <div className="spacer"></div>
          <DropdownButton
            style={{ marginBottom: "15px" }}
            size="sm"
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
          <CasData
            data={casData}
            name={name}
            startDate={startDate}
            endDate={endDate}
            preglejBtn={preglejBtn}
          />
        </ErrorBoundary>
      ) : (
        <div className="divine-no-blur">
          Za izbran vnos ni podatkov o delovnem času
        </div>
      )}
    </div>
  );
};
