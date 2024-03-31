import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { blue } from "@mui/material/colors";
import InfoTooltip from "../Elements/InfoTooltip";
import { mergeSetIdsWithData } from "../../hooks/mergeSetWithData";

const Export = ({ filteredData, selectedCas, name, totalHours }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCsvExportClick = () => {
    let dataToExport = prepareCsvData(filteredData);
    dataToExport = mergeSetIdsWithData(selectedCas, dataToExport);
    dataToExport = removeCasID(dataToExport);
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

  const convertToCSV = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : JSON.parse(objArray);
    let csvString = "";

    // Extract headers
    if (array.length > 0) {
      const headerLine = Object.keys(array[0]).join(";");
      csvString += headerLine + "\r\n";
    }

    // Extract data rows
    array.forEach((item) => {
      const line = Object.values(item).join(";");
      csvString += line + "\r\n";
    });

    //Formatting the total hours
    const [hours, minutes] = totalHours.split(":"); // Split it and keep the first two parts
    const formattedTime = `${hours}:${minutes}`; // Stitch 'em back together
    csvString += "Skupno število ur;;;;" + totalHours;

    return csvString;
  };

  const removeCasID = (json) => {
    return json.map((obj) => {
      const { casID, ...rest } = obj;
      return rest;
    });
  };

  const handleSqlExportClick = () => {
    let dataToExport = prepareSqlData(filteredData);
    dataToExport = mergeSetIdsWithData(selectedCas, dataToExport);
    const sqlString = convertToSQL(dataToExport);

    // Create a Blob from the JSON string
    const blob = new Blob([sqlString], { type: "text/sql;charset=utf-8;" });

    // Create a link element, use it to download the Blob, and remove it after download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = `Delovni Čas ${name}.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const prepareSqlData = (data) => {
    return data.map((item) => ({
      casID: item.casID,
      userID: item.userID,
      casZacetek: item.casZacetek,
      casKonec: item.casKonec,
      status: item.status,
    }));
  };

  const convertToSQL = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : JSON.parse(objArray);
    let sqlString = "";

    // Extract data rows
    array.forEach((item) => {
      const values = Object.values(item).map((value) => {
        if (typeof value === "string") {
          return `'${value}'`;
        } else {
          return value;
        }
      });
      const line = `INSERT INTO cas (casID, userID, casZacetek, casKonec, status) VALUES (${values.join(
        ","
      )});\r\n`;
      sqlString += line;
    });

    return sqlString;
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          mr: "5px",
          color: "white",
          "&:hover": {
            backgroundColor: blue[600],
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
            handleCsvExportClick();
            handleClose();
          }}
        >
          <InfoTooltip
            placement="top"
            sourceTitle="Izvozi .csv"
            content={`Izvoz podatkov v CSV formatu - Primerno za grafičen prikaz
                podatkov v Excelu ali drugih programih za urejanje tabel.`}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSqlExportClick();
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
