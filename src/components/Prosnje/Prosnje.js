import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import ErrorBoundary from "../../hooks/errorBoundaries";
import Nadure from "./Nadure";
import Odsotnost from "./Odsotnost";
import { post } from "../../Helper";
import { useCounts } from "../../hooks/CountsContext";

export const Prosnje = () => {
  const countProsnjeUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/countProsnje.php`;
  const { updateCounts } = useCounts();

  const countProsnje = async () => {
    try {
      post(countProsnjeUrl, {}).then((response) => {
        console.log("Count prosnje response: ", response);
        updateCounts({
          countNadure: response.data.countNadure,
          countOdsotnost: response.data.countOdsotnost,
        });
      });
    } catch (error) {
      console.error("Failed to fetch counts", error);
    }
  };

  useEffect(() => {
    countProsnje();
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <div className="content">
          <h2>PROŠNJE:</h2>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-header">
                <h5>Nadure</h5>
              </Accordion.Header>
              <Accordion.Body>
                <Nadure countProsnje={countProsnje} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5>Odsotnosti</h5>
              </Accordion.Header>
              <Accordion.Body>
                <Odsotnost countProsnje={countProsnje} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Prosnje;
