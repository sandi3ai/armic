import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { OverlayTrigger, Popover, Button, Tooltip } from "react-bootstrap";
import { post } from "../../Helper";

const PrikaziZaposlene = () => {
  const [data, setData] = useState([]);
  const [imeSkupine, setImeSkupine] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [passID, setPassID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;
  const urlImeSkupine = `${process.env.REACT_APP_BASE_URL}/src/rest/getNameSkupina.php`;

  const getZaposleni = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(getUrl, { withCredentials: true });
      console.log("ZASOSLENI: ", response.data.zaposleni);
      setData(response.data.zaposleni || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const idToName = (e) => {
    console.log(e);
    post(urlImeSkupine, { dropValue: e })
      .then((response) => {
        if (response.data && response.data.skupinaIme) {
          setImeSkupine(response.data.skupinaIme);
          console.log("Response skupinaIme:", response.data.skupinaIme);
        } else {
          console.log("No skupinaIme in response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching skupinaIme:", error);
      });
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
    <Popover id={`popover-${zaposlen.zaposleniID}`}>
      <Popover.Header as="h1" className="blue-modal-header">
        {zaposlen.zaposleniIme}
      </Popover.Header>
      <Popover.Body>
        Skupina: <strong>{imeSkupine}</strong>
        <br />
        Preostanek dopusta:{" "}
        <strong>
          {zaposlen.preostanekDopusta}{" "}
          {zaposlen.preostanekDopusta === 1 ? "dan" : "dni"}
        </strong>
        <br />
        <span>
          Predviden začetek:{" "}
          <strong>
            {zaposlen.predvidenZacetek
              ? zaposlen.predvidenZacetek.substring(0, 5)
              : ""}
          </strong>
        </span>
        <br />
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
            <ModalDelete closeModal={setOpenDeleteModal} passID={passID} />
          )}
          <div className="parent">
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
                    <span className="zaposleni-hover">
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
