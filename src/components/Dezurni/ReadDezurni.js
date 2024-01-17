import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { post } from "../../Helper";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const getUrl = "http://localhost/reactProjects/armic/src/rest/getDezurni.php";

  const getDezurni = () => {
    try {
      Axios.get(getUrl, { withCredentials: true }).then((response) => {
        setData(response.data.dezurstva || []);
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
    post("http://localhost/reactProjects/armic/src/rest/deleteDezurni.php", {
      id: id,
    })
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
        {data.length > 0 && data.map((dezurni) => (
            <div key={dezurni.dezurniID} className="child">
              {moment(dezurni.dezurniDatum).format("D. MMM. YYYY")} -{" "}
              {dezurni.dezurniIzvajalec}
              <OverlayTrigger /* Na mouse-hover napis "izbriši dežurstvo" */
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">Izbriši dežurstvo</Tooltip>
                }
              >
                <FaRegTrashAlt
                  className="deleteBtn" //trash icon
                  onClick={(event) => deleteDezurni(dezurni.dezurniID, event)}
                />
              </OverlayTrigger>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReadDezurni;
