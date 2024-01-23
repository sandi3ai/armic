import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faCheckDouble,  } from '@fortawesome/free-solid-svg-icons'
import { post } from "../../Helper";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [selectedDezurni, setSelectedDezurni] = useState(new Set())
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

  const handleCheckboxChange = (dezurniID) => {
    setSelectedDezurni(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(dezurniID)) {
        newSelected.delete(dezurniID);
      } else {
        newSelected.add(dezurniID);
      }
      return newSelected;
    });
  };

   return (
    <div>
      <Button variant="outline-primary" onClick={getDezurni}>
        Osveži <FontAwesomeIcon icon={faArrowsRotate} />
      </Button>{" "}
      <Button variant="outline-primary" onClick={getDezurni}>
        Izberi vse <FontAwesomeIcon icon={faCheckDouble} />
      </Button>{" "}
      <Button variant="outline-primary" onClick={getDezurni}>
        Izbriši izbrane <FaRegTrashAlt className="deleteBtnRed"/>
      </Button>
      <div className="spacer"></div>
      <div className="parent">
        {data.length > 0 && data.map((dezurni) => (
          <div key={dezurni.dezurniID} className="child">
            <Form.Check 
              type="checkbox"
              checked={selectedDezurni.has(dezurni.dezurniID)}
              onChange={() => handleCheckboxChange(dezurni.dezurniID)}
              label={moment(dezurni.dezurniDatum).format("D. MMM. YYYY") + " - " + dezurni.dezurniIzvajalec}
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip-2">Izbriši dežurstvo</Tooltip>}
            >
              <FaRegTrashAlt
                className="deleteBtn"
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
