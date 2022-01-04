import React, { useState } from "react";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import useLazyApi from "./hooks/useLazyApi";
import MyAjax from "./components/Login/MyAjax";

function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  /*const { data, loading } = useApi(
    "https://localhost/reactProjects/armic/src/rest/admin_data.php",
    {
      name: "blabla",
      password: "geslo",
    }
  );*/

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

  function openAdmins() {
    setAdminOpen(true);
  }

  function closeAdmins() {
    setAdminOpen(false);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Header Logout={Logout} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}

      <button onClick={doCall}>doCall.js - admin_data.php</button>
      <button onClick={openAdmins}>Show MyAdmin.js</button>
      <button onClick={closeAdmins}>Hide MyAdmin.js</button>
      {adminOpen && <MyAjax />}
    </div>
  );
}

export default App;
