import React from "react";
import { Button, Card } from "react-bootstrap";
import moment from "moment"; //knjižnica za formatiranje datuma

const DezurniMap = ({ data }) => {
  return (
    <div className="dezuren">
      {moment(data.dezurniDatum).format("D. MMM. YYYY")} -{" "}
      {data.dezurniIzvajalec}
      <Button className="deleteBtn">Izbriši</Button>
    </div>
  );
};

export default DezurniMap;
