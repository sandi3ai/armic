import React from "react";
import useApi from "../../hooks/useApi.js";
import NavigationBar from "./NavBar.js";

function Header({ Logout }) {
  //const { data, loading } = useApi("https://localhost/armic_api/time.php");

  return (
    <div className="Header">
      <NavigationBar Logout={Logout} />
    </div>
  );
}
export default Header;
