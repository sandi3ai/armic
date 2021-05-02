import React from "react";
import NavigationBar from "./NavBar.js";

function Header({ Logout }) {
  return (
    <div className="Header">
      <NavigationBar Logout={Logout} />
    </div>
  );
}
export default Header;
