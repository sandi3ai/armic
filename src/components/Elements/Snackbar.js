import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const CustomSnackbar = ({ open, handleClose, content, severity }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={2500}
      transitionDuration={1000}
      open={open}
      onClose={handleClose}
      message={content}
    >
      <Alert
        onClose={handleClose}
        severity={severity || "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
