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

  async function Logout() {
    await callLogout({});
    setLoggedIn(false);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Header Logout={Logout} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
