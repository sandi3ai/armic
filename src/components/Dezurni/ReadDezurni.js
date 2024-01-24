import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCheckDouble,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { post } from "../../Helper";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [selectedDezurni, setSelectedDezurni] = useState(new Set());
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const getUrl = "http://localhost/reactProjects/armic/src/rest/getDezurni.php";
  const delUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteDezurni.php";

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
    <div>
      {openDeleteModal && (
        <DeleteModal
          selectedDezurni={selectedDezurni}
          setSelectedDezurni={setSelectedDezurni}
          setOpenDeleteModal={setOpenDeleteModal}
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
                      {moment(dezurni.dezurniDatum).format("D. MMM. YYYY") +
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
                  <FaRegTrashAlt
                    className="deleteBtn"
                    onClick={(event) => deleteDezurni(dezurni.dezurniID, event)}
                  />
                </OverlayTrigger>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReadDezurni;
