import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import Modal from "./Modal";

const PrikaziZaposlene = () => {
  const [data, setData] = useState([]);
  const getUrl =
    "http://localhost/reactProjects/armic/src/rest/getZaposleni.php";
  const deleteUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteZaposleni.php";
  const [openModal, setOpenModal] = useState(false);
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
  }, []);

  const deleteZaposleni = (id, event) => {
    event.preventDefault();
    Axios.post(deleteUrl, { id: id })
      .then(() => {
        console.log(id + " number sent on deleteZaposleni.php");
        getZaposleni();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {openModal && <Modal closeModal={setOpenModal} passID={passID} />}
      <div className="parent">
        {data.map((data) => (
          <div key={data.zaposleniID} className="child">
            {data.zaposleniIme}
            <Button
              onClick={() => {
                setOpenModal(true);
                setPassID(data.zaposleniID);
              }}
            >
              Uredi
            </Button>
            <OverlayTrigger /* Na mouse-hover napis "izbriši zaposlenega" */
              placement="top"
              overlay={
                <Tooltip id="button-tooltip-2">Izbriši zaposlenega</Tooltip>
              }
            >
              <FaRegTrashAlt
                className="deleteBtn" //trash icon
                onClick={(event) => deleteZaposleni(data.zaposleniID, event)}
              />
            </OverlayTrigger>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PrikaziZaposlene;
