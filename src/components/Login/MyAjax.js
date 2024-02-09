import React, { useState, useEffect } from "react";

function MyAjax() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/src/rest/login.php`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return (
    <div className="Divino">
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.adminID}>
              <b>Uporabnik: </b>
              {item.adminUser}
              <br />
              <b>Token: </b> {item.adminPass}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyAjax;
