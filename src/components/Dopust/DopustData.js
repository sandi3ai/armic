import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";

const DopustData = (props) => {
  const getZaposleniUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const [zaposleni, setZaposleni] = useState([
    { ID: "", ime: "", skupinaID: "" },
  ]);

  const getZaposleni = () => {
    try {
      Axios.get(getZaposleniUrl).then((response) => {
        console.log(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getZaposleni();
  }, []);

  console.log(zaposleni);

  return (
    <div className="content">
      <h5>
        Izbrana skupina: <strong>{props.radioValueName}</strong>
      </h5>
      <hr />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Dopustnik</th>
            <th>Začetni datum</th>
            <th>Končni datum</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot className="tableFooter">
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default DopustData;
