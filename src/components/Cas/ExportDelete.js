import React from "react";
import Export from "./Export";
import Delete from "./Delete";

const ExportDelete = ({
  filteredData,
  selectedCas,
  setSelectedCas,
  name,
  totalHours,
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
        selectedCas={selectedCas}
        setSelectedCas={setSelectedCas}
        name={name}
      />
    </>
  );
};

export default ExportDelete;
