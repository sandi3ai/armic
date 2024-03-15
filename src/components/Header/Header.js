import React, { useEffect } from "react";
import NavigationBar from "./NavBar.js";
import { post } from "../../Helper";
import { useCounts } from "../../hooks/CountsContext";

function Header({ Logout }) {
  const countProsnjeUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/countProsnje.php`;
  const { updateCounts } = useCounts();

  const countProsnje = async () => {
    try {
      post(countProsnjeUrl, {}).then((response) => {
        console.log("Count prosnje response: ", response);
        updateCounts({
          countNadure: response.data.countNadure,
          countOdsotnost: response.data.countOdsotnost,
        });
      });
    } catch (error) {
      console.error("Failed to fetch counts", error);
    }
  };

  useEffect(() => {
    countProsnje();
  }, []);

  return (
    <div>
      <NavigationBar Logout={Logout} />
    </div>
  );
}
export default Header;
