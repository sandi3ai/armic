import React from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { FaRegTrashAlt } from "react-icons/fa";

const Delete = () => {
  return (
    <>
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

export default Delete;
