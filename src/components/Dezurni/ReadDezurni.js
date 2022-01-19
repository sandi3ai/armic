import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import DezurniMap from "./DezurniMap";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState(false);
  const getUrl = "http://localhost/reactProjects/armic/src/rest/getDezurni.php";

  const getDezurni = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.dezurstva);
        console.log(response.data.dezurstva);
        setReceived(true);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getDezurni();
  }, []);

  return (
    <div className="dezurniParent">
      <Button onClick={getDezurni}>Osveži seznam dežurnih</Button>
      {received &&
        data.map((data) => (
          <div key={data.dezurniID}>
            <DezurniMap data={data} />
          </div>
        ))}
    </div>
  );
}

export default ReadDezurni;
