import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import { mergeSetIdsWithData } from "../../hooks/mergeSetWithData";

const Delete = ({
  filteredData,
  selectedCas,
  setSelectedCas,
  name,
  startDate,
  endDate,
  preglejBtn,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState([]);
  const handleDeleteClick = () => {
    console.log("Delete button clicked");
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    console.log("selectedCas: ", selectedCas);
    console.log("filteredData: ", filteredData);
    const mergedData = mergeSetIdsWithData(selectedCas, filteredData);
    console.log("Merged data: ", mergedData);
    setDataToDelete(mergedData);
  }, [openDeleteModal]);

  return (
    <>
      <Button
        variant="text"
        sx={{
          mr: "5px",
          color: "red",
          "&:hover": {
            backgroundColor: red[600], // Darken the color on hover
            color: "white",
          },
        }}
        endIcon={
          <FaRegTrashAlt style={{ fontSize: "1rem", marginBottom: "1px" }} />
        }
        onClick={() => {
          handleDeleteClick();
        }}
      >
        Izbriši
      </Button>
      <DeleteModal
        filteredData={filteredData}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        selectedCas={selectedCas}
        setSelectedCas={setSelectedCas}
        name={name}
        dataToDelete={dataToDelete}
        setDataToDelete={setDataToDelete}
        startDate={startDate}
        endDate={endDate}
        preglejBtn={preglejBtn}
      />
    </>
  );
};

export default Delete;
