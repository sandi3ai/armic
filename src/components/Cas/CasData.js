import React from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ErrorBoundary from "../../hooks/errorBoundaries";

dayjs.extend(duration);

const CasData = ({ data }) => {
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

    timeIntervals.forEach(({ casZacetek, casKonec }) => {
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

  function getAverageTime(data) {
    // Convert all durations to minutes, sum them up, and then calculate the average
    let totalMinutes = 0;

    data.forEach(({ casZacetek, casKonec }) => {
      const start = dayjs(casZacetek);
      const end = dayjs(casKonec);
      const diff = end.diff(start, "minute"); // Get the difference in minutes directly
      totalMinutes += diff;
    });

    const averageMinutes = totalMinutes / data.length;

    // Convert the average minutes back to hours and minutes
    const averageHours = Math.floor(averageMinutes / 60);
    const remainingMinutes = Math.round(averageMinutes % 60); // Use Math.round to round to the nearest whole number
    const formattedAverage = `${averageHours
      .toString()
      .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

    return formattedAverage;
  }

  return (
    <div className="content">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
            <th>Število ur</th>
          </tr>
        </thead>
        <ErrorBoundary>
          <tbody>
            {data.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}.</td>
                <td>{data.casZacetek}</td>
                <td>{data.casKonec}</td>
                <td>{subtractTime(data.casZacetek, data.casKonec)}</td>
              </tr>
            ))}
          </tbody>
        </ErrorBoundary>
        <ErrorBoundary>
          <tfoot className="tableFooter">
            <tr>
              <td colSpan={3} className="tdFooter">
                Povprečen čas - {getAverageTime(data)}
              </td>

              <td colSpan={2}>Skupno število ur - {getTotalTime(data)}</td>
            </tr>
          </tfoot>
        </ErrorBoundary>
      </Table>
    </div>
  );
};

export default CasData;
