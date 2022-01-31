import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const CasData = (data) => {
  function subtractTime(start, finish) {
    const zacetek = moment(start, "HH:mm:ss");
    const konec = moment(finish, "HH:mm:ss");
    const razlika = konec.diff(zacetek);
    const trajanje = moment.duration(razlika);
    console.log(trajanje.humanize());
    const ure = trajanje.hours() + ":" + trajanje.minutes();
    return ure;
  }

  function totalTime(steviloUr) {
    console.log(steviloUr);
    const stUr = moment(steviloUr, "HH:mm");
    console.log(stUr);
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
              {totalTime(subtractTime(data.casZacetek, data.casKonec))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              Tukaj naredi skupno število ur, in mogoče število dni... mogoče
              povprečen čas začetka, povprečen čas zaključka
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default CasData;
