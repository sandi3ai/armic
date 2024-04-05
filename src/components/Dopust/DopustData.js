import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { post } from "../../Helper";
import InfoTooltip from "../Elements/InfoTooltip";
import AlternateEmailTwoToneIcon from "@mui/icons-material/AlternateEmailTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import Tooltip from "@mui/material/Tooltip";

const DopustData = ({
  radioValueName,
  radioValueID,
  tip,
  status,
  skupina,
  leto,
}) => {
  const getDopustnikUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getOdsotnost.php`;
  const [dopustnik, setDopustnik] = useState([
    { dopustnikIme: "", dopustnikID: "", datumZ: "", datumK: "", dni: "" },
  ]);

  const statusToClassNameMap = {
    Odobreno: "greenish",
    Pregled: "orangish",
    Zavrnjeno: "reddish",
  };

  const giveMeVacay = (radioValueID) => {
    if (radioValueID !== "") {
      try {
        post(getDopustnikUrl, { radioValue: radioValueID, leto: leto }).then(
          (response) => {
            const res = response.data.dopustnik;
            getDopustnikObject(res);
          }
        );
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

  const getSkupinaEmail = () => {
    const skupinaItem = skupina.find(
      (item) => item.skupinaID === Number(radioValueID)
    );
    return skupinaItem ? skupinaItem.skupinaEmail : "";
  };

  const tooltipComponentProps = {
    tooltip: {
      sx: {
        bgcolor: "black",
        color: "white",
      },
    },
  };

  useEffect(() => {
    giveMeVacay(radioValueID);
  }, [radioValueID, leto]);

  return (
    <div className="content">
      {getSkupinaEmail() !== "" ? (
        <div className="content">
          <Tooltip
            arrow
            placement="top"
            title="Ime skupine"
            componentsProps={tooltipComponentProps}
          >
            <span>
              <GroupsTwoToneIcon /> <strong>{radioValueName}</strong>
            </span>
          </Tooltip>
          <br />
          <Tooltip
            arrow
            placement="top"
            title="E-mail vodje skupine"
            componentsProps={tooltipComponentProps}
          >
            <span>
              <AlternateEmailTwoToneIcon /> {getSkupinaEmail()}
            </span>
          </Tooltip>
        </div>
      ) : (
        ""
      )}
      {filteredDopustnik.length === 0 || radioValueID === "" ? (
        "Ni zabeleženih odsotnosti za izbrano skupino."
      ) : (
        <Table striped borderless hover size="sm" responsive>
          <thead>
            <tr>
              <th>Odsotna oseba</th>
              <th>Začetni datum</th>
              <th>Končni datum</th>
              <th>Tip</th>
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
                <td style={{ textAlign: "center" }}>{dopustnik.trajanje}</td>
                <td className={statusToClassNameMap[dopustnik.status] || ""}>
                  {dopustnik.status}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DopustData;
