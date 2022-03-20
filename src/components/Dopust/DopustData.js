import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { post } from "../../Helper";

const DopustData = ({ radioValueName, radioValueID }) => {
  const getDopustnikUrl =
    "http://localhost/reactProjects/armic/src/rest/getDopustnik.php";
  const [dopustnik, setDopustnik] = useState([
    { dopustnikIme: "", dopustnikID: "", datumZ: "", datumK: "" },
  ]);

  const giveMeVacay = (radioValueID) => {
    if (radioValueID !== "") {
      try {
        post(getDopustnikUrl, { radioValue: radioValueID }).then((response) => {
          const res = response.data.dopustnik;
          getDopustnikObject(res);
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      console.log("radio value is empty");
    }
  };

  const getDopustnikObject = (data) => {
    //prefiltrira samo objekte ki imajo končni in začetni datum(dopusta)
    let newArray = data.filter((data) => {
      return data.datumZ !== null && data.datumK !== null;
    });
    setDopustnik(
      newArray.map((data) => {
        return {
          dopustnikIme: data.zaposleniIme,
          dopustnikID: data.zaposleniID,
          datumZ: moment(data.datumZ).format("D.M.YYYY"),
          datumK: moment(data.datumK).format("D.M.YYYY"),
        };
      })
    );
  };

  useEffect(() => {
    giveMeVacay(radioValueID);
  }, [radioValueID]);

  return (
    <div className="content">
      <h5>
        Izbrana skupina: <strong>{radioValueName}</strong>
      </h5>
      <hr />
      {dopustnik.length === 0 ? (
        "Ni zabeleženih dopustov za izbrano skupino."
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Dopustnik</th>
              <th>Začetni datum</th>
              <th>Končni datum</th>
            </tr>
          </thead>
          <tbody>
            {dopustnik.map((dopustnik, idx) => (
              <tr key={idx}>
                <td>{dopustnik.dopustnikIme}</td>
                <td>{dopustnik.datumZ}</td>
                <td>{dopustnik.datumK}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="tableFooter">
            <tr>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      )}
    </div>
  );
};

export default DopustData;
