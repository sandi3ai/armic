import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState(false);
  const getUrl = "http://localhost/reactProjects/armic/src/rest/getDezurni.php";

  const getDezurni = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
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
      { id: id },
      { withCredentials: true }
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
              <OverlayTrigger /* Na mouse-hover napis "izbriši dežurstvo" */
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">Izbriši dežurstvo</Tooltip>
                }
              >
                <FaRegTrashAlt
                  className="deleteBtn" //trash icon
                  onClick={(event) => deleteDezurni(data.dezurniID, event)}
                />
              </OverlayTrigger>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReadDezurni;
