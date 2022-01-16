import React, { useState } from "react";
import Login from "./components/Login/Login";
import useLazyApi from "./hooks/useLazyApi";
import Page from "./components/Page/Page";
import Header from "./components/Header/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const callLogout = useLazyApi(
    "http://localhost/reactProjects/armic/src/rest/logout.php"
  );

  function Logout() {
    setLoggedIn(false);
    callLogout({});
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Header Logout={Logout} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      {/*
      <button onClick={doCall}>doCall.js - login.php</button>
      <button onClick={openAdmins}>Show MyAdmin.js</button>
      <button onClick={closeAdmins}>Hide MyAdmin.js</button>
      {adminOpen && <MyAjax />}   
      */}
    </div>
  );
}

export default App;
