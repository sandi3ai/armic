import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import dayjs from "dayjs";
import "dayjs/locale/sl"; // Import the Slovenian locale
import { FaRegTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCheckDouble,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { post } from "../../Helper";
import CustomSnackbar from "../Elements/Snackbar";

dayjs.locale("sl");

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [selectedDezurni, setSelectedDezurni] = useState(new Set());
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getDezurni.php`;
  const delUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/deleteDezurni.php`;

  const getDezurni = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
        setData(response.data.dezurstva || []);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getDezurni();
  }, [openDeleteModal]);

  useEffect(() => {
    console.log("selectedDezurni updated:", selectedDezurni);
  }, [selectedDezurni]);

  const deleteDezurni = (id, event) => {
    event.preventDefault(); // prepreči osveževanje strani
    post(delUrl, {
      id: id,
    })
      .then(() => {
        console.log(id + " number sent on deleteDezurni");
        setOpenSnackbar(true);
        setSelectedDezurni(new Set());
        getDezurni();
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (dezurniID) => {
    setSelectedDezurni((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(dezurniID)) {
        newSelected.delete(dezurniID);
      } else {
        newSelected.add(dezurniID);
      }
      return newSelected;
    });
  };

  const selectAll = () => {
    const newSelected = new Set();
    data.forEach((dezurni) => newSelected.add(dezurni.dezurniID));
    setSelectedDezurni(newSelected);
    console.log(selectedDezurni);
    console.log("Select triggered: ", newSelected);
  };

  const deselectAll = () => {
    setSelectedDezurni(new Set()); //Clears the set, thus unchecking all
    console.log("Select triggered");
    console.log(selectedDezurni);
  };

  return (
    <>
      {openDeleteModal && (
        <DeleteModal
          selectedDezurni={selectedDezurni}
          setSelectedDezurni={setSelectedDezurni}
          onHide={() => setOpenDeleteModal(false)}
        />
      )}
      <Button
        className="buttonGroup"
        variant="outline-primary"
        onClick={getDezurni}
      >
        Osveži <FontAwesomeIcon icon={faArrowsRotate} />
      </Button>{" "}
      <Button
        className="buttonGroup"
        variant="outline-primary"
        onClick={selectAll}
      >
        Izberi vse <FontAwesomeIcon icon={faCheckDouble} />
      </Button>{" "}
      <Button
        className="buttonGroup"
        variant="outline-primary"
        onClick={deselectAll}
      >
        Izberi nič <FontAwesomeIcon icon={faXmark} />
      </Button>{" "}
      <Button
        className="buttonGroup"
        variant={
          selectedDezurni.size > 0 ? "outline-primary" : "outline-secondary"
        }
        onClick={() => setOpenDeleteModal(true)}
        disabled={selectedDezurni.size === 0} // Disable button when no dezurni is selected
      >
        Izbriši izbrane <FaRegTrashAlt />
      </Button>{" "}
      {selectedDezurni.size >= 1 && (
        <span className="selection-count">
          Število izbranih: {selectedDezurni.size}
        </span>
      )}
      <div className="spacer"></div>
      <div className="parent">
        {data.length > 0 &&
          data.map((dezurni) => (
            <div key={dezurni.dezurniID} className="child">
              <div className="dezurni-container">
                <Form.Check
                  type="checkbox"
                  className="formCheck"
                  checked={selectedDezurni.has(dezurni.dezurniID)}
                  onChange={() => handleCheckboxChange(dezurni.dezurniID)}
                  label={
                    <span>
                      {dayjs(dezurni.dezurniDatum).format("D. MMM YY") +
                        " - " +
                        dezurni.dezurniIzvajalec}
                    </span>
                  }
                />
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-delete-${dezurni.dezurniID}`}>
                      Izbriši dežurstvo
                    </Tooltip>
                  }
                >
                  <div
                    className="deleteBtn"
                    onClick={(event) => deleteDezurni(dezurni.dezurniID, event)}
                  >
                    <FaRegTrashAlt />
                  </div>
                </OverlayTrigger>
              </div>
            </div>
          ))}
      </div>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        content="Dežurstvo izbrisano."
        severity="error"
      />
    </>
  );
}

export default ReadDezurni;
