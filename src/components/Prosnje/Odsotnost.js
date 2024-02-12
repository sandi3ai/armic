import React, { useState, useEffect } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import Axios from "axios";
import Cancel from "../Images/cancel.png";
import Check from "../Images/check.png";
import ConfirmModal from "./ConfirmModal";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import "dayjs/locale/sl";
import ErrorBoundary from "../../hooks/errorBoundaries";

dayjs.extend(customParseFormat);
dayjs.locale("sl");

export const Odsotnost = () => {
  const [odsotnostData, setOdsotnostData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [clickedButtonData, setClickedButtonData] = useState(null);

  const getProsnjeOdsotnostUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getProsnjeOdsotnost.php`;

  const getProsnjeOdsotnost = () => {
    try {
      Axios.get(getProsnjeOdsotnostUrl, { withCredentials: true }).then(
        (response) => {
          const formattedData = response.data.map((item) => ({
            ...item, // Spread to copy all existing properties from the item
            formattedCasZacetek: formatOutputDate(item.datumZ), // Add a new property for the formatted start time
            formattedCasKonec: formatOutputDate(item.datumK), // Add a new property for the formatted end time
          }));
          setOdsotnostData(formattedData);
          console.log("RESPONSE.DATA: ", formattedData);
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  function formatOutputDate(date) {
    return dayjs(date, "YYYY-MM-DD").format("D MMM YYYY");
  }

  useEffect(() => {
    getProsnjeOdsotnost();
  }, []);

  return (
    <div>
      <hr />
      {odsotnostData.length === 0 ? (
        "Ni novih prošenj za odobritev odsotnosti."
      ) : (
        <ErrorBoundary>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Ime</th>
                <th>Začetek</th>
                <th>Konec</th>
                <th>Tip</th>
                <th className="narrow-column">Potrdi</th>
              </tr>
            </thead>
            <tbody>
              {odsotnostData.map((data, idx) => (
                <tr key={idx}>
                  <td>{data.zaposleniIme}</td>
                  <td>{data.formattedCasZacetek}</td>
                  <td>{data.formattedCasKonec}</td>
                  <td>{data.tip}</td>
                  <td className="narrow-column">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-delete-${data.dopustID}`}>
                          Odobritev odsotnosti
                        </Tooltip>
                      }
                    >
                      <img
                        className="status-img"
                        src={Check}
                        alt="Odobreno"
                        onClick={() => {
                          setModalShow(true);
                          setClickedItem(data);
                          setClickedButtonData({
                            action: "approve",
                            id: data.dopustID,
                          });
                        }}
                      />
                    </OverlayTrigger>{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-delete-${data.dopustID}`}>
                          Zavrnitev odsotnosti
                        </Tooltip>
                      }
                    >
                      <img
                        className="status-img"
                        src={Cancel}
                        alt="zavrni"
                        onClick={() => {
                          setModalShow(true);
                          setClickedItem(data);
                          setClickedButtonData({
                            action: "reject",
                            id: data.dopustID,
                          });
                        }}
                      />
                    </OverlayTrigger>
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
          <ConfirmModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setClickedItem(null);
              setClickedButtonData(null);
            }}
            type="odsotnost"
            clickedItem={clickedItem}
            buttonData={clickedButtonData}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Odsotnost;
