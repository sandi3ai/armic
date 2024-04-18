import Axios from "axios";
import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import ModalDeleteSkupina from "./ModalDeleteSkupina";
import ModalEditSkupina from "./ModalEditSkupina";
import CustomSnackbar from "../Elements/Snackbar";

const PrikaziSkupine = ({ zaposleniData, isLoading }) => {
  const [data, setData] = useState([]);
  const [passedSkupinaData, setPassedSkupinaData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [snackbarStates, setSnackbarStates] = useState({
    open: false,
    content: "",
    severity: "info",
  });

  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;

  const getSkupine = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
        setData(response.data.skupine);
        console.log("response.data.skupine:", response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSnackbarOpen = (content, severity = "info") => {
    setSnackbarStates({ open: true, content, severity });
  };

  useEffect(() => {
    getSkupine();
    console.log("Passed skupina data. ", passedSkupinaData);
  }, []);

  return (
    <div>
      <br />
      <h2>Skupine:</h2>

      <div className="parent">
        {data.map((d) => (
          <div key={d.skupinaID} className="child">
            {d.skupinaIme}

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-delete-${d.skupinaID}`}>
                  Izbriši skupino
                </Tooltip>
              }
            >
              <div
                className="deleteBtn" //trash icon
                onClick={() => {
                  setOpenDeleteModal(true);
                  setPassedSkupinaData(d);
                }}
              >
                <FaRegTrashAlt />
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-edit`}>Uredi</Tooltip>}
            >
              <div
                className="editBtn" //edit icon
                onClick={() => {
                  setOpenEditModal(true);
                  setPassedSkupinaData(d);
                }}
              >
                <FaRegEdit />
              </div>
            </OverlayTrigger>

            {openDeleteModal && (
              <ModalDeleteSkupina
                closeModal={setOpenDeleteModal}
                skupinaData={passedSkupinaData}
                refreshSkupine={getSkupine}
                onConfirm={handleSnackbarOpen}
              />
            )}
            {openEditModal && (
              <ModalEditSkupina
                closeModal={setOpenEditModal}
                skupinaData={passedSkupinaData}
                refreshSkupine={getSkupine}
                zaposleniData={zaposleniData}
                isLoading={isLoading}
                onConfirm={handleSnackbarOpen}
              />
            )}
          </div>
        ))}
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

export default PrikaziSkupine;
//onClick={(event) => deleteSkupina(d.skupinaID, event)}
