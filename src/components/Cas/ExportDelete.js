import React from "react";
import Export from "./Export";
import Delete from "./Delete";

const ExportDelete = ({
  filteredData,
  selectedCas,
  setSelectedCas,
  name,
  totalHours,
  startDate,
  endDate,
  preglejBtn,
}) => {
  return (
    <>
      <Export
        filteredData={filteredData}
        selectedCas={selectedCas}
        name={name}
        totalHours={totalHours}
      />
      <Delete
        filteredData={filteredData}
        selectedCas={selectedCas}
        setSelectedCas={setSelectedCas}
        name={name}
        startDate={startDate}
        endDate={endDate}
        preglejBtn={preglejBtn}
      />
    </>
  );
};

export default ExportDelete;
