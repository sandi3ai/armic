import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const CasData = (data) => {
  function subtractTime(start, finish) {
    const razlika = subtractTimeDiff(start, finish);
    const ure = moment.utc(razlika).format("HH:mm");
    return ure;
  }

  function subtractTimeDiff(start, finish) {
    const zacetek = moment(start, "HH:mm:ss");
    const konec = moment(finish, "HH:mm:ss");
    const razlika = konec.diff(zacetek);
    return razlika;
  }

  function getTotalTime() {
    const totalTimeMiliseconds = data.data.reduce((sum, data) => {
      return sum + subtractTimeDiff(data.casZacetek, data.casKonec);
    }, 0);
    //return moment.utc(totalTimeMiliseconds).format("HH:mm");
    return totalTimeMiliseconds;
  }

  function getAverageTime() {
    const avgTimeMiliseconds = data.data.reduce((sum, data, currentIndex) => {
      currentIndex += 1;
      console.log(currentIndex);
      return sum + subtractTimeDiff(data.casZacetek, data.casKonec) / 3;
    }, 0);
    return avgTimeMiliseconds;
  }

  return (
    <div className="content">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Število dni</th>
            <th>Uporabnik</th>
            <th>Datum</th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
            <th>Število ur</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((data, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{data.userID}</td>
              <td>{moment(data.datum).format("D.M.YYYY")}</td>
              <td>{data.casZacetek}</td>
              <td>{data.casKonec}</td>
              <td>{subtractTime(data.casZacetek, data.casKonec)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="tableFooter">
          <tr>
            <td>Povprečen čas: {getAverageTime()}</td>
            <td colSpan={2}>Skupno število ur:</td>

            <td>{getTotalTime()}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default CasData;
