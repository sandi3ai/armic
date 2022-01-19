import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment"; //knjižnica za formatiranje datuma
import Axios from "axios";

const deleteDezurni = (id, event) => {
  //event.prevetDefault(); // prepreči osveževanje strani
  Axios.post(
    "http://localhost/reactProjects/armic/src/rest/deleteDezurni.php",
    { id: id }
  )
    .then(() => {
      console.log(id + " number sent on deleteDezurni");
    })
    .catch((err) => console.log(err));
};

const DezurniMap = ({ data, getDezurni }) => {
  return (
    <div className="dezuren">
      {moment(data.dezurniDatum).format("D. MMM. YYYY")} -{" "}
      {data.dezurniIzvajalec}
      <Button
        className="deleteBtn"
        onClick={(event) => deleteDezurni(data.dezurniID, event)}
      >
        Izbriši
      </Button>
    </div>
  );
};

export default DezurniMap;
