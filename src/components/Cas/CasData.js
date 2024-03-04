import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import CasFiltri from "./CasFiltri";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ErrorBoundary from "../../hooks/errorBoundaries";

dayjs.extend(duration);

const CasData = ({ data, vTeku }) => {
  const [status, setStatus] = useState("Brez filtra");
  const [checkboxStates, setCheckboxStates] = useState({
    approved: true,
    review: false,
    denied: false,
    inProgress: false,
    inLunch: false,
  });

  const filteredData = data.filter((item) => {
    if (checkboxStates.approved && item.status === "Odobreno") return true;
    if (checkboxStates.review && item.status === "Pregled") return true;
    if (checkboxStates.denied && item.status === "Zavrnjeni") return true;
    if (checkboxStates.inProgress && item.status === "V teku") return true;
    if (checkboxStates.inLunch && item.status === "Malica") return true;
    return false;
  });

  function subtractTime(start, finish) {
    const startDayjs = dayjs(start);
    const finishDayjs = dayjs(finish);
    const razlika = finishDayjs.diff(startDayjs);
    // Use dayjs duration to format the difference
    const dur = dayjs.duration(razlika);
    const ure = `${dur.hours().toString().padStart(2, "0")}:${dur
      .minutes()
      .toString()
      .padStart(2, "0")}`;

    return ure;
  }

  function getTotalTime(timeIntervals) {
    let totalMinutes = 0;

    timeIntervals
      .filter(({ casKonec }) => casKonec !== null)
      .forEach(({ casZacetek, casKonec }) => {
        const durationString = subtractTime(casZacetek, casKonec);
        const [hours, minutes] = durationString.split(":").map(Number);
        totalMinutes += hours * 60 + minutes;
      });

    // Convert total minutes back into "HH:mm"
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const formattedTotalDuration = `${totalHours
      .toString()
      .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

    return formattedTotalDuration;
  }

  function getAverageTime(filteredData) {
    // Convert all durations to minutes, sum them up, and then calculate the average
    let totalMinutes = 0;

    filteredData
      .filter(({ casKonec }) => casKonec !== null)
      .forEach(({ casZacetek, casKonec }) => {
        const start = dayjs(casZacetek);
        const end = dayjs(casKonec);
        const diff = end.diff(start, "minute"); // Get the difference in minutes directly
        totalMinutes += diff;
      });

    const averageMinutes = totalMinutes / filteredData.length;

    // Convert the average minutes back to hours and minutes
    const averageHours = Math.floor(averageMinutes / 60);
    const remainingMinutes = Math.round(averageMinutes % 60); // Use Math.round to round to the nearest whole number
    const formattedAverage = `${averageHours
      .toString()
      .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

    return formattedAverage;
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [name]: checked,
    }));
  };

  return (
    <div className="content">
      <CasFiltri
        checkboxStates={checkboxStates}
        onCheckboxChange={handleCheckboxChange}
      />
      <br />
      <Table borderless striped hover size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
            <th>Število ur</th>
            <th>Status</th>
          </tr>
        </thead>
        <ErrorBoundary>
          <tbody>
            {filteredData.map((data, idx) => (
              <tr
                key={idx}
                className={
                  data.status === "Odobreno"
                    ? "color-green"
                    : data.status === "Pregled"
                    ? "color-orange"
                    : data.status === "Zavrnjeno"
                    ? "color-red"
                    : data.status === "V teku"
                    ? "color-blue"
                    : ""
                }
              >
                <td>{idx + 1}.</td>
                <td>{filteredData.formattedCasZacetek}</td>
                <td>
                  {filteredData.formattedCasKonec !== "Invalid Date"
                    ? filteredData.formattedCasKonec
                    : "Še ni zaključeno"}
                </td>
                <td>
                  {subtractTime(filteredData.casZacetek, filteredData.casKonec)}
                </td>
                <td>{filteredData.status}</td>
              </tr>
            ))}
          </tbody>
        </ErrorBoundary>
        <ErrorBoundary>
          <tfoot className="tableFooter">
            <tr>
              <td colSpan={3} className="tdFooter">
                Povprečen čas - {getAverageTime(filteredData)}
              </td>

              <td colSpan={2}>
                Skupno število ur - {getTotalTime(filteredData)}
              </td>
            </tr>
          </tfoot>
        </ErrorBoundary>
      </Table>
      {vTeku && (
        <Alert severity="info">
          Če ima delovni čas status "V teku" je izključen iz povprečnega časa in
          skupnega števila ur
        </Alert>
      )}
    </div>
  );
};

export default CasData;
