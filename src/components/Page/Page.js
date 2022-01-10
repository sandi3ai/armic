import React from "react";
import "./page.css";
import Header from "../Header/Header";

function Page({ Logout }) {
  return (
    <div className="page">
      <Header Logout={Logout} />
      <div className="content">
        1This is a Page..
        <br /> 2this too is a page
        <br /> 3this too is a page
        <br /> 4this too is a page
        <br /> 5this too is a page
        <br /> 6this too is a page
      </div>
    </div>
  );
}

export default Page;
