import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { post } from "../../Helper";
import CircularProgress from "@mui/material/CircularProgress";
import CustomSnackbar from "../Elements/Snackbar";

const PrikaziZaposlene = ({ data, isLoading, getZaposleni }) => {
  const [imeSkupine, setImeSkupine] = useState("");
  const [loadingImeSkupine, setLoadingImeSkupine] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [passID, setPassID] = useState(null);
  const [snackbarStates, setSnackbarStates] = useState({
    open: false,
    content: "",
    severity: "info",
  });

  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;

  const idToName = (e) => {
    console.log(e);
    setLoadingImeSkupine(true);
    if (imeSkupine !== "") {
      setLoadingImeSkupine(false);
      return;
    }
    post(urlImeSkupine, { dropValue: e })
      .then((response) => {
        if (response.data && response.data.skupinaIme) {
          setImeSkupine(response.data.skupinaIme);
          setLoadingImeSkupine(false);
          console.log("Response skupinaIme:", response.data.skupinaIme);
        } else {
          console.log("No skupinaIme in response:", response.data);
          setLoadingImeSkupine(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching skupinaIme:", error);
        setLoadingImeSkupine(false);
      });
  };

  const handleSnackbarOpen = (content, severity = "info") => {
    setSnackbarStates({ open: true, content, severity });
  };

  useEffect(() => {
    getZaposleni();
  }, [openModal, openDeleteModal]);

  const checkIfContent = () => {
    if (data && data.length === 0) {
      return <div>V bazi ni najdenih vnosov.</div>; // Display a message or an empty state layout
    }
    return null; // This ensures that the function always returns something, even if it's `null`.
  };

  const renderPopover = (zaposlen) => (
    <Popover id={`popover-${zaposlen.zaposleniID}`} className="custom-popover">
      <Popover.Header as="h1" className="blue-modal-header">
        <strong>{zaposlen.zaposleniIme}</strong>
      </Popover.Header>
      <Popover.Body>
        {loadingImeSkupine ? (
          <CircularProgress />
        ) : (
          <>
            <span className="blue-modal-content">E-mail: </span>
            <strong>{zaposlen.email}</strong> <br />
            <span className="blue-modal-content">Skupina: </span>
            <strong>{imeSkupine}</strong>
            <br />
            <span className="blue-modal-content">Preostanek dopusta: </span>
            <strong>
              {zaposlen.preostanekDopusta}{" "}
              {zaposlen.preostanekDopusta === 1 ? "dan" : "dni"}
            </strong>
            <br />
            <span>
              <span className="blue-modal-content">Predviden začetek: </span>
              <strong>
                {zaposlen.predvidenZacetek
                  ? zaposlen.predvidenZacetek.substring(0, 5)
                  : ""}
              </strong>
            </span>
            {zaposlen.superVodja !== 0 && (
              <strong>
                <br />
                <span className="reddish">Super vodja</span>
              </strong>
            )}
            <br />
          </>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {isLoading ? (
        <div> Loading ... </div>
      ) : (
        <>
          {checkIfContent()}
          {openModal && <ModalEdit closeModal={setOpenModal} passID={passID} />}
          {openDeleteModal && (
            <ModalDelete
              closeModal={setOpenDeleteModal}
              passID={passID}
              onConfirm={handleSnackbarOpen}
            />
          )}
          <div className="parent">
            <CustomSnackbar
              open={snackbarStates.open}
              handleClose={() =>
                setSnackbarStates((prevConfig) => ({
                  ...prevConfig,
                  open: false,
                }))
              }
              content={snackbarStates.content}
              severity={snackbarStates.severity}
            />
            {data.length > 0 &&
              data.map((zaposlen) => (
                <div key={zaposlen.zaposleniID} className="child">
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="auto"
                    rootClose="true"
                    onEnter={() => idToName(zaposlen.zaposleniSkupinaID)}
                    overlay={renderPopover(zaposlen)}
                    onExit={() => setImeSkupine("")}
                  >
                    <span
                      className="zaposleni-hover"
                      onClick={() => {
                        setOpenModal(true);
                        setPassID(zaposlen.zaposleniID);
                      }}
                    >
                      {zaposlen.zaposleniIme}
                      {zaposlen.zaposleniZacetek}
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-delete`}>
                        Izbriši zaposlenega
                      </Tooltip>
                    }
                  >
                    <div
                      className="deleteBtn" //trash icon
                      onClick={() => {
                        setPassID(zaposlen.zaposleniID);
                        //deleteZaposleni(data.zaposleniID, event);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-edit`}>Uredi zaposlenega</Tooltip>
                    }
                  >
                    <div
                      className="editBtn" //edit icon
                      onClick={() => {
                        setOpenModal(true);
                        setPassID(zaposlen.zaposleniID);
                      }}
                    >
                      <FaRegEdit />
                    </div>
                  </OverlayTrigger>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default PrikaziZaposlene;
