import React, { useState } from "react";
import Axios from "axios";

function ReadDezurni() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const getDezurni = () => {
    Axios.get(
      "http://localhost/reactProjects/armic/src/rest/getDezurni.php"
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <button onClick={getDezurni}>GET DEZURNI</button>
    </div>
  );
}

export default ReadDezurni;
