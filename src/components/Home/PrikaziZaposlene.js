import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "./Modal";
import ModalDelete from "./ModalDelete";

const PrikaziZaposlene = () => {
  const [data, setData] = useState([]);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [passID, setPassID] = useState(null);

  const getZaposleni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.zaposleni);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getZaposleni();
  }, [openModal, openDeleteModal]);

  return (
    <div>
      {openModal && <Modal closeModal={setOpenModal} passID={passID} />}
      {openDeleteModal && (
        <ModalDelete closeModal={setOpenDeleteModal} passID={passID} />
      )}
      <div className="parent">
        {data.map((data) => (
          <div key={data.zaposleniID} className="child">
            {data.zaposleniIme}

            <OverlayTrigger /* Na mouse-hover napis "izbriši zaposlenega" */
              placement="top"
              overlay={
                <Tooltip id="button-tooltip-2">Izbriši zaposlenega</Tooltip>
              }
            >
              <FaRegTrashAlt
                className="deleteBtn" //trash icon
                onClick={() => {
                  setPassID(data.zaposleniID);
                  //deleteZaposleni(data.zaposleniID, event);
                  setOpenDeleteModal(true);
                }}
              />
            </OverlayTrigger>
            <OverlayTrigger /* Na mouse-hover napis "uredi zaposlenega" */
              placement="top"
              overlay={
                <Tooltip id="button-tooltip-2">Uredi zaposlenega</Tooltip>
              }
            >
              <FaRegEdit
                className="editBtn" //edit icon
                onClick={() => {
                  setOpenModal(true);
                  setPassID(data.zaposleniID);
                }}
              />
            </OverlayTrigger>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PrikaziZaposlene;
