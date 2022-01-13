import React from "react";
import "./page.css";
import Header from "../Header/Header";

function Page({ Logout }) {
  return (
    <div className="page">
      <Header Logout={Logout} />
      <div className="divine">
        Page component
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Page;
