import React from "react";

const CasData = (data) => {
  console.log(data);
  return (
    <div className="content">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default CasData;
