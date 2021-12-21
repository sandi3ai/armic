import React from "react";
import Header from "./components/Header/Header";
import Cas from "./components/Cas/Cas";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App({ Logout }) {
  return (
    <div className="App">
      <Router>
        <Login />
        <Header Logout={Logout} />
        <Cas />
        <Route path="/logged" component={Header} />
        <Route path="/" exact component={Login} />
      </Router>
    </div>
  );
}

export default App;
