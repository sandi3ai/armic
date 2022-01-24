import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";

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

  const deleteDezurni = (id, event) => {
    event.preventDefault(); // prepreči osveževanje strani
    Axios.post(
      "http://localhost/reactProjects/armic/src/rest/deleteDezurni.php",
      { id: id }
    )
      .then(() => {
        console.log(id + " number sent on deleteDezurni");
        getDezurni();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={getDezurni}>
        Osveži seznam dežurnih
      </Button>
      <div className="parent">
        {received &&
          data.map((data) => (
            <div key={data.dezurniID} className="child">
              {moment(data.dezurniDatum).format("D. MMM. YYYY")} -{" "}
              {data.dezurniIzvajalec}
              <FaRegTrashAlt
                className="deleteBtn" //trash icon
                onClick={(event) => deleteDezurni(data.dezurniID, event)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReadDezurni;
