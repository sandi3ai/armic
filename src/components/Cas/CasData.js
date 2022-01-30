import React from "react";
import { Table } from "react-bootstrap";

const CasData = (data) => {
  return (
    <div className="content">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Uporabnik</th>
            <th>Datum</th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((data, idx) => (
            <tr key={idx}>
              <td>{data.userID}</td>
              <td>{data.datum}</td>
              <td>{data.casZacetek}</td>
              <td>{data.casKonec}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CasData;
