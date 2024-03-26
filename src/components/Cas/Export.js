import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { blue } from "@mui/material/colors";
import InfoTooltip from "../Elements/InfoTooltip";

const Export = ({ filteredData, selectedCas, name, totalHours }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExportClick = () => {
    console.log("Prepare csv data: ", prepareCsvData(filteredData));
    let dataToExport = prepareCsvData(filteredData);
    console.log("Data to export: ", dataToExport);
    dataToExport = mergeSetIdsWithData(selectedCas, dataToExport);
    console.log("Data to export after merge: ", dataToExport);
    const csvString = convertToCSV(dataToExport);

    // Add UTF-8 Byte Order Mark (BOM)
    const BOM = "\uFEFF";
    const csvContent = BOM + csvString;
    // Create a Blob from the JSON string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element, use it to download the Blob, and remove it after download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = `Delovni Čas ${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const prepareCsvData = (data) => {
    return data.map((item) => ({
      casID: item.casID,
      Ime: name,
      Status: item.status,
      Zacetek: item.formattedCasZacetek,
      Konec: item.formattedCasKonec,
      Trajanje: item.trajanje || "",
    }));
  };

  const mergeSetIdsWithData = (setIds, filteredData) => {
    // Convert the Set of selected IDs into an Array for easier processing
    const selectedIdsArray = Array.from(setIds);

    // Filter the filteredData to only include those entries whose casID is in the selectedIdsArray
    let mergedData = filteredData.filter((data) =>
      selectedIdsArray.includes(data.casID)
    );
    mergedData = removeCasID(mergedData || []);

    console.log("Merged data: ", mergedData);

    return mergedData;
  };

  const convertToCSV = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : JSON.parse(objArray);
    let csvString = "";

    // Extract headers
    if (array.length > 0) {
      const headerLine = Object.keys(array[0]).join(",");
      csvString += headerLine + "\r\n";
    }

    // Extract data rows
    array.forEach((item) => {
      const line = Object.values(item).join(",");
      csvString += line + "\r\n";
    });

    csvString += "Skupno število odobrenih ur,,,," + totalHours;

    return csvString;
  };

  const removeCasID = (json) => {
    return json.map((obj) => {
      const { casID, ...rest } = obj;
      return rest;
    });
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          mr: "5px",
          color: "white",
          "&:hover": {
            backgroundColor: blue[600], // Darken the color on hover
          },
        }}
        endIcon={<DownloadForOfflineOutlinedIcon />}
        onClick={handleMenuClick}
      >
        Izvozi
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleExportClick(".csv"); // Pass the format as an argument to the function
            handleClose();
          }}
        >
          <InfoTooltip
            placement="top"
            sourceTitle="Izvozi .csv"
            content={`Izvoz podatkov v CSV formatu - Primerno za grafičen prikaz
                podatkov v Excelu ali drugih programih za urejanje tabel.\n
                Primer za Excel: v zavihku 'Podatki':\n> Nova poizvedba\n> Iz datoteke
                > Iz datoteke CSV`}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            // For SQL export, you would have a separate function or logic
            // handleExportSql();
            handleClose();
          }}
        >
          <InfoTooltip
            placement="top"
            sourceTitle="Izvozi .sql"
            content="Izvoz podatkov v SQL formatu. SQL datoteka omogoča ponovno vstavljanje podatkov v podatkovno bazo aplikacije."
          />{" "}
        </MenuItem>
      </Menu>
    </>
  );
};
export default Export;
