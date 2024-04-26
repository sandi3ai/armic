import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustomSnackbar from "../Elements/Snackbar";
import NovVnos from "./NovVnos";
import ReadDezurni from "./ReadDezurni";

export const Dezurni = () => {
  const [novVnos, setNovVnos] = useState(false);
  const [snackbarStates, setSnackbarStates] = useState({
    open: false,
    content: "",
    severity: "info",
  });

  function showNovVnos() {
    if (novVnos === false) {
      setNovVnos(true);
    } else {
      setNovVnos(false);
    }
  }

  const handleSnackbarOpen = (content, severity = "info") => {
    setSnackbarStates({ open: true, content, severity });
  };

  return (
    <div>
      <div className="content">
        <h2>SEZNAM DEŽURNIH:</h2>
        <div className="spacer"></div>
        <Button variant={novVnos ? "danger" : "outline-primary"} className="mb-2" onClick={showNovVnos}>
          {novVnos ? "Zapri" : "Dodaj dežurnega"}
        </Button>
        {novVnos ? <NovVnos /> : null}
        <hr></hr>
        <ReadDezurni onConfirm={handleSnackbarOpen} />
        <CustomSnackbar
          open={snackbarStates.open}
          handleClose={() =>
            setSnackbarStates((prevConfig) => ({ ...prevConfig, open: false }))
          }
          content={snackbarStates.content}
          severity={snackbarStates.severity}
        />
      </div>
    </div>
  );
};
