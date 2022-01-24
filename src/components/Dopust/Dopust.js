import React from "react";
import ToggleButtonGroup from "./ToggleButtons";

export const Dopust = () => {
  return (
    <div>
      <div className="content">
        <h2>DOPUSTI:</h2>
      </div>

      <div className="content">
        <h2>Izberi skupino</h2>
        <ToggleButtonGroup />
      </div>
    </div>
  );
};
