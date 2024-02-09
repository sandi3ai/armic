import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Modal from "./Modal";
import ModalDelete from "./ModalDelete";

const PrikaziZaposlene = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [passID, setPassID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/getZaposleni.php`;

  const getZaposleni = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(getUrl, { withCredentials: true });
      setData(response.data.zaposleni || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div>
      {isLoading ? (
        <div> Loading ... </div>
      ) : (
        <>
          {checkIfContent()}
          {openModal && <Modal closeModal={setOpenModal} passID={passID} />}
          {openDeleteModal && (
            <ModalDelete closeModal={setOpenDeleteModal} passID={passID} />
          )}
          <div className="parent">
            {data.length > 0 &&
              data.map((zaposlen) => (
                <div key={zaposlen.zaposleniID} className="child">
                  {zaposlen.zaposleniIme}

                  <FaRegTrashAlt
                    className="deleteBtn" //trash icon
                    onClick={() => {
                      setPassID(zaposlen.zaposleniID);
                      //deleteZaposleni(data.zaposleniID, event);
                      setOpenDeleteModal(true);
                    }}
                  />

                  <FaRegEdit
                    className="editBtn" //edit icon
                    onClick={() => {
                      setOpenModal(true);
                      setPassID(zaposlen.zaposleniID);
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default PrikaziZaposlene;
