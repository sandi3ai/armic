import React, { useEffect, useState } from "react";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { Alert } from "@mui/material";

const EmailLog = () => {
  const [emailLogOpen, setEmailLogOpen] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [formattedEmailData, setFormattedEmailData] = useState([]);

  const todaysDate = dayjs().format("DD.MM.YYYY");
  const todaysDateYYYYMMDD = dayjs().format("YYYY-MM-DD");
  const logFile = `${process.env.REACT_APP_BASE_URL}/src/taskScheduler/logs/log-${todaysDateYYYYMMDD}.txt`;

  function toggleEmailModal() {
    emailLogOpen ? setEmailLogOpen(false) : setEmailLogOpen(true);
  }

  const readFileContent = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetching file was not ok");
      }
      const text = await response.text();
      setEmailData(text || "No content in the file");
    } catch (error) {
      console.error("Error fetching file:", error);
      setEmailData("Datoteka ne obstaja / noben opomnik ni bil poslan");
    }
  };

  useEffect(() => {
    if (logFile) {
      readFileContent(logFile);
      console.log("Logfile: ", logFile);
    } else {
      setEmailData("No log file for today");
    }
  }, [emailLogOpen]);

  useEffect(() => {
    const sections = emailData.split("***").map((section, index) => {
      if (section.trim()) {
        console.log("Section: ", section);
        return (
          <Alert
            key={index}
            variant="outlined"
            severity="info"
            style={{ marginBottom: "20px" }}
            icon={<MailOutlinedIcon />}
          >
            {section}
          </Alert>
        );
      }
      return null;
    });
    setFormattedEmailData(sections);
  }, [emailData]);

  return (
    <>
      <Button variant="outline-primary" onClick={toggleEmailModal}>
        <span className="button-text">Poslani opomniki </span>
        <MailOutlinedIcon />
      </Button>
      <Modal show={emailLogOpen} onHide={toggleEmailModal} centered>
        <Modal.Header className="blue-modal-header" closeButton>
          <Modal.Title>Poslani opomniki za vnos ur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i>
            Seznam poslanih emailov (ali napak) za vnos ur, ki je zaposlenemu
            poslan, v primeru da:
            <li>Ni vikend ali praznik</li>
            <li>Zaposleni trenutno ni na odobreni odsotnosti</li>
            <li>
              Zaposleni še ni vnesel delovnega časa dve uri po predvidenem
              začetku
            </li>
          </i>
          <br />
          Opomniki za <strong>{todaysDate}:</strong>
          <div style={{ whiteSpace: "pre-wrap" }}>{formattedEmailData}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleEmailModal}>
            Zapri
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmailLog;
