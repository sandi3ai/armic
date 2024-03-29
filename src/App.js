import React, { useState } from "react";
import Login from "./components/Login/Login";
import useLazyApi from "./hooks/useLazyApi";
import Page from "./components/Page/Page";
import Header from "./components/Header/Header";
import { CountsProvider } from "./hooks/CountsContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const callLogout = useLazyApi(
    `${process.env.REACT_APP_BASE_URL}/src/rest/logout.php`
  );

  async function Logout() {
    await callLogout({});
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <CountsProvider>
        {loggedIn ? (
          <Header Logout={Logout} />
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </CountsProvider>
    </div>
  );
}

export default App;
