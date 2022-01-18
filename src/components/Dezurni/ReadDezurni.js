import React, { useState } from "react";
import Axios from "axios";
import { Col, Button } from "react-bootstrap";
import DezurniMap from "./DezurniMap";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState(false);

  const getDezurni = () => {
    try {
      Axios.get(
        "http://localhost/reactProjects/armic/src/rest/getDezurni.php"
      ).then((response) => {
        setData(response.data.dezurstva);
        setReceived(true);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dezurniParent">
      <Button onClick={getDezurni}>Osveži seznam dežurnih</Button>
      {received &&
        data.map((data) => (
          <Col key={data.dezurniID}>
            <DezurniMap data={data} />
          </Col>
        ))}
    </div>
  );
}

export default ReadDezurni;
