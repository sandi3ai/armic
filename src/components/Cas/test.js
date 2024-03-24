import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import CasFiltri from "./CasFiltri";
import { Table } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ErrorBoundary from "../../hooks/errorBoundaries";

dayjs.extend(duration);

const CasData = ({ data }) => {
  const [selectedCas, setSelectedCas] = useState(new Set());
  const [selectedAll, setSelectedAll] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [name]: checked,
    }));
  };

  const gridCheckboxOnChange = (casId) => {
    setSelectedCas((prevSelectedCas) => {
      const newSet = new Set(prevSelectedCas);
      if (newSet.has(casId)) {
        newSet.delete(casId);
      } else {
        newSet.add(casId);
      }
      return newSet;
    });
  };

  const bulkCheckboxOnChange = () => {
    console.log("Bulk checkbox triggered");
  };

  useEffect(() => {}, [selectedCas]);

  return (
    <div className="content">
      <CasFiltri
        checkboxStates={checkboxStates}
        onCheckboxChange={handleCheckboxChange}
      />
      <br />
      <Table borderless striped hover size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th>
              <Checkbox
                sx={{ p: 0 }}
                color="primary"
                name="gridChecboxBulkSelect"
                checked={selectedAll}
                onChange={() => bulkCheckboxOnChange()}
              />
            </th>
            <th>Čas začetka</th>
            <th>Čas zaključka</th>
            <th>Število ur</th>
            <th>Status</th>
          </tr>
        </thead>
        <ErrorBoundary>
          <tbody>
            {filteredData.map((data, idx) => (
              <tr
                key={idx}
                className={
                  data.status === "Odobreno"
                    ? "color-green"
                    : data.status === "Pregled"
                    ? "color-orange"
                    : data.status === "Zavrnjeno"
                    ? "color-red"
                    : data.status === "V teku"
                    ? "color-blue"
                    : ""
                }
              >
                <td>{idx + 1}.</td>
                <td>
                  <Checkbox
                    sx={{ p: 0 }}
                    color="primary"
                    name="gridChecbox"
                    checked={selectedCas.has(data.casID)}
                    onChange={() => gridCheckboxOnChange(data.casID)}
                  />
                </td>
                <td className={data.status === "Malica" ? "grayish" : ""}>
                  {data.formattedCasZacetek}
                </td>
                <td className={data.status === "Malica" ? "grayish" : ""}>
                  {data.formattedCasKonec !== "Invalid Date"
                    ? data.formattedCasKonec
                    : "Še ni zaključeno"}
                </td>
                <td className={data.status !== "Odobreno" ? "grayish" : ""}>
                  {subtractTime(data.casZacetek, data.casKonec)}
                </td>
                <td className={statusToClassNameMap[data.status] || ""}>
                  {data.status}
                </td>
              </tr>
            ))}
          </tbody>
        </ErrorBoundary>
        <ErrorBoundary>
          <tfoot className="tableFooter">
            <tr>
              <td colSpan={4}></td>
              <td colSpan={2}>
                Povprečen čas: {getAverageTime(filteredData)} <br />
                Skupno število ur: {getTotalTime(filteredData)}
              </td>
            </tr>
          </tfoot>
        </ErrorBoundary>
      </Table>
      {someNotApproved && (
        <Alert severity="info">
          Če delovni čas NI v statusu <strong>"Odobreno"</strong>, je izključen
          iz števca povprečnega časa in skupnega števila ur
        </Alert>
      )}
    </div>
  );
};

export default CasData;
