import React, { useState, useEffect } from "react";
import { Accordion, Table } from "react-bootstrap";
import Axios from "axios";
import Cancel from "../Images/cancel.png";
import Check from "../Images/check.png";
import ErrorBoundary from "../../hooks/errorBoundaries";

export const Prosnje = () => {
  const [nadureData, setNadureData] = useState([]);

  const getProsnjeNadureUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getProsnjeNadure.php`;

  const getProsnjeNadure = () => {
    try {
      Axios.get(getProsnjeNadureUrl, { withCredentials: true }).then(
        (response) => {
          setNadureData(response.data);
          console.log(response.data);
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getProsnjeNadure();
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <div className="content">
          <h2>PROŠNJE:</h2>
          <Accordion
            defaultActiveKey="0"
            alwaysOpen
            className="accordion-custom"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Nadure</Accordion.Header>
              <Accordion.Body>
                <div className="content">
                  <hr />
                  {nadureData.length === 0 ? (
                    "Ni novih prošenj za odobritev nadur."
                  ) : (
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Ime</th>
                          <th>Začetni čas</th>
                          <th>Končni čas</th>
                          <th>Trajanje</th>
                          <th className="narrow-column">Potrdi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nadureData.map((data, idx) => (
                          <tr key="idx">
                            <td>{data.userID}</td>
                            <td>{data.casZacetek}</td>
                            <td>{data.casKonec}</td>
                            <td>{data.userID}</td>
                            <td className="narrow-column">
                              <img
                                className="status-img"
                                src={Check}
                                alt="Odobreno"
                              />{" "}
                              <img
                                className="status-img"
                                src={Cancel}
                                alt="zavrni"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="tableFooter">
                        <tr>
                          <td></td>
                        </tr>
                      </tfoot>
                    </Table>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Odsotnosti</Accordion.Header>
              <Accordion.Body>
                <div className="content">
                  <hr />
                  {0 === 0 ? (
                    "Ni novih prošenj za odobritev odsotnosti."
                  ) : (
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Ime</th>
                          <th>Začetni datum</th>
                          <th>Končni datum</th>
                          <th>Tip odsotnosti</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key="">
                          <td>123</td>
                          <td>456</td>
                          <td>789</td>
                          <td>369</td>
                        </tr>
                      </tbody>
                      <tfoot className="tableFooter">
                        <tr>
                          <td></td>
                        </tr>
                      </tfoot>
                    </Table>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Prosnje;
