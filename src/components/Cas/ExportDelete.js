import React from "react";
import Button from "@mui/material/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";

const ExportDelete = ({ filteredData, selectedCas, setSelectedCas, name }) => {
  const handleExportClick = () => {
    let dataToExport = mergeSetIdsWithData(selectedCas, filteredData);
    dataToExport = dataToExport.map((item) => ({
      ...item,
      Ime: name, // 'name' prop is added to each item as 'Ime'
    }));
    console.log("Data to export: ", dataToExport);
    console.log("Name: ", name);
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

  const mergeSetIdsWithData = (setIds, filteredData) => {
    // Convert the Set of selected IDs into an Array for easier processing
    const selectedIdsArray = Array.from(setIds);

    // Filter the filteredData to only include those entries whose casID is in the selectedIdsArray
    const mergedData = filteredData.filter((data) =>
      selectedIdsArray.includes(data.casID)
    );
    console.log("Merged data: ", mergedData);

    return mergedData;
  };

  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    // Extract headers
    let headerLine = "";
    if (array.length > 0) {
      headerLine = Object.keys(array[0]).join(",");
      str += headerLine + "\r\n";
    }

    // Extract data rows
    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
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
        onClick={() => {
          handleExportClick();
        }}
      >
        Izvozi
      </Button>
      <Button
        variant="text"
        sx={{
          mr: "5px",
          color: "white",
          "&:hover": {
            backgroundColor: red[600], // Darken the color on hover
          },
        }}
        endIcon={
          <FaRegTrashAlt style={{ fontSize: "1rem", marginBottom: "1px" }} />
        }
      >
        Izbriši
      </Button>
    </>
  );
};

export default ExportDelete;
