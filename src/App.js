import React from "react";
import Header from "./components/Header/Header";
import Cas from "./components/Cas/Cas";
import Login from "./components/Login/Login";

function App({ Logout }) {
  return (
    <div className="App">
      {user.email != "" ? <Header Logout={Logout} /> : <Login />}
      <Cas />
    </div>
  );
}

export default App;
