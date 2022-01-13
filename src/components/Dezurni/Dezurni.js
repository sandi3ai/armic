import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export const Dezurni = () => {
  return (
    <div>
      <div className="content">
        <h2>SEZNAM DEŽURNIH:</h2>
      </div>
      <div className="content">
        <Button>Nov vnos</Button>
        <Button>Uredi vnos</Button>
      </div>
    </div>
  );
};
