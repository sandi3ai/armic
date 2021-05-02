import React from "react";
import Header from "./components/Header/Header";
import Cas from "./components/Cas/Cas";
import Login from "./components/Login/Login";

function App({ Logout }) {
  return (
    <div className="App">
      <Login />
      {/*<Header Logout={Logout} />
      <Cas />*/}
    </div>
  );
}

export default App;
