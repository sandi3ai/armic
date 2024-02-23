import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { post } from "../../Helper";
import InfoTooltip from "../Elements/InfoTooltip";

const DopustData = ({
  radioValueName,
  radioValueID,
  tip,
  status,
  holidays,
}) => {
  const getDopustnikUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getOdsotnost.php`;
  const [dopustnik, setDopustnik] = useState([
    { dopustnikIme: "", dopustnikID: "", datumZ: "", datumK: "", dni: "" },
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
          trajanje: data.trajanje,
          tipOdsotnosti: data.tip,
          status: data.status,
        };
      })
    );
  };

  const filteredDopustnik = dopustnik.filter((item) => {
    const matchesTip = tip === "Brez filtra" || item.tipOdsotnosti === tip;
    const matchesStatus = status === "Brez filtra" || item.status === status;

    return matchesTip && matchesStatus; // An item must match both filters to be included
  });

  useEffect(() => {
    giveMeVacay(radioValueID);
  }, [radioValueID]);

  return (
    <div className="content">
      <h5>
        Izbrana skupina: <strong>{radioValueName}</strong>
      </h5>
      {filteredDopustnik.length === 0 || radioValueID === "" ? (
        "Ni zabeleženih odsotnosti za izbrano skupino."
      ) : (
        <Table striped borderless hover size="sm" responsive>
          <thead>
            <tr>
              <th>Odsotna oseba</th>
              <th>Začetni datum</th>
              <th>Končni datum</th>
              <th>Trajanje</th>
              <th>
                <InfoTooltip
                  placement="top"
                  sourceTitle="Trajanje"
                  content="Število odsotnih dni od katerega so odšteti morebitni prazniki in vikendi"
                />
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDopustnik.map((dopustnik, idx) => (
              <tr
                key={idx}
                className={
                  dopustnik.status === "Odobreno"
                    ? "color-green"
                    : dopustnik.status === "Pregled"
                    ? "color-orange"
                    : dopustnik.status === "Zavrnjeno"
                    ? "color-red"
                    : ""
                }
              >
                <td>{dopustnik.dopustnikIme}</td>
                <td>{dopustnik.datumZ}</td>
                <td>{dopustnik.datumK}</td>
                <td>{dopustnik.tipOdsotnosti}</td>
                <td>{dopustnik.trajanje}</td>
                <td>{dopustnik.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DopustData;
