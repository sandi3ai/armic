import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const CasData = (data) => {
  function subtractTime(start, finish) {
    const zacetek = moment(start, "HH:mm:ss");
    const konec = moment(finish, "HH:mm:ss");
    const razlika = konec.diff(zacetek);
    const trajanje = moment.duration(razlika);
    const ure = trajanje.hours() + ":" + trajanje.minutes();
    return ure;
  }

  return (
    <div className="content">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
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
              <td>{data.userID}</td>
              <td>{data.datum}</td>
              <td>{data.casZacetek}</td>
              <td>{data.casKonec}</td>
              <td>{subtractTime(data.casZacetek, data.casKonec)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/*Tukaj naredi skupno število ur, in mogoče število dni... mogoče
          povprečen čas začetka, povprečen čas zaključka*/}
        </tfoot>
      </Table>
    </div>
  );
};

export default CasData;
