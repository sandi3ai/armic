import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const PrikaziSkupine = () => {
  const [data, setData] = useState([]);
  const getUrl = "http://localhost/reactProjects/armic/src/rest/getSkupine.php";
  const deleteUrl =
    "http://localhost/reactProjects/armic/src/rest/deleteSkupina.php";

  const getSkupine = () => {
    try {
      Axios.get(getUrl).then((response) => {
        setData(response.data.skupine);
        console.log(response.data.skupine);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getSkupine();
  }, []);

  const deleteSkupina = (id, event) => {
    console.log(id);
    console.log(event);
    event.preventDefault();
    Axios.post(deleteUrl, { id: id })
      .then(() => {
        console.log(id + " number sent on deleteSkupina.php");
        getSkupine();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <hr />
      <h3>Skupine:</h3>
      <div className="parent">
        {data.map((d) => (
          <div key={d.skupinaID} className="child">
            {d.skupinaIme}
            <OverlayTrigger /* Na mouse-hover napis "izbriši zaposlenega" */
              placement="top"
              overlay={<Tooltip id="button-tooltip-2">Izbriši skupino</Tooltip>}
            >
              <FaRegTrashAlt
                className="deleteBtn" //trash icon
                onClick={(event) => deleteSkupina(d.skupinaID, event)}
              />
            </OverlayTrigger>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrikaziSkupine;
