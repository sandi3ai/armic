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
    const tempTime = moment.duration(totalTimeMiliseconds);
    const ure = Math.floor(tempTime.asHours()); //prikaže seštevek ur, zaokrožen na dol
    const minute = tempTime.asMinutes() % 60; //modul 60, da prikaže le ostanek minute od ur
    //return moment.utc(totalTimeMiliseconds).format("HH:mm"); - v tem primeru je 25 ur prikazalo kot eno uro
    return ure + ":" + minute;
  }

  function getAverageTime() {
    const avgTimeMiliseconds = data.data.reduce((sum, data) => {
      return sum + subtractTimeDiff(data.casZacetek, data.casKonec);
    }, 0);
    return moment.utc(avgTimeMiliseconds / data.data.length).format("HH:mm");
  }

  /*function getAverageStart() {
    const avgStart = data.data.reduce((sum, data) => {
      console.log(data.casZacetek);
      console.log(moment.utc(data.casZacetek).valueOf());
      return sum + data.casZacetek;
    });
    return avgStart;
  }*/

  return (
    <div className="content">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Datum</th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
            <th>Število ur</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((data, idx) => (
            <tr key={idx}>
              <td>{idx + 1}.</td>
              <td>{moment(data.datum).format("D.M.YYYY")}</td>
              <td>{data.casZacetek}</td>
              <td>{data.casKonec}</td>
              <td>{subtractTime(data.casZacetek, data.casKonec)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="tableFooter">
          <tr>
            <td colSpan={3} className="tdFooter">
              Povprečen čas - {getAverageTime()}
            </td>

            <td colSpan={2}>Skupno število ur - {getTotalTime()}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default CasData;
