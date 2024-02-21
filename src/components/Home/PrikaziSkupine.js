import Axios from "axios";
import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import ModalDeleteSkupina from "./ModalDeleteSkupina";
import ModalEditSkupina from "./ModalEditSkupina";

const PrikaziSkupine = () => {
  const [data, setData] = useState([]);
  const [passedSkupinaData, setPassedSkupinaData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getSkupine.php`;

  const getSkupine = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
        setData(response.data.skupine);
        console.log(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getSkupine();
  }, []);

  return (
    <div>
      <hr />
      <h3>Skupine:</h3>

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
              overlay={<Tooltip id={`tooltip-edit`}>Preimenuj</Tooltip>}
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
              />
            )}
            {openEditModal && (
              <ModalEditSkupina
                closeModal={setOpenEditModal}
                skupinaData={passedSkupinaData}
                refreshSkupine={getSkupine}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrikaziSkupine;
//onClick={(event) => deleteSkupina(d.skupinaID, event)}
