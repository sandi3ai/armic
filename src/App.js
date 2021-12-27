import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Cas from "./components/Cas/Cas";
import Login from "./components/Login/Login";
import useApi from "./hooks/useApi";
import useLazyApi from "./hooks/useLazyApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { data, loading } = useApi(
    "https://localhost/reactProjects/armic/src/rest/admin_data.php",
    {
      name: "blabla",
      password: "geslo",
    }
  );

  const makeApiCall = useLazyApi(
    "https://localhost/reactProjects/armic/src/rest/admin_data.php"
  );

  function Logout() {
    setLoggedIn(false);
  }

  async function doCall() {
    const myData = { password: "geslo", name: "to_je_name" };

    const response = await makeApiCall(myData);

    console.log(response);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Header Logout={Logout} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}

      <button onClick={doCall}>beri z baze</button>
    </div>
  );
}

export default App;
