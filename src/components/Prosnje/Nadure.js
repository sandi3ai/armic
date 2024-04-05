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
import CustomSnackbar from "../Elements/Snackbar";

dayjs.extend(customParseFormat);
dayjs.locale("sl");

export const Nadure = ({ countProsnje }) => {
  const [nadureData, setNadureData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [clickedButtonData, setClickedButtonData] = useState(null);

  const getProsnjeNadureUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getProsnjeNadure.php`;

  /**
   * NADURE functions
   */

  const getProsnjeNadure = () => {
    try {
      Axios.get(getProsnjeNadureUrl, { withCredentials: true }).then(
        (response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const formattedData = response.data.map((item) => ({
              ...item, // Spread to copy all existing properties from the item
              formattedCasZacetek: formatOutputDate(item.casZacetek), // Add a new property for the formatted start time
              formattedCasKonec: formatOutputDate(item.casKonec), // Add a new property for the formatted end time
              durationHHMM: formatDuration(item.durationMinutes), // Add a new property for the formatted duration
            }));
            setNadureData(formattedData);
          } else {
            // Handle the case where there are no items or response.data is not an array
            console.log("Ni novih prošenj za odobritev nadur.");
            setNadureData([]);
          }
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  function formatDuration(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  function formatOutputDate(timestamp) {
    return dayjs(timestamp, "YYYY-MM-DD HH:mm:ss").format(
      "D. MMM YYYY - HH:mm"
    );
  }

  useEffect(() => {
    getProsnjeNadure();
    countProsnje();
  }, []);

  return (
    <div>
      <hr />
      {nadureData.length === 0 ? (
        "Ni novih prošenj za odobritev nadur."
      ) : (
        <ErrorBoundary>
          <Table striped borderless hover size="sm" responsive>
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
                <tr key={idx}>
                  <td>{data.zaposleniIme}</td>
                  <td>{data.formattedCasZacetek}</td>
                  <td>{data.formattedCasKonec}</td>
                  <td>{data.durationHHMM}</td>
                  <td className="narrow-column">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-delete-${data.casID}`}>
                          Odobritev nadur
                        </Tooltip>
                      }
                    >
                      <img
                        className="confirm-deny-icon"
                        src={Check}
                        alt="Odobreno"
                        onClick={() => {
                          setModalShow(true);
                          setClickedItem(data);
                          setClickedButtonData({
                            action: "approve",
                            id: data.casID,
                          });
                        }}
                      />
                    </OverlayTrigger>{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-delete-${data.casID}`}>
                          Zavrnitev nadur
                        </Tooltip>
                      }
                    >
                      <img
                        className="confirm-deny-icon"
                        src={Cancel}
                        alt="zavrni"
                        onClick={() => {
                          setModalShow(true);
                          setClickedItem(data);
                          setClickedButtonData({
                            action: "reject",
                            id: data.casID,
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
            type="nadure"
            clickedItem={clickedItem}
            buttonData={clickedButtonData}
            onHide={() => {
              getProsnjeNadure();
              countProsnje();
              setModalShow(false);
              setClickedItem(null);
              setClickedButtonData(null);
            }}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Nadure;
