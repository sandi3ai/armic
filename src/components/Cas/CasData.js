import React from "react";

const CasData = (data) => {
  console.log(data);
  return (
    <div className="content">
      <table>
        <tr>
          <th>Uporabnik</th>
          <th>Datum</th>
          <th>Cas zacetka</th>
          <th>Cas konca</th>
        </tr>
        <tr>
          {data.map((data) => (
            <div>
              <td>{data.userID}</td>
              <td>{data.datum}</td>
              <td>{data.casZacetek}</td>
              <td>{data.casKonec}</td>
            </div>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default CasData;
