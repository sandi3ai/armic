import React, { useState, useEffect } from "react";

function MyAjax() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/reactProjects/armic/src/rest/admin_data.php")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
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
          {console.log("loaded, success")}
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
