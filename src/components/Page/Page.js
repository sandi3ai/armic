import React from "react";
import "./page.css";
import NavigationBar from "../Header/NavBar";

function Page({ Logout }) {
  return (
    <div className="page">
      <NavigationBar Logout={Logout} />
      <div className="divine">
        Page component
        <br />
      </div>
    </div>
  );
}

export default Page;
