import React from "react";
import Button from "@mui/material/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";

const ExportDelete = () => {
  return (
    <>
      <Button
        variant="text"
        sx={{
          mr: "5px",
          color: "white",
          "&:hover": {
            backgroundColor: green[600], // Darken the color on hover
          },
        }}
        size="small"
        endIcon={<DownloadForOfflineOutlinedIcon />}
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
        size="small"
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
