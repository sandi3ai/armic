import Alert from "@mui/material/Alert";
import React, { useEffect, useMemo, useState } from "react";
import CasFiltri from "./CasFiltri";
import { Col, Row, Table } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ErrorBoundary from "../../hooks/errorBoundaries";
import ExportDelete from "./ExportDelete";
import { mergeSetIdsWithData } from "../../hooks/mergeSetWithData";
import InfoTooltip from "../Elements/InfoTooltip";
import CustomSnackbar from "../Elements/Snackbar";

dayjs.extend(duration);

const CasData = ({ data, name, startDate, endDate, preglejBtn }) => {
  const [checkboxStates, setCheckboxStates] = useState({
    approved: true,
    review: false,
    denied: false,
    inProgress: false,
    inLunch: false,
  });
  const [selectedCas, setSelectedCas] = useState(new Set());
  const [selectedTimes, setSelectedTimes] = useState("00:00");
  const [snackbarStates, setSnackbarStates] = useState({
    open: false,
    content: "",
    severity: "info",
  });

  const handleSnackbarOpen = (content, severity = "info") => {
    setSnackbarStates({ open: true, content, severity });
  };

  const statusToClassNameMap = {
    Odobreno: "greenish",
    Pregled: "orangish",
    Zavrnjeno: "reddish",
    "V teku": "blueish",
    Malica: "grayish",
  };

  const statusToCheckboxKey = {
    Odobreno: "approved",
    Pregled: "review",
    Zavrnjeno: "denied",
    "V teku": "inProgress",
    Malica: "inLunch",
  };

  // Prepare data by merging cas and malice entries
  const prepareDataWithMalice = () => {
    const allEntries = [];

    data.forEach((item) => {
      const formattedCasKonec = item.casKonec
        ? dayjs(item.casKonec).format("D. MMMM YYYY HH:mm")
        : null;
      const formattedCasZacetek = dayjs(item.casZacetek).format(
        "D. MMMM YYYY HH:mm"
      );
      const trajanje = subtractTime(item.casZacetek, item.casKonec);

      allEntries.push({
        ...item,
        trajanje,
        type: "cas", // Mark original data as 'cas'
      });

      // If malica exists for this item, add it separately
      if (item.malicaZacetek && item.malicaKonec) {
        // Format malice times
        const formattedMalicaZacetek = dayjs(item.malicaZacetek).format(
          "D. MMMM YYYY HH:mm"
        );
        const formattedMalicaKonec = dayjs(item.malicaKonec).format(
          "D. MMMM YYYY HH:mm"
        );
        allEntries.push({
          ...item, //Keep common data
          casZacetek: item.malicaZacetek,
          casKonec: item.malicaKonec,
          formattedCasZacetek: formattedMalicaZacetek, // Use same keys for uniform access
          formattedCasKonec: formattedMalicaKonec,
          status: "Malica", // Mark this entry as 'Malica'
          type: "malice", // Differentiate malice entries from cas entries
        });
      }
    });

    return allEntries;
  };

  //Filter the data based on the checkbox states in CasFiltri.js.
  const prepareFilteredData = () => {
    // Merge cas and malice entries
    const allDataWithMalice = prepareDataWithMalice();

    // Transform an array to an object of cas entries keyed by casID
    const casStatusMap = allDataWithMalice.reduce((acc, item) => {
      if (item.type === "cas") {
        acc[item.casID] = item.status; // Map 'casID' to its status
      }
      return acc;
    }, {});

    return allDataWithMalice.filter((item) => {
      if (item.type === "cas") {
        // Directly use the mapping to convert status to the checkbox state key
        return checkboxStates[statusToCheckboxKey[item.status]];
      } else if (item.type === "malice") {
        // Get the status of the related 'cas' entry
        const relatedCasStatus = casStatusMap[item.casID];
        if (relatedCasStatus) {
          // return true if the related 'cas' entry is checked and the 'malica' checkbox is checked
          return (
            relatedCasStatus &&
            checkboxStates[statusToCheckboxKey[relatedCasStatus]] &&
            checkboxStates.inLunch
          );
        }
        return false;
      }
      return false; // This should not happen, just handling unexpected cases
    });
  };

  const filteredData = useMemo(
    () => prepareFilteredData(),
    [data, checkboxStates]
  );

  const someNotApproved = filteredData.some(
    (item) => item.status !== "Odobreno"
  );

  function subtractTime(start, finish) {
    //Handle time subtraction for logs "V teku"
    if (!finish || finish === "Še ni zaključeno") {
      return "/";
    }
    const startDayjs = dayjs(start);
    const finishDayjs = dayjs(finish);
    const razlika = finishDayjs.diff(startDayjs);
    // Calculate total hours and minutes manually to avoid mistakes when duration is 24h+
    const totalHours = Math.floor(razlika / (1000 * 60 * 60)); // Total milliseconds divided by milliseconds in an hour
    const totalMinutes = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60)); // Remainder divided by milliseconds in a minute

    // Format hours and minutes
    const formattedHours = totalHours.toString().padStart(2, "0");
    const formattedMinutes = totalMinutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  function getTotalTime(timeIntervals, odobrenoOnly = true) {
    let totalMinutes = 0;

    const intervalsToConsider = odobrenoOnly
      ? timeIntervals.filter(
          ({ casKonec, status }) => casKonec !== null && status === "Odobreno"
        )
      : timeIntervals;

    intervalsToConsider.forEach(({ casZacetek, casKonec }) => {
      const durationString = subtractTime(casZacetek, casKonec);
      if (durationString !== "/") {
        // Ensure duration is valid before parsing
        const [hours, minutes] = durationString.split(":").map(Number);
        totalMinutes += hours * 60 + minutes;
      }
    });

    // Convert total minutes back into "HH:mm"
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const formattedTotalDuration = `${totalHours
      .toString()
      .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

    return formattedTotalDuration;
  }

  function getAverageTime(filteredData) {
    if (filteredData.length === 0) {
      return "00:00";
    } // Convert all durations to minutes, sum them up, and then calculate the average
    let totalMinutes = 0;
    let validEntries = 0;

    filteredData
      .filter(
        ({ casKonec, status }) => casKonec !== null && status === "Odobreno"
      )
      .forEach(({ casZacetek, casKonec }) => {
        const start = dayjs(casZacetek);
        const end = dayjs(casKonec);
        const diff = end.diff(start, "minute"); // Get the difference in minutes directly
        totalMinutes += diff;
        validEntries++;
      });

    if (validEntries === 0) {
      return "00:00"; // Return "00:00" if there are no valid entries after excluding them
    }

    const averageMinutes = totalMinutes / validEntries;

    // Convert the average minutes back to hours and minutes
    const averageHours = Math.floor(averageMinutes / 60);
    const remainingMinutes = Math.round(averageMinutes % 60); // Use Math.round to round to the nearest whole number
    const formattedAverage = `${averageHours
      .toString()
      .padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;

    return formattedAverage;
  }

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
    // Assuming 'data' is the full dataset and 'filteredData' is what's currently displayed
    // Assuming that 'filteredData' may contain both 'cas' and 'malice' types
    const allCasIds = new Set(filteredData.map((item) => item.casID));
    console.log("SelectedCas.CasID: ", selectedCas);

    // Check if all casIDs in the filteredData are currently selected
    const areAllSelected = [...allCasIds].every((id) => selectedCas.has(id));

    if (areAllSelected) {
      // If all are selected, clear the selection
      setSelectedCas(new Set());
    } else {
      // Otherwise, create a new Set with all casIDs from filteredData
      setSelectedCas(allCasIds);
    }
  };

  const updateGridCheckboxesOnFilterChange = () => {
    // Adjust selectedCas based on filteredData changes
    setSelectedCas((prevSelectedCas) => {
      const currentIds = new Set(filteredData.map((data) => data.casID));
      return new Set([...prevSelectedCas].filter((id) => currentIds.has(id)));
    });
  };

  const calculateSelectedTimes = () => {
    // Calculate the total time of selected entries
    const selectedEntries = mergeSetIdsWithData(selectedCas, filteredData);
    const totalHours = getTotalTime(selectedEntries, false);
    setSelectedTimes(totalHours);
    console.log("Total hours: ", totalHours);
  };

  useEffect(() => {
    calculateSelectedTimes();
  }, [filteredData, selectedCas]);

  useEffect(() => {
    updateGridCheckboxesOnFilterChange();
  }, [filteredData]);

  const selectedAll = useMemo(
    () =>
      filteredData.length > 0 &&
      filteredData.every((data) => selectedCas.has(data.casID)),
    [(filteredData, selectedCas)]
  );

  return (
    <div className="content">
      <div style={{ marginLeft: "1rem" }}>
        <Row>
          <Col lg={true} md={12} sm={12}>
            <CasFiltri
              checkboxStates={checkboxStates}
              onCheckboxChange={handleCheckboxChange}
            />
          </Col>
          <Col lg={true} md={12} sm={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {selectedCas.size > 0 && (
                <span className="export-delete">
                  <span>
                    Izbrani vnosi:{" "}
                    <strong style={{ display: "inline" }}>
                      {selectedCas.size + ""}
                    </strong>
                  </span>

                  <InfoTooltip
                    placement="top"
                    sourceTitle={
                      <span style={{ paddingRight: "-10px" }}>
                        Trajanje izbranih: <strong>{selectedTimes}</strong>
                      </span>
                    }
                    content={`Trajanje izbranih vnosov je izračunano kot vsota trajanj vseh izbranih vnosov, ne le odobrenih.
                  \nIzjema so le vnosi s statusom 'V teku', katerim je nemogoče izračunati trajanje, dokler niso zaključeni.`}
                  />
                  <ExportDelete
                    filteredData={filteredData}
                    selectedCas={selectedCas}
                    setSelectedCas={setSelectedCas}
                    name={name}
                    totalHours={selectedTimes}
                    startDate={startDate}
                    endDate={endDate}
                    preglejBtn={preglejBtn}
                    handleSnackbarOpen={handleSnackbarOpen}
                  />
                </span>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Table
        borderless
        striped
        hover
        size="sm"
        responsive
        className="margin-top"
      >
        <thead>
          <tr>
            <th></th>
            <th>
              {filteredData.length > 0 ? (
                <Checkbox
                  sx={{ p: 0 }}
                  color="primary"
                  name="gridChecboxBulkSelect"
                  checked={selectedAll}
                  onChange={() => bulkCheckboxOnChange()}
                />
              ) : (
                ""
              )}
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
              <td colSpan={6}>
                Povprečen čas: <strong>{getAverageTime(filteredData)}</strong>{" "}
                <br />
                Skupno odobrenih ur:{" "}
                <strong>{getTotalTime(filteredData)}</strong>
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

      <CustomSnackbar
        open={snackbarStates.open}
        handleClose={() =>
          setSnackbarStates({ ...snackbarStates, open: false })
        }
        content={snackbarStates.content}
        severity={snackbarStates.severity}
      />
    </div>
  );
};

export default CasData;
